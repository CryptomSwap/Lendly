import { cx } from '@/lib/ui'
import { Category } from '@/lib/types'

interface SpecsBlockProps {
  specs: Record<string, string>
  category: Category
}

export function SpecsBlock({ specs, category }: SpecsBlockProps) {
  const specEntries = Object.entries(specs)

  if (specEntries.length === 0) {
    return null
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-slate-900 mb-4">Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specEntries.map(([key, value]) => (
          <div key={key} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0">
            <span className="text-slate-600 font-medium capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
            <span className="text-slate-900 font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}