# Lendly - Peer-to-Peer Gear Rental Marketplace

A production-ready MVP for a global peer-to-peer gear rental marketplace, starting with an Israel pilot. Built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Features

- **Search-first homepage** with category browsing and nearby listings
- **Dynamic deposit risk model** with real-time calculations
- **Comprehensive safety & insurance UX** with pickup/return checklists
- **Stripe integration** for payments and Connect for owner payouts
- **Persona ID verification** with webhook handling
- **UploadThing + S3** for image uploads
- **PostHog analytics** and Sentry error reporting
- **RTL/i18n support** (Hebrew/English)
- **Mobile-first responsive design** with accessibility features

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes, Prisma ORM, PostgreSQL
- **Authentication**: NextAuth.js (Credentials + Google OAuth)
- **Payments**: Stripe (PaymentIntents + Connect Express)
- **ID Verification**: Persona (webhook integration)
- **File Uploads**: UploadThing + AWS S3
- **Analytics**: PostHog
- **Error Tracking**: Sentry
- **Internationalization**: Custom i18n solution with RTL support

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Stripe account
- Persona account (for ID verification)
- AWS S3 bucket (for file uploads)
- PostHog account (for analytics)
- Sentry account (for error tracking)

## 🚀 Quick Start

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd lendly
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/lendly"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_CONNECT_CLIENT_ID="ca_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   PERSONA_API_KEY="your-persona-api-key"
   PERSONA_WEBHOOK_SECRET="your-persona-webhook-secret"
   UPLOADTHING_TOKEN="your-uploadthing-token"
   S3_REGION="us-east-1"
   S3_BUCKET="your-s3-bucket"
   S3_ACCESS_KEY_ID="your-s3-access-key"
   S3_SECRET_ACCESS_KEY="your-s3-secret-key"
   POSTHOG_KEY="your-posthog-key"
   SENTRY_AUTH_TOKEN="your-sentry-token"
   ```

3. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Set up Stripe webhooks**
   ```bash
   stripe listen --forward-to localhost:3000/api/payments/webhook
   ```
   Copy the webhook secret and add it to your `.env` file.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── items/[id]/        # Item detail page
│   ├── browse/            # Browse/search page
│   └── ...
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── home/             # Homepage components
│   ├── browse/           # Browse page components
│   ├── listing/          # Item detail components
│   ├── safety/           # Safety & insurance components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client
│   ├── stripe.ts        # Stripe client
│   ├── pricing.ts       # Pricing calculations
│   ├── risk.ts          # Dynamic deposit model
│   ├── geo.ts           # Geolocation utilities
│   ├── i18n.ts          # Internationalization
│   └── ...
└── ...
```

## 🔧 Key Features Implementation

### Dynamic Deposit Risk Model

The deposit calculation considers multiple risk factors:

- **Item Risk**: Fragility, theft appeal, age, telemetry
- **Renter Risk**: ID verification status, rental history, account age
- **Context Risk**: Rental duration, pickup method, location, timing

```typescript
// Example usage
const riskInputs = {
  itemValueILS: 4500,
  category: 'CAMERA',
  itemFragility: 0.3,
  theftAppeal: 0.7,
  itemAgeYears: 2,
  hasTelemetry: false,
  renter: {
    idv: 'VERIFIED',
    completed: 5,
    disputes: 0,
    accountDays: 365,
    billingMatch: true
  },
  context: {
    days: 3,
    pickupMethod: 'IN_PERSON',
    locationRisk: 0.3,
    nightPickup: false
  }
}

const quote = depositQuote(riskInputs)
// Returns: { depositILS: 450, factors: {...}, explanation: [...] }
```

### Safety & Insurance UX

- **Safety Summary**: Shows coverage, deductibles, and claim process
- **Pickup Checklist**: 6 photos minimum, serial number, function test
- **Return Checklist**: Condition assessment, damage reporting
- **Insurance Toggle**: Optional coverage with transparent pricing

### Payment Flow

1. **Booking Creation**: Validates availability, calculates pricing
2. **Stripe PaymentIntent**: Created for rental + fees + insurance
3. **Deposit Hold**: Separate PaymentIntent for security deposit
4. **Webhook Processing**: Confirms booking on payment success

## 🌐 Internationalization

Supports Hebrew (RTL) and English with automatic layout direction:

```typescript
// Set language via URL parameter
// ?lang=he - Hebrew (RTL)
// ?lang=en - English (LTR)

import { t, isRTL } from '@/lib/i18n'

const title = t('home.hero.title', 'he') // "שכור ציוד מאנשים מקומיים"
const rtl = isRTL('he') // true
```

## 📊 Analytics & Monitoring

### PostHog Events
- `list_item_published`
- `search_performed`
- `checkout_started`
- `idv_started`
- `payment_succeeded`
- `booking_confirmed`
- `deposit_quote_returned`
- `pickup_checklist_completed`
- `return_checklist_completed`

### Sentry Integration
- Client-side error tracking
- Server-side error monitoring
- Performance monitoring

## 🔒 Security Features

- **ID Verification**: Persona integration with webhook verification
- **Role-based Access**: NextAuth session management
- **Input Validation**: Zod schemas for all API endpoints
- **SQL Injection Protection**: Prisma ORM
- **XSS Protection**: React's built-in protections
- **CSRF Protection**: NextAuth built-in CSRF tokens

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests (when implemented)
npm run test
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Railway**: Great for PostgreSQL + Node.js
- **Render**: Good alternative with PostgreSQL support
- **DigitalOcean**: App Platform with managed databases

## 📚 API Documentation

### Key Endpoints

- `GET /api/items` - List items with filtering
- `POST /api/items` - Create new item (authenticated)
- `GET /api/items/[id]` - Get item details
- `POST /api/bookings` - Create booking
- `POST /api/risk/deposit` - Calculate deposit quote
- `POST /api/payments/webhook` - Stripe webhook handler
- `POST /api/verify/persona/webhook` - Persona webhook handler

## 🔮 Future Enhancements

### vNext Features
- [ ] Real-time chat between owners and renters
- [ ] Advanced map integration with clustering
- [ ] Owner valuation catalog with depreciation bands
- [ ] Insurance partner API integration
- [ ] Admin panel for disputes and claims
- [ ] Mobile app (React Native)
- [ ] Advanced search with AI recommendations
- [ ] Multi-language support expansion
- [ ] Subscription plans for frequent renters
- [ ] Equipment maintenance scheduling

### Technical Improvements
- [ ] Comprehensive test suite
- [ ] Performance optimization
- [ ] Advanced caching strategies
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] A/B testing framework

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the [FAQ](./docs/FAQ.md)
- Review the [Safety Policy](./docs/Safety-Policy.md)
- Contact support: support@lendly.com

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Payments by [Stripe](https://stripe.com/)
- ID verification by [Persona](https://withpersona.com/)