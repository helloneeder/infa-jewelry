import type { Locale } from '@infa/shared';

/**
 * URL segment → Locale mapping.
 * Routing convention (V2 方案 §4):
 *   /          → zh-CN (default, no prefix)
 *   /zh-tw/... → zh-TW
 *   /en/...    → en
 */
export const DEFAULT_LOCALE: Locale = 'zh-CN';

/** URL segments for the prefixed (non-default) locales. */
export const SEGMENT_TO_LOCALE: Record<string, Locale> = {
  'zh-tw': 'zh-TW',
  en: 'en',
};

export const LOCALE_TO_SEGMENT: Partial<Record<Locale, string>> = {
  'zh-TW': 'zh-tw',
  en: 'en',
};

/** All prefixed locale segments used for static params generation. */
export const LOCALE_SEGMENTS = ['zh-tw', 'en'] as const;

export function resolveLocale(segment?: string): Locale {
  if (!segment) return DEFAULT_LOCALE;
  return SEGMENT_TO_LOCALE[segment] ?? DEFAULT_LOCALE;
}

/** Build a locale-prefixed href; default locale gets no prefix. */
export function localizedHref(path: string, locale: Locale): string {
  const seg = LOCALE_TO_SEGMENT[locale];
  const clean = path.startsWith('/') ? path : `/${path}`;
  return seg ? `/${seg}${clean === '/' ? '' : clean}` : clean;
}

/** Convert an internal locale to its <html lang=""> value. */
export function htmlLang(locale: Locale): string {
  return locale === 'zh-CN' ? 'zh-Hans' : locale === 'zh-TW' ? 'zh-Hant' : 'en';
}
