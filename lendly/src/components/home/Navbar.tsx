'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Menu, 
  X, 
  LogOut, 
  Plus,
  Bell,
  Heart,
  Search
} from 'lucide-react'
import { cx } from '@/lib/ui'
import { isRTL } from '@/lib/i18n'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: session, status } = useSession()
  const rtl = isRTL()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={cx(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg" 
        : "bg-white/80 backdrop-blur-sm border-b border-slate-200/50"
    )}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900">Lendly</span>
              <span className="text-xs text-slate-500 -mt-1">Trusted Rentals</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/browse" 
              className="text-slate-700 hover:text-emerald transition-colors font-medium relative group"
            >
              Browse
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/list" 
              className="text-slate-700 hover:text-emerald transition-colors font-medium relative group"
            >
              List Item
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {status === 'loading' ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
              </div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-slate-700 hover:text-emerald hover:bg-emerald-50">
                    Dashboard
                  </Button>
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
                <Button 
                  variant="ghost" 
                  onClick={() => signIn()}
                  className="text-slate-700 hover:text-emerald hover:bg-emerald-50"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => signIn()}
                  className="bg-gradient-to-r from-emerald to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
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
                Browse Equipment
              </Link>
              <Link
                href="/list"
                className="text-slate-700 hover:text-emerald transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                List Your Item
              </Link>
              
              {status === 'loading' ? (
                <div className="flex items-center space-x-3 py-2">
                  <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
                </div>
              ) : session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-slate-700 hover:text-emerald transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
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
                      signOut()
                      setIsMenuOpen(false)
                    }}
                    className="justify-start text-slate-700 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => signIn()}
                    className="justify-start text-slate-700 hover:text-emerald"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => signIn()}
                    className="bg-gradient-to-r from-emerald to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
