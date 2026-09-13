'use client';

import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative h-[70vh] min-h-[520px] max-h-[720px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop"
          alt="INFA Jewelry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream-white/92 via-cream-white/70 to-cream-white/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-xl lg:max-w-2xl hero-fade-in">
          <p className="text-champagne-gold tracking-[0.25em] text-xs mb-4">精緻珠寶 · 永恆之美</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-deep-charcoal leading-tight mb-6">
            璀璨永恆
            <br />
            <span className="text-champagne-gold">始於匠心</span>
          </h1>
          <p className="text-lg text-warm-gray mb-8 max-w-lg leading-relaxed">
            每一件珠寶，都是時光與技藝的結晶。
            我們以匠心雕琢，只為綻放你獨一無二的光芒。
          </p>
          <div className="flex gap-4">
            <Link
              href="/products"
              className="px-8 py-3 bg-champagne-gold text-white font-medium hover:bg-gold-deep transition-colors duration-300"
            >
              探索系列
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border border-deep-charcoal text-deep-charcoal font-medium hover:bg-deep-charcoal hover:text-white transition-colors duration-300"
            >
              品牌故事
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-warm-gray">
        <span className="text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-warm-gray to-transparent" />
      </div>
    </section>
  );
}
