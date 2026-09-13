'use client';

import { useState } from 'react';

import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';
import { getProducts } from '@/lib/products';

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = getProducts(product.category).filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-white rounded-sm overflow-hidden mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <span className="text-champagne-gold text-sm tracking-wider">
              {product.category === 'necklaces' && '项链'}
              {product.category === 'bracelets' && '手链'}
              {product.category === 'rings' && '戒指'}
              {product.category === 'earrings' && '耳环'}
            </span>
            <h1 className="text-3xl lg:text-4xl font-serif text-dark-gray mt-2 mb-2">
              {product.name}
            </h1>
            <p className="text-medium-gray">{product.nameEn}</p>
          </div>

          <p className="text-3xl text-champagne-gold font-medium mb-6">
            NT$ {product.price.toLocaleString()}
          </p>

          <p className="text-medium-gray leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm text-dark-gray mb-3">数量</label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-champagne-gold/30 flex items-center justify-center hover:bg-champagne-gold/5 transition-colors"
              >
                -
              </button>
              <span className="w-16 h-10 flex items-center justify-center border-t border-b border-champagne-gold/30">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 border border-champagne-gold/30 flex items-center justify-center hover:bg-champagne-gold/5 transition-colors"
              >
                +
              </button>
              <span className="ml-4 text-sm text-medium-gray">
                库存：{product.stock} 件
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex-1 py-4 bg-champagne-gold text-cream-white text-sm tracking-wider hover:bg-champagne-gold-dark transition-all duration-300 hover:shadow-lg">
              加入购物车
            </button>
            <button className="flex-1 py-4 border border-dark-gray text-dark-gray text-sm tracking-wider hover:bg-dark-gray hover:text-cream-white transition-all duration-300">
              立即購買
            </button>
          </div>

          {/* Product Details */}
          <div className="border-t border-champagne-gold/20 pt-8">
            <h3 className="text-lg font-serif text-dark-gray mb-4">商品詳情</h3>
            <ul className="space-y-2">
              {product.details.map((detail, index) => (
                <li key={index} className="flex items-start text-medium-gray">
                  <span className="text-champagne-gold mr-2">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {/* Material */}
          <div className="border-t border-champagne-gold/20 pt-6 mt-6">
            <h3 className="text-lg font-serif text-dark-gray mb-3">材质</h3>
            <p className="text-medium-gray">{product.material}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-white py-12 lg:py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-serif text-dark-gray text-center mb-12">
              相關商品
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
