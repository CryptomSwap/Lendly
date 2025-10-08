import { Shield, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { Category } from '@/lib/types'
import { cx } from '@/lib/ui'

interface SafetySummaryProps {
  category: Category
}

export function SafetySummary({ category }: SafetySummaryProps) {
  const safetyInfo = {
    covered: [
      'Accidental damage during normal use',
      'Theft with police report',
      'Equipment malfunction',
      'Transportation damage'
    ],
    notCovered: [
      'Intentional damage or misuse',
      'Damage from unauthorized users',
      'Wear and tear from normal use',
      'Damage from extreme weather'
    ],
    deductible: '₪500',
    depositHold: 'Held securely until return',
    claimWindow: '72 hours to report issues'
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
          <Shield className="w-6 h-6 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Safety & Protection</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Covered */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            What's Covered
          </h3>
          <ul className="space-y-3">
            {safetyInfo.covered.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not Covered */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            What's Not Covered
          </h3>
          <ul className="space-y-3">
            {safetyInfo.notCovered.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 p-6 bg-slate-50 rounded-2xl">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          Important Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-slate-900 mb-2">Deductible</h4>
            <p className="text-slate-600 text-sm">{safetyInfo.deductible}</p>
          </div>
          <div>
            <h4 className="font-medium text-slate-900 mb-2">Deposit Hold</h4>
            <p className="text-slate-600 text-sm">{safetyInfo.depositHold}</p>
          </div>
          <div>
            <h4 className="font-medium text-slate-900 mb-2">Claim Window</h4>
            <p className="text-slate-600 text-sm">{safetyInfo.claimWindow}</p>
          </div>
        </div>
      </div>
    </div>
  )
}