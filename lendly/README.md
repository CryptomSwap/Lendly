# 🚀 Lendly - Premium Equipment Rental Marketplace

A premium, trust-first marketplace for equipment rentals built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

### 🏠 **Homepage**
- Premium hero section with search functionality
- Trust strip with key differentiators
- Category grid with hover animations
- Featured carousel with horizontal scroll
- Live activity feed
- How it works section
- Safety block with protection info
- Owner call-to-action
- Customer testimonials
- FAQ accordion

### 🔍 **Results Page**
- Map + list split view (55% list / 45% map)
- Advanced filtering system
- Interactive map with custom pins
- Listing cards with trust indicators
- Sort options (nearest, price, rating)
- Distance calculations
- Favorites functionality

### 📱 **Listing Detail**
- Image gallery with carousel
- Sticky booking panel
- Date picker with availability
- Price breakdown with insurance
- Owner profile and verification
- Safety summary
- Customer reviews
- Trust badges throughout

### 📊 **Dashboard**
- Earnings and performance stats
- Quick action buttons
- Recent activity overview
- Responsive design

## 🎨 Design System

### **Color Palette**
- **Emerald**: `#10B981` (Primary brand color)
- **Sky**: `#38BDF8` (Accent color)
- **Slate 900**: `#0F172A` (Text color)
- **Fog**: `#F9FAFB` (Background)
- **Mint**: `#A7F3D0` (Accent highlight)
- **Amber**: `#FBBF24` (Warning/rating)
- **Red**: `#EF4444` (Error/destructive)

### **Typography**
- **Font**: Plus Jakarta Sans (Google Fonts)
- **Hierarchy**: 0.75rem to 3.75rem
- **Weights**: 300-800
- **Line heights**: 1.25 to 2.0

### **Spacing & Layout**
- **Base**: 8px scale
- **Container**: max-w-[1200px]
- **Grid**: 12-col desktop, 4-col mobile
- **Gutters**: 24px desktop, 16px mobile

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Plus Jakarta Sans
- **State Management**: React hooks
- **Forms**: React Hook Form
- **Authentication**: NextAuth.js
- **Database**: Prisma + PostgreSQL
- **Payments**: Stripe
- **Maps**: Google Maps API

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CryptomSwap/Lendly.git
   cd Lendly/lendly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Fill in your environment variables
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - **Main App**: http://localhost:3000
   - **Hebrew (RTL)**: http://localhost:3000?lang=he
   - **Component Test**: http://localhost:3000/test
   - **Sandbox**: http://localhost:3000/sandbox

## 📁 Project Structure

```
lendly/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (marketing)/        # Marketing pages layout
│   │   ├── (dash)/            # Dashboard pages layout
│   │   ├── [country]/[city]/[category]/  # Dynamic results pages
│   │   ├── items/[id]/        # Listing detail pages
│   │   ├── browse/            # Browse page
│   │   ├── sandbox/           # Component testing
│   │   └── test/              # Interactive testing
│   ├── components/            # React components
│   │   ├── home/              # Homepage components
│   │   ├── results/           # Results page components
│   │   ├── listing/           # Listing detail components
│   │   ├── browse/            # Browse page components
│   │   ├── safety/            # Safety components
│   │   └── ui/                # shadcn/ui components
│   └── lib/                   # Utility functions
│       ├── types.ts           # TypeScript types
│       ├── mock.ts            # Mock data
│       ├── currency.ts        # Currency formatting
│       ├── geo.ts             # Geographic utilities
│       ├── i18n.ts            # Internationalization
│       └── ui.ts              # UI utilities
├── prisma/                    # Database schema
├── public/                    # Static assets
└── docs/                      # Documentation
```

## 🎯 Key Features

### **Trust-First Design**
- Verification badges on every listing
- Insurance coverage prominently displayed
- Safety summaries with clear coverage details
- Trust statistics throughout the experience
- Deposit protection with explanations

### **Premium Interactions**
- Hover effects: cards lift + shadow-lg (200ms)
- Search bar focus: scale (1.01) + shadow-md (150ms)
- Filter changes: fade/slide animations
- Staggered entrance animations
- Smooth transitions throughout

### **Mobile Excellence**
- 100% responsive design
- Touch-optimized interactions
- Mobile-friendly forms (48px height, pill radius)
- Collapsible navigation
- Gesture support

### **RTL Support**
- `?lang=he` toggles `dir="rtl"` on html
- Mirror paddings and directional properties
- RTL-aware utility functions
- Localized numbers and dates

## 🔧 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### **Database Commands**
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset the database

## 🧪 Testing

### **Component Testing**
Visit `/test` to interactively test all components:
- Buttons and form controls
- Icons and badges
- Currency formatting
- Status indicators

### **Sandbox**
Visit `/sandbox` to see the design system:
- Color palette
- Typography hierarchy
- Component examples
- Interactive demos

## 🌐 Internationalization

### **RTL Support**
- Add `?lang=he` to test Hebrew layout
- Mirrored directional properties
- RTL-aware spacing and icons
- Localized numbers and dates

### **Translation System**
- Simple dictionary-based translations
- Nested key support
- Fallback to English
- Date and number localization

## 🛡️ Security & Trust

### **Verification System**
- Multi-level user verification
- Equipment verification badges
- Insurance status indicators
- Background check integration

### **Safety Features**
- Comprehensive insurance coverage
- Deposit protection system
- Dispute resolution process
- 24/7 customer support

## 📱 Mobile Optimization

### **Responsive Breakpoints**
- Mobile: < 768px (4-col grid)
- Tablet: 768px - 1024px
- Desktop: > 1024px (12-col grid)

### **Touch Interactions**
- Minimum 44px touch targets
- Swipe gestures for carousels
- Pull-to-refresh support
- Optimized form inputs

## 🚀 Deployment

### **Production Build**
```bash
npm run build
npm run start
```

### **Environment Variables**
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth.js secret
- `NEXTAUTH_URL` - Application URL
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `GOOGLE_MAPS_API_KEY` - Google Maps API key

## 📊 Performance

### **Optimizations**
- Lazy loading for images
- Code splitting by route
- Optimized bundle sizes
- Fast loading times

### **User Experience**
- Progressive enhancement
- Graceful error handling
- Loading states and skeletons
- Offline capability basics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Prisma](https://www.prisma.io/) for the database toolkit

---

**Built with ❤️ for the Lendly community**