import Link from 'next/link';
import type { Product, Locale } from '@infa/shared';

import { pickLocalized } from '@/lib/api';
import { localizedHref } from '@/lib/locale';

interface ProductCardProps {
  product: Product;
  locale: Locale;
}

function formatPrice(price: number, locale: Locale): string {
  // All three markets price in CNY for MVP; keep the formatter centralized so a
  // future currency switch only touches this helper.
  const symbol = locale === 'en' ? '¥' : '¥';
  return `${symbol}${price.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const name = pickLocalized(product.name, locale);
  const main = product.images.find((i) => i.isMain) ?? product.images[0];

  return (
    <Link
      href={localizedHref(`/products/${product.id}`, locale)}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
        {main ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={main.url}
            alt={main.alt || name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-light-gray">
            {locale === 'en' ? 'No image' : '暂无图片'}
          </div>
        )}
      </div>
      <h3 className="mt-3 truncate text-sm font-medium text-dark-gray transition-colors group-hover:text-champagne-gold">
        {name}
      </h3>
      <p className="mt-1 text-sm text-medium-gray">{formatPrice(product.price, locale)}</p>
    </Link>
  );
}
