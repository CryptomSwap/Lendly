'use client'

import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Users, 
  CheckCircle, 
  AlertTriangle,
  Heart
} from 'lucide-react'

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="pt-16">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-neutral-900 mb-6">Community Guidelines</h1>
              <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
                Building a trusted community through respect, safety, and mutual support
              </p>
            </div>
          </div>
        </div>

        <div className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="prose prose-lg max-w-none">
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Our Community Values</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-emerald-900 mb-3">Respect</h3>
                        <p className="text-emerald-700">Treat all community members with dignity and kindness</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-3">Trust</h3>
                        <p className="text-blue-700">Build relationships through honest communication</p>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-purple-900 mb-3">Safety</h3>
                        <p className="text-purple-700">Prioritize the safety of all community members</p>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-orange-900 mb-3">Support</h3>
                        <p className="text-orange-700">Help each other succeed and grow</p>
                      </div>
                    </div>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Do's and Don'ts</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Do
                        </h3>
                        <ul className="list-disc list-inside text-neutral-700 space-y-2">
                          <li>Provide accurate descriptions of your equipment</li>
                          <li>Communicate clearly and promptly</li>
                          <li>Meet at agreed times and locations</li>
                          <li>Return equipment in the same condition</li>
                          <li>Leave honest reviews and feedback</li>
                          <li>Report any issues immediately</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          Don't
                        </h3>
                        <ul className="list-disc list-inside text-neutral-700 space-y-2">
                          <li>Provide false or misleading information</li>
                          <li>Cancel bookings without good reason</li>
                          <li>Use equipment for unauthorized purposes</li>
                          <li>Share personal contact information</li>
                          <li>Engage in harassment or discrimination</li>
                          <li>Ignore safety guidelines</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Building Trust</h2>
                    <p className="text-neutral-700 mb-4">
                      Trust is the foundation of our community. Here's how we build and maintain it:
                    </p>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2">
                      <li>Complete verification process</li>
                      <li>Build positive reputation through reviews</li>
                      <li>Communicate openly and honestly</li>
                      <li>Respect others' time and property</li>
                      <li>Follow through on commitments</li>
                    </ul>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Reporting Issues</h2>
                    <p className="text-neutral-700 mb-4">
                      If you encounter behavior that violates our guidelines, please report it immediately:
                    </p>
                    <div className="bg-neutral-100 rounded-lg p-6">
                      <p className="text-neutral-700 mb-2"><strong>Email:</strong> community@lendly.co.il</p>
                      <p className="text-neutral-700 mb-2"><strong>Phone:</strong> +972-50-123-4567</p>
                      <p className="text-neutral-700"><strong>In-App:</strong> Use the report button on any listing or message</p>
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
