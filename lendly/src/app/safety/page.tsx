'use client'

import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  Phone, 
  Mail,
  FileText,
  Camera,
  Lock
} from 'lucide-react'
import { t, getCurrentLanguage } from '@/lib/i18n'

export default function SafetyPage() {
  const lang = getCurrentLanguage()

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-neutral-900 mb-6">
                Safety & Trust
              </h1>
              <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
                Your safety is our top priority. We've built comprehensive protection 
                and verification systems to ensure every transaction is secure.
              </p>
            </div>
          </div>
        </div>

        {/* Protection Overview */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Comprehensive Protection
              </h2>
              <p className="text-lg text-neutral-600">
                Every rental includes multiple layers of protection
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Damage Protection</h3>
                  <p className="text-neutral-600 mb-4">
                    Up to ₪10,000 coverage for accidental damage to your equipment
                  </p>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    Included Free
                  </Badge>
                </CardContent>
              </Card>

              <Card className="p-8 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Liability Coverage</h3>
                  <p className="text-neutral-600 mb-4">
                    Protection against third-party claims up to ₪1,000,000
                  </p>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    Included Free
                  </Badge>
                </CardContent>
              </Card>

              <Card className="p-8 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Secure Payments</h3>
                  <p className="text-neutral-600 mb-4">
                    All payments processed securely with fraud protection
                  </p>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    Bank-Level Security
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Verification Process */}
        <div className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                  User Verification
                </h2>
                <p className="text-lg text-neutral-700 mb-8">
                  We verify every user through multiple steps to ensure trust and safety 
                  in our community.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">Identity Verification</h3>
                      <p className="text-neutral-600">Government ID verification for all users</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">Phone Verification</h3>
                      <p className="text-neutral-600">SMS verification for contact information</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">Profile Completion</h3>
                      <p className="text-neutral-600">Complete profile with photo and description</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">Community Reviews</h3>
                      <p className="text-neutral-600">Build reputation through user reviews</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Verification Badges</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>Verified Identity</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>Phone Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>Profile Complete</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>Community Member</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Guidelines */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Safety Guidelines
              </h2>
              <p className="text-lg text-neutral-600">
                Best practices for safe equipment sharing
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-4">
                    <Camera className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-xl font-bold text-neutral-900">For Equipment Owners</h3>
                  </div>
                  <ul className="space-y-3 text-neutral-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                      <span>Take clear photos of your equipment before rental</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                      <span>Meet in a public place for handoff</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                      <span>Provide clear instructions for equipment use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                      <span>Keep communication through our platform</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-xl font-bold text-neutral-900">For Renters</h3>
                  </div>
                  <ul className="space-y-3 text-neutral-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                      <span>Inspect equipment thoroughly before taking it</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                      <span>Use equipment only as intended</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                      <span>Return equipment in the same condition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                      <span>Report any issues immediately</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-neutral-900 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Need Help?
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              Our safety team is available 24/7 to help with any issues
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white text-neutral-900 hover:bg-neutral-100"
                onClick={() => window.location.href = 'tel:+972-50-123-4567'}
              >
                <Phone className="w-5 h-5 mr-2" />
                Emergency: +972-50-123-4567
              </Button>
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => window.location.href = 'mailto:safety@lendly.co.il'}
              >
                <Mail className="w-5 h-5 mr-2" />
                safety@lendly.co.il
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
