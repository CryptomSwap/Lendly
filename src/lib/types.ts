export type CategoryKey = 'gardening' | 'construction' | 'events' | 'drones' | 'cameras' | 'power_tools' | 'camping';

export type Item = {
  id: string;
  title: string;
  description: string;
  category: CategoryKey;
  dailyPriceILS: number; // minor units later; simple number for mock
  depositILS: number;
  rating: number;
  reviews: number;
  latitude: number;
  longitude: number;
  city: string; // 'Tel Aviv'
  images: string[];
  verifiedOwner: boolean;
  insured: boolean;
  availability: Array<{ start: string; end: string }>; // ISO dates
};

export type Category = {
  key: CategoryKey;
  title: string;
  description: string;
  icon: string;
  exampleItems: string[];
};

export type City = {
  key: string;
  name: string;
  latitude: number;
  longitude: number;
};

export type Filters = {
  start?: string;
  end?: string;
  radiusKm?: number;
  priceMin?: number;
  priceMax?: number;
  verifiedOnly?: boolean;
  insuredOnly?: boolean;
  availableOnly?: boolean;
  sort?: 'nearest' | 'price_asc' | 'price_desc' | 'rating';
};

export type PricingBreakdown = {
  subtotal: number;
  insurance: number;
  serviceFee: number;
  total: number;
  deposit: number;
};

export type SortOption = {
  value: 'nearest' | 'price_asc' | 'price_desc' | 'rating';
  label: string;
};
