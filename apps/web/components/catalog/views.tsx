import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/catalog/ProductGrid';
import ProductGallery from '@/components/catalog/ProductGallery';
import LanguageSwitcher from '@/components/catalog/LanguageSwitcher';
import {
  fetchActiveProducts,
  fetchProductById,
  pickLocalized,
} from '@/lib/api';
import { localizedHref } from '@/lib/locale';
import type { Locale } from '@infa/shared';

export const CATALOG_UI = {
  'zh-CN': {
    listTitle: '全部作品',
    empty: '暂无上架作品',
    back: '返回全部作品',
    sku: '货号',
    noImage: '暂无图片',
  },
  'zh-TW': {
    listTitle: '全部作品',
    empty: '暫無上架作品',
    back: '返回全部作品',
    sku: '貨號',
    noImage: '暫無圖片',
  },
  en: {
    listTitle: 'All Pieces',
    empty: 'No pieces available yet',
    back: 'Back to all pieces',
    sku: 'SKU',
    noImage: 'No image',
  },
} as const;

export type CatalogUi = (typeof CATALOG_UI)[Locale];

const PAGE_SIZE = 48;

/* ---------------- List ---------------- */

export async function CatalogList({ locale }: { locale: Locale }) {
  const t = CATALOG_UI[locale];
  const data = await fetchActiveProducts({ page: 1, pageSize: PAGE_SIZE });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-grow px-6 pb-24 pt-28 lg:px-8 lg:pt-32">
        <div className="flex items-start justify-between">
          <h1 className="text-xl font-medium text-dark-gray lg:text-2xl">{t.listTitle}</h1>
          <LanguageSwitcher currentLocale={locale} productId={null} />
        </div>
        <div className="mt-10">
          <ProductGrid products={data.items} locale={locale} emptyLabel={t.empty} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- Detail ---------------- */

export async function CatalogDetail({
  locale,
  productId,
}: {
  locale: Locale;
  productId: number;
}) {
  const t = CATALOG_UI[locale];
  const product = await fetchProductById(productId);
  if (!product) notFound();

  const name = pickLocalized(product.name, locale);
  const description = pickLocalized(product.description, locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-grow px-6 pb-24 pt-28 lg:px-8 lg:pt-32">
        <div className="flex items-start justify-between">
          <a
            href={localizedHref('/products', locale)}
            className="text-sm text-medium-gray transition hover:text-champagne-gold"
          >
            ← {t.back}
          </a>
          <LanguageSwitcher currentLocale={locale} productId={productId} />
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} name={name} noImageLabel={t.noImage} />
          <div>
            <h1 className="text-2xl font-medium text-dark-gray lg:text-3xl">{name}</h1>
            <p className="mt-4 text-xl text-champagne-gold-dark">
              ¥{product.price.toLocaleString('en-US')}
            </p>
            <p className="mt-6 whitespace-pre-line text-sm leading-7 text-medium-gray">
              {description}
            </p>
            <p className="mt-8 text-xs tracking-wide text-light-gray">
              {t.sku}：{product.sku}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- Metadata helpers ---------------- */

export async function catalogListMetadata(locale: Locale): Promise<Metadata> {
  return { title: `${CATALOG_UI[locale].listTitle} | INFA` };
}

export async function catalogDetailMetadata(
  locale: Locale,
  productId: number,
): Promise<Metadata> {
  const product = await fetchProductById(productId);
  if (!product) return { title: 'INFA' };
  return {
    title: `${pickLocalized(product.name, locale)} | INFA`,
    description: pickLocalized(product.description, locale).slice(0, 160),
  };
}

/** Shared id enumeration for generateStaticParams across all locale folders. */
export async function allActiveProductIds(): Promise<number[]> {
  const first = await fetchActiveProducts({ page: 1, pageSize: 1 });
  if (first.total === 0) return [];
  const all = await fetchActiveProducts({ page: 1, pageSize: first.total });
  return all.items.map((p) => p.id);
}
