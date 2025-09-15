'use client'

import { LennyLogo } from '@/components/LennyLogo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Shield, Clock, Users, Star, MapPin } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-cream to-warm-yellow/20">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6F61' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            {/* Logo and Title */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <LennyLogo size="lg" />
              <h1 className="text-6xl font-extrabold bg-gradient-to-r from-coral to-teal bg-clip-text text-transparent">
                Lendly
              </h1>
            </div>
            
            {/* Main Headline */}
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Rent cool stuff in{' '}
                <span className="bg-gradient-to-r from-coral to-teal bg-clip-text text-transparent">
                  Tel Aviv
                </span>
              </h2>
              <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                🎥 🎧 🔧 ⛺ Insured, verified, instant. Book in minutes. Earn from your gear when you're not using it.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-coral to-teal hover:from-coral/90 hover:to-teal/90 text-white shadow-lg">
                <MapPin className="w-5 h-5 mr-2" />
                Start Renting
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 hover:bg-coral/10">
                List Your Gear
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-teal" />
                <span>Insured & Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-coral" />
                <span>Instant Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-warm-yellow" />
                <span>Local Community</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Why choose Lendly?</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make gear rental simple, safe, and profitable for everyone in Tel Aviv
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-coral to-coral/80 rounded-2xl flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-semibold">Fully Insured</h4>
                <p className="text-muted-foreground">
                  Every rental is protected with comprehensive insurance. Rent with confidence knowing you're covered.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal to-teal/80 rounded-2xl flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-semibold">Instant Booking</h4>
                <p className="text-muted-foreground">
                  Find, book, and pay in minutes. No waiting, no hassle. Get your gear when you need it.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-warm-yellow to-warm-yellow/80 rounded-2xl flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-semibold">Verified Community</h4>
                <p className="text-muted-foreground">
                  All users are verified with ID checks. Build trust through reviews and ratings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-cream/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Popular Categories</h3>
            <p className="text-xl text-muted-foreground">
              From cameras to camping gear, find what you need
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { emoji: '📷', label: 'Cameras & Drones', count: '24 items' },
              { emoji: '🎧', label: 'DJ & Party', count: '18 items' },
              { emoji: '🏠', label: 'Event Appliances', count: '12 items' },
              { emoji: '🔧', label: 'Handyman Tools', count: '31 items' },
              { emoji: '⛺', label: 'Camping & Outdoors', count: '15 items' }
            ].map((category) => (
              <Card 
                key={category.label}
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 p-6 text-center group"
              >
                <CardContent className="space-y-3">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {category.emoji}
                  </div>
                  <h4 className="font-semibold text-lg">{category.label}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="px-8">
              <Link href="/marketing">
                Browse All Categories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Trusted by Tel Aviv</h3>
            <p className="text-xl text-muted-foreground">
              Join hundreds of satisfied renters and owners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-coral mb-2">500+</div>
              <div className="text-muted-foreground">Active Renters</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal mb-2">200+</div>
              <div className="text-muted-foreground">Verified Owners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-warm-yellow mb-2">1,200+</div>
              <div className="text-muted-foreground">Successful Rentals</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warm-yellow text-warm-yellow" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Lendly made it so easy to rent a professional camera for my wedding. The owner was super helpful and the whole process was seamless!"
                </p>
                <div className="font-semibold">- Sarah M., Tel Aviv</div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warm-yellow text-warm-yellow" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "I've been earning extra income from my DJ equipment that was just sitting in my closet. Lendly handles everything!"
                </p>
                <div className="font-semibold">- David K., Ramat Gan</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-coral to-teal text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-4">Ready to get started?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join the Tel Aviv gear sharing community today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
              <MapPin className="w-5 h-5 mr-2" />
              Start Renting Now
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-coral">
              List Your Gear
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}