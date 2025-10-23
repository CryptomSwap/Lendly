'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Camera, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Plus,
  X
} from 'lucide-react'
import { t, getCurrentLanguage } from '@/lib/i18n'

export default function ListItemPage() {
  const router = useRouter()
  const lang = getCurrentLanguage()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    pricePerDay: '',
    location: '',
    images: [] as string[],
    features: [] as string[],
    availability: 'flexible'
  })

  const categories = [
    'cameras', 'drones', 'construction', 'gardening', 
    'event-equipment', 'power-tools', 'camping', 'audio-pa'
  ]

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }))
  }

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }))
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = () => {
    // In a real app, this would submit to your API
    console.log('Submitting listing:', formData)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                {t('navigation.listItem', lang)}
              </h1>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Share your equipment with trusted renters and earn money from items you're not using
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center justify-center space-x-8">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-neutral-200 text-neutral-600'
                  }`}>
                    {step > stepNum ? <CheckCircle className="w-4 h-4" /> : stepNum}
                  </div>
                  {stepNum < 4 && (
                    <div className={`w-16 h-0.5 ml-4 ${
                      step > stepNum ? 'bg-emerald-600' : 'bg-neutral-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-16 text-sm text-neutral-600">
              <span>Basic Info</span>
              <span>Details</span>
              <span>Pricing</span>
              <span>Review</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Card>
            <CardContent className="p-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Basic Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Item Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Professional DSLR Camera"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {t(`categories.${cat}`, lang)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your item, its condition, and any special features..."
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                          <Input
                            id="location"
                            placeholder="City, State"
                            className="pl-10"
                            value={formData.location}
                            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Item Details</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <Label>Features & Specifications</Label>
                        <div className="space-y-2 mt-2">
                          {formData.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Input
                                placeholder="e.g., 4K video recording, Weather sealed"
                                value={feature}
                                onChange={(e) => updateFeature(index, e.target.value)}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeFeature(index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            onClick={addFeature}
                            className="flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Feature
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label>Photos</Label>
                        <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center">
                          <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                          <p className="text-neutral-600 mb-2">Upload photos of your item</p>
                          <p className="text-sm text-neutral-500">Drag and drop or click to browse</p>
                          <Button variant="outline" className="mt-4">
                            Choose Photos
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Pricing & Availability</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="price">Daily Rate</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                          <Input
                            id="price"
                            type="number"
                            placeholder="0"
                            className="pl-10"
                            value={formData.pricePerDay}
                            onChange={(e) => setFormData(prev => ({ ...prev, pricePerDay: e.target.value }))}
                          />
                        </div>
                        <p className="text-sm text-neutral-500 mt-1">Price per day in ILS</p>
                      </div>

                      <div>
                        <Label>Availability</Label>
                        <Select value={formData.availability} onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="flexible">Flexible - Available most days</SelectItem>
                            <SelectItem value="weekends">Weekends only</SelectItem>
                            <SelectItem value="weekdays">Weekdays only</SelectItem>
                            <SelectItem value="custom">Custom schedule</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-emerald-600 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-emerald-900">Protection Included</h3>
                            <p className="text-sm text-emerald-700 mt-1">
                              All rentals include damage protection and liability coverage at no extra cost to you.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Review & Publish</h2>
                    
                    <div className="bg-neutral-50 rounded-lg p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <Camera className="w-8 h-8 text-neutral-400" />
                        <div>
                          <h3 className="font-medium text-neutral-900">{formData.title}</h3>
                          <p className="text-sm text-neutral-600">{formData.category}</p>
                        </div>
                      </div>
                      
                      <p className="text-neutral-700">{formData.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {formData.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {formData.pricePerDay} ILS/day
                        </div>
                      </div>

                      {formData.features.length > 0 && (
                        <div>
                          <h4 className="font-medium text-neutral-900 mb-2">Features:</h4>
                          <div className="flex flex-wrap gap-2">
                            {formData.features.map((feature, index) => (
                              <Badge key={index} variant="secondary">{feature}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => step > 1 ? setStep(step - 1) : router.back()}
                >
                  Back
                </Button>
                
                {step < 4 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Publish Listing
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
