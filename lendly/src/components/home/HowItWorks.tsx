import { Search, Shield, ArrowRight } from 'lucide-react'
import { cx } from '@/lib/ui'

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Find gear',
      description: 'Search and discover equipment near you'
    },
    {
      icon: Shield,
      title: 'Book & verify',
      description: 'Secure booking with verified owners'
    },
    {
      icon: ArrowRight,
      title: 'Pick up & return',
      description: 'Easy pickup and return process'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Simple, secure, and trusted equipment rental in three easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div 
                key={step.title}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}