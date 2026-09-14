import {
  FolderTree,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Package,
  Settings,
  UploadCloud,
} from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { cn } from '@/lib/cn'
import { useLogout, useMe } from '@/lib/auth'

const NAV = [
  { to: '/', label: '概览', icon: LayoutDashboard, end: true },
  { to: '/products', label: '产品管理', icon: Package },
  { to: '/categories', label: '分类管理', icon: FolderTree },
  { to: '/articles', label: '服务文章', icon: Newspaper },
  { to: '/media', label: '图片素材', icon: UploadCloud },
  { to: '/settings', label: '网站设置', icon: Settings },
]

export default function AdminLayout() {
  const { data: me } = useMe()
  const logout = useLogout()
  const navigate = useNavigate()

  const onLogout = async () => {
    await logout.mutateAsync().catch(() => undefined)
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex h-full">
      <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface">
        <div className="px-5 py-5">
          <span className="text-base font-semibold tracking-[0.2em]">INFA</span>
          <span className="ml-2 text-xs text-ink-muted">管理后台</span>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition',
                  isActive
                    ? 'bg-brand/10 font-medium text-brand-strong'
                    : 'text-ink-muted hover:bg-black/5 hover:text-ink',
                )
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-border p-3">
          <div className="truncate px-2 py-1 text-xs text-ink-muted">{me?.username}</div>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-muted transition hover:bg-black/5 hover:text-danger"
          >
            <LogOut size={16} />
            退出登录
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
