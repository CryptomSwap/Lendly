'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Camera, CheckCircle, Upload, AlertCircle, XCircle } from 'lucide-react'

interface ReturnChecklistProps {
  bookingId: string
  onComplete: (data: any) => void
}

export function ReturnChecklist({ bookingId, onComplete }: ReturnChecklistProps) {
  const [photos, setPhotos] = useState<File[]>([])
  const [condition, setCondition] = useState<'excellent' | 'good' | 'fair' | 'damaged'>('excellent')
  const [damageReport, setDamageReport] = useState('')
  const [functionTest, setFunctionTest] = useState(false)
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setPhotos(prev => [...prev, ...files].slice(0, 6)) // Max 6 photos
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const canComplete = photos.length >= 6 && functionTest

  const handleSubmit = async () => {
    if (!canComplete) return

    setIsSubmitting(true)
    
    try {
      // TODO: Upload photos to S3/UploadThing
      const photoUrls = await Promise.all(
        photos.map(async (photo) => {
          // Mock upload - replace with actual upload logic
          return URL.createObjectURL(photo)
        })
      )

      const checklistData = {
        bookingId,
        photos: photoUrls,
        condition,
        damageReport: condition === 'damaged' ? damageReport : '',
        functionTest,
        notes,
        timestamp: new Date().toISOString()
      }

      onComplete(checklistData)
    } catch (error) {
      console.error('Error submitting checklist:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Camera className="w-5 h-5 mr-2" />
          Return Checklist
        </CardTitle>
        <p className="text-sm text-gray-600">
          Complete this checklist to document the equipment condition at return
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Equipment Photos (Required: 6 photos minimum)
          </label>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                {photos[index] ? (
                  <div className="relative w-full h-full">
                    <img
                      src={URL.createObjectURL(photos[index])}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-xs text-gray-500">Photo {index + 1}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
            id="return-photo-upload"
          />
          <label htmlFor="return-photo-upload">
            <Button variant="outline" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Add Photos
              </span>
            </Button>
          </label>
          <div className="mt-2 text-sm text-gray-600">
            {photos.length}/6 photos uploaded
          </div>
        </div>

        {/* Condition Assessment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Equipment Condition
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'excellent', label: 'Excellent', color: 'bg-green-100 text-green-800' },
              { value: 'good', label: 'Good', color: 'bg-blue-100 text-blue-800' },
              { value: 'fair', label: 'Fair', color: 'bg-yellow-100 text-yellow-800' },
              { value: 'damaged', label: 'Damaged', color: 'bg-red-100 text-red-800' }
            ].map((option) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value={option.value}
                  checked={condition === option.value}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className="rounded border-gray-300"
                />
                <span className={`px-3 py-2 rounded text-sm font-medium ${option.color}`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Damage Report */}
        {condition === 'damaged' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Damage Description (Required)
            </label>
            <textarea
              value={damageReport}
              onChange={(e) => setDamageReport(e.target.value)}
              placeholder="Describe the damage in detail..."
              className="w-full p-3 border border-gray-300 rounded-md resize-none"
              rows={3}
              required
            />
          </div>
        )}

        {/* Function Test */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={functionTest}
              onChange={(e) => setFunctionTest(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">
              Equipment function test completed (Required)
            </span>
          </label>
          <p className="text-xs text-gray-600 mt-1">
            I have tested the basic functions of the equipment and confirmed it's working properly
          </p>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional observations or notes about the equipment condition..."
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            rows={3}
          />
        </div>

        {/* Status */}
        <div className="flex items-center space-x-2">
          {canComplete ? (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Ready to complete
            </Badge>
          ) : (
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              <AlertCircle className="w-3 h-3 mr-1" />
              Missing required items
            </Badge>
          )}
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!canComplete || isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? 'Submitting...' : 'Complete Return Checklist'}
        </Button>

        <div className="text-xs text-gray-500 text-center">
          This checklist will be saved and can be used as evidence in case of disputes
        </div>
      </CardContent>
    </Card>
  )
}
