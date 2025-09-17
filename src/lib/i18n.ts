export type Locale = 'en' | 'he';

export const locales: Locale[] = ['en', 'he'];

export const defaultLocale: Locale = 'en';

export function isRTL(locale: Locale): boolean {
  return locale === 'he';
}

export function getLocaleFromSearchParams(searchParams: URLSearchParams): Locale {
  const lang = searchParams.get('lang');
  return locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
}

export const translations = {
  en: {
    // Navigation
    browse: 'Browse',
    howItWorks: 'How it works',
    safety: 'Safety',
    listYourGear: 'List your gear',
    signIn: 'Sign in',
    
    // Hero
    heroTitle: 'Rent pro gear near you — insured, verified, instant.',
    heroSubtitle: 'Cameras, drones, construction tools, event equipment and more. Book in minutes. Earn from your gear when you\'re not using it.',
    search: 'Search',
    startRenting: 'Start renting',
    searchPlaceholder: 'Where are you?',
    selectDates: 'Select dates',
    selectDatesDescription: 'Choose your rental period',
    startDate: 'Start date',
    endDate: 'End date',
    selectCategory: 'Select category',
    activeFilters: 'Active filters',
    clearAll: 'Clear all',
    viewDetails: 'View details',
    
    // Trust badges
    insured: 'Insured',
    idVerified: 'ID-Verified',
    instantBooking: 'Instant booking',
    rating: '4.9★',
    
    // Categories
    browseCategories: 'Browse Categories',
    browseCategoriesDescription: 'Find the perfect equipment for your next project',
    viewAllCategories: 'View all categories',
    
    // Nearby listings
    popularNearYou: 'Popular near you',
    popularNearYouDescription: 'Discover trending equipment in your area',
    today: 'Today',
    weekend: 'Weekend',
    nextWeek: 'Next week',
    viewAllIn: 'View all in',
    
    // How it works
    howItWorksTitle: 'How it works',
    howItWorksDescription: 'Rent equipment in three simple steps',
    step: 'Step',
    step1Title: 'Find gear',
    step1Description: 'Search by location, dates, and category to find the perfect equipment.',
    step2Title: 'Book & verify',
    step2Description: 'Book instantly and verify your identity for secure transactions.',
    step3Title: 'Pick up & return',
    step3Description: 'Meet the owner, pick up your gear, and return it when done.',
    
    // Safety
    safetyTitle: 'Safety, built in.',
    safetyDescription: 'Your security is our priority. Every rental is protected.',
    idVerification: 'ID verification for owners & renters',
    idVerificationDescription: 'All users must verify their identity before booking',
    depositHolds: 'Card deposit holds',
    depositHoldsDescription: 'Deposits are card holds captured only if damage is reported',
    perRentalInsurance: 'Per-rental insurance option',
    perRentalInsuranceDescription: 'Optional insurance coverage for additional protection',
    disputeResolution: 'Dispute resolution within 72h',
    disputeResolutionDescription: 'Fast resolution process for any issues',
    howProtectionWorks: 'How protection works',
    trustedPlatform: 'Trusted Platform',
    trustedPlatformDescription: 'Join thousands of satisfied users',
    successRate: 'Success Rate',
    support: 'Support',
    
    // Owners
    ownersTitle: 'Your gear, your price. We handle the rest.',
    ownersDescription: 'Turn your unused equipment into income.',
    setPrice: 'Set your own price',
    setPriceDescription: 'You control your pricing and availability',
    depositsInsurance: 'Deposits & insurance handled',
    depositsInsuranceDescription: 'We manage all financial transactions securely',
    fastPayouts: 'Fast payouts',
    fastPayoutsDescription: 'Get paid quickly after each rental',
    earnMore: 'Earn More',
    earnMoreDescription: 'Turn your unused gear into income',
    avgMonthlyEarnings: 'Avg Monthly Earnings',
    ownerRetention: 'Owner Retention',
    learnMore: 'Learn more',
    
    // Testimonials
    testimonialsTitle: 'Trusted by creators',
    testimonialsDescription: 'See what our community says about Lendly',
    testimonial1: 'Lendly made it so easy to rent professional camera gear for my wedding shoots. The verification process gave me peace of mind.',
    testimonial1Author: 'Sarah Chen',
    testimonial1Role: 'Wedding Photographer',
    testimonial2: 'I\'ve earned over $2,000 renting out my construction tools. The platform handles everything - payments, insurance, disputes.',
    testimonial2Author: 'David Rodriguez',
    testimonial2Role: 'Contractor',
    testimonial3: 'The safety features and insurance options made me feel confident renting expensive equipment.',
    testimonial3Author: 'Michael Cohen',
    testimonial3Role: 'Event Planner',
    joinThousands: 'Join thousands of satisfied users in Tel Aviv',
    
    // FAQ
    faqTitle: 'Frequently asked questions',
    faqDescription: 'Everything you need to know about renting on Lendly',
    faqDeposits: 'How do deposits work?',
    faqDepositsAnswer: 'Deposits are card holds that are only captured if damage is reported. Most rentals return without any issues.',
    faqInsurance: 'Is insurance included?',
    faqInsuranceAnswer: 'We offer optional per-rental insurance for additional protection. Basic coverage is included for verified users.',
    faqCancellations: 'Can I cancel my booking?',
    faqCancellationsAnswer: 'Yes, you can cancel up to 24 hours before pickup for a full refund. Same-day cancellations may incur fees.',
    faqLateReturns: 'What happens if I return gear late?',
    faqLateReturnsAnswer: 'Late returns incur additional fees. Contact the owner if you need to extend your rental period.',
    faqDelivery: 'Do you offer delivery?',
    faqDeliveryAnswer: 'Some owners offer delivery for an additional fee. Check individual listings for delivery options.',
    faqIdVerification: 'Why do I need ID verification?',
    faqIdVerificationAnswer: 'ID verification helps ensure safety for both renters and owners. It\'s required for all bookings.',
    stillHaveQuestions: 'Still have questions?',
    contactSupport: 'Contact Support',
    
    // Footer
    marketplace: 'Marketplace',
    support: 'Support',
    company: 'Company',
    legal: 'Legal',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    footerDescription: 'The trusted platform for renting professional equipment in Tel Aviv. Safe, verified, and instant.',
    safetyCenter: 'Safety Center',
    insurance: 'Insurance',
    verification: 'Verification',
    disputes: 'Disputes',
    helpCenter: 'Help Center',
    contactUs: 'Contact Us',
    community: 'Community',
    status: 'Status',
    about: 'About',
    careers: 'Careers',
    press: 'Press',
    blog: 'Blog',
    pricing: 'Pricing',
    allRightsReserved: 'All rights reserved',
    
    // Common
    currency: 'ILS',
    language: 'Language',
    english: 'English',
    hebrew: 'עברית',
  },
  he: {
    // Navigation
    browse: 'עיון',
    howItWorks: 'איך זה עובד',
    safety: 'בטיחות',
    listYourGear: 'פרסם ציוד',
    signIn: 'התחבר',
    
    // Hero
    heroTitle: 'שכור ציוד מקצועי לידך — מבוטח, מאומת, מיידי.',
    heroSubtitle: 'מצלמות, רחפנים, כלי בנייה, ציוד אירועים ועוד. הזמן תוך דקות. הרווח מהציוד שלך כשאינך משתמש בו.',
    search: 'חיפוש',
    startRenting: 'התחל לשכור',
    searchPlaceholder: 'איפה אתה?',
    selectDates: 'בחר תאריכים',
    selectDatesDescription: 'בחר את תקופת ההשכרה שלך',
    startDate: 'תאריך התחלה',
    endDate: 'תאריך סיום',
    selectCategory: 'בחר קטגוריה',
    activeFilters: 'מסננים פעילים',
    clearAll: 'נקה הכל',
    viewDetails: 'צפה בפרטים',
    
    // Trust badges
    insured: 'מבוטח',
    idVerified: 'מאומת',
    instantBooking: 'הזמנה מיידית',
    rating: '4.9★',
    
    // Categories
    browseCategories: 'עיין בקטגוריות',
    browseCategoriesDescription: 'מצא את הציוד המושלם לפרויקט הבא שלך',
    viewAllCategories: 'צפה בכל הקטגוריות',
    
    // Nearby listings
    popularNearYou: 'פופולרי לידך',
    popularNearYouDescription: 'גלה ציוד פופולרי באזור שלך',
    today: 'היום',
    weekend: 'סוף שבוע',
    nextWeek: 'שבוע הבא',
    viewAllIn: 'צפה בהכל ב',
    
    // How it works
    howItWorksTitle: 'איך זה עובד',
    howItWorksDescription: 'שכור ציוד בשלושה שלבים פשוטים',
    step: 'שלב',
    step1Title: 'מצא ציוד',
    step1Description: 'חפש לפי מיקום, תאריכים וקטגוריה כדי למצוא את הציוד המושלם.',
    step2Title: 'הזמן ואומת',
    step2Description: 'הזמן מיידית ואומת את זהותך לעסקאות מאובטחות.',
    step3Title: 'איסוף והחזרה',
    step3Description: 'פגש את הבעלים, אסוף את הציוד והחזר אותו כשסיימת.',
    
    // Safety
    safetyTitle: 'בטיחות, מובנית.',
    safetyDescription: 'הביטחון שלך הוא העדיפות שלנו. כל השכרה מוגנת.',
    idVerification: 'אימות זהות לבעלים ושוכרים',
    idVerificationDescription: 'כל המשתמשים חייבים לאמת את זהותם לפני ההזמנה',
    depositHolds: 'החזקת פיקדון בכרטיס',
    depositHoldsDescription: 'פיקדונות הם החזקות כרטיס שנחסכות רק אם נדווח על נזק',
    perRentalInsurance: 'אפשרות ביטוח לכל השכרה',
    perRentalInsuranceDescription: 'כיסוי ביטוח אופציונלי להגנה נוספת',
    disputeResolution: 'פתרון סכסוכים תוך 72 שעות',
    disputeResolutionDescription: 'תהליך פתרון מהיר לכל בעיה',
    howProtectionWorks: 'איך ההגנה עובדת',
    trustedPlatform: 'פלטפורמה מהימנה',
    trustedPlatformDescription: 'הצטרף לאלפי משתמשים מרוצים',
    successRate: 'שיעור הצלחה',
    support: 'תמיכה',
    
    // Owners
    ownersTitle: 'הציוד שלך, המחיר שלך. אנחנו מטפלים בשאר.',
    ownersDescription: 'הפוך את הציוד הלא בשימוש שלך להכנסה.',
    setPrice: 'קבע את המחיר שלך',
    setPriceDescription: 'אתה שולט במחירים ובזמינות שלך',
    depositsInsurance: 'פיקדונות וביטוח מטופלים',
    depositsInsuranceDescription: 'אנחנו מנהלים את כל העסקאות הפיננסיות בצורה מאובטחת',
    fastPayouts: 'תשלומים מהירים',
    fastPayoutsDescription: 'קבל תשלום מהיר אחרי כל השכרה',
    earnMore: 'הרווח יותר',
    earnMoreDescription: 'הפוך את הציוד הלא בשימוש שלך להכנסה',
    avgMonthlyEarnings: 'הכנסה חודשית ממוצעת',
    ownerRetention: 'שמירה על בעלים',
    learnMore: 'למד עוד',
    
    // Testimonials
    testimonialsTitle: 'מהימן על ידי יוצרים',
    testimonialsDescription: 'ראה מה הקהילה שלנו אומרת על Lendly',
    testimonial1: 'Lendly הפך את זה לקל כל כך לשכור ציוד מצלמה מקצועי לצילומי החתונה שלי. תהליך האימות נתן לי שקט נפשי.',
    testimonial1Author: 'שרה צ\'ן',
    testimonial1Role: 'צלמת חתונות',
    testimonial2: 'הרווחתי מעל $2,000 משכירת כלי הבנייה שלי. הפלטפורמה מטפלת בהכל - תשלומים, ביטוח, סכסוכים.',
    testimonial2Author: 'דוד רודריגז',
    testimonial2Role: 'קבלן',
    testimonial3: 'תכונות הבטיחות ואפשרויות הביטוח גרמו לי להרגיש בטוח לשכור ציוד יקר.',
    testimonial3Author: 'מיכאל כהן',
    testimonial3Role: 'מתכנן אירועים',
    joinThousands: 'הצטרף לאלפי משתמשים מרוצים בתל אביב',
    
    // FAQ
    faqTitle: 'שאלות נפוצות',
    faqDescription: 'כל מה שאתה צריך לדעת על השכרה ב-Lendly',
    faqDeposits: 'איך פיקדונות עובדים?',
    faqDepositsAnswer: 'פיקדונות הם החזקות כרטיס שנחסכות רק אם נדווח על נזק. רוב ההשכרות חוזרות ללא בעיות.',
    faqInsurance: 'האם ביטוח כלול?',
    faqInsuranceAnswer: 'אנחנו מציעים ביטוח אופציונלי לכל השכרה להגנה נוספת. כיסוי בסיסי כלול למשתמשים מאומתים.',
    faqCancellations: 'האם אני יכול לבטל את ההזמנה שלי?',
    faqCancellationsAnswer: 'כן, אתה יכול לבטל עד 24 שעות לפני האיסוף להחזר מלא. ביטולים באותו יום עלולים לגרור עמלות.',
    faqLateReturns: 'מה קורה אם אני מחזיר ציוד באיחור?',
    faqLateReturnsAnswer: 'החזרות באיחור גוררות עמלות נוספות. צור קשר עם הבעלים אם אתה צריך להאריך את תקופת ההשכרה.',
    faqDelivery: 'האם אתם מציעים משלוח?',
    faqDeliveryAnswer: 'חלק מהבעלים מציעים משלוח תמורת תשלום נוסף. בדוק רשימות בודדות לאפשרויות משלוח.',
    faqIdVerification: 'למה אני צריך אימות זהות?',
    faqIdVerificationAnswer: 'אימות זהות עוזר להבטיח בטיחות גם לשוכרים וגם לבעלים. זה נדרש לכל ההזמנות.',
    stillHaveQuestions: 'עדיין יש לך שאלות?',
    contactSupport: 'צור קשר עם התמיכה',
    
    // Footer
    marketplace: 'שוק',
    support: 'תמיכה',
    company: 'חברה',
    legal: 'משפטי',
    privacyPolicy: 'מדיניות פרטיות',
    termsOfService: 'תנאי שירות',
    cookiePolicy: 'מדיניות עוגיות',
    footerDescription: 'הפלטפורמה המהימנה להשכרת ציוד מקצועי בתל אביב. בטוח, מאומת ומיידי.',
    safetyCenter: 'מרכז בטיחות',
    insurance: 'ביטוח',
    verification: 'אימות',
    disputes: 'סכסוכים',
    helpCenter: 'מרכז עזרה',
    contactUs: 'צור קשר',
    community: 'קהילה',
    status: 'סטטוס',
    about: 'אודות',
    careers: 'קריירה',
    press: 'עיתונות',
    blog: 'בלוג',
    pricing: 'מחירים',
    allRightsReserved: 'כל הזכויות שמורות',
    
    // Common
    currency: '₪',
    language: 'שפה',
    english: 'English',
    hebrew: 'עברית',
  }
} as const;

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || translations[defaultLocale][key as keyof typeof translations[typeof defaultLocale]] || key;
}

// Translation function for components
export function t(locale: Locale, key: string): string {
  return getTranslation(locale, key);
}

// Get text direction for locale
export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}