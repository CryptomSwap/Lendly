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

export function Footer() {
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
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white">Lendly</span>
                  <span className="text-xs text-slate-400 -mt-1">Trusted Rentals</span>
                </div>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                The trusted marketplace for equipment rentals. Connect with verified owners 
                and rent premium equipment with confidence.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">support@lendly.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Tel Aviv, Israel</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-white mb-6">Company</h3>
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
              <h3 className="font-semibold text-white mb-6">Support</h3>
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
              <h3 className="font-semibold text-white mb-6">Legal</h3>
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
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-emerald-400">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Verified & Insured</span>
            </div>
            <div className="w-px h-6 bg-slate-700"></div>
            <div className="flex items-center gap-2 text-sky-400">
              <Shield className="w-5 h-5" />
              <span className="font-medium">24/7 Support</span>
            </div>
            <div className="w-px h-6 bg-slate-700"></div>
            <div className="flex items-center gap-2 text-emerald-400">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Secure Payments</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-slate-400 text-sm">
              © 2024 Lendly. All rights reserved.
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
