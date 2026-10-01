import type { Product, Locale } from '@infa/shared';

import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  locale: Locale;
  emptyLabel: string;
}

export default function ProductGrid({ products, locale, emptyLabel }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-champagne-gold/20 bg-white/50 py-20 text-center text-sm text-light-gray">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} locale={locale} />
      ))}
    </div>
  );
}
