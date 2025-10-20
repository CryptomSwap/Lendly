'use client'

import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle
} from 'lucide-react'
import { t, getCurrentLanguage } from '@/lib/i18n'
import { useState } from 'react'

export default function ContactPage() {
  const lang = getCurrentLanguage()
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', contactForm)
    alert('Thank you for your message! We\'ll get back to you within 24 hours.')
    setContactForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-neutral-900 mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
                Have a question or need help? We'd love to hear from you. 
                Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info & Form */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-8">
                  Get in Touch
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Email</h3>
                      <p className="text-neutral-600 mb-1">General inquiries</p>
                      <p className="text-emerald-600 font-medium">hello@lendly.co.il</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Phone</h3>
                      <p className="text-neutral-600 mb-1">Mon-Fri 9AM-6PM</p>
                      <p className="text-emerald-600 font-medium">+972-50-123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Office</h3>
                      <p className="text-neutral-600 mb-1">Visit us in Tel Aviv</p>
                      <p className="text-emerald-600 font-medium">
                        Rothschild Blvd 1<br />
                        Tel Aviv, Israel 66881
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Business Hours</h3>
                      <p className="text-neutral-600 mb-1">We're here to help</p>
                      <p className="text-emerald-600 font-medium">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Options */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                    Quick Contact
                  </h3>
                  <div className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.location.href = 'mailto:hello@lendly.co.il'}
                    >
                      <Mail className="w-5 h-5 mr-3" />
                      Send us an email
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.location.href = 'tel:+972-50-123-4567'}
                    >
                      <Phone className="w-5 h-5 mr-3" />
                      Call us now
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.location.href = '/help'}
                    >
                      <MessageCircle className="w-5 h-5 mr-3" />
                      Visit Help Center
                    </Button>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="p-8">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                      Send us a Message
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          rows={6}
                          value={contactForm.message}
                          onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Tell us how we can help you..."
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Common Questions
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Check out our FAQ section for quick answers to common questions
            </p>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = '/help'}
            >
              View FAQ
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
