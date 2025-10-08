import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Camera, FileText, Headphones } from 'lucide-react'

const safetyFeatures = [
  {
    icon: Shield,
    title: 'Comprehensive Insurance',
    description: 'All rentals are covered by our insurance policy. You\'re protected against damage, theft, and accidents.'
  },
  {
    icon: Camera,
    title: 'Photo Documentation',
    description: 'Take photos during pickup and return to document the condition of equipment and avoid disputes.'
  },
  {
    icon: FileText,
    title: 'Clear Policies',
    description: 'Transparent terms and conditions with clear guidelines on what\'s covered and what\'s not.'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our support team is available around the clock to help with any issues or questions.'
  }
]

export function Safety() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your safety is our priority
          </h2>
          <p className="text-lg text-gray-600">
            We provide multiple layers of protection to ensure a safe and secure rental experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              What's covered by insurance?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-medium text-green-600 mb-2">✓ Covered</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Accidental damage during proper use</li>
                  <li>• Theft with police report</li>
                  <li>• Equipment failure</li>
                  <li>• Natural disasters</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-600 mb-2">✗ Not Covered</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Intentional damage</li>
                  <li>• Misuse of equipment</li>
                  <li>• Pre-existing damage</li>
                  <li>• Normal wear and tear</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-600 mb-2">ℹ️ Process</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Report within 48 hours</li>
                  <li>• Provide photos and details</li>
                  <li>• Claims processed in 3-5 days</li>
                  <li>• Deductible may apply</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
