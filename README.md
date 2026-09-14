# Infa Jewelry V2 (Monorepo)

INFA 轻珠宝官网 V2，monorepo 架构。

## 架构

```
apps/
  web/        # 前台 Next.js 静态站 (port 3000)
  server/     # 后端 Express API (port 3001)
  admin/      # 后台 React SPA (port 5173) — 待迁入
packages/
  shared/     # 共用类型 + zod schema (@infa/shared)
```

## 技术栈

- **包管理**: pnpm workspace
- **语言**: TypeScript strict
- **前台**: Next.js 16 + React 19 + Tailwind 4
- **后台**: Vite + React 19 + Tailwind 4 + shadcn/ui
- **后端**: Express 5 + better-sqlite3 + JWT (httpOnly cookie)
- **共享**: zod 单一事实源，类型全从 schema 推导

## 开发

```bash
# 安装依赖
pnpm install

# 全量启动
pnpm dev

# 单独启动
pnpm dev:web      # 前台 3000
pnpm dev:server   # 后端 3001
```

### 后端

- API 前缀: `/api`
- 健康检查: `GET /api/health`
- 鉴权: 登录后设置 httpOnly cookie `infa_admin_token`
- 默认账号: admin / admin123456（通过环境变量修改）

### 共享包

```ts
import { ProductSchema, LoginRequestSchema, ADMIN_COOKIE_NAME } from '@infa/shared';
```

## 端口约定

| 服务   | 端口 |
|--------|------|
| web    | 3000 |
| server | 3001 |
| admin  | 5173 |
