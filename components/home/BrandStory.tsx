export default function BrandStory() {
  return (
    <section className="py-20 lg:py-28 bg-dark-gray text-cream-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=1000&fit=crop"
              alt="LUMI Brand Story"
              className="w-full h-auto rounded-sm shadow-2xl"
            />
          </div>

          {/* Content */}
          <div className="lg:pl-4">
            <p className="text-champagne-gold tracking-[0.25em] text-xs mb-4">
              BRAND STORY
            </p>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-serif mb-6">
              我們的故事
            </h2>
            <div className="space-y-4 text-cream-white/80 leading-relaxed text-sm lg:text-base">
              <p>
                LUMI 源於對光的追求，如同珠寶在光線下展現的璀璨光芒，
                我們相信每個人都有屬於自己獨特的光彩。
              </p>
              <p>
                成立於 2020 年，LUMI 致力於打造高品質輕珠寶，
                將優雅設計融入日常穿戴，讓珠寶不再是特殊場合的專屬。
              </p>
              <p>
                每一件 LUMI 作品都經過嚴格的品質把關，
                從選材到成品，堅持手工打造的溫度與細節。
              </p>
            </div>
            <div className="mt-10 flex items-center gap-8 lg:gap-12">
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-serif text-champagne-gold">5+</p>
                <p className="text-xs text-cream-white/60 mt-1">年品牌歷史</p>
              </div>
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-serif text-champagne-gold">10K+</p>
                <p className="text-xs text-cream-white/60 mt-1">滿意顧客</p>
              </div>
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-serif text-champagne-gold">200+</p>
                <p className="text-xs text-cream-white/60 mt-1">獨家設計</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
