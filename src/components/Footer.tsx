'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import { t, getDirection } from '@/lib/i18n';

interface FooterProps {
  locale?: 'en' | 'he';
}

export function Footer({ locale = 'en' }: FooterProps) {
  const direction = getDirection(locale);

  return (
    <footer className="bg-deep-ink text-white" dir={direction}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-coral to-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold">Lendly</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Rent gear near you — insured, verified, instant. 
              Find and rent equipment from trusted owners in your area.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categories</h3>
            <div className="space-y-2">
              <Link href="/il/tel-aviv/gardening" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Gardening
              </Link>
              <Link href="/il/tel-aviv/construction" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Construction
              </Link>
              <Link href="/il/tel-aviv/events" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Event Equipment
              </Link>
              <Link href="/il/tel-aviv/drones" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Drones
              </Link>
              <Link href="/il/tel-aviv/cameras" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Cameras
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Help Center
              </Link>
              <Link href="/safety" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Safety Guidelines
              </Link>
              <Link href="/insurance" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Insurance Coverage
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Tel Aviv, Israel</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Phone className="h-4 w-4" />
                <span>+972 50-123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Mail className="h-4 w-4" />
                <span>hello@lendly.co.il</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Globe className="h-4 w-4" />
                <span>www.lendly.co.il</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © 2024 Lendly. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
