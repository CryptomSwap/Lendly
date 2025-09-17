'use client'

import Link from 'next/link'
import { LennyLogo } from '@/components/LennyLogo'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Locale, t, locales } from '@/lib/i18n'

interface FooterProps {
  locale: Locale
}

export function Footer({ locale }: FooterProps) {
  const isRTL = locale === 'he'

  const handleLocaleChange = (newLocale: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('lang', newLocale)
    window.location.href = url.toString()
  }

  const footerLinks = {
    marketplace: [
      { name: t(locale, 'browse'), href: '/categories' },
      { name: t(locale, 'howItWorks'), href: '/how-it-works' },
      { name: t(locale, 'listYourGear'), href: '/list-item' }
    ],
    safety: [
      { name: t(locale, 'safetyCenter'), href: '/safety' },
      { name: t(locale, 'insurance'), href: '/insurance' },
      { name: t(locale, 'verification'), href: '/verification' },
      { name: t(locale, 'disputes'), href: '/disputes' }
    ],
    support: [
      { name: t(locale, 'helpCenter'), href: '/help' },
      { name: t(locale, 'contactUs'), href: '/contact' },
      { name: t(locale, 'community'), href: '/community' },
      { name: t(locale, 'status'), href: '/status' }
    ],
    company: [
      { name: t(locale, 'about'), href: '/about' },
      { name: t(locale, 'careers'), href: '/careers' },
      { name: t(locale, 'press'), href: '/press' },
      { name: t(locale, 'blog'), href: '/blog' },
      { name: t(locale, 'pricing'), href: '/pricing' }
    ],
    legal: [
      { name: t(locale, 'termsOfService'), href: '/terms' },
      { name: t(locale, 'privacyPolicy'), href: '/privacy' },
      { name: t(locale, 'cookiePolicy'), href: '/cookies' }
    ]
  }

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <LennyLogo className="h-8 w-8 text-white" />
              <span className="text-xl font-bold">Lendly</span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {t(locale, 'footerDescription')}
            </p>
            
            {/* Locale Switcher */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                {t(locale, 'language')}
              </label>
              <Select value={locale} onValueChange={handleLocaleChange}>
                <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locales.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc === 'en' ? t(locale, 'english') : t(locale, 'hebrew')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {t(locale, 'marketplace')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.marketplace.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {t(locale, 'safety')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.safety.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {t(locale, 'support')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {t(locale, 'company')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-slate-400">
              © 2024 Lendly. {t(locale, 'allRightsReserved')}.
            </div>
            <div className="flex flex-wrap gap-6">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}