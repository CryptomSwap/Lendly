export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CityCenter {
  name: string;
  coordinates: Coordinates;
}

// Tel Aviv city center as fallback
export const TEL_AVIV_CENTER: CityCenter = {
  name: 'Tel Aviv',
  coordinates: {
    lat: 32.0853,
    lng: 34.7818
  }
};

// Haversine formula to calculate distance between two points
export function calculateDistance(
  point1: Coordinates,
  point2: Coordinates
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(point2.lat - point1.lat);
  const dLng = toRadians(point2.lng - point1.lng);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.lat)) * Math.cos(toRadians(point2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  // Round to 1 decimal place
  return Math.round(distance * 10) / 10;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Get user's stored location or fallback to Tel Aviv
export function getUserLocation(): Coordinates {
  if (typeof window === 'undefined') {
    return TEL_AVIV_CENTER.coordinates;
  }
  
  try {
    const stored = localStorage.getItem('user-location');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.lat && parsed.lng) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Failed to parse stored location:', error);
  }
  
  return TEL_AVIV_CENTER.coordinates;
}

// Store user's location
export function storeUserLocation(coordinates: Coordinates): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('user-location', JSON.stringify(coordinates));
  } catch (error) {
    console.warn('Failed to store location:', error);
  }
}

// Mock reverse geocoding - replace with real API later
export function getCityFromGeo(coordinates: Coordinates): Promise<string> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // For demo purposes, return Tel Aviv for any coordinates
      // In real implementation, this would call a reverse geocoding API
      resolve('Tel Aviv');
    }, 500);
  });
}

// Get geolocation from browser
export function getCurrentLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

// Format distance for display
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance}km`;
}