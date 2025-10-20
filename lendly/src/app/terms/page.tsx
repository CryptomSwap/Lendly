'use client'

import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { 
  FileText, 
  Calendar, 
  Shield, 
  Users,
  AlertTriangle
} from 'lucide-react'
import { t, getCurrentLanguage } from '@/lib/i18n'

export default function TermsPage() {
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
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-neutral-900 mb-6">
                Terms of Service
              </h1>
              <p className="text-xl text-neutral-700">
                Last updated: January 15, 2025
              </p>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="prose prose-lg max-w-none">
                  
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">1. Acceptance of Terms</h2>
                    <p className="text-neutral-700 mb-4">
                      By accessing and using Lendly ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">2. Description of Service</h2>
                    <p className="text-neutral-700 mb-4">
                      Lendly is a peer-to-peer equipment rental platform that connects equipment owners with renters. We facilitate transactions but are not a party to the rental agreements between users.
                    </p>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2">
                      <li>Equipment owners can list their items for rent</li>
                      <li>Renters can browse and book equipment</li>
                      <li>We provide payment processing and protection services</li>
                      <li>We facilitate communication between users</li>
                    </ul>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">3. User Responsibilities</h2>
                    
                    <h3 className="text-xl font-semibold text-neutral-900 mb-4">Equipment Owners</h3>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-6">
                      <li>Provide accurate descriptions of equipment</li>
                      <li>Ensure equipment is safe and in working condition</li>
                      <li>Meet renters at agreed times and locations</li>
                      <li>Maintain proper insurance coverage</li>
                      <li>Comply with all applicable laws and regulations</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-4">Renters</h3>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-6">
                      <li>Use equipment only as intended and described</li>
                      <li>Return equipment in the same condition received</li>
                      <li>Report any damage or issues immediately</li>
                      <li>Follow all safety guidelines and instructions</li>
                      <li>Pay all fees and deposits as agreed</li>
                    </ul>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">4. Payment Terms</h2>
                    <p className="text-neutral-700 mb-4">
                      All payments are processed securely through our platform. We charge a service fee for facilitating transactions.
                    </p>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2">
                      <li>Service fee: 8% of rental amount</li>
                      <li>Payment processing fee: 2.9% + ₪0.30</li>
                      <li>Security deposits are held until equipment return</li>
                      <li>Refunds processed within 5-7 business days</li>
                    </ul>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">5. Protection & Insurance</h2>
                    <p className="text-neutral-700 mb-4">
                      We provide protection coverage for eligible rentals, but users remain responsible for their own actions and equipment.
                    </p>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-3">Coverage Includes:</h3>
                      <ul className="list-disc list-inside text-emerald-700 space-y-1">
                        <li>Damage protection up to ₪10,000</li>
                        <li>Liability coverage up to ₪1,000,000</li>
                        <li>Theft protection (with police report)</li>
                        <li>24/7 emergency support</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 mb-3">Not Covered:</h3>
                      <ul className="list-disc list-inside text-red-700 space-y-1">
                        <li>Intentional damage or misuse</li>
                        <li>Normal wear and tear</li>
                        <li>Pre-existing damage</li>
                        <li>Commercial use without permission</li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">6. Prohibited Activities</h2>
                    <p className="text-neutral-700 mb-4">
                      The following activities are strictly prohibited on our platform:
                    </p>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2">
                      <li>Listing stolen, illegal, or dangerous equipment</li>
                      <li>Providing false information or misleading descriptions</li>
                      <li>Circumventing our payment system</li>
                      <li>Harassment or inappropriate behavior</li>
                      <li>Commercial use without proper licensing</li>
                      <li>Violation of local laws or regulations</li>
                    </ul>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">7. Account Termination</h2>
                    <p className="text-neutral-700 mb-4">
                      We reserve the right to suspend or terminate accounts that violate these terms or engage in prohibited activities.
                    </p>
                    <p className="text-neutral-700 mb-4">
                      Users may terminate their accounts at any time by contacting support. Upon termination, all outstanding obligations must be fulfilled.
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">8. Limitation of Liability</h2>
                    <p className="text-neutral-700 mb-4">
                      Lendly acts as an intermediary platform and is not responsible for:
                    </p>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2">
                      <li>Equipment condition or performance</li>
                      <li>User behavior or interactions</li>
                      <li>Third-party services or websites</li>
                      <li>Force majeure events</li>
                    </ul>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">9. Dispute Resolution</h2>
                    <p className="text-neutral-700 mb-4">
                      We encourage users to resolve disputes directly. For unresolved disputes, we provide mediation services.
                    </p>
                    <p className="text-neutral-700 mb-4">
                      All disputes are subject to Israeli law and jurisdiction of Israeli courts.
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">10. Changes to Terms</h2>
                    <p className="text-neutral-700 mb-4">
                      We may update these terms from time to time. Users will be notified of significant changes via email or platform notification.
                    </p>
                    <p className="text-neutral-700 mb-4">
                      Continued use of the service after changes constitutes acceptance of the new terms.
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">11. Contact Information</h2>
                    <p className="text-neutral-700 mb-4">
                      For questions about these terms or our service, please contact us:
                    </p>
                    <div className="bg-neutral-100 rounded-lg p-6">
                      <p className="text-neutral-700 mb-2"><strong>Email:</strong> legal@lendly.co.il</p>
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
