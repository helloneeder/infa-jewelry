import { z } from 'zod';

// ========== Locale ==========
export const LocaleSchema = z.enum(['zh-CN', 'zh-TW', 'en']);
export type Locale = z.infer<typeof LocaleSchema>;
export const LOCALES: Locale[] = ['zh-CN', 'zh-TW', 'en'];

// ========== Localized field (三语) ==========
export const LocalizedStringSchema = z.object({
  'zh-CN': z.string().min(1, '必填'),
  'zh-TW': z.string().min(1, '必填'),
  'en': z.string().min(1, 'Required'),
});
export type LocalizedString = z.infer<typeof LocalizedStringSchema>;

export const LocalizedTextSchema = z.object({
  'zh-CN': z.string(),
  'zh-TW': z.string(),
  'en': z.string(),
});
export type LocalizedText = z.infer<typeof LocalizedTextSchema>;

// ========== Category ==========
export const CategorySchema = z.object({
  id: z.number().int().positive(),
  name: LocalizedStringSchema,
  sort: z.number().int().default(0),
  createdAt: z.string(), // ISO date
  updatedAt: z.string(),
});
export type Category = z.infer<typeof CategorySchema>;

export const CategoryCreateSchema = z.object({
  name: LocalizedStringSchema,
  sort: z.number().int().default(0),
});
export type CategoryCreateInput = z.infer<typeof CategoryCreateSchema>;

export const CategoryUpdateSchema = CategoryCreateSchema.partial();
export type CategoryUpdateInput = z.infer<typeof CategoryUpdateSchema>;

// ========== Product ==========
export const ProductStatusSchema = z.enum(['active', 'inactive']);
export type ProductStatus = z.infer<typeof ProductStatusSchema>;

export const ProductImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  isMain: z.boolean().default(false),
});
export type ProductImage = z.infer<typeof ProductImageSchema>;

export const ProductSchema = z.object({
  id: z.number().int().positive(),
  sku: z.string(),
  name: LocalizedStringSchema,
  description: LocalizedTextSchema,
  price: z.number().positive(),
  categoryId: z.number().int().positive().nullable(),
  images: z.array(ProductImageSchema).default([]),
  status: ProductStatusSchema.default('active'),
  sort: z.number().int().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Product = z.infer<typeof ProductSchema>;

export const ProductCreateSchema = z.object({
  sku: z.string(),
  name: LocalizedStringSchema,
  description: LocalizedTextSchema,
  price: z.number().positive(),
  categoryId: z.number().int().positive().nullable().optional(),
  images: z.array(ProductImageSchema).default([]),
  status: ProductStatusSchema.default('active'),
  sort: z.number().int().default(0),
});
export type ProductCreateInput = z.infer<typeof ProductCreateSchema>;

export const ProductUpdateSchema = ProductCreateSchema.partial();
export type ProductUpdateInput = z.infer<typeof ProductUpdateSchema>;

// ========== Admin / Auth ==========
export const AdminSchema = z.object({
  id: z.number().int().positive(),
  username: z.string(),
  createdAt: z.string(),
});
export type Admin = z.infer<typeof AdminSchema>;

export const LoginRequestSchema = z.object({
  username: z.string().min(1, '请输入用户名'),
  password: z.string().min(1, '请输入密码'),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    admin: AdminSchema,
  }),
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const LogoutResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    success: z.literal(true),
  }),
});

export const MeResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    admin: AdminSchema,
  }),
});
export type MeResponse = z.infer<typeof MeResponseSchema>;

// ========== API 统一响应包 ==========
export const ApiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    ok: z.literal(true),
    data: dataSchema,
  });

export const ApiErrorSchema = z.object({
  ok: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.unknown()).optional(),
  }),
});
export type ApiError = z.infer<typeof ApiErrorSchema>;

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.union([ApiSuccessSchema(dataSchema), ApiErrorSchema]);

// ========== 分页 ==========
export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

export const PaginatedDataSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    pageSize: z.number().int().positive(),
    totalPages: z.number().int().nonnegative(),
  });
export type PaginatedData<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

// ========== Product list query ==========
export const ProductListQuerySchema = PaginationQuerySchema.extend({
  categoryId: z.coerce.number().int().optional(),
  status: ProductStatusSchema.optional(),
  keyword: z.string().optional(),
  sortBy: z.enum(['createdAt', 'price', 'sort']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});
export type ProductListQuery = z.infer<typeof ProductListQuerySchema>;

// ========== Cookie 常量 ==========
export const ADMIN_COOKIE_NAME = 'infa_admin_token';
