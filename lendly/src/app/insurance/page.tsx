'use client'

import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Users,
  Phone
} from 'lucide-react'
import { t, getCurrentLanguage } from '@/lib/i18n'

export default function InsurancePage() {
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
                Insurance & Protection
              </h1>
              <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
                Comprehensive protection for every rental. We've partnered with leading insurance 
                providers to ensure both owners and renters are fully covered.
              </p>
            </div>
          </div>
        </div>

        {/* Protection Overview */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Complete Protection Coverage
              </h2>
              <p className="text-lg text-neutral-600">
                Every rental includes multiple layers of protection at no extra cost
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Equipment Protection</h3>
                  <p className="text-neutral-600 mb-4">
                    Up to ₪10,000 coverage for accidental damage to your equipment
                  </p>
                  <div className="text-2xl font-bold text-emerald-600 mb-2">₪10,000</div>
                  <p className="text-sm text-neutral-500">Maximum Coverage</p>
                </CardContent>
              </Card>

              <Card className="p-8 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Liability Coverage</h3>
                  <p className="text-neutral-600 mb-4">
                    Protection against third-party claims and property damage
                  </p>
                  <div className="text-2xl font-bold text-emerald-600 mb-2">₪1,000,000</div>
                  <p className="text-sm text-neutral-500">Liability Limit</p>
                </CardContent>
              </Card>

              <Card className="p-8 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Theft Protection</h3>
                  <p className="text-neutral-600 mb-4">
                    Coverage for theft with police report and proper documentation
                  </p>
                  <div className="text-2xl font-bold text-emerald-600 mb-2">₪5,000</div>
                  <p className="text-sm text-neutral-500">Theft Coverage</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Coverage Details */}
        <div className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-8">
                  What's Covered
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Accidental Damage</h3>
                      <p className="text-neutral-600">Coverage for accidental damage during normal use of equipment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Third-Party Liability</h3>
                      <p className="text-neutral-600">Protection against claims from third parties for property damage or injury</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Theft Protection</h3>
                      <p className="text-neutral-600">Coverage for theft with proper documentation and police report</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Emergency Support</h3>
                      <p className="text-neutral-600">24/7 emergency support and claims assistance</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-8">
                  What's Not Covered
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Intentional Damage</h3>
                      <p className="text-neutral-600">Damage caused intentionally or through gross negligence</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Normal Wear & Tear</h3>
                      <p className="text-neutral-600">Expected wear and tear from normal use of equipment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Pre-existing Damage</h3>
                      <p className="text-neutral-600">Damage that existed before the rental period</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Commercial Use</h3>
                      <p className="text-neutral-600">Damage from commercial use without proper authorization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Claims Process */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Simple Claims Process
              </h2>
              <p className="text-lg text-neutral-600">
                We've made filing a claim as easy as possible
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Report Incident</h3>
                <p className="text-neutral-600 text-sm">
                  Report the incident immediately through our platform or by calling our support team
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Document Damage</h3>
                <p className="text-neutral-600 text-sm">
                  Take photos and provide documentation of the damage or incident
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Investigation</h3>
                <p className="text-neutral-600 text-sm">
                  Our team investigates the claim and works with all parties involved
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Resolution</h3>
                <p className="text-neutral-600 text-sm">
                  Claims are resolved quickly with fair compensation for all parties
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Partner */}
        <div className="bg-emerald-600 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Trusted Insurance Partner
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              We've partnered with Israel's leading insurance provider to ensure comprehensive coverage 
              for all rentals on our platform.
            </p>
            <div className="bg-white/10 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Harel Insurance</h3>
              <p className="text-emerald-100 mb-6">
                One of Israel's largest and most trusted insurance companies, providing 
                specialized coverage for sharing economy platforms.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">75+</div>
                  <div className="text-emerald-100 text-sm">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">2M+</div>
                  <div className="text-emerald-100 text-sm">Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">₪50B+</div>
                  <div className="text-emerald-100 text-sm">Assets Under Management</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Need Help with a Claim?
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              Our insurance team is available 24/7 to help with claims and emergencies
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
                onClick={() => window.location.href = 'mailto:insurance@lendly.co.il'}
              >
                <FileText className="w-5 h-5 mr-2" />
                insurance@lendly.co.il
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
