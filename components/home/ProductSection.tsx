import Link from 'next/link';
import ProductCard from '../product/ProductCard';
import { Product } from '@/types';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
}

export default function ProductSection({
  title,
  subtitle,
  products,
  viewAllHref,
}: ProductSectionProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-serif text-dark-gray mb-3">{title}</h2>
          {subtitle && (
            <p className="text-medium-gray text-sm max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        {viewAllHref && (
          <div className="text-center mt-14 lg:mt-16">
            <Link
              href={viewAllHref}
              className="inline-flex items-center px-7 py-3 border border-champagne-gold text-champagne-gold text-sm tracking-wider hover:bg-champagne-gold hover:text-cream-white transition-all duration-300"
            >
              查看全部
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
