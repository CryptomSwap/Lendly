'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LennyLogo } from '@/components/LennyLogo'
import { Locale, t } from '@/lib/i18n'

interface NavbarProps {
  locale: Locale
}

export function Navbar({ locale }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isRTL = locale === 'he'

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <LennyLogo className="h-8 w-8" />
            <span className="text-xl font-bold text-slate-900">Lendly</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/categories" 
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t(locale, 'browse')}
            </Link>
            <Link 
              href="/how-it-works" 
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t(locale, 'howItWorks')}
            </Link>
            <Link 
              href="/safety" 
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t(locale, 'safety')}
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/list-item">
                {t(locale, 'listYourGear')}
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">
                Dashboard
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                href="/categories" 
                className="text-slate-600 hover:text-slate-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(locale, 'browse')}
              </Link>
              <Link 
                href="/how-it-works" 
                className="text-slate-600 hover:text-slate-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(locale, 'howItWorks')}
              </Link>
              <Link 
                href="/safety" 
                className="text-slate-600 hover:text-slate-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(locale, 'safety')}
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-slate-200">
                <Button variant="ghost" asChild className="justify-start">
                  <Link href="/list-item" onClick={() => setIsMobileMenuOpen(false)}>
                    {t(locale, 'listYourGear')}
                  </Link>
                </Button>
                <Button asChild className="justify-start">
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}