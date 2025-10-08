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
  User, 
  LogOut, 
  Plus,
  Shield,
  Bell,
  Search,
  Heart
} from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-lg' 
        : 'bg-white/80 backdrop-blur-sm border-b border-neutral-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-neutral-900">Lendly</span>
              <span className="text-xs text-neutral-500 -mt-1">Trusted Rentals</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/browse" 
              className="text-neutral-700 hover:text-primary-600 transition-colors font-medium relative group"
            >
              Browse
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/list" 
              className="text-neutral-700 hover:text-primary-600 transition-colors font-medium relative group"
            >
              List Item
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50">
                    Dashboard
                  </Button>
                </Link>
                
                <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-neutral-900 relative">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-error-500 text-white text-xs p-0 flex items-center justify-center">
                    3
                  </Badge>
                </Button>
                
                <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-neutral-900">
                  <Heart className="w-4 h-4" />
                </Button>
                
                <div className="flex items-center space-x-3 pl-4 border-l border-neutral-200">
                  <Avatar className="w-8 h-8 ring-2 ring-primary-100 hover:ring-primary-200 transition-all">
                    <AvatarImage src={session.user?.image || ''} />
                    <AvatarFallback className="bg-primary-100 text-primary-700">
                      {session.user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="text-neutral-600 hover:text-error-600 hover:bg-error-50"
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
                  className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => signIn()}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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
              className="text-neutral-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-neutral-200 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link
                href="/browse"
                className="text-neutral-700 hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Equipment
              </Link>
              <Link
                href="/list"
                className="text-neutral-700 hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                List Your Item
              </Link>
              
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-neutral-700 hover:text-primary-600 transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center gap-4 py-2">
                    <Button variant="ghost" size="sm" className="text-neutral-600">
                      <Bell className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-neutral-600">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut()
                      setIsMenuOpen(false)
                    }}
                    className="justify-start text-neutral-700 hover:text-error-600 hover:bg-error-50"
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
                    className="justify-start text-neutral-700 hover:text-primary-600"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => signIn()}
                    className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white"
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
