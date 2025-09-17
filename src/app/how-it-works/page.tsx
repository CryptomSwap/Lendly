'use client'

import { LennyLogo } from '@/components/LennyLogo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft, Search, Handshake, Star, Shield, Clock, Users, MapPin, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: '1. Search & Book',
    description: 'Find the perfect gear for your needs and book instantly with secure payments.',
    details: [
      'Browse by category or search for specific items',
      'Filter by location, price, and availability',
      'View detailed photos and descriptions',
      'Book with instant confirmation'
    ]
  },
  {
    icon: Handshake,
    title: '2. Meet & Rent',
    description: 'Connect with the owner, pick up your gear, and start your adventure!',
    details: [
      'Coordinate pickup time and location',
      'Meet the owner in person',
      'Inspect the equipment together',
      'Start using your rented gear'
    ]
  },
  {
    icon: Star,
    title: '3. Return & Review',
    description: 'Return the gear and leave a review to help the community grow.',
    details: [
      'Return equipment in good condition',
      'Leave honest reviews and ratings',
      'Help build trust in the community',
      'Earn rewards for good behavior'
    ]
  }
]

const features = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'Every rental is protected with comprehensive insurance coverage.',
    color: 'text-coral'
  },
  {
    icon: Clock,
    title: 'Instant Booking',
    description: 'Find, book, and pay in minutes. No waiting, no hassle.',
    color: 'text-teal'
  },
  {
    icon: Users,
    title: 'Verified Community',
    description: 'All users are verified with ID checks and background screening.',
    color: 'text-warm-yellow'
  },
  {
    icon: MapPin,
    title: 'Local Network',
    description: 'Connect with owners in your neighborhood for easy pickup.',
    color: 'text-purple-500'
  }
]

const faqs = [
  {
    question: 'How does insurance work?',
    answer: 'Every rental is automatically covered by our comprehensive insurance policy. This protects both renters and owners from damage, theft, and liability issues.'
  },
  {
    question: 'What if I damage the equipment?',
    answer: 'Minor wear and tear is expected. For significant damage, our insurance will cover the costs. You\'ll only be responsible for the deductible amount.'
  },
  {
    question: 'How do I get verified?',
    answer: 'Simply upload a photo of your ID and complete our verification process. This helps build trust in our community and unlocks additional features.'
  },
  {
    question: 'Can I cancel my booking?',
    answer: 'Yes! You can cancel up to 24 hours before pickup for a full refund. Cancellations within 24 hours may incur a small fee.'
  },
  {
    question: 'How do payments work?',
    answer: 'We use secure payment processing to handle all transactions. Payments are held in escrow until the rental is completed successfully.'
  },
  {
    question: 'What if the owner doesn\'t show up?',
    answer: 'If an owner fails to show up for pickup, you\'ll receive a full refund and we\'ll help you find alternative equipment.'
  }
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-warm-yellow/20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <LennyLogo size="md" />
                <span className="text-xl font-bold bg-gradient-to-r from-coral to-teal bg-clip-text text-transparent">
                  Lendly
                </span>
              </Link>
              <div className="text-sm text-muted-foreground">
                How it Works
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">How Lendly Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Renting equipment has never been easier. Here's how our platform makes gear sharing simple, safe, and profitable for everyone.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Simple 3-Step Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-coral to-teal rounded-2xl flex items-center justify-center mx-auto">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {step.description}
                  </p>
                  <ul className="text-left space-y-2 text-sm text-muted-foreground">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Lendly?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <feature.icon className={`w-12 h-12 ${feature.color} mx-auto`} />
                  <h4 className="text-xl font-semibold">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-3">
                  <h4 className="font-semibold text-lg">{faq.question}</h4>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-coral to-teal text-white p-8">
            <CardContent className="space-y-6">
              <h3 className="text-3xl font-bold">Ready to get started?</h3>
              <p className="text-xl opacity-90">
                Join thousands of satisfied customers who trust Lendly for their equipment needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-coral hover:bg-gray-50" asChild>
                  <Link href="/marketing">
                    Start Renting
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-coral" asChild>
                  <Link href="/auth/signup">
                    List Your Equipment
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
