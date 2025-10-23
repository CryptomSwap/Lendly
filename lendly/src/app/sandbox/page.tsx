'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Search } from 'lucide-react'

export default function SandboxPage() {
  const [sliderValue, setSliderValue] = useState([50])
  const [switchValue, setSwitchValue] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Lendly Turquoise Color System</h1>
          <p className="text-slate-600">Preview of the new modern, trustworthy color palette</p>
        </div>

        {/* New Turquoise Buttons */}
        <Card className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-400"></div>
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-teal-500 to-cyan-400 bg-clip-text text-transparent">New Turquoise Buttons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">Primary Gradient</button>
              <button className="border-2 border-teal-500 text-teal-500 font-semibold px-6 py-3 rounded-xl hover:bg-teal-500 hover:text-white transition-all duration-300">Secondary Outline</button>
              <button className="border-2 border-teal-500 text-teal-500 font-semibold px-6 py-3 rounded-xl hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-400 hover:text-white transition-all duration-300">Outline Turquoise</button>
              <button className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                Animated Glow
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform">
                Small Gradient
              </button>
              <button className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transition-all duration-300">
                Large Gradient
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Updated Buttons */}
        <Card className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Updated Component Buttons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">Primary</Button>
              <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white">Outline</Button>
              <Button variant="secondary" className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200">Secondary</Button>
              <Button variant="ghost" className="text-teal-500 hover:bg-teal-50">Ghost</Button>
              <Button variant="link" className="text-teal-500 hover:text-teal-600">Link</Button>
            </div>
          </CardContent>
        </Card>

        {/* New Input Styles */}
        <Card className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Updated Input Styles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input className="bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 w-full" placeholder="Turquoise input style" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input className="bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 w-full pl-12" placeholder="With icon" />
            </div>
            <Input placeholder="Default component input" />
          </CardContent>
        </Card>

        {/* Updated Badges */}
        <Card className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Updated Badges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Badge className="bg-teal-100 text-teal-800">Primary</Badge>
              <Badge className="bg-cyan-100 text-cyan-800">Secondary</Badge>
              <Badge className="bg-green-100 text-green-800">Success</Badge>
              <Badge className="bg-red-100 text-red-800">Error</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
              <Badge className="bg-blue-100 text-blue-800">Info</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Gradient Cards */}
        <Card className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>New Card Styles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-400"></div>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-slate-900">Gradient Card</h3>
                  <p className="text-slate-600 text-sm">Card with turquoise gradient top border</p>
                </CardContent>
              </Card>
              <Card className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-slate-900">Clean Card</h3>
                  <p className="text-slate-600 text-sm">Clean card with subtle hover effects</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 hover:border-teal-300 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-slate-900">Subtle Gradient</h3>
                  <p className="text-slate-600 text-sm">Card with subtle gradient background</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* New Color Palette */}
        <Card className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>New Turquoise Color Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-xl mx-auto mb-2"></div>
                <span className="text-sm text-slate-600">Primary Gradient</span>
                <p className="text-xs text-slate-500">#00C6A2 → #4FD1F8</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-500 rounded-xl mx-auto mb-2"></div>
                <span className="text-sm text-slate-600">Primary</span>
                <p className="text-xs text-slate-500">#00C6A2</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-400 rounded-xl mx-auto mb-2"></div>
                <span className="text-sm text-slate-600">Secondary</span>
                <p className="text-xs text-slate-500">#4FD1F8</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-200 rounded-xl mx-auto mb-2"></div>
                <span className="text-sm text-slate-600">Primary Light</span>
                <p className="text-xs text-slate-500">#A3F0E2</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-xl mx-auto mb-2"></div>
                <span className="text-sm text-slate-600">Secondary Light</span>
                <p className="text-xs text-slate-500">#E6FAFF</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-700 rounded-xl mx-auto mb-2"></div>
                <span className="text-sm text-slate-600">Primary Dark</span>
                <p className="text-xs text-slate-500">#007C7F</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-700 rounded-xl mx-auto mb-2"></div>
                <span className="text-sm text-slate-600">Secondary Dark</span>
                <p className="text-xs text-slate-500">#005E70</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-xl mx-auto mb-2 border border-slate-200"></div>
                <span className="text-sm text-slate-600">Background</span>
                <p className="text-xs text-slate-500">#F9FAFB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography with New Colors */}
        <Card className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Updated Typography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h1 className="text-4xl font-bold text-slate-900">Heading 1</h1>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-cyan-400 bg-clip-text text-transparent">Gradient Heading 2</h2>
            <h3 className="text-2xl font-bold text-slate-900">Heading 3</h3>
            <h4 className="text-xl font-semibold text-slate-900">Heading 4</h4>
            <p className="text-lg text-slate-600">Large paragraph text</p>
            <p className="text-base text-slate-600">Regular paragraph text</p>
            <p className="text-sm text-slate-500">Small muted text</p>
            <p className="text-xs text-slate-500">Extra small text</p>
          </CardContent>
        </Card>

        {/* Interactive Elements */}
        <Card className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Interactive Elements</CardTitle>
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
                className="[&_[role=slider]]:bg-teal-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Switch: {switchValue ? 'On' : 'Off'}
              </label>
              <Switch
                checked={switchValue}
                onCheckedChange={setSwitchValue}
                className="data-[state=checked]:bg-teal-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Logo Preview */}
        <Card className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Logo Preview</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <span className="text-4xl font-bold lendly-logo">lendly.</span>
              <p className="text-slate-600">English logo with turquoise gradient</p>
              <span className="text-4xl font-bold lendly-logo">לנדלי.</span>
              <p className="text-slate-600">Hebrew logo with same gradient</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}