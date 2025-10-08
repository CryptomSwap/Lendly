import { Plus, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cx } from '@/lib/ui'

export function OwnersCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-50 to-sky-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
            <TrendingUp className="w-3 h-3 mr-1" />
            For Equipment Owners
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Your gear, your price.
            <span className="block text-emerald">We handle the rest.</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Turn your equipment into income. We provide the platform, insurance, and support 
            so you can focus on what you do best.
          </p>
          
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            List Your Gear
          </Button>
        </div>
      </div>
    </section>
  )
}
