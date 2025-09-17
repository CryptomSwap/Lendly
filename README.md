# Lendly - Peer-to-Peer Gear Rental Platform

A production-ready peer-to-peer gear rental platform built with Next.js 14, TypeScript, and modern web technologies.

## 🎯 Features

- **Multi-Category Rentals**: Gardening, Construction, Event Equipment, Drones, Cameras, Power Tools, Camping
- **Interactive Maps**: Location-based search with distance filtering
- **Advanced Filtering**: Date range, price range, distance, verification status
- **Real-time Booking**: Sticky booking panel with pricing breakdown
- **RTL Support**: Full Hebrew language support with RTL layout
- **Mobile-First Design**: Responsive design optimized for all devices
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CryptomSwap/Lendly.git
   cd Lendly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI primitives
- **Icons**: Lucide React
- **State Management**: URL search params + React hooks
- **Internationalization**: Custom i18n solution with RTL support
- **Styling**: Tailwind CSS with custom design tokens

## 📁 Project Structure

```
src/
├── app/
│   ├── (marketing)/          # Marketing pages
│   │   ├── layout.tsx       # Marketing layout with Navbar/Footer
│   │   └── page.tsx         # Home page with category grid
│   ├── [country]/[city]/[category]/  # Dynamic category results
│   │   └── page.tsx         # Category results page
│   ├── items/[id]/         # Item detail pages
│   │   └── page.tsx         # Item detail page
│   └── globals.css          # Global styles with RTL support
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── CategoryTile.tsx     # Category grid tile
│   ├── CategoryGrid.tsx     # Category grid container
│   ├── FiltersBar.tsx       # Advanced filtering interface
│   ├── SortDropdown.tsx    # Sort options dropdown
│   ├── ListingCard.tsx      # Item listing card
│   ├── ListingGrid.tsx      # Items grid container
│   ├── MapWithClusters.tsx  # Interactive map component
│   ├── AvailabilityCalendar.tsx # Date range picker
│   ├── StickyBookingPanel.tsx # Booking interface
│   ├── TrustBadgesRow.tsx  # Trust indicators
│   ├── DistanceChips.tsx   # Distance filter chips
│   ├── VerifyBadge.tsx     # Verification badges
│   ├── EmptyState.tsx      # Empty state component
│   ├── Navbar.tsx          # Navigation component
│   └── Footer.tsx          # Footer component
└── lib/
    ├── types.ts            # TypeScript type definitions
    ├── mock.ts             # Mock data for development
    ├── geo.ts              # Geolocation utilities
    ├── i18n.ts             # Internationalization
    ├── useQueryParams.ts   # URL state management
    ├── pricing.ts          # Pricing calculations
    └── utils.ts            # Utility functions
```

## 🎨 Design System

### Color Palette

- **Coral**: #FF6F61 (primary actions)
- **Teal**: #1FBFAE (secondary elements)
- **Warm Yellow**: #FFC857 (accent highlights)
- **Deep Ink**: #1C1B22 (text)
- **Cream**: #FAF6EF (background)

### Key Features

- **Rounded corners**: Consistent border radius
- **Soft shadows**: Subtle depth and elevation
- **Hover states**: Interactive feedback
- **Focus states**: Accessibility compliance
- **RTL support**: Full Hebrew language support

## 🌍 Internationalization

The platform supports English and Hebrew with automatic RTL layout switching:

- **Language Toggle**: Use `?lang=he` for Hebrew, `?lang=en` for English
- **RTL Layout**: Automatic layout mirroring for Hebrew
- **Translation Keys**: Centralized translation system
- **Date Formatting**: Locale-aware date formatting

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid Layouts**: Responsive grid systems
- **Touch Friendly**: Large touch targets and gestures

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant
- **Alt Text**: Descriptive image alternatives

## 🗺️ Google Maps Integration

The application now includes full Google Maps integration with the following features:

### Features
- **Interactive Map**: Real Google Maps with custom styling
- **Custom Markers**: Color-coded pins (coral for focused items, teal for available items)
- **Item Clustering**: Automatic clustering for better performance
- **Location Search**: Search by current location or specific areas
- **Responsive Design**: Works seamlessly on desktop and mobile
- **RTL Support**: Full Hebrew language support for map controls

### Setup Instructions

1. **Get a Google Maps API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API (optional, for enhanced search)
     - Geocoding API (optional, for address lookup)

2. **Configure API Key**
   - Create a `.env.local` file in your project root
   - Add your API key:
     ```env
     NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key-here"
     ```

3. **Restrict API Key (Recommended)**
   - In Google Cloud Console, go to "Credentials"
   - Click on your API key
   - Under "Application restrictions", add your domain
   - Under "API restrictions", select only the APIs you need

### Map Component Usage

```tsx
import { GoogleMaps } from '@/components/GoogleMaps';

<GoogleMaps
  items={items}
  focusedItem={focusedItem}
  onItemFocus={setFocusedItem}
  onSearchArea={handleSearchArea}
  locale="en"
  className="h-full"
/>
```

### Customization

The map component supports:
- **Custom Styling**: Modify map appearance in `GoogleMaps.tsx`
- **Marker Colors**: Update pin colors in the component
- **Map Controls**: Enable/disable specific controls
- **Zoom Levels**: Adjust default zoom and bounds

## 🔌 API Integration Points

To integrate with real APIs, replace the mock data in:

1. **`src/lib/mock.ts`**: Replace with API calls
2. **`src/lib/geo.ts`**: Add real geolocation services
3. **`src/lib/pricing.ts`**: Connect to payment processing
4. **Components**: Update data fetching logic

### Example API Integration

```typescript
// Replace mock data with real API calls
export async function getItemsByCategory(category: CategoryKey): Promise<Item[]> {
  const response = await fetch(`/api/items?category=${category}`);
  return response.json();
}

export async function getItemById(id: string): Promise<Item> {
  const response = await fetch(`/api/items/${id}`);
  return response.json();
}
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Navigate to `/il/tel-aviv/drones` - see list and map
- [ ] Change radius filter - distances update
- [ ] Sort by "Nearest" - items reorder by distance
- [ ] Set date range - "Available only" filters work
- [ ] Open any item - booking panel enables after date selection
- [ ] Toggle `?lang=he` - RTL layout works correctly
- [ ] Test mobile responsiveness - all components adapt
- [ ] Test keyboard navigation - all interactive elements accessible

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables

For production deployment, you'll need:

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com

# Payments
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# File Upload
UPLOADTHING_TOKEN=your-token

# Analytics
POSTHOG_KEY=your-key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Next Steps

- [x] Integrate Google Maps service
- [ ] Add user authentication and profiles
- [ ] Implement real payment processing
- [ ] Add real-time chat between users
- [ ] Create admin dashboard
- [ ] Add mobile app (React Native)
- [ ] Implement advanced search filters
- [ ] Add review and rating system

---

**Made with ❤️ for the sharing economy** 🌍