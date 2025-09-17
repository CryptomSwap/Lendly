'use client'

import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Locale, t } from '@/lib/i18n'

interface FAQProps {
  locale: Locale
}

export function FAQ({ locale }: FAQProps) {
  const isRTL = locale === 'he'

  const faqs = [
    {
      question: t(locale, 'faqDeposits'),
      answer: t(locale, 'faqDepositsAnswer')
    },
    {
      question: t(locale, 'faqInsurance'),
      answer: t(locale, 'faqInsuranceAnswer')
    },
    {
      question: t(locale, 'faqCancellations'),
      answer: t(locale, 'faqCancellationsAnswer')
    },
    {
      question: t(locale, 'faqLateReturns'),
      answer: t(locale, 'faqLateReturnsAnswer')
    },
    {
      question: t(locale, 'faqDelivery'),
      answer: t(locale, 'faqDeliveryAnswer')
    },
    {
      question: t(locale, 'faqIdVerification'),
      answer: t(locale, 'faqIdVerificationAnswer')
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t(locale, 'faqTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t(locale, 'faqDescription')}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto mb-12">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-slate-200 rounded-2xl px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-emerald-600 py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <div className="bg-slate-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {t(locale, 'stillHaveQuestions')}
            </h3>
            <p className="text-slate-600 mb-6">
              Our support team is here to help you with any questions or concerns.
            </p>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/support">
                {t(locale, 'contactSupport')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}