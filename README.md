# Lumi Jewelry - 珠宝官网

INFA 珠宝品牌官网（V1 纯展示版本）。

## 技术栈

- **框架**：Next.js 16.2.9 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS 4
- **导出模式**：纯静态导出（output: 'export'）

## 环境要求

- Node.js >= 18.17.0（Next.js 16 要求）
- npm >= 9.x

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 开发模式
npm run dev

# 3. 静态导出构建
npm run build
# 产物在 out/ 目录

# 4. 本地预览构建产物
npm start
```

开发地址：http://localhost:3000

## 页面清单（13 个页面）

| 路径 | 页面 |
|------|------|
| / | 首页 |
| /about | 关于我们 |
| /contact | 联系我们 |
| /shipping | 配送说明 |
| /cart | 购物车（Mock 展示） |
| /products | 产品列表 |
| /products/best-seller | 热销款 |
| /products/new | 新品 |
| /products/necklaces | 项链 |
| /products/rings | 戒指 |
| /products/earrings | 耳环 |
| /products/bracelets | 手链 |
| /product/[id] | 产品详情 |

## V1 边界

✅ 包含：
- 纯展示型官网
- 产品浏览（分类、详情）
- 品牌介绍、联系、配送信息
- 购物车页面（仅 UI 展示，Mock 数据）

❌ 不包含：
- 用户注册/登录
- 商品下单/支付/结算
- 后台管理系统（另排期）
- 真实库存管理

## 目录结构

```
lumi-jewelry/
├── app/                    # App Router 页面
│   ├── layout.tsx          # 全局布局
│   ├── page.tsx            # 首页
│   ├── globals.css         # 全局样式
│   ├── about/              # 关于
│   ├── contact/            # 联系
│   ├── shipping/           # 配送
│   ├── cart/               # 购物车
│   ├── products/           # 产品列表+分类
│   └── product/[id]/       # 产品详情
├── components/             # 组件
│   └── layout/             # 布局组件（Navbar, Footer）
├── lib/                    # 工具库
├── types/                  # TypeScript 类型
├── public/                 # 静态资源
├── next.config.ts          # Next.js 配置
├── tailwind.config.*       # Tailwind 配置
├── tsconfig.json
├── package.json
└── README.md
```

## 部署

### 静态托管（推荐）

本项目使用 `output: 'export'` 纯静态导出，可部署到任意静态托管平台：

- **Vercel**：`vercel deploy`
- **GitHub Pages**：上传 out/ 目录
- **阿里云 OSS + CDN**
- **Nginx**：将 out/ 作为静态站点根目录

### 注意事项

1. **basePath**：当前 next.config.ts 配置了 `basePath: '/jewelry-static'`，部署到域名根路径时需移除
2. **trailingSlash**：已开启，静态托管需兼容 trailing slash
3. **图片资源**：当前产品图片为 Unsplash 外链，上线前需替换为品牌自有图片
4. **环境变量**：纯静态导出不支持服务端环境变量，如需 API 调用需走客户端

## 后续规划

- 后台管理系统（产品管理、订单管理）
- 真实购物车 + 下单流程
- 多语言支持（中/英）
- SEO 优化
- 性能优化（图片懒加载、CDN）
