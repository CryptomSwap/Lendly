'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
// import { useSession, signIn, signOut } from 'next-auth/react'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Menu, 
  X, 
  LogOut, 
  Plus,
  Bell,
  Heart,
  Search,
  Globe
} from 'lucide-react'
import { useI18n } from '@/i18n'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  // const { data: session, status } = useSession()
  const { t, locale, setLocale } = useI18n()

  const toggleLanguage = () => {
    setLocale(locale === 'he' ? 'en' : 'he')
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/95 backdrop-blur-md border-b border-border shadow-lg" 
        : "bg-white/80 backdrop-blur-sm border-b border-border/50"
    )}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-bold lendly-logo group-hover:scale-105 transition-all duration-300">
              {locale === 'he' ? 'לנדלי.' : 'lendly.'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/browse" 
              className="text-slate-600 hover:text-teal-500 font-medium transition-colors duration-300 relative group"
            >
              {t('nav.browse')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/list" 
              className="text-slate-600 hover:text-teal-500 font-medium transition-colors duration-300 relative group"
            >
              {t('nav.listItem')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {false ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
              </div>
            ) : false ? (
              <div className="flex items-center space-x-4">
                <AnimatedButton 
                  variant="ghost" 
                  onPress={toggleLanguage}
                  className="text-slate-700 hover:text-emerald hover:bg-emerald-50"
                  ariaLabel={locale === 'he' ? t('nav.switchToEnglish') : t('nav.switchToHebrew')}
                >
                  <Globe className="w-4 h-4" />
                  <span className="ml-1 font-medium">{locale === 'he' ? 'EN' : 'עב'}</span>
                </AnimatedButton>
                <Link href="/dashboard">
                  <AnimatedButton variant="ghost" className="text-slate-700 hover:text-emerald hover:bg-emerald-50">
                    {t('nav.dashboard')}
                  </AnimatedButton>
                </Link>
                
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 relative">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red text-white text-xs p-0 flex items-center justify-center">
                    3
                  </Badge>
                </Button>
                
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                  <Heart className="w-4 h-4" />
                </Button>
                
                <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                  <Avatar className="w-8 h-8 ring-2 ring-emerald-100 hover:ring-emerald-200 transition-all">
                    <AvatarImage src={session.user?.image || ''} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      {session.user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="text-slate-600 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <AnimatedButton 
                  variant="ghost" 
                  onPress={toggleLanguage}
                  className="text-slate-600 hover:text-teal-500 hover:bg-teal-50"
                  ariaLabel={locale === 'he' ? t('nav.switchToEnglish') : t('nav.switchToHebrew')}
                >
                  <Globe className="w-4 h-4" />
                  <span className="ml-1 font-medium">{locale === 'he' ? 'EN' : 'עב'}</span>
                </AnimatedButton>
                <AnimatedButton 
                  variant="ghost" 
                  onPress={() => window.location.href = '/sign-in'}
                  className="text-slate-600 hover:text-teal-500 hover:bg-teal-50"
                >
                  {t('nav.signIn')}
                </AnimatedButton>
                <AnimatedButton 
                  onPress={() => window.location.href = '/sign-up'}
                  className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  icon={<Plus className="w-4 h-4" />}
                >
                  {t('nav.signUp')}
                </AnimatedButton>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 hover:text-emerald"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-slate-200 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link
                href="/browse"
                className="text-slate-700 hover:text-emerald transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.browse')}
              </Link>
              <Link
                href="/list"
                className="text-slate-700 hover:text-emerald transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.listItem')}
              </Link>
              
              {false ? (
                <div className="flex items-center space-x-3 py-2">
                  <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
                </div>
              ) : false ? (
                <>
                  <AnimatedButton 
                    variant="ghost" 
                    onPress={toggleLanguage}
                    className="justify-start text-slate-700 hover:text-emerald"
                    ariaLabel={locale === 'he' ? t('nav.switchToEnglish') : t('nav.switchToHebrew')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    {locale === 'he' ? t('nav.switchToEnglish') : t('nav.switchToHebrew')}
                  </AnimatedButton>
                  <Link
                    href="/dashboard"
                    className="text-slate-700 hover:text-emerald transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.dashboard')}
                  </Link>
                  <div className="flex items-center gap-4 py-2">
                    <Button variant="ghost" size="sm" className="text-slate-600">
                      <Bell className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-600">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      window.location.href = '/sign-out'
                      setIsMenuOpen(false)
                    }}
                    className="justify-start text-slate-700 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('nav.signOut')}
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-4">
                  <AnimatedButton 
                    variant="ghost" 
                    onPress={toggleLanguage}
                    className="justify-start text-slate-700 hover:text-emerald"
                    ariaLabel={locale === 'he' ? t('nav.switchToEnglish') : t('nav.switchToHebrew')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    {locale === 'he' ? t('nav.switchToEnglish') : t('nav.switchToHebrew')}
                  </AnimatedButton>
                  <AnimatedButton 
                    variant="ghost" 
                    onPress={() => window.location.href = '/sign-in'}
                    className="justify-start text-slate-700 hover:text-emerald"
                  >
                    {t('nav.signIn')}
                  </AnimatedButton>
                  <AnimatedButton 
                    onPress={() => window.location.href = '/sign-up'}
                    className="bg-gradient-to-r from-emerald to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                    icon={<Plus className="w-4 h-4" />}
                  >
                    {t('nav.signUp')}
                  </AnimatedButton>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
