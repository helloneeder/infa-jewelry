import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { callApi, api } from '@/lib/api'
import {
  type Product,
  type PaginatedData,
  type ProductStatus,
} from '@infa/shared'

const PAGE_SIZE = 20

export default function ProductsPage() {
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState<ProductStatus | ''>('')
  const qc = useQueryClient()

  const list = useQuery({
    queryKey: ['products', { page, keyword, status }],
    queryFn: () => {
      const params: Record<string, string | number> = {
        page,
        pageSize: PAGE_SIZE,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }
      if (keyword) params.keyword = keyword
      if (status) params.status = status
      return callApi<PaginatedData<Product>>(api.get('/products', { params }))
    },
  })

  const toggle = useMutation({
    mutationFn: (id: number) => callApi<{ id: number; status: ProductStatus }>(api.patch(`/products/${id}/toggle`)),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })

  const remove = useMutation({
    mutationFn: (id: number) => callApi<{ success: true }>(api.delete(`/products/${id}`)),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })

  const data = list.data

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">产品管理</h1>
        <Link
          to="/products/new"
          className="flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-sm font-medium text-white transition hover:bg-brand-strong"
        >
          <Plus size={16} />
          新增产品
        </Link>
      </div>

      <div className="mt-5 flex gap-2">
        <input
          value={keyword}
          onChange={(e) => {
            setPage(1)
            setKeyword(e.target.value)
          }}
          placeholder="按名称 / SKU 搜索"
          className="w-64 rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        <select
          value={status}
          onChange={(e) => {
            setPage(1)
            setStatus(e.target.value as ProductStatus | '')
          }}
          className="rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand"
        >
          <option value="">全部状态</option>
          <option value="active">在售</option>
          <option value="inactive">下架</option>
        </select>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-black/[0.02] text-left text-xs text-ink-muted">
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">名称（简体）</th>
              <th className="px-4 py-3 font-medium">价格</th>
              <th className="px-4 py-3 font-medium">状态</th>
              <th className="px-4 py-3 font-medium">排序</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {list.isLoading && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink-muted">加载中…</td>
              </tr>
            )}
            {data && data.items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink-muted">暂无产品</td>
              </tr>
            )}
            {data?.items.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-black/[0.015]">
                <td className="px-4 py-3 text-ink-muted">{p.sku}</td>
                <td className="px-4 py-3">{p.name['zh-CN']}</td>
                <td className="px-4 py-3">¥{p.price.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => toggle.mutate(p.id)}
                    className={
                      p.status === 'active'
                        ? 'rounded-full bg-success/10 px-2.5 py-0.5 text-xs text-success'
                        : 'rounded-full bg-black/5 px-2.5 py-0.5 text-xs text-ink-muted'
                    }
                  >
                    {p.status === 'active' ? '在售' : '下架'}
                  </button>
                </td>
                <td className="px-4 py-3 text-ink-muted">{p.sort}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      to={`/products/${p.id}`}
                      className="rounded-md p-1.5 text-ink-muted transition hover:bg-black/5 hover:text-brand-strong"
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`确定删除产品「${p.name['zh-CN']}」？`)) remove.mutate(p.id)
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

      {data && data.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-ink-muted">
          <span>共 {data.total} 条</span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-border px-3 py-1.5 disabled:opacity-50"
            >
              上一页
            </button>
            <span className="px-2 py-1.5">
              {data.page} / {data.totalPages}
            </span>
            <button
              type="button"
              disabled={page >= data.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-border px-3 py-1.5 disabled:opacity-50"
            >
              下一页
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
