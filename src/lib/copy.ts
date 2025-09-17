// Centralized copy for easy translation and updates
export const COPY = {
  // Brand
  brandName: 'Lendly',
  tagline: 'Rent pro gear near you — insured, verified, instant.',
  
  // Navigation
  nav: {
    browse: 'Browse',
    howItWorks: 'How it works',
    safety: 'Safety',
    listYourGear: 'List your gear',
    signIn: 'Sign in',
  },
  
  // Hero section
  hero: {
    title: 'Rent pro gear near you — insured, verified, instant.',
    subtitle: 'Cameras, drones, construction tools, event equipment and more. Book in minutes. Earn from your gear when you\'re not using it.',
    searchPlaceholder: 'Where are you?',
    datePlaceholder: 'Select dates',
    categoryPlaceholder: 'What do you need?',
    searchButton: 'Search',
    startRenting: 'Start renting',
    trustBadges: {
      insured: 'Insured',
      idVerified: 'ID-Verified',
      instantBooking: 'Instant booking',
      rating: '4.9★',
    }
  },
  
  // Categories
  categories: {
    cameras: 'Cameras',
    drones: 'Drones',
    construction: 'Construction',
    gardening: 'Gardening',
    eventEquipment: 'Event Equipment',
    powerTools: 'Power Tools',
    camping: 'Camping',
    audioPA: 'Audio/PA',
    lenses: 'Lenses',
  },
  
  // Search
  search: {
    location: 'Location',
    dates: 'Dates',
    category: 'Category',
    geolocate: 'Use my location',
    searchButton: 'Search',
  },
  
  // Nearby listings
  nearby: {
    title: 'Popular near you',
    filters: {
      today: 'Today',
      weekend: 'Weekend',
      nextWeek: 'Next week',
    },
    viewAll: 'View all in',
    distance: 'km away',
    deposit: 'Deposit',
    verified: 'Verified',
    insured: 'Insured',
  },
  
  // How it works
  howItWorks: {
    title: 'How it works',
    step1: {
      title: 'Find gear',
      description: 'Search by location, dates, and category to find the perfect equipment.',
    },
    step2: {
      title: 'Book & verify',
      description: 'Book instantly and verify your identity for secure transactions.',
    },
    step3: {
      title: 'Pick up & return',
      description: 'Meet the owner, pick up your gear, and return it when done.',
    },
  },
  
  // Safety
  safety: {
    title: 'Safety, built in.',
    description: 'Your security is our priority. Every rental is protected.',
    features: {
      idVerification: 'ID verification for owners & renters',
      depositHolds: 'Card deposit holds (captured only if needed)',
      perRentalInsurance: 'Per-rental insurance option',
      disputeResolution: 'Dispute resolution within 72h',
    },
    learnMore: 'How protection works',
  },
  
  // Owners section
  owners: {
    title: 'Your gear, your price. We handle the rest.',
    description: 'Turn your unused equipment into income.',
    features: {
      setPrice: 'Set your own price',
      depositsInsurance: 'Deposits & insurance handled',
      fastPayouts: 'Fast payouts',
    },
    cta: 'List your gear',
  },
  
  // Testimonials
  testimonials: {
    title: 'Trusted by creators',
    testimonial1: {
      text: 'Lendly made it so easy to rent professional camera gear for my wedding shoots. The verification process gave me peace of mind.',
      author: 'Sarah Chen',
      role: 'Wedding Photographer',
    },
    testimonial2: {
      text: 'I\'ve earned over $2,000 renting out my construction tools. The platform handles everything - payments, insurance, disputes.',
      author: 'David Rodriguez',
      role: 'Contractor',
    },
  },
  
  // FAQ
  faq: {
    title: 'Frequently asked questions',
    questions: {
      deposits: {
        question: 'How do deposits work?',
        answer: 'Deposits are card holds that are only captured if damage is reported. Most rentals return without any issues.',
      },
      insurance: {
        question: 'Is insurance included?',
        answer: 'We offer optional per-rental insurance for additional protection. Basic coverage is included for verified users.',
      },
      cancellations: {
        question: 'Can I cancel my booking?',
        answer: 'Yes, you can cancel up to 24 hours before pickup for a full refund. Same-day cancellations may incur fees.',
      },
      lateReturns: {
        question: 'What happens if I return gear late?',
        answer: 'Late returns incur additional fees. Contact the owner if you need to extend your rental period.',
      },
      delivery: {
        question: 'Do you offer delivery?',
        answer: 'Some owners offer delivery for an additional fee. Check individual listings for delivery options.',
      },
      idVerification: {
        question: 'Why do I need ID verification?',
        answer: 'ID verification helps ensure safety for both renters and owners. It\'s required for all bookings.',
      },
    },
  },
  
  // Footer
  footer: {
    marketplace: 'Marketplace',
    support: 'Support',
    company: 'Company',
    legal: 'Legal',
    links: {
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      cookiePolicy: 'Cookie Policy',
    },
    language: 'Language',
    currency: 'Currency',
  },
  
  // Common
  common: {
    loading: 'Loading...',
    error: 'Something went wrong',
    tryAgain: 'Try again',
    learnMore: 'Learn more',
    getStarted: 'Get started',
    contactUs: 'Contact us',
  },
} as const;

// Helper function to get nested copy values
export function getCopy(path: string): string {
  const keys = path.split('.');
  let value: any = COPY;
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  return value || path;
}