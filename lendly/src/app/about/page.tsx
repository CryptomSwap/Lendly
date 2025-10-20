'use client'

import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Shield, 
  Heart, 
  Globe, 
  Award, 
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { t, getCurrentLanguage } from '@/lib/i18n'

export default function AboutPage() {
  const lang = getCurrentLanguage()

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-neutral-900 mb-6">
                About Lendly
              </h1>
              <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
                We're building a trusted community where people can share equipment, 
                reduce waste, and earn money from items they're not using.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-neutral-700 mb-6">
                  Lendly connects equipment owners with people who need them, creating 
                  a sustainable sharing economy that benefits everyone. We believe in 
                  reducing waste, building community, and making quality equipment 
                  accessible to all.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-neutral-700">Reduce equipment waste</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-neutral-700">Build trusted communities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-neutral-700">Make equipment accessible</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">1,200+</div>
                    <div className="text-emerald-100">Items Shared</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">500+</div>
                    <div className="text-emerald-100">Happy Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">₪50K+</div>
                    <div className="text-emerald-100">Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">95%</div>
                    <div className="text-emerald-100">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Our Values
              </h2>
              <p className="text-lg text-neutral-600">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Trust & Safety</h3>
                  <p className="text-neutral-600">
                    We verify users and provide comprehensive protection for all transactions.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Community First</h3>
                  <p className="text-neutral-600">
                    We build genuine connections between neighbors and create lasting relationships.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Sustainability</h3>
                  <p className="text-neutral-600">
                    We promote sharing over buying, reducing waste and environmental impact.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-neutral-600">
                Passionate people building the future of sharing
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Sarah Chen</h3>
                  <p className="text-emerald-600 mb-2">CEO & Founder</p>
                  <p className="text-neutral-600 text-sm">
                    Former Airbnb product manager passionate about building trusted communities.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">David Rodriguez</h3>
                  <p className="text-emerald-600 mb-2">CTO</p>
                  <p className="text-neutral-600 text-sm">
                    Full-stack engineer with 10+ years building scalable platforms.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Rachel Kim</h3>
                  <p className="text-emerald-600 mb-2">Head of Safety</p>
                  <p className="text-neutral-600 text-sm">
                    Former insurance executive focused on user protection and trust.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-emerald-600 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Start sharing your equipment or find what you need today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white text-emerald-600 hover:bg-emerald-50"
                onClick={() => window.location.href = '/list'}
              >
                List Your Item
              </Button>
              <Button 
                size="lg" 
                className="bg-emerald-700 hover:bg-emerald-800 text-white"
                onClick={() => window.location.href = '/browse'}
              >
                Browse Equipment
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
