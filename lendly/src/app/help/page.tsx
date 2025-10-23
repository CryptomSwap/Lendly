'use client'

import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { t, getCurrentLanguage } from '@/lib/i18n'
import { useState } from 'react'

export default function HelpPage() {
  const lang = getCurrentLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const faqs = [
    {
      question: "How do I list my equipment?",
      answer: "Click the 'List Your Item' button, fill out the form with your equipment details, add photos, set your price, and publish your listing. It's that simple!"
    },
    {
      question: "What protection do I have as an owner?",
      answer: "All rentals include damage protection up to ₪10,000 and liability coverage up to ₪1,000,000 at no extra cost to you."
    },
    {
      question: "How do I contact a renter?",
      answer: "Use our built-in messaging system to communicate with renters. Never share personal contact information outside the platform."
    },
    {
      question: "What if my equipment gets damaged?",
      answer: "Report the damage immediately through our platform. We'll handle the claim process and ensure you're compensated fairly."
    },
    {
      question: "How do I get paid?",
      answer: "Payments are processed automatically after each rental. You'll receive your earnings (minus our small service fee) within 2-3 business days."
    },
    {
      question: "Can I cancel a booking?",
      answer: "Yes, you can cancel bookings up to 24 hours before the rental start time. Cancellations closer to the date may incur fees."
    }
  ]

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to your support system
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
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-neutral-900 mb-6">
                Help Center
              </h1>
              <p className="text-xl text-neutral-700 max-w-3xl mx-auto mb-8">
                Find answers to common questions or get in touch with our support team
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <Input
                    placeholder="Search for help..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 text-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Help */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Quick Help
              </h2>
              <p className="text-lg text-neutral-600">
                Get help with the most common topics
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Getting Started</h3>
                  <p className="text-neutral-600 mb-6">
                    Learn how to create your first listing or make your first rental
                  </p>
                  <Button variant="outline" className="w-full">
                    View Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Safety & Protection</h3>
                  <p className="text-neutral-600 mb-6">
                    Understand our safety measures and protection policies
                  </p>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Contact Support</h3>
                  <p className="text-neutral-600 mb-6">
                    Can't find what you're looking for? We're here to help
                  </p>
                  <Button variant="outline" className="w-full">
                    Get Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-neutral-600">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="p-0">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-neutral-600">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Still Need Help?
              </h2>
              <p className="text-lg text-neutral-600">
                Send us a message and we'll get back to you within 24 hours
              </p>
            </div>

            <Card className="p-8">
              <CardContent className="p-0">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-neutral-900 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Other Ways to Reach Us
              </h2>
              <p className="text-xl text-neutral-300">
                We're here to help in whatever way works best for you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phone Support</h3>
                <p className="text-neutral-300 mb-4">Mon-Fri 9AM-6PM</p>
                <p className="text-emerald-400 font-medium">+972-50-123-4567</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                <p className="text-neutral-300 mb-4">24/7 Response</p>
                <p className="text-emerald-400 font-medium">support@lendly.co.il</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
                <p className="text-neutral-300 mb-4">Available Now</p>
                <Button variant="outline" className="bg-white text-neutral-900 hover:bg-neutral-100">
                  Start Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
