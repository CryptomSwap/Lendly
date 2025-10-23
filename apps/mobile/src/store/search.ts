import { create } from 'zustand';
import { ItemCategory } from '@lendly/shared';

interface SearchState {
  city: string;
  category: ItemCategory | null;
  startDate: Date | null;
  endDate: Date | null;
  latitude: number | null;
  longitude: number | null;
  radiusKm: number;
  setCity: (city: string) => void;
  setCategory: (category: ItemCategory | null) => void;
  setDates: (startDate: Date | null, endDate: Date | null) => void;
  setLocation: (latitude: number, longitude: number) => void;
  setRadius: (radiusKm: number) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  city: '',
  category: null,
  startDate: null,
  endDate: null,
  latitude: null,
  longitude: null,
  radiusKm: 10,

  setCity: (city) => set({ city }),
  setCategory: (category) => set({ category }),
  setDates: (startDate, endDate) => set({ startDate, endDate }),
  setLocation: (latitude, longitude) => set({ latitude, longitude }),
  setRadius: (radiusKm) => set({ radiusKm }),
  clearSearch: () => set({
    city: '',
    category: null,
    startDate: null,
    endDate: null,
    latitude: null,
    longitude: null,
    radiusKm: 10,
  }),
}));
