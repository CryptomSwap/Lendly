export function hasDateOverlap(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean {
  return start1 < end2 && start2 < end1
}

export function isDateRangeAvailable(
  requestedStart: Date,
  requestedEnd: Date,
  unavailableRanges: Array<{ startDate: Date; endDate: Date }>
): boolean {
  return !unavailableRanges.some(range =>
    hasDateOverlap(requestedStart, requestedEnd, range.startDate, range.endDate)
  )
}

export function calculateDaysBetween(startDate: Date, endDate: Date): number {
  const diffTime = endDate.getTime() - startDate.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
