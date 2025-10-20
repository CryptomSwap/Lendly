'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getCurrentLanguage, Language } from '@/lib/i18n'
import { ChevronDown } from 'lucide-react'

// Emoji flags used to avoid adding new assets
const languageOrder: Language[] = ['en', 'he', 'ar']
const languageFlag: Record<Language, string> = {
  en: '🇺🇸',
  he: '🇮🇱',
  ar: '🇸🇦',
}
const languageLabel: Record<Language, string> = {
  en: 'English',
  he: 'עברית',
  ar: 'العربية',
}

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = useMemo(() => getCurrentLanguage(), [searchParams])
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const changeLanguage = useCallback((lang: Language) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    params.set('lang', lang)
    router.push(`${pathname}?${params.toString()}`)
    setIsOpen(false)
  }, [router, pathname, searchParams])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white flex items-center gap-2 min-w-[70px] justify-center"
        aria-label={`Choose language: ${languageLabel[current]}`}
        title={`Choose language: ${languageLabel[current]}`}
      >
        <span className="text-lg leading-none">
          🇮🇱
        </span>
        <span className="text-sm">
          {languageLabel[current]}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {languageOrder.map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                lang === current ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
              }`}
            >
              <span className="text-lg leading-none">
                {languageFlag[lang]}
              </span>
              <span>{languageLabel[lang]}</span>
              {lang === current && (
                <span className="ml-auto text-emerald-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}


