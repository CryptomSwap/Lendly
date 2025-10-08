import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Users, TrendingUp } from 'lucide-react'

const benefits = [
  {
    icon: DollarSign,
    title: 'Earn Extra Income',
    description: 'Turn your unused equipment into a steady income stream. Set your own prices and availability.'
  },
  {
    icon: Users,
    title: 'Meet New People',
    description: 'Connect with people in your community who need your equipment for their projects and events.'
  },
  {
    icon: TrendingUp,
    title: 'Build Your Reputation',
    description: 'Earn great reviews and build trust in your community as a reliable equipment provider.'
  }
]

export function OwnersSection() {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Earn money from your equipment
          </h2>
          <p className="text-xl text-blue-100">
            Join thousands of owners who are making money by renting out their gear
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card key={index} className="bg-white/10 border-white/20 text-white">
                <CardHeader>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-lg">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <div className="bg-white/10 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4">
              Ready to start earning?
            </h3>
            <p className="text-blue-100 mb-6">
              List your first item in just a few minutes and start earning money from your equipment.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => window.location.href = '/list'}
            >
              List Your Item
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">₪2,500</div>
              <div className="text-blue-100">Average monthly earnings</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">85%</div>
              <div className="text-blue-100">Equipment utilization rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.8★</div>
              <div className="text-blue-100">Average owner rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
