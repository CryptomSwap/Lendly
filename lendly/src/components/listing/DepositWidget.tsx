import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Info } from 'lucide-react'
import { formatILS } from '@/lib/currency'
import { cx } from '@/lib/ui'

interface DepositWidgetProps {
  amount: number
  explanation: string[]
}

export function DepositWidget({ amount, explanation }: DepositWidgetProps) {
  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Security Deposit</h4>
            <p className="text-sm text-slate-600">Held securely until return</p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600">Deposit Amount</span>
            <span className="text-xl font-bold text-slate-900">
              {formatILS(amount)}
            </span>
          </div>
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            <Info className="w-3 h-3 mr-1" />
            Only charged if needed
          </Badge>
        </div>
        
        <div className="space-y-2">
          <h5 className="font-medium text-slate-900 text-sm">How it works:</h5>
          <ul className="space-y-1">
            {explanation.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}