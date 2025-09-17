'use client';

import { useState, useEffect } from 'react';
import { FiltersBar } from '@/components/FiltersBar';
import { SortDropdown } from '@/components/SortDropdown';
import { ListingGrid } from '@/components/ListingGrid';
import { MapWithClusters } from '@/components/MapWithClusters';
import { EmptyState } from '@/components/EmptyState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getItemsByCategoryAsItems, 
  categories 
} from '@/lib/mock';
import { 
  calculateDistance, 
  getCurrentLocation 
} from '@/lib/geo';
import { 
  useQueryParams
} from '@/lib/useQueryParams';
import { 
  t, 
  getLocaleFromSearchParams, 
  getDirection 
} from '@/lib/i18n';
import { Item, Filters, CategoryKey } from '@/lib/types';
import { useSearchParams, useRouter } from 'next/navigation';
import { List, Map } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    country: string;
    city: string;
    category: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = getLocaleFromSearchParams(searchParams);
  const direction = getDirection(locale);
  
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [focusedItem, setFocusedItem] = useState<Item | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'map'>('list');
  const [resolvedParams, setResolvedParams] = useState<{ country: string; city: string; category: string } | null>(null);

  const { filters, updateFilters } = useQueryParams(searchParams);

  // Resolve params on mount
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);
  
  // Get category info
  const category = resolvedParams ? categories.find(cat => cat.key === resolvedParams.category) : null;
  const categoryTitle = category ? t(`category.${category.key}`, locale) : (resolvedParams?.category || '');

  // Get items for this category
  const allItems = resolvedParams ? getItemsByCategoryAsItems(resolvedParams.category as CategoryKey) : [];
  
  // Calculate distances if user location is available
  const itemsWithDistances = allItems.map(item => {
    if (!userLocation) return { item, distance: null };
    const distance = calculateDistance(
      userLocation.lat, 
      userLocation.lng, 
      item.latitude, 
      item.longitude
    );
    return { item, distance };
  });

  // Apply filters
  const filteredItems = itemsWithDistances.filter(({ item, distance }) => {
    // Date availability filter
    if (filters.availableOnly && filters.start && filters.end) {
      const isAvailable = item.availability.some(period => 
        filters.start! >= period.start && filters.end! <= period.end
      );
      if (!isAvailable) return false;
    }

    // Price range filter
    if (filters.priceMin && item.dailyPriceILS < filters.priceMin) return false;
    if (filters.priceMax && item.dailyPriceILS > filters.priceMax) return false;

    // Distance filter
    if (filters.radiusKm && distance && distance > filters.radiusKm) return false;

    // Verified owners filter
    if (filters.verifiedOnly && !item.verifiedOwner) return false;

    // Insured filter
    if (filters.insuredOnly && !item.insured) return false;

    return true;
  });

  // Sort items
  const sortedItems = [...filteredItems];
  if (filters.sort === 'nearest' && userLocation) {
    sortedItems.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  } else if (filters.sort === 'price_asc') {
    sortedItems.sort((a, b) => a.item.dailyPriceILS - b.item.dailyPriceILS);
  } else if (filters.sort === 'price_desc') {
    sortedItems.sort((a, b) => b.item.dailyPriceILS - a.item.dailyPriceILS);
  } else if (filters.sort === 'rating') {
    sortedItems.sort((a, b) => b.item.rating - a.item.rating);
  }

  const finalItems = sortedItems.map(({ item }) => item);
  const distances = sortedItems.reduce((acc, { item, distance }) => {
    if (distance !== null) acc[item.id] = distance;
    return acc;
  }, {} as Record<string, number>);

  // Get user location on mount
  useEffect(() => {
    getCurrentLocation().then(location => {
      if (location) {
        setUserLocation(location);
      } else {
        // Fallback to Tel Aviv center
        setUserLocation({ lat: 32.0853, lng: 34.7818 });
      }
    });
  }, []);

  const handleFiltersChange = (newFilters: Partial<Filters>) => {
    const updatedQuery = updateFilters(newFilters);
    router.push(`?${updatedQuery}`);
  };

  const handleClearFilters = () => {
    router.push('');
  };

  const handleSortChange = (sort: string) => {
    handleFiltersChange({ sort: sort as Filters['sort'] });
  };

  const handleItemHover = (item: Item | null) => {
    setFocusedItem(item);
  };

  const handleSearchArea = () => {
    // In a real app, this would update the map bounds and refetch items
    alert('Search area functionality would be implemented here');
  };

  // Show loading state while params are being resolved
  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-coral mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={direction}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-deep-ink mb-2">
            {categoryTitle} in {resolvedParams?.city || ''}
          </h1>
          <p className="text-gray-600">
            {finalItems.length} items available
            {userLocation && ` • Showing within ${filters.radiusKm || 5}km`}
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <FiltersBar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              locale={locale}
            />
          </div>
          
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <SortDropdown
                  selectedSort={filters.sort || 'nearest'}
                  onSortChange={handleSortChange}
                  locale={locale}
                />
              </div>
              
              {/* Mobile Tabs */}
              <div className="sm:hidden w-full">
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'list' | 'map')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="list" className="flex items-center gap-2">
                      <List className="h-4 w-4" />
                      {t('map.list_view', locale)}
                    </TabsTrigger>
                    <TabsTrigger value="map" className="flex items-center gap-2">
                      <Map className="h-4 w-4" />
                      {t('map.map_view', locale)}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Content */}
            {finalItems.length === 0 ? (
              <EmptyState locale={locale} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Desktop Layout */}
                <div className="hidden lg:block lg:col-span-2">
                  <ListingGrid
                    items={finalItems}
                    distances={distances}
                    onItemHover={handleItemHover}
                    locale={locale}
                  />
                </div>
                
                <div className="hidden lg:block lg:col-span-1">
                  <MapWithClusters
                    items={finalItems}
                    focusedItem={focusedItem}
                    onItemFocus={setFocusedItem}
                    onSearchArea={handleSearchArea}
                    locale={locale}
                  />
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden">
                  <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'list' | 'map')}>
                    <TabsContent value="list" className="mt-0">
                      <ListingGrid
                        items={finalItems}
                        distances={distances}
                        onItemHover={handleItemHover}
                        locale={locale}
                      />
                    </TabsContent>
                    <TabsContent value="map" className="mt-0">
                      <div className="h-96">
                        <MapWithClusters
                          items={finalItems}
                          focusedItem={focusedItem}
                          onItemFocus={setFocusedItem}
                          onSearchArea={handleSearchArea}
                          locale={locale}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
