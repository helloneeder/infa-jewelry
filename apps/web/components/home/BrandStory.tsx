export default function BrandStory() {
  return (
    <section className="py-20 lg:py-28 bg-dark-gray text-cream-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=1000&fit=crop"
              alt="INFA Brand Story"
              className="w-full h-auto rounded-sm shadow-2xl"
            />
          </div>

          {/* Content */}
          <div className="lg:pl-4">
            <p className="text-champagne-gold tracking-[0.25em] text-xs mb-4">
              BRAND STORY
            </p>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-serif mb-6">
              我们的故事
            </h2>
            <div className="space-y-4 text-cream-white/80 leading-relaxed text-sm lg:text-base">
              <p>
                INFA 堅持「精致而隽永」的品牌理念，
                我们相信每个人都有屬于自己独特的光彩。
              </p>
              <p>
                成立以來，INFA 致力于打造高品质轻珠宝，
                将优雅设计融入日常穿戴，让珠宝不再是特殊场合的专属。
              </p>
              <p>
                每一件 INFA 作品都經過严格的品质把关，
                从选材到成品，堅持手工打造的温度与细节。
              </p>
            </div>
            <div className="mt-10 flex items-center gap-8 lg:gap-12">
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-serif text-champagne-gold">5+</p>
                <p className="text-xs text-cream-white/60 mt-1">年品牌歷史</p>
              </div>
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-serif text-champagne-gold">10K+</p>
                <p className="text-xs text-cream-white/60 mt-1">滿意顾客</p>
              </div>
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-serif text-champagne-gold">200+</p>
                <p className="text-xs text-cream-white/60 mt-1">独家设计</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
