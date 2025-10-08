'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { 
  Search, 
  MapPin, 
  Calendar,
  Star,
  Shield,
  Zap,
  Heart
} from 'lucide-react'
import { formatILS } from '@/lib/currency'
import { cx } from '@/lib/ui'

export default function SandboxPage() {
  const [sliderValue, setSliderValue] = useState([50])
  const [switchValue, setSwitchValue] = useState(false)

  return (
    <div className="min-h-screen bg-fog p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Lendly Component Sandbox</h1>
          <p className="text-slate-600">Testing all components and design system</p>
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button>Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardContent>
        </Card>

        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Default input" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input placeholder="With icon" className="pl-12" />
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge className="bg-emerald-100 text-emerald-700">Success</Badge>
              <Badge className="bg-red-100 text-red-700">Error</Badge>
              <Badge className="bg-amber-100 text-amber-700">Warning</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Hover Card</h3>
                  <p className="text-slate-600 text-sm">This card has hover effects</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Regular Card</h3>
                  <p className="text-slate-600 text-sm">Standard card styling</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Another Card</h3>
                  <p className="text-slate-600 text-sm">More card content</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Form Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Form Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Slider: {sliderValue[0]}
              </label>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Switch: {switchValue ? 'On' : 'Off'}
              </label>
              <Switch
                checked={switchValue}
                onCheckedChange={setSwitchValue}
              />
            </div>
          </CardContent>
        </Card>

        {/* Icons */}
        <Card>
          <CardHeader>
            <CardTitle>Icons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-4">
              <div className="text-center">
                <Search className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <span className="text-xs text-slate-600">Search</span>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <span className="text-xs text-slate-600">MapPin</span>
              </div>
              <div className="text-center">
                <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <span className="text-xs text-slate-600">Calendar</span>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <span className="text-xs text-slate-600">Star</span>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <span className="text-xs text-slate-600">Shield</span>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <span className="text-xs text-slate-600">Heart</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald rounded-xl mx-auto mb-2"></div>
                <span className="text-sm text-slate-600">Emerald</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-sky rounded-xl mx-auto mb-2"></div>
                <span className="text-sm text-slate-600">Sky</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-900 rounded-xl mx-auto mb-2"></div>
                <span className="text-sm text-slate-600">Slate 900</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-fog rounded-xl mx-auto mb-2 border border-slate-200"></div>
                <span className="text-sm text-slate-600">Fog</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h1 className="text-4xl font-bold text-slate-900">Heading 1</h1>
            <h2 className="text-3xl font-bold text-slate-900">Heading 2</h2>
            <h3 className="text-2xl font-bold text-slate-900">Heading 3</h3>
            <h4 className="text-xl font-semibold text-slate-900">Heading 4</h4>
            <p className="text-lg text-slate-600">Large paragraph text</p>
            <p className="text-base text-slate-600">Regular paragraph text</p>
            <p className="text-sm text-slate-600">Small paragraph text</p>
            <p className="text-xs text-slate-500">Extra small text</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
