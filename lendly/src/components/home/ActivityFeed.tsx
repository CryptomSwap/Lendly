'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin,
  Clock,
  TrendingUp
} from 'lucide-react'
import { getRecentActivity } from '@/lib/mock'
import { formatTimeAgo } from '@/lib/ui'
import { cx } from '@/lib/ui'
import { useI18n } from '@/i18n'

export function ActivityFeed() {
  const [activities] = useState(getRecentActivity('Tel Aviv'))
  const { t, locale } = useI18n()

  return (
    <section className="py-20 bg-fog/50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
            <TrendingUp className={`w-3 h-3 ${locale === 'he' ? 'ml-1' : 'mr-1'}`} />
            {t('activity.live')}
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('activity.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('activity.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className={`flex items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/80 transition-all duration-200 animate-slide-up ${locale === 'he' ? 'flex-row-reverse gap-4' : 'gap-4'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={activity.user.avatar || `https://ui-avatars.com/api/?name=${activity.user.name}&background=ecfdf5&color=10b981`}
                  alt={activity.user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-slate-900 text-sm truncate">
                    {activity.title}
                  </h4>
                  <Badge 
                    variant="secondary" 
                    className="text-xs bg-slate-100 text-slate-600"
                  >
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                  {activity.description}
                </p>
                <div className={`flex items-center gap-4 text-xs text-slate-500 ${locale === 'he' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center ${locale === 'he' ? 'flex-row-reverse gap-1' : 'gap-1'}`}>
                    <MapPin className="w-3 h-3" />
                    <span>{activity.distance}km away</span>
                  </div>
                  <div className={`flex items-center ${locale === 'he' ? 'flex-row-reverse gap-1' : 'gap-1'}`}>
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeAgo(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
              {activity.item && (
                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={activity.item.image}
                    alt={activity.item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Activity Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
          >
            {t('activity.viewAll')}
          </Button>
        </div>
      </div>
    </section>
  )
}
