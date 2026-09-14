// Re-export the canonical locale model from the shared contract so every
// admin view uses the same single source of truth as server + web.
export {
  LOCALES,
  LocaleSchema,
  type Locale,
  type LocalizedString,
  type LocalizedText,
} from '@infa/shared'

import type { Locale } from '@infa/shared'

export const LOCALE_LABEL: Record<Locale, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  en: 'English',
}

export const DEFAULT_LOCALE: Locale = 'zh-CN'
