'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Search, 
  User, 
  Heart,
  Globe
} from 'lucide-react';
import { t, getDirection } from '@/lib/i18n';

interface NavbarProps {
  locale?: 'en' | 'he';
}

export function Navbar({ locale = 'en' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const direction = getDirection(locale);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50" dir={direction}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-coral to-teal rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-deep-ink">Lendly</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-coral transition-colors"
            >
              {t('nav.home', locale)}
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-600 hover:text-coral transition-colors"
            >
              {t('nav.categories', locale)}
            </Link>
            <Link 
              href="/how-it-works" 
              className="text-gray-600 hover:text-coral transition-colors"
            >
              {t('nav.how_it_works', locale)}
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <Link
              href={`?lang=${locale === 'en' ? 'he' : 'en'}`}
              className="flex items-center gap-1 text-gray-600 hover:text-coral transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{locale === 'en' ? 'עברית' : 'English'}</span>
            </Link>

            {/* Search */}
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>

            {/* Favorites */}
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>

            {/* User Menu */}
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              {t('nav.sign_in', locale)}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <Link 
                href="/" 
                className="block text-gray-600 hover:text-coral transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home', locale)}
              </Link>
              <Link 
                href="/categories" 
                className="block text-gray-600 hover:text-coral transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.categories', locale)}
              </Link>
              <Link 
                href="/how-it-works" 
                className="block text-gray-600 hover:text-coral transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.how_it_works', locale)}
              </Link>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <Link
                    href={`?lang=${locale === 'en' ? 'he' : 'en'}`}
                    className="flex items-center gap-1 text-gray-600 hover:text-coral transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">{locale === 'en' ? 'עברית' : 'English'}</span>
                  </Link>
                  
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {t('nav.sign_in', locale)}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
