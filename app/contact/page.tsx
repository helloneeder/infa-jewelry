'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('感謝您的來信，我們會盡快與您聯繫！');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-dark-gray text-cream-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl lg:text-4xl font-serif">聯絡我們</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-serif text-dark-gray mb-8">與我們聯繫</h2>
              <p className="text-medium-gray leading-relaxed mb-8">
                有任何問題或建議，歡迎隨時與我們聯繫。
                客服人員將於 1-2 個工作天內回覆您。
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-champagne-gold mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-dark-gray mb-1">門市資訊</h3>
                    <p className="text-sm text-medium-gray">台北市大安區復興南路一段 100 號</p>
                    <p className="text-sm text-medium-gray">捷運大安站 2 號出口步行 3 分鐘</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-champagne-gold mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-dark-gray mb-1">營業時間</h3>
                    <p className="text-sm text-medium-gray">星期一至星期六 11:00 - 20:00</p>
                    <p className="text-sm text-medium-gray">星期日 12:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-champagne-gold mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-dark-gray mb-1">客服信箱</h3>
                    <p className="text-sm text-medium-gray">service@lumi-jewelry.com</p>
                    <p className="text-sm text-medium-gray">24 小時內回覆</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-champagne-gold mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-dark-gray mb-1">客服電話</h3>
                    <p className="text-sm text-medium-gray">02-2712-1234</p>
                    <p className="text-sm text-medium-gray">服務時間 10:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-dark-gray mb-2">
                      姓名 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-champagne-gold/30 rounded-sm focus:outline-none focus:border-champagne-gold bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-dark-gray mb-2">
                      電子郵件 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-champagne-gold/30 rounded-sm focus:outline-none focus:border-champagne-gold bg-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-dark-gray mb-2">聯絡電話</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-champagne-gold/30 rounded-sm focus:outline-none focus:border-champagne-gold bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-dark-gray mb-2">
                      主旨 <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-champagne-gold/30 rounded-sm focus:outline-none focus:border-champagne-gold bg-transparent"
                    >
                      <option value="">請選擇</option>
                      <option value="product">商品諮詢</option>
                      <option value="order">訂單問題</option>
                      <option value="return">退換貨</option>
                      <option value="other">其他</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-dark-gray mb-2">
                    訊息內容 <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-champagne-gold/30 rounded-sm focus:outline-none focus:border-champagne-gold bg-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-champagne-gold text-cream-white text-sm tracking-wider hover:bg-champagne-gold-dark transition-all duration-300 hover:shadow-lg"
                >
                  寄出訊息
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
