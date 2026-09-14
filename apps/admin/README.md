# @infa/admin

INFA 珠宝官网 V2 管理后台 —— 独立静态 SPA，生产环境由 `@infa/server` 反代托管，运行时与官网进程隔离。

## 技术栈

- Vite 6 + React 19.2 + TypeScript（strict，继承根 `tsconfig.base.json`）
- Tailwind CSS v4（`@tailwindcss/vite`，无 postcss 配置）
- react-router-dom v7、@tanstack/react-query v5
- react-hook-form v7 + zod v3（`@hookform/resolvers`）
- axios（cookie 凭证会话）、lucide-react

## 约定

- 路径别名 `@/* -> src/*`
- 会话走 httpOnly + sameSite=lax cookie `infa_admin_token`；浏览器自动携带，前端不读取、不存储 token
- axios 统一 `withCredentials`；401 自动带 `next` 回登录页
- 统一响应包 `{ ok, data } | { ok:false, error:{code,message,details?} }`，`callApi` 解包
- 类型与校验全部复用 `@infa/shared`（zod 单一事实源），不本地重复定义

## 已实现

- 登录 / 登出、`RequireAuth` 路由守卫
- `AdminLayout` 侧边导航 + 顶栏
- 概览（服务连接状态、产品/分类计数）
- 产品列表：分页、关键字、状态过滤、在售/下架切换、删除
- 产品编辑/新增：三语名称与描述（Tab 切换）、价格、分类、状态、排序
- 分类管理：三语名称的增删改（弹窗）
- `LocalizedField` 三语录入组件（供其他模块复用）

## 待办（M5 后续）

- 图片上传接 `POST /api/upload` + 图片组管理（当前留占位）
- 服务文章、网站设置、图片素材页落地（现为占位）
- "发布到官网"按钮（触发 web 重建）
- 路由级代码分割（当前首包约 164KB gzip，偏大）

## 命令

```bash
pnpm install
pnpm dev      # http://localhost:5173，/api 代理到 http://127.0.0.1:3001
pnpm build    # tsc -b && vite build
pnpm lint
```

> 注：本仓库开发沙箱内第三方 N-API 原生模块（better-sqlite3）会段错误，真机 Node 22 正常；admin 纯前端不依赖该模块，可独立 dev/build。
