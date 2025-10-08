'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  ThumbsUp,
  MoreHorizontal
} from 'lucide-react'
import { cx } from '@/lib/ui'

interface ReviewsProps {
  itemId: string
}

export function Reviews({ itemId }: ReviewsProps) {
  const [showAll, setShowAll] = useState(false)

  // Mock reviews data
  const reviews = [
    {
      id: '1',
      userName: 'Sarah M.',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      title: 'Excellent equipment and service',
      content: 'The camera kit was in perfect condition and David was very helpful with setup instructions. Highly recommend!',
      date: '2024-01-05',
      helpful: 3,
      verified: true
    },
    {
      id: '2',
      userName: 'Mike R.',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      title: 'Professional quality gear',
      content: 'Used this for a wedding shoot and the results were amazing. Equipment was clean and well-maintained.',
      date: '2024-01-02',
      helpful: 5,
      verified: true
    },
    {
      id: '3',
      userName: 'Lisa K.',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      rating: 4,
      title: 'Great experience overall',
      content: 'Good equipment, easy pickup and return process. Would rent again.',
      date: '2023-12-28',
      helpful: 2,
      verified: false
    }
  ]

  const displayedReviews = showAll ? reviews : reviews.slice(0, 2)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Reviews</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-slate-900">4.8</span>
            <span className="text-slate-600">({reviews.length} reviews)</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="bg-slate-50 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-slate-900">{review.userName}</h4>
                  {review.verified && (
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                      Verified
                    </Badge>
                  )}
                  <span className="text-sm text-slate-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <h5 className="font-medium text-slate-900">{review.title}</h5>
                </div>
                
                <p className="text-slate-700 mb-4 leading-relaxed">
                  {review.content}
                </p>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  <button className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviews.length > 2 && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `Show All ${reviews.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  )
}
