# Infa Jewelry V2 (Monorepo)

INFA 轻珠宝官网 V2，monorepo 架构：前台静态站 + 后台管理 + 后端 API。

## 架构

```
apps/
  web/        # 前台 Next.js 静态站 (port 3000)
  admin/      # 后台 React SPA (port 5173)
  server/     # 后端 Express API (port 3001)
packages/
  shared/     # 共用类型 + zod schema (@infa/shared)
```

## 技术栈

- **包管理**: pnpm workspace
- **语言**: TypeScript strict
- **前台**: Next.js 16 + React 19 + Tailwind 4
- **后台**: Vite + React 19 + Tailwind 4 + shadcn/ui + TanStack Query + RHF
- **后端**: Express 5 + better-sqlite3 + JWT (httpOnly cookie)
- **共享**: zod 单一事实源，类型全从 schema 推导 (z.infer)

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动后台开发（server + admin，常用）
pnpm dev

# 启动全部（web + admin + server）
pnpm dev:all

# 单独启动
pnpm dev:web      # 前台 3000
pnpm dev:admin    # 后台 5173
pnpm dev:server   # 后端 3001
```

### 后端初始化

首次启动前，复制环境变量：
```bash
cp apps/server/.env.example apps/server/.env
```

默认管理员账号：`admin` / `admin123456`
（通过 `ADMIN_USERNAME` / `ADMIN_PASSWORD` 环境变量修改）

### 后台访问

- 后台地址: http://localhost:5173
- 前端通过 Vite proxy 转发 `/api` 到 `http://localhost:3001`
- 登录会话走 httpOnly cookie (`infa_admin_token`)，前端不读 token

## 端口约定

| 服务   | 端口 |
|--------|------|
| web    | 3000 |
| admin  | 5173 |
| server | 3001 |

## API 概览

所有接口统一返回格式：
```ts
{ ok: true, data: T } | { ok: false, error: { code, message, details? } }
```

### Auth
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/auth/login` | 登录（写 cookie） |
| POST | `/api/auth/logout` | 登出（清 cookie） |
| GET | `/api/auth/me` | 当前登录信息 |

### Products
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/products` | 分页列表（支持 keyword/categoryId/status 筛选） |
| GET | `/api/products/:id` | 详情 |
| POST | `/api/products` | 新建 |
| PUT | `/api/products/:id` | 更新 |
| DELETE | `/api/products/:id` | 删除 |
| PATCH | `/api/products/:id/toggle` | 切换上下架 |

### Categories
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/categories` | 全部分类 |
| POST | `/api/categories` | 新建 |
| PUT | `/api/categories/:id` | 更新 |
| DELETE | `/api/categories/:id` | 删除 |

### 其他
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |

## 数据模型（核心）

所有 schema 在 `packages/shared/src/schema.ts`，用 zod 定义，类型自动推导。

- **Product**: 三语名称/描述、价格、分类、图片、状态、排序
- **Category**: 三语名称、排序
- **Admin**: 用户名、密码哈希

三语字段结构：
```ts
{
  'zh-CN': string,
  'zh-TW': string,
  'en': string,
}
```

## 部署

### 前台 (Vercel)
- 从 `apps/web` 目录部署
- Framework: Next.js
- 构建时从 server API 拉取产品数据（待实现）

### 后端 + 后台
- Node 22+
- SQLite 数据库文件需持久化存储
- 后台静态文件由 server 托管，或单独部署
- 生产环境务必设置强 `JWT_SECRET`

## 分工

- 小问：后端 API / 数据库 / 鉴权 / 部署配置
- 小前：后台 UI / 前后台联调 / i18n
