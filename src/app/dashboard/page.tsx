'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LennyLogo } from '@/components/LennyLogo'
import Link from 'next/link'
import { 
  ArrowLeft, 
  User, 
  Settings, 
  LogOut, 
  Plus, 
  Package, 
  Calendar,
  DollarSign,
  Star,
  MapPin
} from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status !== 'loading') {
      setIsLoading(false)
    }
  }, [status])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-warm-yellow/20 flex items-center justify-center">
        <div className="text-center">
          <LennyLogo size="lg" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Skip authentication check for demo purposes
  const demoSession = {
    user: {
      id: 'demo-user-id',
      email: 'demo@lendly.com',
      name: 'Demo User',
      role: 'USER',
      verificationStatus: 'VERIFIED'
    }
  }

  const handleSignOut = () => {
    // Skip sign out for demo purposes
    window.location.href = '/'
  }

  // Use demo session for display
  const currentSession = demoSession

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
                Dashboard
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{currentSession.user?.name || currentSession.user?.email}</span>
                <Badge variant="secondary" className="text-xs">
                  {currentSession.user?.role || 'USER'}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            Manage your rentals, bookings, and earnings from your dashboard.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Rentals</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Package className="h-8 w-8 text-coral" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">₪2,450</p>
                </div>
                <DollarSign className="h-8 w-8 text-teal" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bookings</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Calendar className="h-8 w-8 text-warm-yellow" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
                <Star className="h-8 w-8 text-warm-yellow" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { item: 'Canon EOS R5 Camera', renter: 'Sarah M.', date: 'Dec 15-17', amount: '₪450' },
                    { item: 'DJ Controller Pioneer DDJ-400', renter: 'David K.', date: 'Dec 12-14', amount: '₪300' },
                    { item: 'Professional Tripod', renter: 'Mike R.', date: 'Dec 10-12', amount: '₪120' }
                  ].map((booking, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{booking.item}</h4>
                        <p className="text-sm text-muted-foreground">
                          Rented by {booking.renter} • {booking.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{booking.amount}</p>
                        <Badge variant="secondary" className="text-xs">Completed</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Your Listings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Your Listings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Canon EOS R5 Camera', status: 'Available', bookings: 8 },
                    { name: 'DJ Controller Pioneer DDJ-400', status: 'Rented', bookings: 12 },
                    { name: 'Professional Tripod', status: 'Available', bookings: 5 }
                  ].map((listing, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{listing.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {listing.bookings} bookings this month
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={listing.status === 'Available' ? 'default' : 'secondary'}>
                          {listing.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/list-item">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Listing
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/list-item">
                    <Plus className="w-4 h-4 mr-2" />
                    List New Item
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/marketing">
                    <Calendar className="w-4 h-4 mr-2" />
                    Browse Items
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/categories">
                    <Settings className="w-4 h-4 mr-2" />
                    Browse Categories
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/how-it-works">
                    <MapPin className="w-4 h-4 mr-2" />
                    How It Works
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Profile Status */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Verified</span>
                  <Badge variant="default">✓ Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">ID Verified</span>
                  <Badge variant="default">✓ Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Method</span>
                  <Badge variant="secondary">Not Set</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Stripe Connect</span>
                  <Badge variant="secondary">Not Connected</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Earnings Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Earnings Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">This Month</span>
                    <span className="font-semibold">₪2,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Month</span>
                    <span className="font-semibold">₪1,890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Earned</span>
                    <span className="font-semibold">₪8,240</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button className="w-full" variant="outline">
                    View Detailed Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
