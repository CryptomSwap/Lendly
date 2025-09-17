'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Item } from '@/lib/types';

interface GoogleMapsProps {
  items: Item[];
  focusedItem?: Item | null;
  onItemFocus?: (item: Item | null) => void;
  onSearchArea?: () => void;
  locale?: 'en' | 'he';
  className?: string;
}

interface MarkerWithItem {
  marker: google.maps.Marker;
  item: Item;
}

export function GoogleMaps({
  items,
  focusedItem,
  onItemFocus,
  onSearchArea,
  locale = 'en',
  className = ''
}: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<MarkerWithItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize Google Maps
  useEffect(() => {
    if (!isClient) return;
    
    const initializeMap = async () => {
      if (!mapRef.current || typeof window === 'undefined') return;

      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
          version: 'weekly',
          libraries: ['marker']
        });

        const { Map } = await loader.importLibrary('maps');
        const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker');

        // Calculate center from items or default to Tel Aviv
        const center = items.length > 0 
          ? {
              lat: items.reduce((sum, item) => sum + item.latitude, 0) / items.length,
              lng: items.reduce((sum, item) => sum + item.longitude, 0) / items.length
            }
          : { lat: 32.0853, lng: 34.7818 }; // Tel Aviv default

        const map = new Map(mapRef.current, {
          center,
          zoom: items.length > 1 ? 12 : 15,
          mapId: 'lendly-map',
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        mapInstanceRef.current = map;

        // Create markers for items
        const markers: MarkerWithItem[] = [];
        
        items.forEach((item) => {
          const isFocused = focusedItem?.id === item.id;
          
          // Create custom pin element
          const pinElement = new PinElement({
            background: isFocused ? '#FF6B6B' : '#20B2AA', // coral : teal
            borderColor: '#ffffff',
            glyphColor: '#ffffff',
            scale: isFocused ? 1.2 : 1
          });

          const marker = new AdvancedMarkerElement({
            map,
            position: { lat: item.latitude, lng: item.longitude },
            content: pinElement.element,
            title: item.title
          });

          // Add click listener
          marker.addListener('click', () => {
            onItemFocus?.(item);
          });

          markers.push({ marker, item });
        });

        markersRef.current = markers;

        // Fit bounds if multiple items
        if (items.length > 1) {
          const bounds = new google.maps.LatLngBounds();
          items.forEach(item => {
            bounds.extend({ lat: item.latitude, lng: item.longitude });
          });
          map.fitBounds(bounds, { padding: 50 });
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load map. Please check your API key.');
        setIsLoading(false);
      }
    };

    initializeMap();
  }, [isClient, items, onItemFocus]);

  // Update focused marker when focusedItem changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach(({ marker, item }) => {
      const isFocused = focusedItem?.id === item.id;
      
      // Update marker appearance
      const pinElement = new google.maps.marker.PinElement({
        background: isFocused ? '#FF6B6B' : '#20B2AA',
        borderColor: '#ffffff',
        glyphColor: '#ffffff',
        scale: isFocused ? 1.2 : 1
      });

      marker.content = pinElement.element;

      // Center map on focused item
      if (isFocused) {
        mapInstanceRef.current?.setCenter({ lat: item.latitude, lng: item.longitude });
        mapInstanceRef.current?.setZoom(15);
      }
    });
  }, [focusedItem]);

  // Handle search area functionality
  const handleSearchArea = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter({ lat: latitude, lng: longitude });
            mapInstanceRef.current.setZoom(15);
          }
          onSearchArea?.();
        },
        (error) => {
          console.error('Error getting location:', error);
          onSearchArea?.();
        }
      );
    } else {
      onSearchArea?.();
    }
  }, [onSearchArea]);

  // Show loading state during SSR or while client is initializing
  if (!isClient) {
    return (
      <div className={`flex items-center justify-center h-full bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral mx-auto mb-4"></div>
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-full bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center text-gray-500">
          <p className="text-lg font-medium mb-2">Map Unavailable</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '400px' }}
      />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral mx-auto mb-4"></div>
            <p className="text-gray-500">Loading map...</p>
          </div>
        </div>
      )}

      {/* Search Area Button */}
      {onSearchArea && !isLoading && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleSearchArea}
            className="bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg rounded-lg px-3 py-2 text-sm font-medium text-gray-700 flex items-center gap-2 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {locale === 'he' ? 'חפש באזור' : 'Search Area'}
          </button>
        </div>
      )}

      {/* Map Legend */}
      {!isLoading && items.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-coral rounded-full"></div>
                <span>{locale === 'he' ? 'פריט נבחר' : 'Focused item'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal rounded-full"></div>
                <span>{locale === 'he' ? 'פריטים זמינים' : 'Available items'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
