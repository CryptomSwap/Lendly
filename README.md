# Lendly - Peer-to-Peer Gear Rental MVP

A fun, production-ready peer-to-peer gear rental platform for Tel Aviv, built with Next.js 14, TypeScript, and modern web technologies.

## 🎯 Features

- **Multi-Category Rentals**: Cameras & Drones, DJ & Party, Event Appliances, Handyman Tools, Camping & Outdoors
- **Instant Booking**: Secure payments with Stripe, deposit holds, ID verification
- **Fun-First Design**: Playful microcopy, emoji accents, Lenny mascot, celebratory confetti
- **Tel Aviv Focus**: City-specific with English/Hebrew i18n support
- **Owner Earnings**: Stripe Connect payouts for gear owners

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account
- UploadThing account (for S3)

### Setup

1. **Clone and install dependencies**
   ```bash
   git clone <repo-url>
   cd lendly
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Database setup**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Stripe webhook setup** (for production)
   ```bash
   stripe listen --forward-to localhost:3000/api/payments/webhook
   # Copy the webhook secret to STRIPE_WEBHOOK_SECRET in .env
   ```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Authentication**: NextAuth.js
- **Payments**: Stripe (PaymentIntents + Connect Express)
- **ID Verification**: Persona
- **File Upload**: UploadThing (S3)
- **Analytics**: PostHog
- **Monitoring**: Sentry
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/
│   ├── (marketing)/          # Marketing pages
│   ├── api/                  # API routes
│   │   ├── items/           # Item CRUD
│   │   ├── bookings/        # Booking management
│   │   ├── payments/        # Stripe webhooks
│   │   └── ...
│   ├── dashboard/           # User dashboard
│   └── auth/                # Authentication
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── ItemCard.tsx         # Item display component
│   ├── LennyLogo.tsx        # Mascot component
│   └── ...
└── lib/
    ├── prisma.ts           # Database client
    ├── auth.ts             # NextAuth config
    ├── stripe.ts           # Stripe client
    ├── pricing.ts          # Price calculations
    └── ...
```

## 🎨 Design System

### Color Palette
- **Coral**: #FF6F61 (primary)
- **Teal**: #1FBFAE (secondary)  
- **Warm Yellow**: #FFC857 (accent)
- **Deep Ink**: #1C1B22 (text)
- **Cream**: #FAF6EF (background)

### Components
- Rounded corners (xl/2xl)
- Chunky buttons with soft shadows
- Playful badges with emojis
- Lenny mascot throughout

## 💰 Pricing Model

- **Service Fee**: 18% of rental cost
- **Insurance**: 5% optional coverage
- **Deposits**: Held (not charged) unless issues arise
- **Currency**: ILS (Israeli Shekels) in agorot (minor units)

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema changes
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
npm run seed         # Seed database
```

## 🌍 Internationalization

Supports English and Hebrew with simple dictionary-based translations:
- Hero text and CTAs
- Category labels
- Booking flow
- Dashboard sections

## 📊 Analytics Events

Key PostHog events tracked:
- `list_item_published`
- `search_performed`
- `checkout_started`
- `payment_succeeded`
- `booking_confirmed`
- `promo_applied`

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Environment Variables

Required for production:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `UPLOADTHING_TOKEN` - UploadThing token
- `POSTHOG_KEY` - PostHog project key

## 🎉 Next Milestones

- [ ] Complete Stripe Connect payouts integration
- [ ] Implement deposit hold capture on pickup
- [ ] Add admin panel for dispute management
- [ ] Integrate insurance provider API
- [ ] Add real-time chat between users
- [ ] Implement advanced search filters
- [ ] Add mobile app (React Native)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**Made with ❤️ in Tel Aviv** 🇮🇱