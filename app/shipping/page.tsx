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
            <h1 className="text-3xl lg:text-4xl font-serif">配送信息</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Shipping Info */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif text-dark-gray mb-8 pb-4 border-b border-champagne-gold/20">
              配送说明
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-sm shadow-sm">
                <div className="text-champagne-gold mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif text-dark-gray mb-3">运费標準</h3>
                <ul className="space-y-2 text-sm text-medium-gray">
                  <li>• 订单滿 NT$ 2,000 享包邮</li>
                  <li>• 未滿 NT$ 2,000，运费 NT$ 80</li>
                  <li>• 離島地区額外收取 NT$ 100</li>
                  <li>• 国际运费依地区计算</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-sm shadow-sm">
                <div className="text-champagne-gold mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif text-dark-gray mb-3">配送时间</h3>
                <ul className="space-y-2 text-sm text-medium-gray">
                  <li>• 订单确认后 1-2 个个工作日发货</li>
                  <li>• 本島配送 2-3 个个工作日</li>
                  <li>• 離島配送 3-5 个个工作日</li>
                  <li>• 国际配送 7-14 个个工作日</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Returns Policy */}
          <section id="returns" className="mb-16">
            <h2 className="text-2xl font-serif text-dark-gray mb-8 pb-4 border-b border-champagne-gold/20">
              退换货政策
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif text-dark-gray mb-3">7 天鑑賞期</h3>
                <p className="text-medium-gray leading-relaxed">
                  我们提供 7 天商品鑑賞期，若收到商品有任何问题，
                  請于收到商品 7 天內与客服联系辦理退换货。
                  鑑賞期非試用期，請保持商品全新狀態与包装完整。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-serif text-dark-gray mb-3">退换货條件</h3>
                <ul className="space-y-2 text-medium-gray">
                  <li>✓ 商品保持全新未使用狀態</li>
                  <li>✓ 原始包装、标签完整</li>
                  <li>✓ 附上購買證明</li>
                  <li>✗ 定制化商品不接受退換</li>
                  <li>✗ 已使用過的饰品</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq">
            <h2 className="text-2xl font-serif text-dark-gray mb-8 pb-4 border-b border-champagne-gold/20">
              常见问题
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: '如何追踪我的订单？',
                  a: '发货后我们會發送簡訊及 Email 通知，內含物流追踪編号，可隨時查詢配送狀態。',
                },
                {
                  q: '可以修改配送地址嗎？',
                  a: '发货前可联系客服修改地址，发货后則無法變更，請務必确认收件资料正確。',
                },
                {
                  q: '收到商品与預期不符怎么辦？',
                  a: '請于 7 天鑑賞期內与客服联系，我们會盡快为您處理更換或退款。',
                },
                {
                  q: '国际配送需要關稅嗎？',
                  a: '国际订单可能會產生關稅或其他进口費用，这些費用由買方負擔。',
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
