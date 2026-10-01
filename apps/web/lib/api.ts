import type {
  Product,
  Category,
  PaginatedData,
  Locale,
} from '@infa/shared';

/**
 * Build-time data access (SSG). Runs only on the server during `next build`;
 * the base URL comes from SERVER_URL and is never exposed to the browser bundle.
 */
const SERVER_URL = process.env.SERVER_URL ?? 'http://localhost:3001';

/**
 * Static-build snapshot: use the default cached fetch so routes prerender at
 * build time. Content freshness comes from the Vercel Deploy Hook (a product
 * change triggers a brand-new build), not from per-request revalidation.
 * SERVER_URL itself is server-only and never shipped to the client.
 */

async function getJson<T>(path: string): Promise<T> {
  const url = `${SERVER_URL}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status}`);
  }
  const body = (await res.json()) as { ok: true; data: T } | { ok: false };
  if (!body.ok) {
    throw new Error(`API error for ${path}`);
  }
  return body.data;
}

interface ProductListParams {
  page?: number;
  pageSize?: number;
  categoryId?: number;
  status?: 'active' | 'inactive';
  keyword?: string;
}

function queryString(params: ProductListParams): string {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) sp.set(k, String(v));
  });
  const s = sp.toString();
  return s ? `?${s}` : '';
}

/** Only active products are public on the storefront. */
export async function fetchActiveProducts(
  params: ProductListParams = {},
): Promise<PaginatedData<Product>> {
  return getJson<PaginatedData<Product>>(
    `/api/products${queryString({ ...params, status: 'active' })}`,
  );
}

export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const product = await getJson<Product>(`/api/products/${id}`);
    // Never render an inactive product on the public site.
    return product.status === 'active' ? product : null;
  } catch {
    return null;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  return getJson<Category[]>(`/api/categories`);
}

/** Pick a localized field with fallback chain: requested → zh-CN → first non-empty. */
export function pickLocalized(
  field: Record<Locale, string>,
  locale: Locale,
): string {
  if (field[locale]) return field[locale];
  if (field['zh-CN']) return field['zh-CN'];
  return field['zh-TW'] || field.en || '';
}
