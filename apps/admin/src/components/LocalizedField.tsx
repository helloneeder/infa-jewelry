import { useState } from 'react'

import { cn } from '@/lib/cn'
import {
  LOCALES,
  LOCALE_LABEL,
  DEFAULT_LOCALE,
  type Locale,
  type LocalizedText,
} from '@/lib/i18n'

interface Props {
  value: LocalizedText
  onChange: (next: LocalizedText) => void
  multiline?: boolean
  placeholder?: Partial<Record<Locale, string>>
}

/**
 * Three-locale tabbed input (zh-CN / zh-TW / en).
 * Bound to the LocalizedText / LocalizedString contract in @infa/shared.
 */
export function LocalizedField({ value, onChange, multiline, placeholder }: Props) {
  const [tab, setTab] = useState<Locale>(DEFAULT_LOCALE)

  const commonCls =
    'mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20'

  return (
    <div>
      <div className="flex gap-1 border-b border-border">
        {LOCALES.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => setTab(loc)}
            className={cn(
              '-mb-px border-b-2 px-3 py-1.5 text-xs transition',
              tab === loc
                ? 'border-brand font-medium text-brand-strong'
                : 'border-transparent text-ink-muted hover:text-ink',
            )}
          >
            {LOCALE_LABEL[loc]}
          </button>
        ))}
      </div>

      {multiline ? (
        <textarea
          rows={4}
          className={cn(commonCls, 'resize-y')}
          value={value[tab]}
          placeholder={placeholder?.[tab]}
          onChange={(e) => onChange({ ...value, [tab]: e.target.value })}
        />
      ) : (
        <input
          className={commonCls}
          value={value[tab]}
          placeholder={placeholder?.[tab]}
          onChange={(e) => onChange({ ...value, [tab]: e.target.value })}
        />
      )}
    </div>
  )
}
