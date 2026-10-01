'use client';

import { useState } from 'react';
import type { Locale } from '@infa/shared';

import { localizedHref } from '@/lib/locale';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  /** When on a detail page, keep the user on the same product across locales. */
  productId: number | null;
}

const OPTIONS: { locale: Locale; label: string }[] = [
  { locale: 'zh-CN', label: '简体' },
  { locale: 'zh-TW', label: '繁體' },
  { locale: 'en', label: 'EN' },
];

export default function LanguageSwitcher({ currentLocale, productId }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const current = OPTIONS.find((o) => o.locale === currentLocale);

  const hrefFor = (locale: Locale): string => {
    const path = productId ? `/products/${productId}` : '/products';
    return localizedHref(path, locale);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1 text-sm text-medium-gray transition hover:text-champagne-gold"
      >
        {current?.label}
        <span aria-hidden className="text-xs">
          ▾
        </span>
      </button>

      {open && (
        <>
          {/* Click-away layer */}
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <ul
            role="menu"
            className="absolute right-0 z-20 mt-2 min-w-[6rem] overflow-hidden rounded-md border border-champagne-gold/20 bg-white py-1 shadow-sm"
          >
            {OPTIONS.map((o) => (
              <li key={o.locale} role="none">
                <a
                  role="menuitem"
                  href={hrefFor(o.locale)}
                  aria-current={o.locale === currentLocale}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 text-xs transition hover:bg-champagne-gold/10 ${
                    o.locale === currentLocale
                      ? 'text-champagne-gold'
                      : 'text-medium-gray'
                  }`}
                >
                  {o.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
