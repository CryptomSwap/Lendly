'use client'

import Link from 'next/link'
import { 
  Shield, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react'
import { cx } from '@/lib/ui'
import { useI18n } from '@/i18n'

export function Footer() {
  const { t, locale } = useI18n()
  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Safety', href: '/safety' },
      { name: 'Community Guidelines', href: '/guidelines' },
      { name: 'Contact Us', href: '/contact' }
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Insurance', href: '/insurance' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className={`flex items-center mb-6 ${locale === 'he' ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <span className="text-2xl font-bold lendly-logo">
                  {locale === 'he' ? 'לנדלי.' : 'lendly.'}
                </span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                {t('footer.description')}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className={`flex items-center text-slate-400 ${locale === 'he' ? 'flex-row-reverse gap-3' : 'gap-3'}`}>
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">support@lendly.com</span>
                </div>
                <div className={`flex items-center text-slate-400 ${locale === 'he' ? 'flex-row-reverse gap-3' : 'gap-3'}`}>
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className={`flex items-center text-slate-400 ${locale === 'he' ? 'flex-row-reverse gap-3' : 'gap-3'}`}>
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Tel Aviv, Israel</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-white mb-6">{t('footer.company')}</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold text-white mb-6">{t('footer.support')}</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-white mb-6">{t('footer.legal')}</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="py-8 border-t border-slate-800">
          <div className={`flex items-center justify-center gap-6 mb-6 ${locale === 'he' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center text-emerald-400 ${locale === 'he' ? 'flex-row-reverse gap-2' : 'gap-2'}`}>
              <Shield className="w-5 h-5" />
              <span className="font-medium">{t('footer.verifiedInsured')}</span>
            </div>
            <div className="w-px h-6 bg-slate-700"></div>
            <div className={`flex items-center text-sky-400 ${locale === 'he' ? 'flex-row-reverse gap-2' : 'gap-2'}`}>
              <Shield className="w-5 h-5" />
              <span className="font-medium">{t('footer.support247')}</span>
            </div>
            <div className="w-px h-6 bg-slate-700"></div>
            <div className={`flex items-center text-emerald-400 ${locale === 'he' ? 'flex-row-reverse gap-2' : 'gap-2'}`}>
              <Shield className="w-5 h-5" />
              <span className="font-medium">{t('footer.securePayments')}</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-slate-800">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${locale === 'he' ? 'md:flex-row-reverse' : ''}`}>
            <div className="text-slate-400 text-sm">
              {t('footer.copyright')}
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-slate-400" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
