# Lendly Israel - Equipment Rental Platform

A comprehensive mono-repo for the Lendly equipment rental platform serving the Israeli market with Hebrew RTL support.

## 🏗️ Architecture

### Apps
- **`apps/server`** - Next.js 14 API server with Prisma + PostgreSQL
- **`apps/mobile`** - Expo React Native app with Hebrew RTL support

### Packages
- **`packages/shared`** - Shared Zod schemas, types, and Hebrew constants

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Expo CLI (for mobile development)

### 1. Setup Environment

```bash
# Copy environment files
cp apps/server/env.example apps/server/.env
cp apps/mobile/env.example apps/mobile/.env

# Edit the .env files with your configuration
# - DATABASE_URL: PostgreSQL connection string
# - JWT_SECRET: Random secret for JWT tokens
# - EXPO_PUBLIC_SERVER_URL: Server URL for mobile app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

```bash
cd apps/server
npm run db:migrate
npm run db:seed
```

### 4. Start Development

```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Start mobile app
cd apps/mobile
npm run start
```

## 📱 Mobile App Features

### Core Features
- **Hebrew RTL UI** - Complete right-to-left interface
- **JWT Authentication** - Secure token-based auth
- **Location Services** - Find nearby equipment
- **Camera Integration** - Photo checklists for pickup/return
- **Push Notifications** - Booking status updates
- **Risk Assessment** - Dynamic deposit calculation

### Screens
- `(auth)/login.tsx` - User authentication
- `(auth)/register.tsx` - User registration
- `(tabs)/index.tsx` - Home with search
- `(tabs)/browse.tsx` - Category browsing
- `results/index.tsx` - Search results
- `item/[id].tsx` - Item details with booking
- `booking/[id].tsx` - Booking status
- `checklist/pickup.tsx` - Pickup checklist
- `checklist/return.tsx` - Return checklist
- `owner/list.tsx` - Owner's listings
- `owner/new/*` - Multi-step listing creation
- `niche/request.tsx` - Category requests
- `settings/index.tsx` - User settings

## 🖥️ Server Features

### API Endpoints
- `POST /api/auth` - Login/Register
- `POST /api/auth/refresh` - Token refresh
- `GET /api/items` - List items with filters
- `POST /api/items` - Create item
- `GET /api/items/:id` - Item details
- `POST /api/bookings` - Create booking
- `POST /api/payments/manual/confirm` - Confirm payment
- `POST /api/risk/deposit` - Calculate deposit
- `POST /api/categories/request` - Request category

### Database Schema
- **Users** - Authentication and profiles
- **Items** - Equipment listings
- **Bookings** - Rental reservations
- **Availability** - Item availability windows
- **CategoryRequests** - New category requests
- **SafetyReports** - Incident reporting
- **RefreshTokens** - JWT token management

## 🔧 Development Scripts

### Root Level
```bash
npm run dev          # Start both server and mobile
npm run build        # Build all apps
npm run lint         # Lint all code
npm run typecheck    # Type check all code
```

### Server (`apps/server`)
```bash
npm run dev          # Start Next.js dev server
npm run build        # Build for production
npm run start        # Start production server
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
```

### Mobile (`apps/mobile`)
```bash
npm run start        # Start Expo dev server
npm run android      # Run on Android
npm run ios          # Run on iOS
npm run web          # Run on web
```

## 🧪 Testing Checklist

### Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] Token refresh works
- [ ] Logout clears session

### Search & Discovery
- [ ] Search by city works
- [ ] Filter by category works
- [ ] Date filtering works
- [ ] Location-based search works

### Booking Flow
- [ ] View item details
- [ ] Calculate deposit dynamically
- [ ] Toggle insurance affects deposit
- [ ] Create booking reservation
- [ ] Receive expiration notification

### Owner Features
- [ ] Create new listing
- [ ] Upload photos
- [ ] Set pricing and availability
- [ ] View booking requests
- [ ] Confirm manual payments

### Safety & Checklists
- [ ] Complete pickup checklist
- [ ] Take required photos
- [ ] Enter serial number
- [ ] Complete return checklist
- [ ] Report issues

### Hebrew RTL
- [ ] All text displays right-to-left
- [ ] Currency formatting (₪)
- [ ] Date formatting in Hebrew
- [ ] Navigation flows correctly

## 🔮 Future Enhancements

### Payment Integration
- Stripe integration for online payments
- Credit card processing
- Automated refunds

### Logistics
- Courier service integration
- Locker pickup system
- Delivery tracking

### Advanced Features
- Real-time chat between users
- Advanced search filters
- Equipment maintenance tracking
- Insurance claim processing

## 📄 License

This project is proprietary software for Lendly Israel.

## 🤝 Contributing

Please follow the established patterns:
- Use TypeScript for type safety
- Follow Hebrew RTL conventions
- Write comprehensive tests
- Document API changes
- Use conventional commits
