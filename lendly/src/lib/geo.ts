// Geographic utilities for Lendly

export interface Coordinates {
  lat: number
  lng: number
}

// Tel Aviv coordinates as fallback
export const TEL_AVIV_COORDS: Coordinates = {
  lat: 32.0853,
  lng: 34.7818
}

/**
 * Calculate the distance between two points using the Haversine formula
 * @param lat1 Latitude of first point
 * @param lng1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lng2 Longitude of second point
 * @returns Distance in kilometers, rounded to 0.1 precision
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  
  // Round to 0.1 precision as specified
  return Math.round(distance * 10) / 10
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Get user's current location using browser geolocation API
 * @returns Promise with coordinates or null if denied/error
 */
export async function getCurrentLocation(): Promise<Coordinates | null> {
  if (!navigator.geolocation) {
    console.warn('Geolocation is not supported by this browser')
    return null
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (error) => {
        console.warn('Geolocation error:', error.message)
        resolve(null)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  })
}

/**
 * Check if coordinates are within a bounding box
 * @param coords Coordinates to check
 * @param bounds Bounding box
 * @returns True if coordinates are within bounds
 */
export function isWithinBounds(
  coords: Coordinates,
  bounds: {
    north: number
    south: number
    east: number
    west: number
  }
): boolean {
  return (
    coords.lat >= bounds.south &&
    coords.lat <= bounds.north &&
    coords.lng >= bounds.west &&
    coords.lng <= bounds.east
  )
}

/**
 * Calculate bounding box from center point and radius
 * @param center Center coordinates
 * @param radiusKm Radius in kilometers
 * @returns Bounding box
 */
export function getBoundsFromRadius(
  center: Coordinates,
  radiusKm: number
): {
  north: number
  south: number
  east: number
  west: number
} {
  // Approximate conversion: 1 degree ≈ 111 km
  const latDelta = radiusKm / 111
  const lngDelta = radiusKm / (111 * Math.cos(toRadians(center.lat)))
  
  return {
    north: center.lat + latDelta,
    south: center.lat - latDelta,
    east: center.lng + lngDelta,
    west: center.lng - lngDelta
  }
}

/**
 * Format coordinates for display
 * @param coords Coordinates
 * @param precision Decimal places (default: 4)
 * @returns Formatted string
 */
export function formatCoordinates(
  coords: Coordinates,
  precision: number = 4
): string {
  return `${coords.lat.toFixed(precision)}, ${coords.lng.toFixed(precision)}`
}

/**
 * Parse coordinates from string
 * @param coordString String in format "lat,lng"
 * @returns Coordinates or null if invalid
 */
export function parseCoordinates(coordString: string): Coordinates | null {
  const parts = coordString.split(',')
  if (parts.length !== 2) return null
  
  const lat = parseFloat(parts[0].trim())
  const lng = parseFloat(parts[1].trim())
  
  if (isNaN(lat) || isNaN(lng)) return null
  if (lat < -90 || lat > 90) return null
  if (lng < -180 || lng > 180) return null
  
  return { lat, lng }
}

/**
 * Get nearby cities/areas (mock data for Tel Aviv region)
 */
export const NEARBY_AREAS = [
  { name: 'Tel Aviv', coords: TEL_AVIV_COORDS },
  { name: 'Ramat Aviv', coords: { lat: 32.1153, lng: 34.8018 } },
  { name: 'Neve Tzedek', coords: { lat: 32.0653, lng: 34.7618 } },
  { name: 'Florentin', coords: { lat: 32.0553, lng: 34.7718 } },
  { name: 'Jaffa', coords: { lat: 32.0453, lng: 34.7518 } },
  { name: 'Ramat Gan', coords: { lat: 32.0853, lng: 34.8118 } },
  { name: 'Givatayim', coords: { lat: 32.0753, lng: 34.8218 } },
  { name: 'Herzliya', coords: { lat: 32.1653, lng: 34.8418 } }
]

/**
 * Find nearest area to given coordinates
 * @param coords Coordinates to search from
 * @returns Nearest area name
 */
export function findNearestArea(coords: Coordinates): string {
  let nearest = NEARBY_AREAS[0]
  let minDistance = haversineDistance(
    coords.lat,
    coords.lng,
    nearest.coords.lat,
    nearest.coords.lng
  )
  
  for (const area of NEARBY_AREAS.slice(1)) {
    const distance = haversineDistance(
      coords.lat,
      coords.lng,
      area.coords.lat,
      area.coords.lng
    )
    
    if (distance < minDistance) {
      minDistance = distance
      nearest = area
    }
  }
  
  return nearest.name
}