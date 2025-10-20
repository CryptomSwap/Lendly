'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { getCurrentLanguage, Language, isRTL } from '@/lib/i18n'

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'he', label: 'עברית' },
  { code: 'ar', label: 'العربية' },
]

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = useMemo(() => getCurrentLanguage(), [searchParams])

  const setLang = useCallback((lang: Language) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    params.set('lang', lang)
    router.push(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  return (
    <div className="flex items-center gap-2">
      {languages.map(({ code, label }) => (
        <Button
          key={code}
          variant={current === code ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLang(code)}
          className={current === code ? '' : 'bg-white'}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}


