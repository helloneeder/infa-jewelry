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
    alert('感谢您的来信，我们會盡快与您联系！');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-dark-gray text-cream-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl lg:text-4xl font-serif">联系我们</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-serif text-dark-gray mb-8">与我们联系</h2>
              <p className="text-medium-gray leading-relaxed mb-8">
                有任何问题或建議，歡迎隨時与我们联系。
                客服人員将于 1-2 个工作日内回复您。
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
                    <h3 className="font-medium text-dark-gray mb-1">门店信息</h3>
                    <p className="text-sm text-medium-gray">台北市大安區復興南路一段 100 号</p>
                    <p className="text-sm text-medium-gray">地铁大安站 2 号出口步行 3 分钟</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-champagne-gold mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-dark-gray mb-1">营业时间</h3>
                    <p className="text-sm text-medium-gray">星期一至星期六 11:00 - 20:00</p>
                    <p className="text-sm text-medium-gray">星期日 12:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-champagne-gold mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-dark-gray mb-1">客服电话</h3>
                    <p className="text-sm text-medium-gray">02-2712-1234</p>
                    <p className="text-sm text-medium-gray">服务時間 10:00 - 18:00</p>
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
                      電子邮件 <span className="text-red-400">*</span>
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
                    <label className="block text-sm text-dark-gray mb-2">联系电话</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-champagne-gold/30 rounded-sm focus:outline-none focus:border-champagne-gold bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-dark-gray mb-2">
                      主题 <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-champagne-gold/30 rounded-sm focus:outline-none focus:border-champagne-gold bg-transparent"
                    >
                      <option value="">请选择</option>
                      <option value="product">商品咨询</option>
                      <option value="order">订单问题</option>
                      <option value="return">退换货</option>
                      <option value="other">其他</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-dark-gray mb-2">
                    消息内容 <span className="text-red-400">*</span>
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
                  寄出消息
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
