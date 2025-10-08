import { Shield, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cx } from '@/lib/ui'

export function SafetyBlock() {
  const safetyFeatures = [
    'ID verification',
    'Deposit hold (only captured if needed)',
    'Per-rental insurance',
    'Dispute resolution <72h'
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                Safety, built in.
              </h2>
            </div>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We've built comprehensive protection into every rental to give you peace of mind.
            </p>
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => window.location.href = '/safety'}
            >
              How protection works
            </Button>
          </div>

          {/* Right side - Features */}
          <div className="space-y-6">
            {safetyFeatures.map((feature, index) => (
              <div 
                key={feature}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-slate-900 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
