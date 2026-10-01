import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { LocalizedField } from '@/components/LocalizedField'
import { ImageUploader } from '@/components/ImageUploader'
import { useCategories } from '@/lib/categories'
import { useCreateProduct, useProduct, useUpdateProduct } from '@/lib/products'
import {
  ProductCreateSchema,
  type ProductCreateInput,
  type LocalizedText,
  type ProductImage,
} from '@infa/shared'

const EMPTY_LOC: LocalizedText = { 'zh-CN': '', 'zh-TW': '', en: '' }

export default function ProductEditPage() {
  const params = useParams()
  const isNew = params.id === undefined || params.id === 'new'
  const id = isNew ? 0 : Number(params.id)
  const navigate = useNavigate()
  const categories = useCategories()

  const existing = useProduct(id)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ProductCreateInput>({
    resolver: zodResolver(ProductCreateSchema),
    defaultValues: {
      sku: '',
      name: { ...EMPTY_LOC },
      description: { ...EMPTY_LOC },
      price: 0,
      categoryId: null,
      images: [],
      status: 'active',
      sort: 0,
    },
  })

  useEffect(() => {
    if (!isNew && existing.data) {
      reset({
        sku: existing.data.sku,
        name: existing.data.name,
        description: existing.data.description,
        price: existing.data.price,
        categoryId: existing.data.categoryId,
        images: existing.data.images,
        status: existing.data.status,
        sort: existing.data.sort,
      })
    }
  }, [isNew, existing.data, reset])

  const create = useCreateProduct()
  const update = useUpdateProduct(id)

  const name = watch('name')
  const description = watch('description')
  const images = watch('images') ?? []

  /**
   * Functional image updater: always computes from the form's CURRENT value via
   * getValues, not the `images` render snapshot. This avoids a stale-closure bug
   * where an image uploaded right before save was dropped.
   */
  const updateImages = (updater: (prev: ProductImage[]) => ProductImage[]) => {
    const current = getValues('images') ?? []
    const next = updater(current)
    setValue('images', next, { shouldValidate: true, shouldDirty: true })
  }

  const onSubmit = handleSubmit(async (values) => {
    const payload: ProductCreateInput = {
      ...values,
      // empty-string price guard happens via zod; normalize null category.
      categoryId: values.categoryId ?? null,
    }
    if (isNew) {
      await create.mutateAsync(payload)
    } else {
      await update.mutateAsync(payload)
    }
    navigate('/products')
  })

  const fieldError = (e: unknown) => (typeof e === 'object' && e && 'message' in e
    ? String((e as { message?: unknown }).message)
    : undefined)

  return (
    <div className="p-8">
      <button
        type="button"
        onClick={() => navigate('/products')}
        className="flex items-center gap-1 text-sm text-ink-muted transition hover:text-ink"
      >
        <ArrowLeft size={15} /> 返回产品列表
      </button>

      <h1 className="mt-3 text-lg font-semibold">{isNew ? '新增产品' : '编辑产品'}</h1>

      {!isNew && existing.isLoading && (
        <p className="mt-6 text-sm text-ink-muted">加载中…</p>
      )}

      <form onSubmit={onSubmit} className="mt-6 max-w-2xl space-y-6">
        <section className="space-y-4 rounded-xl border border-border bg-surface p-6">
          <div>
            <label className="text-sm font-medium">SKU</label>
            <input
              {...register('sku')}
              className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            {errors.sku && <p className="mt-1 text-xs text-danger">{fieldError(errors.sku)}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">产品名称（三语）</label>
            <LocalizedField
              value={name}
              onChange={(v) => setValue('name', v, { shouldValidate: true })}
              placeholder={{ 'zh-CN': '项链名', 'zh-TW': '項鏈名', en: 'Necklace name' }}
            />
          </div>

          <div>
            <label className="text-sm font-medium">产品描述（三语）</label>
            <LocalizedField
              multiline
              value={description}
              onChange={(v) => setValue('description', v, { shouldValidate: true })}
            />
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-surface p-6">
          <div>
            <label className="text-sm font-medium">价格（元）</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register('price', { valueAsNumber: true })}
              className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            {errors.price && <p className="mt-1 text-xs text-danger">{fieldError(errors.price)}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">分类</label>
            <select
              {...register('categoryId', {
                setValueAs: (v) => (v === '' ? null : Number(v)),
              })}
              className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand"
            >
              <option value="">未分类</option>
              {categories.data?.map((c) => (
                <option key={c.id} value={c.id}>{c.name['zh-CN']}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">状态</label>
            <select
              {...register('status')}
              className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand"
            >
              <option value="active">在售</option>
              <option value="inactive">下架</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">排序权重</label>
            <input
              type="number"
              {...register('sort', { valueAsNumber: true })}
              className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <label className="text-sm font-medium">图片</label>
          <ImageUploader
            value={images}
            onChange={(updater) => updateImages(updater)}
          />
        </section>

        {(create.isError || update.isError) && (
          <p className="rounded-lg bg-danger/10 px-3 py-2 text-xs text-danger">保存失败，请检查输入或稍后重试</p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting || create.isPending || update.isPending}
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-strong disabled:opacity-60"
          >
            {isSubmitting ? '保存中…' : '保存'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="rounded-lg border border-border px-5 py-2.5 text-sm text-ink-muted transition hover:bg-black/5"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  )
}
