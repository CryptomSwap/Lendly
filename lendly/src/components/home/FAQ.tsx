'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cx } from '@/lib/ui'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'How does the insurance work?',
      answer: 'Every rental is automatically covered by our comprehensive insurance policy. This includes protection against damage, theft, and liability. The insurance is included in the rental price, so you don\'t need to worry about additional costs.'
    },
    {
      question: 'What happens if the equipment is damaged?',
      answer: 'If equipment is damaged during your rental period, our insurance will cover the repair or replacement costs. You\'ll only be responsible for the deductible, which is clearly stated before you book. We handle all the paperwork and claims process.'
    },
    {
      question: 'How do I verify my identity?',
      answer: 'We use a secure, government-verified ID system that takes just a few minutes. You\'ll need to provide a valid government ID and take a quick selfie. This helps keep our community safe and builds trust between renters and owners.'
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking up to 24 hours before the rental period begins for a full refund. Cancellations within 24 hours may be subject to a cancellation fee. Check the specific listing for exact cancellation terms.'
    },
    {
      question: 'How do I pick up and return equipment?',
      answer: 'Pickup and return details are arranged directly with the equipment owner. Most owners offer flexible pickup times and locations. Some may offer delivery for an additional fee. All details are communicated through our secure messaging system.'
    },
    {
      question: 'What if the owner doesn\'t respond?',
      answer: 'If an owner doesn\'t respond within 24 hours, our support team will reach out to help resolve the issue. In rare cases where we can\'t reach the owner, we\'ll help you find alternative equipment or provide a full refund.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about renting equipment on Lendly
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-slate-900 pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-8 pb-6 animate-slide-up">
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}