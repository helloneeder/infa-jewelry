import { Link } from 'react-router-dom'
import { FolderTree, Package } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { callApi, api } from '@/lib/api'
import type { PaginatedData, Product } from '@infa/shared'
import { useCategories } from '@/lib/categories'

export default function DashboardPage() {
  const health = useQuery({
    queryKey: ['health'],
    queryFn: () =>
      callApi<{ status: string; cookieName: string }>(api.get('/health')).catch(() => null),
    retry: false,
  })
  const products = useQuery({
    queryKey: ['products', { page: 1, pageSize: 1 }],
    queryFn: () =>
      callApi<PaginatedData<Product>>(
        api.get('/products', { params: { page: 1, pageSize: 1 } }),
      ),
    retry: false,
  })
  const categories = useCategories()

  const stats = [
    {
      label: '产品总数',
      value: products.data?.total ?? '—',
      icon: Package,
      to: '/products',
    },
    {
      label: '分类总数',
      value: categories.data?.length ?? '—',
      icon: FolderTree,
      to: '/categories',
    },
  ]

  return (
    <div className="p-8">
      <h1 className="text-lg font-semibold">概览</h1>
      <p className="mt-2 text-sm text-ink-muted">
        后台服务：
        <span className={health.data ? 'text-success' : 'text-danger'}>
          {health.isLoading ? '检测中…' : health.data ? '已连接 (3001)' : '未连接（请先启动 @infa/server）'}
        </span>
      </p>

      <div className="mt-6 grid max-w-xl grid-cols-2 gap-4">
        {stats.map(({ label, value, icon: Icon, to }) => (
          <Link
            key={label}
            to={to}
            className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5 transition hover:border-brand/40"
          >
            <span className="rounded-lg bg-brand/10 p-3 text-brand-strong">
              <Icon size={20} />
            </span>
            <span>
              <span className="block text-2xl font-semibold">{value}</span>
              <span className="text-sm text-ink-muted">{label}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
