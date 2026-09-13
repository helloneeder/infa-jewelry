'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-cream-white mb-4">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-dark-gray/20 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Labels */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-champagne-gold text-cream-white text-xs tracking-wider">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-3 py-1 bg-dark-gray text-cream-white text-xs tracking-wider">
              HOT
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <Link
          href={`/product/${product.id}`}
          className={`absolute bottom-4 left-4 right-4 py-3 bg-cream-white/95 backdrop-blur-sm text-dark-gray text-sm text-center tracking-wider transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          查看商品
        </Link>
      </div>

      {/* Product Info */}
      <div className="space-y-1.5">
        <p className="text-xs text-champagne-gold tracking-wider">
          {product.category === 'necklaces' && '项链'}
          {product.category === 'bracelets' && '手链'}
          {product.category === 'rings' && '戒指'}
          {product.category === 'earrings' && '耳环'}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-base lg:text-lg font-serif text-dark-gray group-hover:text-champagne-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-medium-gray line-clamp-1">{product.nameEn}</p>
        <p className="text-champagne-gold font-medium text-sm pt-1">NT$ {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}
