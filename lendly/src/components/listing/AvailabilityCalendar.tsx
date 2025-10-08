'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { cx } from '@/lib/ui'

interface AvailabilityCalendarProps {
  availability: { startDate: string; endDate: string }[]
  bookings: { startDate: string; endDate: string }[]
  onDateChange: (start: Date | null, end: Date | null) => void
}

export function AvailabilityCalendar({ availability, bookings, onDateChange }: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedStart, setSelectedStart] = useState<Date | null>(null)
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null)

  const today = new Date()
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  // Generate calendar days
  const days = []
  const emptyDays = Array(startingDayOfWeek).fill(null)
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i))
  }

  const isDateAvailable = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return availability.some(period => 
      dateStr >= period.startDate && dateStr <= period.endDate
    )
  }

  const isDateBooked = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return bookings.some(booking => 
      dateStr >= booking.startDate && dateStr <= booking.endDate
    )
  }

  const isDateSelected = (date: Date) => {
    if (!selectedStart && !selectedEnd) return false
    if (selectedStart && !selectedEnd) {
      return date.getTime() === selectedStart.getTime()
    }
    if (selectedStart && selectedEnd) {
      return date >= selectedStart && date <= selectedEnd
    }
    return false
  }

  const isDateInRange = (date: Date) => {
    if (!selectedStart || !selectedEnd) return false
    return date > selectedStart && date < selectedEnd
  }

  const handleDateClick = (date: Date) => {
    if (!isDateAvailable(date) || isDateBooked(date)) return

    if (!selectedStart || (selectedStart && selectedEnd)) {
      // Start new selection
      setSelectedStart(date)
      setSelectedEnd(null)
      onDateChange(date, null)
    } else if (selectedStart && !selectedEnd) {
      // Complete selection
      if (date > selectedStart) {
        setSelectedEnd(date)
        onDateChange(selectedStart, date)
      } else {
        setSelectedStart(date)
        setSelectedEnd(null)
        onDateChange(date, null)
      }
    }
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">
          {monthNames[month]} {year}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevMonth}
            className="p-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextMonth}
            className="p-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-slate-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty days */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="p-2"></div>
        ))}
        
        {/* Calendar days */}
        {days.map((date) => {
          const isPast = date < today
          const isAvailable = isDateAvailable(date)
          const isBooked = isDateBooked(date)
          const isSelected = isDateSelected(date)
          const isInRange = isDateInRange(date)
          const isClickable = isAvailable && !isBooked && !isPast

          return (
            <button
              key={date.getTime()}
              onClick={() => handleDateClick(date)}
              disabled={!isClickable}
              className={cx(
                "p-2 text-sm font-medium rounded-lg transition-all duration-200",
                isPast && "text-slate-300 cursor-not-allowed",
                isBooked && "bg-red-100 text-red-600 cursor-not-allowed",
                isAvailable && !isBooked && !isPast && "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer",
                isSelected && "bg-emerald-600 text-white",
                isInRange && "bg-emerald-100 text-emerald-700"
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-600 rounded"></div>
          <span className="text-sm text-slate-600">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-100 rounded"></div>
          <span className="text-sm text-slate-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-100 rounded"></div>
          <span className="text-sm text-slate-600">Booked</span>
        </div>
      </div>
    </div>
  )
}