import { Filters } from './types';

/**
 * Parse URL search parameters into filters object
 * @param searchParams URL search parameters
 * @returns Parsed filters object
 */
export function parseFiltersFromURL(searchParams: URLSearchParams): Filters {
  const filters: Filters = {};

  // Parse dates
  const start = searchParams.get('start');
  const end = searchParams.get('end');
  if (start) filters.start = start;
  if (end) filters.end = end;

  // Parse radius
  const radius = searchParams.get('radius');
  if (radius) {
    const radiusNum = parseInt(radius, 10);
    if (!isNaN(radiusNum)) {
      filters.radiusKm = radiusNum;
    }
  }

  // Parse price range
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');
  if (priceMin) {
    const priceMinNum = parseInt(priceMin, 10);
    if (!isNaN(priceMinNum)) {
      filters.priceMin = priceMinNum;
    }
  }
  if (priceMax) {
    const priceMaxNum = parseInt(priceMax, 10);
    if (!isNaN(priceMaxNum)) {
      filters.priceMax = priceMaxNum;
    }
  }

  // Parse boolean filters
  filters.verifiedOnly = searchParams.get('verifiedOnly') === 'true';
  filters.insuredOnly = searchParams.get('insuredOnly') === 'true';
  filters.availableOnly = searchParams.get('availableOnly') === 'true';

  // Parse sort
  const sort = searchParams.get('sort');
  if (sort && ['nearest', 'price_asc', 'price_desc', 'rating'].includes(sort)) {
    filters.sort = sort as Filters['sort'];
  }

  return filters;
}

/**
 * Convert filters object to URL search parameters
 * @param filters Filters object
 * @returns URL search parameters string
 */
export function filtersToURL(filters: Filters): string {
  const params = new URLSearchParams();

  if (filters.start) params.set('start', filters.start);
  if (filters.end) params.set('end', filters.end);
  if (filters.radiusKm) params.set('radius', filters.radiusKm.toString());
  if (filters.priceMin) params.set('priceMin', filters.priceMin.toString());
  if (filters.priceMax) params.set('priceMax', filters.priceMax.toString());
  if (filters.verifiedOnly) params.set('verifiedOnly', 'true');
  if (filters.insuredOnly) params.set('insuredOnly', 'true');
  if (filters.availableOnly) params.set('availableOnly', 'true');
  if (filters.sort) params.set('sort', filters.sort);

  return params.toString();
}

/**
 * Hook for managing URL query parameters
 * @param searchParams Current URL search parameters
 * @returns Object with filters and update function
 */
export function useQueryParams(searchParams: URLSearchParams) {
  const filters = parseFiltersFromURL(searchParams);

  const updateFilters = (newFilters: Partial<Filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    return filtersToURL(updatedFilters);
  };

  const clearFilters = () => {
    return '';
  };

  return {
    filters,
    updateFilters,
    clearFilters,
  };
}
