import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MaterialSection from '@/components/home/MaterialSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Page Header */}
        <div className="relative h-96">
          <img
            src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1920&h=600&fit=crop"
            alt="關於 INFA"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-gray/60 flex items-center justify-center">
            <h1 className="text-4xl lg:text-5xl font-serif text-cream-white">關於我們</h1>
          </div>
        </div>

        {/* Brand Story */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-champagne-gold tracking-[0.3em] text-sm mb-4">OUR STORY</p>
              <h2 className="text-3xl lg:text-4xl font-serif text-dark-gray">品牌故事</h2>
            </div>
            
            <div className="space-y-6 text-medium-gray leading-relaxed">
              <p>
                INFA 堅持「精緻而雋永」的品牌理念，
                我們相信每一件珠寶都應當是能夠傳承的匠心之作，
                見證生活中每個重要時刻。
              </p>
              <p>
                成立於 2020 年，INFA 致力於打造高品質輕珠寶，將優雅設計融入日常穿戴，
                讓珠寶不再是特殊場合的專屬，而是能夠每天陪伴的美好存在。
              </p>
              <p>
                每一件 INFA 作品都經過嚴格的品質把關，從選材到成品，
                堅持手工打造的溫度與細節。我們相信，真正的奢華不在於價格，
                而在於每一個細節的用心。
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-dark-gray text-cream-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-champagne-gold tracking-[0.3em] text-sm mb-4">OUR VALUES</p>
              <h2 className="text-3xl lg:text-4xl font-serif">品牌理念</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 border-2 border-champagne-gold rounded-full flex items-center justify-center">
                  <span className="text-2xl font-serif text-champagne-gold">01</span>
                </div>
                <h3 className="text-xl font-serif mb-4">優雅日常</h3>
                <p className="text-cream-white/70 text-sm leading-relaxed">
                  珠寶不應該只是珍藏，更應該是日常的一部分。
                  我們的設計輕盈舒適，適合每一天佩戴。
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 border-2 border-champagne-gold rounded-full flex items-center justify-center">
                  <span className="text-2xl font-serif text-champagne-gold">02</span>
                </div>
                <h3 className="text-xl font-serif mb-4">永續經營</h3>
                <p className="text-cream-white/70 text-sm leading-relaxed">
                  我們選用可回收材質，支持公平貿易，
                  以對環境友善的方式製作每一件珠寶。
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 border-2 border-champagne-gold rounded-full flex items-center justify-center">
                  <span className="text-2xl font-serif text-champagne-gold">03</span>
                </div>
                <h3 className="text-xl font-serif mb-4">手工溫度</h3>
                <p className="text-cream-white/70 text-sm leading-relaxed">
                  每一件作品都由資深工匠手工打造，
                  蘊含著機器無法複製的獨特溫度與細節。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Materials */}
        <section id="materials">
          <MaterialSection />
        </section>

        {/* Care Instructions */}
        <section id="care" className="py-16 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-champagne-gold tracking-[0.3em] text-sm mb-4">CARE GUIDE</p>
              <h2 className="text-3xl lg:text-4xl font-serif text-dark-gray">保養說明</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border border-champagne-gold/20 rounded-sm">
                <h3 className="text-lg font-serif text-dark-gray mb-4 flex items-center">
                  <span className="text-champagne-gold mr-2">✓</span>
                  正確保養
                </h3>
                <ul className="space-y-3 text-sm text-medium-gray">
                  <li>• 洗澡、運動時請取下飾品</li>
                  <li>• 避免接觸香水、化妝品等化學物質</li>
                  <li>• 使用軟布輕輕擦拭清潔</li>
                  <li>• 單獨存放於飾品盒中</li>
                  <li>• 定期送回原廠保養</li>
                </ul>
              </div>

              <div className="p-6 border border-champagne-gold/20 rounded-sm">
                <h3 className="text-lg font-serif text-dark-gray mb-4 flex items-center">
                  <span className="text-red-400 mr-2">✕</span>
                  請避免
                </h3>
                <ul className="space-y-3 text-sm text-medium-gray">
                  <li>• 撞擊或大力拉扯</li>
                  <li>• 用牙刷或牙膏刷洗</li>
                  <li>• 浸泡在清潔劑中</li>
                  <li>• 長時間曝曬於陽光下</li>
                  <li>• 與其他飾品摩擦堆疊</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
