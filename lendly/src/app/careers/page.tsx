'use client'

import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Briefcase, 
  Users, 
  MapPin, 
  Calendar,
  ArrowRight,
  CheckCircle,
  Heart
} from 'lucide-react'
import { t, getCurrentLanguage } from '@/lib/i18n'

export default function CareersPage() {
  const lang = getCurrentLanguage()

  const openPositions = [
    {
      title: "Senior Full-Stack Developer",
      location: "Tel Aviv, Israel",
      type: "Full-time",
      department: "Engineering",
      description: "Join our engineering team to build the future of equipment sharing. We're looking for experienced developers who are passionate about creating scalable, user-friendly platforms.",
      requirements: [
        "5+ years of full-stack development experience",
        "Proficiency in React, Node.js, and TypeScript",
        "Experience with cloud platforms (AWS/GCP)",
        "Strong understanding of database design",
        "Experience with payment systems integration"
      ]
    },
    {
      title: "Product Manager",
      location: "Tel Aviv, Israel", 
      type: "Full-time",
      department: "Product",
      description: "Lead product strategy and execution for our growing platform. Work closely with engineering, design, and business teams to deliver features that users love.",
      requirements: [
        "3+ years of product management experience",
        "Experience with marketplace or sharing economy platforms",
        "Strong analytical and problem-solving skills",
        "Excellent communication and leadership abilities",
        "Experience with user research and data analysis"
      ]
    },
    {
      title: "Customer Success Manager",
      location: "Remote",
      type: "Full-time", 
      department: "Customer Success",
      description: "Help our users succeed on the platform by providing exceptional support and building relationships. You'll be the voice of our customers within the company.",
      requirements: [
        "2+ years of customer success experience",
        "Excellent communication skills in Hebrew and English",
        "Experience with CRM systems",
        "Strong problem-solving abilities",
        "Passion for helping others succeed"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-neutral-900 mb-6">
                Join Our Team
              </h1>
              <p className="text-xl text-neutral-700 max-w-3xl mx-auto mb-8">
                Help us build the future of equipment sharing. We're looking for passionate, 
                talented people who want to make a difference in how communities share resources.
              </p>
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => window.location.href = '#open-positions'}
              >
                View Open Positions
              </Button>
            </div>
          </div>
        </div>

        {/* Why Work With Us */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Why Work at Lendly?
              </h2>
              <p className="text-lg text-neutral-600">
                We're building something meaningful that makes a real impact
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Meaningful Mission</h3>
                  <p className="text-neutral-600">
                    Help reduce waste and build stronger communities through sharing economy
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Great Team</h3>
                  <p className="text-neutral-600">
                    Work with talented, passionate people who care about making a difference
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Growth Opportunity</h3>
                  <p className="text-neutral-600">
                    Fast-growing startup with opportunities to learn and advance your career
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Benefits & Perks
              </h2>
              <p className="text-lg text-neutral-600">
                We take care of our team so they can do their best work
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Health Insurance</h3>
                <p className="text-neutral-600 text-sm">Comprehensive health coverage for you and your family</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Flexible Hours</h3>
                <p className="text-neutral-600 text-sm">Work when you're most productive</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Remote Work</h3>
                <p className="text-neutral-600 text-sm">Work from anywhere in Israel</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Learning Budget</h3>
                <p className="text-neutral-600 text-sm">₪5,000 annual budget for courses and conferences</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Equity Options</h3>
                <p className="text-neutral-600 text-sm">Share in the company's success</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Team Events</h3>
                <p className="text-neutral-600 text-sm">Regular team building and social activities</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Modern Office</h3>
                <p className="text-neutral-600 text-sm">Beautiful office in central Tel Aviv</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Equipment</h3>
                <p className="text-neutral-600 text-sm">Latest MacBook and tools you need</p>
              </div>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div id="open-positions" className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Open Positions
              </h2>
              <p className="text-lg text-neutral-600">
                Join our growing team and help shape the future of sharing
              </p>
            </div>

            <div className="space-y-8">
              {openPositions.map((position, index) => (
                <Card key={index} className="p-8">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-2xl font-bold text-neutral-900">{position.title}</h3>
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                            {position.department}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6 mb-4 text-neutral-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {position.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {position.type}
                          </div>
                        </div>
                        
                        <p className="text-neutral-700 mb-6">{position.description}</p>
                        
                        <div>
                          <h4 className="text-lg font-semibold text-neutral-900 mb-3">Requirements:</h4>
                          <ul className="list-disc list-inside text-neutral-700 space-y-1">
                            {position.requirements.map((req, reqIndex) => (
                              <li key={reqIndex}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="lg:w-48 flex-shrink-0">
                        <Button 
                          size="lg" 
                          className="w-full bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => window.location.href = `mailto:careers@lendly.co.il?subject=Application for ${position.title}`}
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-emerald-600 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Don't See Your Role?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              We're always looking for talented people. Send us your resume and tell us how you'd like to contribute.
            </p>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white text-emerald-600 hover:bg-emerald-50"
              onClick={() => window.location.href = 'mailto:careers@lendly.co.il'}
            >
              Send Your Resume
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
