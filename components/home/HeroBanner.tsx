'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-[70vh] min-h-[520px] max-h-[720px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop"
          alt="LUMI Jewelry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream-white/92 via-cream-white/70 to-cream-white/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`max-w-xl lg:max-w-2xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-champagne-gold tracking-[0.25em] text-xs mb-4">
            輕珠寶 · 優雅日常
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-medium text-dark-gray mb-5 leading-[1.25]">
            點亮屬於
            <br />
            <span className="text-champagne-gold">你的光芒</span>
          </h1>
          <p className="text-medium-gray text-base lg:text-lg mb-7 max-w-md leading-relaxed">
            每件 LUMI 珠寶都承載著獨特的故事，
            以精湛工藝與細緻設計，為你的日常增添優雅光采。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-champagne-gold text-cream-white text-sm tracking-wider hover:bg-champagne-gold-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              探索系列
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-dark-gray text-dark-gray text-sm tracking-wider hover:bg-dark-gray hover:text-cream-white transition-all duration-300"
            >
              品牌故事
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-dark-gray/50 text-xs tracking-wider mb-1.5">SCROLL</span>
        <svg className="w-4 h-4 text-champagne-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
