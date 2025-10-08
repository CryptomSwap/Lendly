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
  Heart,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react'
import { formatILS } from '@/lib/currency'
import { cx } from '@/lib/ui'

export default function TestPage() {
  const [sliderValue, setSliderValue] = useState([50])
  const [switchValue, setSwitchValue] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, result])
  }

  const testButton = () => {
    addTestResult('✅ Button click works')
  }

  const testInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    addTestResult(`✅ Input change: ${e.target.value}`)
  }

  const testSlider = (value: number[]) => {
    setSliderValue(value)
    addTestResult(`✅ Slider value: ${value[0]}`)
  }

  const testSwitch = (checked: boolean) => {
    setSwitchValue(checked)
    addTestResult(`✅ Switch: ${checked ? 'on' : 'off'}`)
  }

  return (
    <div className="min-h-screen bg-fog p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Lendly Component Test</h1>
          <p className="text-slate-600">Testing all components and functionality</p>
        </div>

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {testResults.length === 0 ? (
                <p className="text-slate-500">No tests run yet. Click buttons and interact with components below.</p>
              ) : (
                testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono bg-slate-50 p-2 rounded">
                    {result}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Buttons Test */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button onClick={testButton}>Primary Button</Button>
              <Button variant="outline" onClick={testButton}>Outline Button</Button>
              <Button variant="secondary" onClick={testButton}>Secondary Button</Button>
              <Button variant="ghost" onClick={testButton}>Ghost Button</Button>
              <Button variant="link" onClick={testButton}>Link Button</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm" onClick={testButton}>Small</Button>
              <Button size="default" onClick={testButton}>Default</Button>
              <Button size="lg" onClick={testButton}>Large</Button>
            </div>
          </CardContent>
        </Card>

        {/* Inputs Test */}
        <Card>
          <CardHeader>
            <CardTitle>Inputs Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="Type something..." 
              onChange={testInput}
            />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input 
                placeholder="Search with icon..." 
                className="pl-12"
                onChange={testInput}
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Controls Test */}
        <Card>
          <CardHeader>
            <CardTitle>Form Controls Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Slider: {sliderValue[0]}
              </label>
              <Slider
                value={sliderValue}
                onValueChange={testSlider}
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
                onCheckedChange={testSwitch}
              />
            </div>
          </CardContent>
        </Card>

        {/* Badges Test */}
        <Card>
          <CardHeader>
            <CardTitle>Badges Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge className="bg-emerald-100 text-emerald-700">Success</Badge>
              <Badge className="bg-red-100 text-red-700">Error</Badge>
              <Badge className="bg-amber-100 text-amber-700">Warning</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Icons Test */}
        <Card>
          <CardHeader>
            <CardTitle>Icons Test</CardTitle>
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

        {/* Currency Test */}
        <Card>
          <CardHeader>
            <CardTitle>Currency Formatting Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>formatILS(150): {formatILS(150)}</div>
              <div>formatILS(1250): {formatILS(1250)}</div>
              <div>formatILS(12500): {formatILS(12500)}</div>
            </div>
          </CardContent>
        </Card>

        {/* Status Indicators */}
        <Card>
          <CardHeader>
            <CardTitle>Status Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Success</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span>Error</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Warning</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
