'use client'

import { useState } from 'react'
import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Plus,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Star,
  Settings,
  Bell
} from 'lucide-react'
import { formatILS } from '@/lib/currency'
import { cx } from '@/lib/ui'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock dashboard data
  const dashboardData = {
    stats: {
      totalEarnings: 12500,
      monthlyEarnings: 3200,
      totalBookings: 45,
      activeListings: 3,
      averageRating: 4.8,
      responseRate: 98
    }
  }

  return (
    <div className="min-h-screen bg-fog">
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-[1200px] mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">
                  Dashboard
                </h1>
                <p className="text-lg text-slate-600">
                  Manage your equipment listings and bookings
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Listing
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white border border-slate-200 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Earnings</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {formatILS(dashboardData.stats.totalEarnings)}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 font-medium">+12%</span>
                      <span className="text-sm text-slate-500">vs last month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Listings</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {dashboardData.stats.activeListings}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 font-medium">+1</span>
                      <span className="text-sm text-slate-500">this month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-sky-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Bookings</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {dashboardData.stats.totalBookings}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 font-medium">+8</span>
                      <span className="text-sm text-slate-500">this month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Average Rating</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {dashboardData.stats.averageRating}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm text-slate-500">from 45 reviews</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white border border-slate-200 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Dashboard Coming Soon
                    </h3>
                    <p className="text-slate-600">
                      Full dashboard functionality will be implemented here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-white border border-slate-200 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Listing
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Calendar
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
