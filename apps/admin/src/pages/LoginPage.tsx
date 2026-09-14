import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LoginRequestSchema, type LoginRequest } from '@infa/shared'

import { useLogin } from '@/lib/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const login = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({ resolver: zodResolver(LoginRequestSchema) })

  const onSubmit = handleSubmit(async (values) => {
    await login.mutateAsync(values)
    const next = params.get('next') ?? '/'
    navigate(next.startsWith('/') ? next : '/', { replace: true })
  })

  return (
    <div className="flex min-h-full items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-sm"
      >
        <h1 className="text-xl font-semibold tracking-wide">INFA 管理后台</h1>
        <p className="mt-1 text-sm text-ink-muted">请登录后管理产品与网站内容</p>

        <label className="mt-6 block text-sm font-medium">用户名</label>
        <input
          {...register('username')}
          autoComplete="username"
          className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        {errors.username && <p className="mt-1 text-xs text-danger">{errors.username.message}</p>}

        <label className="mt-4 block text-sm font-medium">密码</label>
        <input
          {...register('password')}
          type="password"
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        {errors.password && <p className="mt-1 text-xs text-danger">{errors.password.message}</p>}

        {login.isError && (
          <p className="mt-4 rounded-lg bg-danger/10 px-3 py-2 text-xs text-danger">
            登录失败，请检查用户名和密码
          </p>
        )}

        <button
          type="submit"
          disabled={login.isPending}
          className="mt-6 w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-strong disabled:opacity-60"
        >
          {login.isPending ? '登录中…' : '登录'}
        </button>
      </form>
    </div>
  )
}
