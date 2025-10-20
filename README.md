# Lendly Israel - Equipment Rental Platform

## 🎯 Project Overview

Lendly is a comprehensive equipment rental platform designed specifically for the Israeli market, featuring Hebrew RTL support and localized payment methods.

## 🏗️ Architecture

```
lendly-israel/
├── apps/
│   ├── server/          # Next.js 14 API server
│   └── mobile/          # Expo React Native app
├── packages/
│   └── shared/          # Shared types and utilities
├── package.json         # Workspace configuration
└── turbo.json          # Build system configuration
```

## 🚀 Quick Start

### 1. Environment Setup

```bash
# Copy environment files
cp apps/server/env.example apps/server/.env
cp apps/mobile/env.example apps/mobile/.env

# Configure your environment variables
# - DATABASE_URL: PostgreSQL connection
# - JWT_SECRET: Random secret for tokens
# - EXPO_PUBLIC_SERVER_URL: Server URL
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

```bash
cd apps/server
npm run db:migrate
npm run db:seed
```

### 4. Start Development

```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Start mobile
cd apps/mobile
npm run start
```

## 📱 Mobile App

### Features
- **Hebrew RTL Interface** - Complete right-to-left support
- **JWT Authentication** - Secure token-based auth
- **Location Services** - Find nearby equipment
- **Camera Integration** - Photo checklists
- **Risk Assessment** - Dynamic deposit calculation
- **Push Notifications** - Booking updates

### Key Screens
- Authentication (Login/Register)
- Home with search functionality
- Category browsing
- Item details with booking
- Pickup/Return checklists
- Owner dashboard

## 🖥️ Server API

### Core Endpoints
- `POST /api/auth` - Authentication
- `GET /api/items` - Equipment listings
- `POST /api/bookings` - Create reservations
- `POST /api/risk/deposit` - Calculate deposits
- `POST /api/payments/manual/confirm` - Payment confirmation

### Database
- PostgreSQL with Prisma ORM
- JWT token management
- User roles and permissions
- Equipment and booking management

## 🧪 Testing Checklist

### Authentication
- [ ] User registration
- [ ] Login/logout
- [ ] Token refresh
- [ ] Session management

### Core Features
- [ ] Search and filter items
- [ ] View item details
- [ ] Calculate deposits
- [ ] Create bookings
- [ ] Complete checklists

### Hebrew RTL
- [ ] Text alignment
- [ ] Currency formatting (₪)
- [ ] Date formatting
- [ ] Navigation flow

## 🔮 Future Roadmap

### Phase 2
- Stripe payment integration
- Courier service integration
- Advanced search filters
- Real-time notifications

### Phase 3
- Locker pickup system
- Insurance claim processing
- Equipment maintenance tracking
- Advanced analytics

## 📞 Support

For technical support or questions, please contact the development team.

---

**Built with ❤️ for the Israeli market**