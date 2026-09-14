/**
 * M5 后半段 schema 草案（提案，非已定稿）
 * ------------------------------------------------------------
 * 供 @infa/server 对着实现、@infa/admin 对着开发。风格对齐
 * packages/shared/src/schema.ts（zod v3、统一 { ok,data } 信封、分页复用
 * PaginationQuery / PaginatedData）。
 *
 * 约定（请小问确认）：
 * 1) 路由前缀沿用现状——当前代码是 /api/products、/api/categories（无 /admin），
 *    写操作在 router 内用 authenticateToken 保护。新增建议同样挂 /api/<resource>。
 *    （方案文档曾写 /api/admin/*，与代码不一致，建议以代码为准。）
 * 2) 三语字段语义与现有一致：标题用 LocalizedString（三语都必填），
 *    正文/描述用 LocalizedText（可空）。
 * 3) 图片衔接现有 ProductImageSchema { url, alt?, isMain }。
 *
 * 已定稿决策（2026-09-14 小问拍板）：
 * - P1 存储：先落服务器本地 uploads/ 目录，URL 走 /media/<file> 静态托管；
 *   后期上对象存储时抽一层 StorageService（put/get/delete/url），接口与 schema 不变。
 * - MediaAsset 同时保留 filename（服务端重命名后的存储键）与 originalName
 *   （用户上传时的原始文件名，后台展示用）。
 * - 路由统一 /api/<resource>（无 /admin 前缀），写操作靠 authenticateToken 保护。
 * - 文章状态复用 active/inactive；富文本边界消毒；publish 60s 防抖 + 单构建。
 *
 * 优先级：P1 上传/媒体 > P2 settings > P3 articles > P4 publish。
 * 确认后拆进 packages/shared/src/schema.ts（或按域分文件再由 index 导出）。
 */

import { z } from 'zod';

/* 本提案内自洽的三语原语；合入 schema.ts 时直接换成同名既有导出即可 */
const LocalizedString = z.object({
  'zh-CN': z.string().min(1, '必填'),
  'zh-TW': z.string().min(1, '必填'),
  en: z.string().min(1, 'Required'),
});
const LocalizedText = z.object({
  'zh-CN': z.string(),
  'zh-TW': z.string(),
  en: z.string(),
});

/* ============================================================
 * P1 · 图片上传 + 媒体管理
 * ============================================================ */

export const MediaMimeSchema = z.enum([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
]);
export type MediaMime = z.infer<typeof MediaMimeSchema>;

/**
 * 资源 URL：允许站内相对路径（本地存储期为 /media/<file>，前端经代理/反代访问）
 * 或绝对 http(s) URL（后期对象存储/CDN）。StorageService 返回什么就存什么。
 * 安全：明确拒绝 javascript:/data: 等伪协议，避免富文本/属性位 XSS。
 */
export const AssetUrlSchema = z.union([
  z.string().url().refine((u) => /^https?:\/\//i.test(u), '只允许 http/https'),
  // 站内绝对路径：单 / 开头（禁止 // 协议相对路径）、无协议字符
  z
    .string()
    .regex(/^\/(?!\/)[A-Za-z0-9._~%!$&'()*+,;=@/-]+$/, '必须是单个 / 开头的站内路径')
    .refine((u) => !u.includes(':'), '路径不能包含协议字符'),
]);

/** 媒体库文件（落本地 uploads/，URL 走 /media/<file>；未来可换对象存储） */
export const MediaAssetSchema = z.object({
  id: z.number().int().positive(),
  url: AssetUrlSchema, // /media/<stored-name>（本地）或 CDN URL（对象存储）
  // 服务端重命名后的存储键（同时是物理文件名，禁止用客户端原名直接落盘）
  filename: z.string(),
  // 用户上传时的原始文件名，仅后台展示用，不当存储键、不参与路径拼接
  originalName: z.string(),
  mimeType: MediaMimeSchema, // 服务端魔数探测，不信客户端 MIME
  size: z.number().int().nonnegative(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  alt: z.string().optional(),
  createdAt: z.string(),
});
export type MediaAsset = z.infer<typeof MediaAssetSchema>;

/** POST /api/upload —— multipart/form-data，字段名 file（单张） */
export const UploadResponseSchema = z.object({
  ok: z.literal(true),
  data: MediaAssetSchema,
});
export type UploadResponse = z.infer<typeof UploadResponseSchema>;

/** POST /api/upload/many —— 字段名 files[]；整体成功或整体 400，不留孤儿文件 */
export const UploadManyResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({ assets: z.array(MediaAssetSchema) }),
});

export const MediaListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(24),
  keyword: z.string().optional(),
  mimeType: MediaMimeSchema.optional(),
});
export type MediaListQuery = z.infer<typeof MediaListQuerySchema>;

/** GET /api/media —— 复用 PaginatedDataSchema(MediaAssetSchema) */
export const MediaListDataSchema = z.object({
  items: z.array(MediaAssetSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
});
export type MediaListData = z.infer<typeof MediaListDataSchema>;

/** PUT /api/media/:id —— 只允许改 alt；url/文件不可变 */
export const MediaUpdateSchema = z.object({ alt: z.string().max(200) });
export type MediaUpdateInput = z.infer<typeof MediaUpdateSchema>;

/** DELETE /api/media/:id —— 已拍板：确认无产品引用后，物理文件与 DB 记录一起清 */
export const MediaDeleteResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({ success: z.literal(true) }),
});

/** 上传硬约束（服务端校验，前端做同值前置提示） */
export const UPLOAD_LIMITS = {
  maxBytes: 5 * 1024 * 1024,
  allowMime: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const,
} as const;

/*
 * 存储抽象（已定）：实现一个 StorageService，本地期把文件写到 uploads/ 并
 * 由 Express 静态托管在 /media/<file>；迁对象存储时只换这一层的 put/remove/url，
 * 路由返回的 MediaAsset 形态保持不变。DB 记录与物理文件同生命周期：
 * 上传成功才建记录；删除时先校验无产品引用，再删文件 + 删记录（失败要回滚/补偿）。
 */

/* ============================================================
 * P2 · 站点设置 settings
 * ============================================================ */

export const EnabledLocaleSchema = z.enum(['zh-CN', 'zh-TW', 'en']);

const SiteSettingsObjectSchema = z.object({
  siteName: LocalizedString,
  defaultLanguage: EnabledLocaleSchema.default('zh-CN'),
  enabledLanguages: z.array(EnabledLocaleSchema).min(1),
  contactEmail: z.union([z.string().email(), z.literal('')]).optional(),
  contactPhone: z.string().max(40).optional(),
  socials: z
    .array(z.object({ label: z.string().max(40), url: z.string().url() }))
    .default([]),
});

/** 完整读取/落库时用（带交叉校验：默认语言必须已启用） */
export const SiteSettingsSchema = SiteSettingsObjectSchema.refine(
  (s) => s.enabledLanguages.includes(s.defaultLanguage),
  { message: '默认语言必须在已启用语言内', path: ['defaultLanguage'] },
);
export type SiteSettings = z.infer<typeof SiteSettingsSchema>;

/**
 * GET /api/settings（公开，构建期 SSG 也取它）；PUT /api/settings（需登录）。
 * 更新用对象本体的 partial（不含交叉校验）；服务端合并存量配置后，
 * 再用 SiteSettingsSchema.parse 跑一次完整校验，确保 defaultLanguage∈enabled。
 */
export const SettingsUpdateSchema = SiteSettingsObjectSchema.partial();
export type SettingsUpdateInput = z.infer<typeof SettingsUpdateSchema>;

/* ============================================================
 * P3 · 服务文章 articles（售后 / 保养 / 购买须知）
 * ============================================================ */

export const ArticleTypeSchema = z.enum([
  'after-sales',
  'care-guide',
  'buying-guide',
]);
export type ArticleType = z.infer<typeof ArticleTypeSchema>;

/** 发布状态复用 active/inactive，避免再引入 published/draft */
export const ArticleStatusSchema = z.enum(['active', 'inactive']);
export type ArticleStatus = z.infer<typeof ArticleStatusSchema>;

export const ArticleSchema = z.object({
  id: z.number().int().positive(),
  type: ArticleTypeSchema,
  title: LocalizedString,
  body: LocalizedText, // HTML 富文本，边界统一消毒
  status: ArticleStatusSchema.default('active'),
  sort: z.number().int().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Article = z.infer<typeof ArticleSchema>;

export const ArticleCreateSchema = z.object({
  type: ArticleTypeSchema,
  title: LocalizedString,
  body: LocalizedText,
  status: ArticleStatusSchema.default('active'),
  sort: z.number().int().default(0),
});
export type ArticleCreateInput = z.infer<typeof ArticleCreateSchema>;

export const ArticleUpdateSchema = ArticleCreateSchema.partial();
export type ArticleUpdateInput = z.infer<typeof ArticleUpdateSchema>;

/** GET /api/articles?page=&pageSize=&type=&status= —— PaginatedData(Article) */
export const ArticleListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  type: ArticleTypeSchema.optional(),
  status: ArticleStatusSchema.optional(),
});
export type ArticleListQuery = z.infer<typeof ArticleListQuerySchema>;

/*
 * 富文本安全：schema 只约束 string；存储前服务端 sanitize（白名单标签、
 * 去 script/on* 属性/javascript: 链接），前台渲染再消毒一次（DOMPurify）。
 */

/* ============================================================
 * P4 · 发布 publish（触发 web SSG 重建）
 * ============================================================ */

export const PublishRequestSchema = z.object({
  note: z.string().max(200).optional(), // 写审计日志用
});
export type PublishRequest = z.infer<typeof PublishRequestSchema>;

/** POST /api/publish（需登录）—— 调 Vercel Deploy Hook，防抖 + 串行 */
export const PublishResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    triggered: z.boolean(), // 已触发=true；防抖窗口内合并=false
    deploymentId: z.string().optional(),
    status: z.enum(['queued', 'building', 'done', 'unknown']).default('queued'),
  }),
});
export type PublishResponse = z.infer<typeof PublishResponseSchema>;

/** GET /api/publish/latest —— 后台轮询最近一次发布状态 */
export const PublishStatusSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    deploymentId: z.string().optional(),
    status: z.enum(['building', 'done', 'error', 'idle']),
    triggeredAt: z.string().optional(),
    finishedAt: z.string().optional(),
  }),
});
export type PublishStatus = z.infer<typeof PublishStatusSchema>;

/*
 * 落地建议（非 schema）：
 * - Deploy Hook URL 走环境变量 VERCEL_DEPLOY_HOOK，不入库、不回传前端；
 * - 防抖（如 60s 内多次点击合并一次），同一时刻只允许一个构建；
 * - 写 audit_log：谁在何时发布、关联哪些变更。
 */
