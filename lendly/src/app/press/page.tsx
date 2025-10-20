'use client'

import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Newspaper, 
  Calendar, 
  Users, 
  TrendingUp,
  ArrowRight,
  ExternalLink
} from 'lucide-react'
import { t, getCurrentLanguage } from '@/lib/i18n'

export default function PressPage() {
  const lang = getCurrentLanguage()

  const pressReleases = [
    {
      title: "Lendly Raises ₪10M Series A to Expand Equipment Sharing Platform",
      date: "January 10, 2025",
      summary: "Funding will be used to expand to new cities and enhance platform features",
      category: "Funding"
    },
    {
      title: "Lendly Partners with Harel Insurance for Comprehensive Protection",
      date: "December 15, 2024", 
      summary: "New partnership provides enhanced insurance coverage for all platform users",
      category: "Partnership"
    },
    {
      title: "Lendly Launches in Jerusalem with 500+ Equipment Listings",
      date: "November 20, 2024",
      summary: "Platform expansion brings equipment sharing to Israel's capital city",
      category: "Expansion"
    }
  ]

  const mediaMentions = [
    {
      outlet: "TheMarker",
      title: "Israeli Sharing Economy Startup Lendly Sees 300% Growth",
      date: "January 5, 2025",
      link: "#"
    },
    {
      outlet: "Calcalist",
      title: "How Lendly is Revolutionizing Equipment Rental in Israel",
      date: "December 28, 2024",
      link: "#"
    },
    {
      outlet: "TechCrunch",
      title: "Lendly's Community-Driven Approach to Equipment Sharing",
      date: "December 10, 2024",
      link: "#"
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
                <Newspaper className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-neutral-900 mb-6">
                Press & Media
              </h1>
              <p className="text-xl text-neutral-700 max-w-3xl mx-auto mb-8">
                Stay updated on Lendly's latest news, partnerships, and milestones. 
                We're building the future of equipment sharing in Israel.
              </p>
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => window.location.href = 'mailto:press@lendly.co.il'}
              >
                Contact Press Team
              </Button>
            </div>
          </div>
        </div>

        {/* Press Releases */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Latest Press Releases
              </h2>
              <p className="text-lg text-neutral-600">
                Official announcements and company updates
              </p>
            </div>

            <div className="space-y-8">
              {pressReleases.map((release, index) => (
                <Card key={index} className="p-8">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                            {release.category}
                          </span>
                          <div className="flex items-center gap-2 text-neutral-500">
                            <Calendar className="w-4 h-4" />
                            {release.date}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                          {release.title}
                        </h3>
                        
                        <p className="text-neutral-700 mb-6">
                          {release.summary}
                        </p>
                      </div>
                      
                      <div className="lg:w-48 flex-shrink-0">
                        <Button 
                          size="lg" 
                          variant="outline"
                          className="w-full"
                        >
                          Read More
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

        {/* Media Mentions */}
        <div className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Media Coverage
              </h2>
              <p className="text-lg text-neutral-600">
                What the press is saying about Lendly
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {mediaMentions.map((mention, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm text-neutral-500">{mention.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                      {mention.title}
                    </h3>
                    
                    <p className="text-emerald-600 font-medium mb-4">
                      {mention.outlet}
                    </p>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(mention.link, '_blank')}
                    >
                      Read Article
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Company Highlights
              </h2>
              <p className="text-lg text-neutral-600">
                Key metrics and achievements
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">1,200+</div>
                <div className="text-lg font-semibold text-neutral-900 mb-2">Equipment Listings</div>
                <div className="text-neutral-600">Across Israel</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
                <div className="text-lg font-semibold text-neutral-900 mb-2">Active Users</div>
                <div className="text-neutral-600">Growing Community</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">₪50K+</div>
                <div className="text-lg font-semibold text-neutral-900 mb-2">Earned by Owners</div>
                <div className="text-neutral-600">Total Platform Earnings</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">95%</div>
                <div className="text-lg font-semibold text-neutral-900 mb-2">User Satisfaction</div>
                <div className="text-neutral-600">Based on Reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* Press Kit */}
        <div className="bg-emerald-600 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Press Kit
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Download our press kit for logos, images, and company information
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white text-emerald-600 hover:bg-emerald-50"
                onClick={() => window.location.href = '/press-kit.zip'}
              >
                Download Press Kit
              </Button>
              <Button 
                size="lg" 
                className="bg-emerald-700 hover:bg-emerald-800 text-white"
                onClick={() => window.location.href = 'mailto:press@lendly.co.il'}
              >
                Contact Press Team
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Media Contact
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              For media inquiries, interviews, or press requests
            </p>
            <div className="bg-neutral-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Sarah Chen</h3>
              <p className="text-lg text-neutral-700 mb-2">CEO & Founder</p>
              <p className="text-neutral-600 mb-4">press@lendly.co.il</p>
              <p className="text-neutral-600">+972-50-123-4567</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
