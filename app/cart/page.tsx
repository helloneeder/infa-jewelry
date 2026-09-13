'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock cart items
const initialCartItems = [
  {
    id: '1',
    name: '星光璀璨项链',
    nameEn: 'Stellar Glow Necklace',
    price: 2680,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
    quantity: 1,
  },
  {
    id: '2',
    name: '月光珍珠手链',
    nameEn: 'Moonlight Pearl Bracelet',
    price: 1980,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f3432e2?w=300&h=300&fit=crop',
    quantity: 2,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 2000 ? 0 : 80;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-dark-gray text-cream-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl lg:text-4xl font-serif">购物车</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-6 p-6 bg-white rounded-sm shadow-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-sm"
                      />
                      <div className="flex-grow">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="text-lg font-serif text-dark-gray hover:text-champagne-gold transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-medium-gray mb-4">{item.nameEn}</p>
                        <p className="text-champagne-gold font-medium">
                          NT$ {item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-medium-gray hover:text-red-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 border border-champagne-gold/30 flex items-center justify-center hover:bg-champagne-gold/5 transition-colors text-sm"
                          >
                            -
                          </button>
                          <span className="w-12 h-8 flex items-center justify-center border-t border-b border-champagne-gold/30 text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 border border-champagne-gold/30 flex items-center justify-center hover:bg-champagne-gold/5 transition-colors text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="mt-8">
                  <Link
                    href="/products"
                    className="inline-flex items-center text-champagne-gold hover:text-champagne-gold-dark transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    继续购物
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-sm shadow-sm sticky top-24">
                  <h2 className="text-xl font-serif text-dark-gray mb-6">订单摘要</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-medium-gray">
                      <span>小计</span>
                      <span>NT$ {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-medium-gray">
                      <span>运费</span>
                      <span>{shipping === 0 ? '包邮' : `NT$ ${shipping}`}</span>
                    </div>
                    {subtotal < 2000 && (
                      <p className="text-xs text-champagne-gold">
                        再購 NT$ {(2000 - subtotal).toLocaleString()} 即可享包邮优惠
                      </p>
                    )}
                  </div>

                  <div className="border-t border-champagne-gold/20 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-dark-gray">总计</span>
                      <span className="text-2xl font-serif text-champagne-gold">
                        NT$ {total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-champagne-gold text-cream-white text-sm tracking-wider hover:bg-champagne-gold-dark transition-all duration-300 hover:shadow-lg mb-4">
                    前往结账
                  </button>

                  <div className="text-xs text-medium-gray text-center space-y-2">
                    <p>✓ 7 天鑑賞期</p>
                    <p>✓ 滿 NT$ 2,000 享包邮</p>
                    <p>✓ 精美品牌包装</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty Cart */
            <div className="text-center py-16">
              <svg className="w-24 h-24 text-champagne-gold/30 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="text-2xl font-serif text-dark-gray mb-4">购物车是空的</h2>
              <p className="text-medium-gray mb-8">開始选购，为日常增添光彩</p>
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-3 bg-champagne-gold text-cream-white text-sm tracking-wider hover:bg-champagne-gold-dark transition-all duration-300"
              >
                前往选购
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
