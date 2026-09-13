'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: '首頁', href: '/' },
  {
    label: '產品系列',
    href: '/products',
    children: [
      { label: '全部產品', href: '/products' },
      { label: '新品上市', href: '/products/new' },
      { label: '熱賣商品', href: '/products/best-seller' },
      { label: '項鏈', href: '/products/necklaces' },
      { label: '手鏈', href: '/products/bracelets' },
      { label: '戒指', href: '/products/rings' },
      { label: '耳環', href: '/products/earrings' },
    ],
  },
  { label: '品牌故事', href: '/about' },
  { label: '配送資訊', href: '/shipping' },
  { label: '聯絡我們', href: '/contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-cream-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" onClick={closeMenu}>
            <span className="text-2xl lg:text-3xl font-serif tracking-widest text-dark-gray hover:text-champagne-gold transition-colors">
              LUMI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`text-sm py-2 ${
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-champagne-gold'
                      : 'text-dark-gray hover:text-champagne-gold'
                  } transition-colors`}
                  onMouseEnter={() => link.children && setActiveDropdown(link.href)}
                  onMouseLeave={() => link.children && setActiveDropdown(null)}
                >
                  {link.label}
                  {link.children && (
                    <span className="ml-1 text-xs">▼</span>
                  )}
                </Link>
                
                {link.children && (
                  <div
                    className={`absolute top-full left-0 min-w-[160px] bg-cream-white shadow-lg rounded-sm py-2 transition-all duration-200 ${
                      activeDropdown === link.href ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                    onMouseEnter={() => setActiveDropdown(link.href)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-2 text-sm ${
                          pathname === child.href
                            ? 'text-champagne-gold bg-champagne-gold/5'
                            : 'text-dark-gray hover:text-champagne-gold hover:bg-champagne-gold/5'
                        } transition-colors`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 hover:text-champagne-gold transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-champagne-gold text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:text-champagne-gold transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-cream-white border-t border-champagne-gold/20 px-4 py-4">
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                className={`block py-3 text-sm tracking-wide border-b border-champagne-gold/10 ${
                  pathname === link.href ? 'text-champagne-gold' : 'text-dark-gray'
                }`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="pl-4">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block py-2 text-sm ${
                        pathname === child.href ? 'text-champagne-gold' : 'text-medium-gray'
                      }`}
                      onClick={closeMenu}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
