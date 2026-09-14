import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useMe } from '@/lib/auth'

export function RequireAuth() {
  const { data: me, isLoading } = useMe()
  const location = useLocation()

  if (isLoading) {
    return <div className="p-8 text-sm text-ink-muted">加载中…</div>
  }
  if (!me) {
    const next = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?next=${next}`} replace />
  }
  return <Outlet />
}
