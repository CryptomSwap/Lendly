'use client'

import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Shield, 
  Eye, 
  Lock, 
  Database,
  User,
  Mail,
  Phone,
  Calendar
} from 'lucide-react'
import { t, getCurrentLanguage } from '@/lib/i18n'

export default function PrivacyPage() {
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
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-neutral-900 mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-neutral-700">
                Last updated: January 15, 2025
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="prose prose-lg max-w-none">
                  
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">1. Introduction</h2>
                    <p className="text-neutral-700 mb-4">
                      At Lendly, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                    </p>
                    <p className="text-neutral-700 mb-4">
                      By using our service, you consent to the data practices described in this policy.
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">2. Information We Collect</h2>
                    
                    <h3 className="text-xl font-semibold text-neutral-900 mb-4">Personal Information</h3>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-6">
                      <li>Name and contact information</li>
                      <li>Email address and phone number</li>
                      <li>Profile photos and descriptions</li>
                      <li>Government ID for verification</li>
                      <li>Payment and billing information</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-4">Usage Information</h3>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-6">
                      <li>Equipment listings and bookings</li>
                      <li>Search queries and preferences</li>
                      <li>Messages and communications</li>
                      <li>Reviews and ratings</li>
                      <li>Location data (with permission)</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-4">Technical Information</h3>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2">
                      <li>Device information and IP address</li>
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>App usage analytics</li>
                      <li>Cookies and tracking technologies</li>
                    </ul>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">3. How We Use Your Information</h2>
                    <p className="text-neutral-700 mb-4">
                      We use your information to provide, maintain, and improve our services:
                    </p>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2">
                      <li>Facilitate equipment rentals and transactions</li>
                      <li>Verify user identity and maintain security</li>
                      <li>Process payments and prevent fraud</li>
                      <li>Provide customer support</li>
                      <li>Send important service updates</li>
                      <li>Improve our platform and features</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">4. Information Sharing</h2>
                    <p className="text-neutral-700 mb-4">
                      We do not sell your personal information. We may share information in these limited circumstances:
                    </p>
                    
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-3">With Other Users</h3>
                      <ul className="list-disc list-inside text-emerald-700 space-y-1">
                        <li>Profile information for rental transactions</li>
                        <li>Contact details for equipment handoff</li>
                        <li>Reviews and ratings (anonymized)</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">With Service Providers</h3>
                      <ul className="list-disc list-inside text-blue-700 space-y-1">
                        <li>Payment processors for transactions</li>
                        <li>Cloud storage for data security</li>
                        <li>Analytics services for platform improvement</li>
                        <li>Customer support tools</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 mb-3">Legal Requirements</h3>
                      <ul className="list-disc list-inside text-red-700 space-y-1">
                        <li>Court orders or legal processes</li>
                        <li>Law enforcement investigations</li>
                        <li>Protection of rights and safety</li>
                        <li>Compliance with applicable laws</li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">5. Data Security</h2>
                    <p className="text-neutral-700 mb-4">
                      We implement industry-standard security measures to protect your information:
                    </p>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2">
                      <li>Encryption of data in transit and at rest</li>
                      <li>Secure authentication and access controls</li>
                      <li>Regular security audits and updates</li>
                      <li>Employee training on data protection</li>
                      <li>Incident response procedures</li>
                    </ul>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">6. Your Rights</h2>
                    <p className="text-neutral-700 mb-4">
                      You have the following rights regarding your personal information:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-neutral-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-3">Access & Portability</h3>
                        <ul className="list-disc list-inside text-neutral-700 space-y-1 text-sm">
                          <li>Request copies of your data</li>
                          <li>Export your information</li>
                          <li>View your account activity</li>
                        </ul>
                      </div>
                      
                      <div className="bg-neutral-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-3">Correction & Deletion</h3>
                        <ul className="list-disc list-inside text-neutral-700 space-y-1 text-sm">
                          <li>Update incorrect information</li>
                          <li>Delete your account</li>
                          <li>Remove specific data</li>
                        </ul>
                      </div>
                      
                      <div className="bg-neutral-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-3">Consent & Control</h3>
                        <ul className="list-disc list-inside text-neutral-700 space-y-1 text-sm">
                          <li>Opt out of marketing emails</li>
                          <li>Control location sharing</li>
                          <li>Manage cookie preferences</li>
                        </ul>
                      </div>
                      
                      <div className="bg-neutral-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-3">Objection & Restriction</h3>
                        <ul className="list-disc list-inside text-neutral-700 space-y-1 text-sm">
                          <li>Object to data processing</li>
                          <li>Restrict data use</li>
                          <li>Withdraw consent</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">7. Cookies and Tracking</h2>
                    <p className="text-neutral-700 mb-4">
                      We use cookies and similar technologies to enhance your experience:
                    </p>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2">
                      <li>Essential cookies for platform functionality</li>
                      <li>Analytics cookies to understand usage</li>
                      <li>Preference cookies to remember settings</li>
                      <li>Marketing cookies (with consent)</li>
                    </ul>
                    <p className="text-neutral-700 mt-4">
                      You can control cookie settings through your browser preferences.
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">8. Data Retention</h2>
                    <p className="text-neutral-700 mb-4">
                      We retain your information for as long as necessary to provide our services and comply with legal obligations:
                    </p>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2">
                      <li>Account information: Until account deletion</li>
                      <li>Transaction records: 7 years for tax purposes</li>
                      <li>Communication logs: 2 years</li>
                      <li>Analytics data: 2 years (anonymized)</li>
                    </ul>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">9. International Transfers</h2>
                    <p className="text-neutral-700 mb-4">
                      Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international data transfers.
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">10. Children's Privacy</h2>
                    <p className="text-neutral-700 mb-4">
                      Our service is not intended for children under 18. We do not knowingly collect personal information from children under 18.
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">11. Changes to This Policy</h2>
                    <p className="text-neutral-700 mb-4">
                      We may update this Privacy Policy from time to time. We will notify you of any material changes via email or platform notification.
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">12. Contact Us</h2>
                    <p className="text-neutral-700 mb-4">
                      If you have questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="bg-neutral-100 rounded-lg p-6">
                      <p className="text-neutral-700 mb-2"><strong>Privacy Officer:</strong> privacy@lendly.co.il</p>
                      <p className="text-neutral-700 mb-2"><strong>General Contact:</strong> hello@lendly.co.il</p>
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
