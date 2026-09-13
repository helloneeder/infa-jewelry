import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ShippingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-dark-gray text-cream-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl lg:text-4xl font-serif">配送資訊</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Shipping Info */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif text-dark-gray mb-8 pb-4 border-b border-champagne-gold/20">
              配送說明
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-sm shadow-sm">
                <div className="text-champagne-gold mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif text-dark-gray mb-3">運費標準</h3>
                <ul className="space-y-2 text-sm text-medium-gray">
                  <li>• 訂單滿 NT$ 2,000 享免運</li>
                  <li>• 未滿 NT$ 2,000，運費 NT$ 80</li>
                  <li>• 離島地區額外收取 NT$ 100</li>
                  <li>• 國際運費依地區計算</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-sm shadow-sm">
                <div className="text-champagne-gold mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif text-dark-gray mb-3">配送時間</h3>
                <ul className="space-y-2 text-sm text-medium-gray">
                  <li>• 訂單確認後 1-2 個工作天出貨</li>
                  <li>• 本島配送 2-3 個工作天</li>
                  <li>• 離島配送 3-5 個工作天</li>
                  <li>• 國際配送 7-14 個工作天</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Returns Policy */}
          <section id="returns" className="mb-16">
            <h2 className="text-2xl font-serif text-dark-gray mb-8 pb-4 border-b border-champagne-gold/20">
              退換貨政策
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif text-dark-gray mb-3">7 天鑑賞期</h3>
                <p className="text-medium-gray leading-relaxed">
                  我們提供 7 天商品鑑賞期，若收到商品有任何問題，
                  請於收到商品 7 天內與客服聯繫辦理退換貨。
                  鑑賞期非試用期，請保持商品全新狀態與包裝完整。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-serif text-dark-gray mb-3">退換貨條件</h3>
                <ul className="space-y-2 text-medium-gray">
                  <li>✓ 商品保持全新未使用狀態</li>
                  <li>✓ 原始包裝、標籤完整</li>
                  <li>✓ 附上購買證明</li>
                  <li>✗ 客製化商品不接受退換</li>
                  <li>✗ 已使用過的飾品</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq">
            <h2 className="text-2xl font-serif text-dark-gray mb-8 pb-4 border-b border-champagne-gold/20">
              常見問題
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: '如何追蹤我的訂單？',
                  a: '出貨後我們會發送簡訊及 Email 通知，內含物流追蹤編號，可隨時查詢配送狀態。',
                },
                {
                  q: '可以修改配送地址嗎？',
                  a: '出貨前可聯繫客服修改地址，出貨後則無法變更，請務必確認收件資料正確。',
                },
                {
                  q: '收到商品與預期不符怎麼辦？',
                  a: '請於 7 天鑑賞期內與客服聯繫，我們會盡快為您處理更換或退款。',
                },
                {
                  q: '國際配送需要關稅嗎？',
                  a: '國際訂單可能會產生關稅或其他進口費用，這些費用由買方負擔。',
                },
              ].map((item, index) => (
                <div key={index} className="p-6 bg-white rounded-sm shadow-sm">
                  <h3 className="text-lg font-serif text-dark-gray mb-2">{item.q}</h3>
                  <p className="text-medium-gray">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
