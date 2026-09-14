import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { LocalizedField } from '@/components/LocalizedField'
import { callApi, api } from '@/lib/api'
import { categoryKeys, useCategories } from '@/lib/categories'
import {
  CategoryCreateSchema,
  type Category,
  type CategoryCreateInput,
  type LocalizedText,
} from '@infa/shared'

const EMPTY_LOC: LocalizedText = { 'zh-CN': '', 'zh-TW': '', en: '' }

export default function CategoriesPage() {
  const categories = useCategories()
  const qc = useQueryClient()
  const [editing, setEditing] = useState<Category | 'new' | null>(null)

  const save = useMutation({
    mutationFn: (values: CategoryCreateInput) => {
      const target = editing
      if (target === 'new') {
        return callApi<Category>(api.post('/categories', values))
      }
      if (target === null) {
        return Promise.reject(new Error('没有正在编辑的分类'))
      }
      return callApi<Category>(api.put(`/categories/${target.id}`, values))
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: categoryKeys.all })
      setEditing(null)
    },
  })

  const remove = useMutation({
    mutationFn: (id: number) => callApi<{ success: true }>(api.delete(`/categories/${id}`)),
    onSuccess: () => qc.invalidateQueries({ queryKey: categoryKeys.all }),
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">分类管理</h1>
        <button
          type="button"
          onClick={() => setEditing('new')}
          className="flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-sm font-medium text-white transition hover:bg-brand-strong"
        >
          <Plus size={16} />
          新增分类
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-black/[0.02] text-left text-xs text-ink-muted">
              <th className="px-4 py-3 font-medium">名称（简体 / 繁体 / English）</th>
              <th className="px-4 py-3 font-medium">排序</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {categories.isLoading && (
              <tr><td colSpan={3} className="px-4 py-10 text-center text-ink-muted">加载中…</td></tr>
            )}
            {categories.data && categories.data.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-10 text-center text-ink-muted">暂无分类</td></tr>
            )}
            {categories.data?.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-black/[0.015]">
                <td className="px-4 py-3">
                  {c.name['zh-CN']} <span className="text-ink-muted">/ {c.name['zh-TW']} / {c.name.en}</span>
                </td>
                <td className="px-4 py-3 text-ink-muted">{c.sort}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setEditing(c)}
                      className="rounded-md p-1.5 text-ink-muted transition hover:bg-black/5 hover:text-brand-strong"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`确定删除分类「${c.name['zh-CN']}」？`)) remove.mutate(c.id)
                      }}
                      className="rounded-md p-1.5 text-ink-muted transition hover:bg-black/5 hover:text-danger"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <CategoryDialog
          category={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSubmit={(values) => save.mutateAsync(values)}
          saving={save.isPending}
        />
      )}
    </div>
  )
}

function CategoryDialog({
  category,
  onClose,
  onSubmit,
  saving,
}: {
  category: Category | null
  onClose: () => void
  onSubmit: (values: CategoryCreateInput) => Promise<unknown>
  saving: boolean
}) {
  const {
    handleSubmit,
    setValue,
    watch,
    register,
  } = useForm<CategoryCreateInput>({
    resolver: zodResolver(CategoryCreateSchema),
    defaultValues: {
      name: category ? { ...category.name } : { ...EMPTY_LOC },
      sort: category?.sort ?? 0,
    },
  })

  const name = watch('name')
  useEffect(() => {
    register('name')
  }, [register])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit((v) => onSubmit(v))}
        className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">{category ? '编辑分类' : '新增分类'}</h2>
          <button type="button" onClick={onClose} className="text-ink-muted hover:text-ink">
            <X size={18} />
          </button>
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium">分类名称（三语，均必填）</label>
          <LocalizedField
            value={name}
            onChange={(v) => setValue('name', v, { shouldValidate: true })}
          />
        </div>

        <div className="mt-4 w-32">
          <label className="text-sm font-medium">排序</label>
          <input
            type="number"
            {...register('sort', { valueAsNumber: true })}
            className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-sm text-ink-muted transition hover:bg-black/5"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-brand px-5 py-2 text-sm font-medium text-white transition hover:bg-brand-strong disabled:opacity-60"
          >
            {saving ? '保存中…' : '保存'}
          </button>
        </div>
      </form>
    </div>
  )
}
