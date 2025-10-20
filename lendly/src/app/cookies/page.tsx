'use client'

import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Shield, 
  Cookie,
  AlertTriangle
} from 'lucide-react'
import { t, getCurrentLanguage } from '@/lib/i18n'

export default function CookiesPage() {
  const lang = getCurrentLanguage()

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Cookie className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-neutral-900 mb-6">
                Cookie Policy
              </h1>
              <p className="text-xl text-neutral-700">
                Last updated: January 15, 2025
              </p>
            </div>
          </div>
        </div>

        {/* Cookie Content */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="prose prose-lg max-w-none">
                  
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">What Are Cookies?</h2>
                    <p className="text-neutral-700 mb-4">
                      Cookies are small text files that are stored on your device when you visit our website. 
                      They help us provide you with a better experience by remembering your preferences and 
                      understanding how you use our platform.
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">How We Use Cookies</h2>
                    <p className="text-neutral-700 mb-4">
                      We use cookies for several purposes to improve your experience on Lendly:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-emerald-900 mb-3">Essential Cookies</h3>
                        <p className="text-emerald-700 text-sm mb-3">Required for basic website functionality</p>
                        <ul className="list-disc list-inside text-emerald-700 space-y-1 text-sm">
                          <li>User authentication</li>
                          <li>Shopping cart functionality</li>
                          <li>Security features</li>
                          <li>Language preferences</li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-3">Analytics Cookies</h3>
                        <p className="text-blue-700 text-sm mb-3">Help us understand how you use our site</p>
                        <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
                          <li>Page views and user behavior</li>
                          <li>Performance monitoring</li>
                          <li>Error tracking</li>
                          <li>Feature usage statistics</li>
                        </ul>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-purple-900 mb-3">Preference Cookies</h3>
                        <p className="text-purple-700 text-sm mb-3">Remember your settings and choices</p>
                        <ul className="list-disc list-inside text-purple-700 space-y-1 text-sm">
                          <li>Theme preferences</li>
                          <li>Search filters</li>
                          <li>Location settings</li>
                          <li>Notification preferences</li>
                        </ul>
                      </div>
                      
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-orange-900 mb-3">Marketing Cookies</h3>
                        <p className="text-orange-700 text-sm mb-3">Used for advertising and marketing (with consent)</p>
                        <ul className="list-disc list-inside text-orange-700 space-y-1 text-sm">
                          <li>Ad personalization</li>
                          <li>Social media integration</li>
                          <li>Email marketing</li>
                          <li>Retargeting campaigns</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Managing Your Cookie Preferences</h2>
                    <p className="text-neutral-700 mb-4">
                      You have control over which cookies you accept. You can manage your preferences in several ways:
                    </p>
                    
                    <div className="bg-neutral-100 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-3">Browser Settings</h3>
                      <p className="text-neutral-700 mb-3">
                        Most browsers allow you to control cookies through their settings:
                      </p>
                      <ul className="list-disc list-inside text-neutral-700 space-y-1">
                        <li>Block all cookies</li>
                        <li>Block third-party cookies</li>
                        <li>Delete existing cookies</li>
                        <li>Set preferences for specific sites</li>
                      </ul>
                    </div>
                    
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-3">Our Cookie Banner</h3>
                      <p className="text-emerald-700 mb-3">
                        When you first visit our site, you'll see a cookie banner where you can:
                      </p>
                      <ul className="list-disc list-inside text-emerald-700 space-y-1">
                        <li>Accept all cookies</li>
                        <li>Reject non-essential cookies</li>
                        <li>Customize your preferences</li>
                        <li>Learn more about each type</li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Third-Party Cookies</h2>
                    <p className="text-neutral-700 mb-4">
                      We may use third-party services that set their own cookies:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="border border-neutral-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">Google Analytics</h3>
                        <p className="text-neutral-600 text-sm">
                          Helps us understand website usage and improve user experience
                        </p>
                      </div>
                      
                      <div className="border border-neutral-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">Payment Processors</h3>
                        <p className="text-neutral-600 text-sm">
                          Secure payment processing and fraud prevention
                        </p>
                      </div>
                      
                      <div className="border border-neutral-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">Social Media</h3>
                        <p className="text-neutral-600 text-sm">
                          Social sharing and login functionality
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Impact of Disabling Cookies</h2>
                    <p className="text-neutral-700 mb-4">
                      If you choose to disable cookies, some features of our website may not work properly:
                    </p>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 mb-3">Features That May Not Work:</h3>
                      <ul className="list-disc list-inside text-red-700 space-y-1">
                        <li>User login and authentication</li>
                        <li>Saved preferences and settings</li>
                        <li>Shopping cart functionality</li>
                        <li>Personalized content</li>
                        <li>Location-based features</li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Updates to This Policy</h2>
                    <p className="text-neutral-700 mb-4">
                      We may update this Cookie Policy from time to time to reflect changes in our practices 
                      or for other operational, legal, or regulatory reasons.
                    </p>
                    <p className="text-neutral-700 mb-4">
                      We will notify you of any material changes by posting the updated policy on our website 
                      and updating the "Last updated" date.
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Contact Us</h2>
                    <p className="text-neutral-700 mb-4">
                      If you have any questions about our use of cookies, please contact us:
                    </p>
                    <div className="bg-neutral-100 rounded-lg p-6">
                      <p className="text-neutral-700 mb-2"><strong>Email:</strong> privacy@lendly.co.il</p>
                      <p className="text-neutral-700 mb-2"><strong>Phone:</strong> +972-50-123-4567</p>
                      <p className="text-neutral-700"><strong>Address:</strong> Rothschild Blvd 1, Tel Aviv, Israel 66881</p>
                    </div>
                  </section>

                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
