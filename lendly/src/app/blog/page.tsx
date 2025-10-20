'use client'

import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Calendar, 
  Users, 
  TrendingUp,
  ArrowRight
} from 'lucide-react'

export default function BlogPage() {
  const blogPosts = [
    {
      title: "5 Tips for Successful Equipment Rentals",
      excerpt: "Learn how to maximize your earnings and build a great reputation as an equipment owner.",
      date: "January 15, 2025",
      category: "Tips"
    },
    {
      title: "The Future of Sharing Economy in Israel",
      excerpt: "How platforms like Lendly are changing the way Israelis think about ownership and consumption.",
      date: "January 10, 2025", 
      category: "Industry"
    },
    {
      title: "Safety First: Best Practices for Equipment Sharing",
      excerpt: "Essential safety guidelines for both equipment owners and renters.",
      date: "January 5, 2025",
      category: "Safety"
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="pt-16">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-neutral-900 mb-6">Blog</h1>
              <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
                Insights, tips, and stories from the Lendly community
              </p>
            </div>
          </div>
        </div>

        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="space-y-8">
              {blogPosts.map((post, index) => (
                <Card key={index} className="p-8">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-2 text-neutral-500">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                          {post.title}
                        </h3>
                        
                        <p className="text-neutral-700 mb-6">
                          {post.excerpt}
                        </p>
                      </div>
                      
                      <div className="lg:w-48 flex-shrink-0">
                        <Button size="lg" variant="outline" className="w-full">
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
      </main>
      <Footer />
    </div>
  )
}
