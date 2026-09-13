'use client';

import { Product } from '@/types';
import ProductCard from './ProductCard';
import { useState } from 'react';

interface ProductListProps {
  products: Product[];
  title: string;
  description?: string;
}

const sortOptions = [
  { label: '預設排序', value: 'default' },
  { label: '价格：低到高', value: 'price-asc' },
  { label: '价格：高到低', value: 'price-desc' },
  { label: '最新上架', value: 'newest' },
];

export default function ProductList({ products, title, description }: ProductListProps) {
  const [sortBy, setSortBy] = useState('default');

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-dark-gray text-cream-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-serif mb-3">{title}</h1>
          {description && (
            <p className="text-cream-white/70 max-w-2xl">{description}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-champagne-gold/20">
          <p className="text-medium-gray text-sm">
            共 <span className="text-champagne-gold font-medium">{sortedProducts.length}</span> 件商品
          </p>
          <div className="flex items-center gap-3">
            <label className="text-sm text-medium-gray">排序方式：</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-champagne-gold/30 rounded-sm px-3 py-2 text-sm bg-transparent focus:outline-none focus:border-champagne-gold"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-medium-gray">該分类尚無商品</p>
          </div>
        )}
      </div>
    </div>
  );
}
