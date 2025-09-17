'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MapPin, Calendar, Search, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Locale, t } from '@/lib/i18n'
import { categories } from '@/lib/mock'
import { getCurrentLocation, storeUserLocation, getCityFromGeo } from '@/lib/geo'

interface SearchBarProps {
  locale: Locale
}

export function SearchBar({ locale }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [city, setCity] = useState(searchParams.get('city') || '')
  const [startDate, setStartDate] = useState(searchParams.get('start') || '')
  const [endDate, setEndDate] = useState(searchParams.get('end') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const isRTL = locale === 'he'

  // Update URL when search parameters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (startDate) params.set('start', startDate)
    if (endDate) params.set('end', endDate)
    if (category) params.set('category', category)
    
    const queryString = params.toString()
    const newUrl = queryString ? `/?${queryString}` : '/'
    
    if (window.location.pathname + window.location.search !== newUrl) {
      router.replace(newUrl)
    }
  }, [city, startDate, endDate, category, router])

  const handleGeolocate = async () => {
    setIsLoadingLocation(true)
    try {
      const coordinates = await getCurrentLocation()
      storeUserLocation(coordinates)
      const cityName = await getCityFromGeo(coordinates)
      setCity(cityName)
    } catch (error) {
      console.error('Failed to get location:', error)
      // Fallback to Tel Aviv
      setCity('Tel Aviv')
    } finally {
      setIsLoadingLocation(false)
    }
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (startDate) params.set('start', startDate)
    if (endDate) params.set('end', endDate)
    if (category) params.set('category', category)
    
    const queryString = params.toString()
    const searchUrl = queryString ? `/il/tel-aviv?${queryString}` : '/il/tel-aviv'
    router.push(searchUrl)
  }

  const clearFilters = () => {
    setCity('')
    setStartDate('')
    setEndDate('')
    setCategory('')
  }

  const hasActiveFilters = city || startDate || endDate || category

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Location Input */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder={t(locale, 'searchPlaceholder')}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="pl-10 pr-10 h-12"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGeolocate}
              disabled={isLoadingLocation}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>

          {/* Date Range Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-12 justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {startDate && endDate 
                  ? `${startDate} - ${endDate}`
                  : t(locale, 'selectDates')
                }
              </Button>
            </SheetTrigger>
            <SheetContent className="w-96">
              <SheetHeader>
                <SheetTitle>{t(locale, 'selectDates')}</SheetTitle>
                <SheetDescription>
                  {t(locale, 'selectDatesDescription')}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    {t(locale, 'startDate')}
                  </label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    {t(locale, 'endDate')}
                  </label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Category Select */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={t(locale, 'selectCategory')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  <div className="flex items-center space-x-2">
                    <span>{cat.icon}</span>
                    <span>{isRTL ? cat.nameHe : cat.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Button */}
          <Button onClick={handleSearch} className="h-12 bg-emerald-600 hover:bg-emerald-700">
            <Search className="mr-2 h-4 w-4" />
            {t(locale, 'search')}
          </Button>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">{t(locale, 'activeFilters')}</span>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                {t(locale, 'clearAll')}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {city && (
                <div className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                  📍 {city}
                </div>
              )}
              {startDate && endDate && (
                <div className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                  📅 {startDate} - {endDate}
                </div>
              )}
              {category && (
                <div className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                  {categories.find(c => c.id === category)?.icon} {categories.find(c => c.id === category)?.[isRTL ? 'nameHe' : 'name']}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}