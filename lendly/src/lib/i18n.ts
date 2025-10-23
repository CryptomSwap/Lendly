// Internationalization utilities for Lendly

export type Language = 'en' | 'he' | 'ar'

export interface Translations {
  [key: string]: string | Translations
}

// Simple translation dictionary
const translations: Record<Language, Translations> = {
  en: {
    brand: {
      name: 'Lendly',
      tagline: 'Trusted Rentals'
    },
    footer: {
      headings: {
        company: 'Company',
        support: 'Support',
        legal: 'Legal'
      },
      company: {
        about: 'About Us',
        careers: 'Careers',
        press: 'Press',
        blog: 'Blog'
      },
      support: {
        helpCenter: 'Help Center',
        safety: 'Safety',
        community: 'Community Guidelines',
        contact: 'Contact Us'
      },
      legal: {
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        cookies: 'Cookie Policy',
        insurance: 'Insurance'
      },
      trustBadges: {
        verifiedInsured: 'Verified & Insured',
        support247: '24/7 Support',
        securePayments: 'Secure Payments'
      },
      copyright: '© 2024 Lendly. All rights reserved.',
      contact: {
        email: 'support@lendly.com',
        phone: '+1 (555) 123-4567',
        location: 'Tel Aviv, Israel'
      }
    },
    marketing: {
      hero: {
        titleLine1: 'Rent anything near you —',
        titleLine2: 'insured & verified',
        subtitle: 'Discover premium equipment from verified owners in your area. Everything insured, every rental protected.',
        successfulRentalsSuffix: '+ successful rentals',
        browseCta: 'Browse categories',
        listCta: 'List your gear',
        verifiedUsersLabel: 'verified users',
        averageRatingLabel: 'average rating',
        responseTimeLabel: 'response time'
      },
      protectionCta: 'How protection works'
    },
    common: {
      search: 'Search',
      browse: 'Browse',
      list: 'List',
      dashboard: 'Dashboard',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      view: 'View',
      share: 'Share',
      favorite: 'Favorite',
      report: 'Report'
    },
    navigation: {
      home: 'Home',
      browse: 'Browse Equipment',
      listItem: 'List Your Item',
      dashboard: 'Dashboard',
      profile: 'Profile',
      settings: 'Settings',
      help: 'Help'
    },
    search: {
      placeholder: 'What are you looking for?',
      location: 'Location',
      dates: 'Dates',
      category: 'Category',
      price: 'Price',
      radius: 'Search radius',
      filters: 'Filters',
      sortBy: 'Sort by',
      nearest: 'Nearest',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low',
      rating: 'Rating',
      available: 'Available only',
      verified: 'Verified users only',
      insured: 'Insured items only'
    },
    categories: {
      cameras: 'Cameras',
      drones: 'Drones',
      construction: 'Construction',
      gardening: 'Gardening',
      'event-equipment': 'Event Equipment',
      'power-tools': 'Power Tools',
      camping: 'Camping',
      'audio-pa': 'Audio/PA'
    },
    item: {
      pricePerDay: 'per day',
      deposit: 'deposit',
      rating: 'rating',
      reviews: 'reviews',
      verified: 'Verified',
      insured: 'Insured',
      instantBook: 'Instant Book',
      available: 'Available',
      unavailable: 'Unavailable',
      bookNow: 'Book Now',
      contactOwner: 'Contact Owner',
      viewDetails: 'View Details'
    },
    booking: {
      selectDates: 'Select dates',
      total: 'Total',
      subtotal: 'Subtotal',
      insurance: 'Insurance',
      platformFee: 'Platform fee',
      deposit: 'Deposit',
      bookNow: 'Book Now',
      bookingConfirmation: 'Booking Confirmation',
      bookingSuccess: 'Booking successful!'
    },
    trust: {
      verifiedUsers: 'Verified Users',
      fullyInsured: 'Fully Insured',
      instantBooking: 'Instant Booking',
      localCommunity: 'Local Community',
      safetyBuiltIn: 'Safety, built in',
      idVerification: 'ID verification',
      depositHold: 'Deposit hold (only captured if needed)',
      perRentalInsurance: 'Per-rental insurance',
      disputeResolution: 'Dispute resolution <72h'
    }
  },
  he: {
    brand: {
      name: 'Lendly',
      tagline: 'השכרות באמון'
    },
    footer: {
      headings: {
        company: 'חברה',
        support: 'תמיכה',
        legal: 'משפטי'
      },
      company: {
        about: 'עלינו',
        careers: 'קריירה',
        press: 'עיתונות',
        blog: 'בלוג'
      },
      support: {
        helpCenter: 'מרכז העזרה',
        safety: 'בטיחות',
        community: 'כללי קהילה',
        contact: 'צור קשר'
      },
      legal: {
        terms: 'תנאי שירות',
        privacy: 'מדיניות פרטיות',
        cookies: 'מדיניות קוקיז',
        insurance: 'ביטוח'
      },
      trustBadges: {
        verifiedInsured: 'מאומת ומבוטח',
        support247: 'תמיכה 24/7',
        securePayments: 'תשלומים מאובטחים'
      },
      copyright: '© 2024 Lendly. כל הזכויות שמורות.',
      contact: {
        email: 'support@lendly.com',
        phone: '+972 (0)55-123-4567',
        location: 'תל אביב, ישראל'
      }
    },
    marketing: {
      hero: {
        titleLine1: 'השכירו כל דבר לידכם —',
        titleLine2: 'מבוטח ומאומת',
        subtitle: 'גלו ציוד איכותי מבעלים מאומתים באזור שלכם. הכל מבוטח, כל השכרה מוגנת.',
        successfulRentalsSuffix: '+ השכרות מוצלחות',
        browseCta: 'עיינו בקטגוריות',
        listCta: 'פרסמו את הציוד שלכם',
        verifiedUsersLabel: 'משתמשים מאומתים',
        averageRatingLabel: 'דירוג ממוצע',
        responseTimeLabel: 'זמן תגובה'
      },
      protectionCta: 'איך ההגנה עובדת'
    },
    common: {
      search: 'חיפוש',
      browse: 'עיון',
      list: 'רשימה',
      dashboard: 'לוח בקרה',
      signIn: 'התחברות',
      signUp: 'הרשמה',
      signOut: 'התנתקות',
      cancel: 'ביטול',
      confirm: 'אישור',
      save: 'שמירה',
      edit: 'עריכה',
      delete: 'מחיקה',
      loading: 'טוען...',
      error: 'שגיאה',
      success: 'הצלחה',
      close: 'סגירה',
      back: 'חזרה',
      next: 'הבא',
      previous: 'קודם',
      view: 'צפייה',
      share: 'שיתוף',
      favorite: 'מועדפים',
      report: 'דיווח'
    },
    navigation: {
      home: 'בית',
      browse: 'עיון בציוד',
      listItem: 'פרסום פריט',
      dashboard: 'לוח בקרה',
      profile: 'פרופיל',
      settings: 'הגדרות',
      help: 'עזרה'
    },
    search: {
      placeholder: 'מה אתם מחפשים?',
      location: 'מיקום',
      dates: 'תאריכים',
      category: 'קטגוריה',
      price: 'מחיר',
      radius: 'רדיוס חיפוש',
      filters: 'מסננים',
      sortBy: 'מיון לפי',
      nearest: 'הכי קרוב',
      priceAsc: 'מחיר: נמוך לגבוה',
      priceDesc: 'מחיר: גבוה לנמוך',
      rating: 'דירוג',
      available: 'זמין בלבד',
      verified: 'משתמשים מאומתים בלבד',
      insured: 'פריטים מבוטחים בלבד'
    },
    categories: {
      cameras: 'מצלמות',
      drones: 'רחפנים',
      construction: 'בנייה',
      gardening: 'גינון',
      'event-equipment': 'ציוד לאירועים',
      'power-tools': 'כלי עבודה',
      camping: 'קמפינג',
      'audio-pa': 'אודיו/PA'
    },
    item: {
      pricePerDay: 'ליום',
      deposit: 'פיקדון',
      rating: 'דירוג',
      reviews: 'ביקורות',
      verified: 'מאומת',
      insured: 'מבוטח',
      instantBook: 'הזמנה מיידית',
      available: 'זמין',
      unavailable: 'לא זמין',
      bookNow: 'הזמן עכשיו',
      contactOwner: 'צור קשר עם הבעלים',
      viewDetails: 'צפה בפרטים'
    },
    booking: {
      selectDates: 'בחר תאריכים',
      total: 'סה"כ',
      subtotal: 'סכום ביניים',
      insurance: 'ביטוח',
      platformFee: 'עמלת פלטפורמה',
      deposit: 'פיקדון',
      bookNow: 'הזמן עכשיו',
      bookingConfirmation: 'אישור הזמנה',
      bookingSuccess: 'ההזמנה בוצעה בהצלחה!'
    },
    trust: {
      verifiedUsers: 'משתמשים מאומתים',
      fullyInsured: 'מבוטח במלואו',
      instantBooking: 'הזמנה מיידית',
      localCommunity: 'קהילה מקומית',
      safetyBuiltIn: 'בטיחות מובנית',
      idVerification: 'אימות זהות',
      depositHold: 'החזקת פיקדון (נגבה רק במידת הצורך)',
      perRentalInsurance: 'ביטוח לכל השכרה',
      disputeResolution: 'פתרון מחלוקות תוך 72 שעות'
    }
  }
  ,
  ar: {
    brand: {
      name: 'Lendly',
      tagline: 'تأجير موثوق'
    },
    footer: {
      headings: {
        company: 'الشركة',
        support: 'الدعم',
        legal: 'قانوني'
      },
      company: {
        about: 'معلومات عنا',
        careers: 'وظائف',
        press: 'إعلام',
        blog: 'مدونة'
      },
      support: {
        helpCenter: 'مركز المساعدة',
        safety: 'السلامة',
        community: 'إرشادات المجتمع',
        contact: 'اتصل بنا'
      },
      legal: {
        terms: 'شروط الخدمة',
        privacy: 'سياسة الخصوصية',
        cookies: 'سياسة ملفات تعريف الارتباط',
        insurance: 'التأمين'
      },
      trustBadges: {
        verifiedInsured: 'موثّق ومؤمّن',
        support247: 'دعم 24/7',
        securePayments: 'مدفوعات آمنة'
      },
      copyright: '© 2024 Lendly. جميع الحقوق محفوظة.',
      contact: {
        email: 'support@lendly.com',
        phone: '+1 (555) 123-4567',
        location: 'تل أبيب، إسرائيل'
      }
    },
    common: {
      search: 'بحث',
      browse: 'تصفح',
      list: 'قائمة',
      dashboard: 'لوحة التحكم',
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      signOut: 'تسجيل الخروج',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      save: 'حفظ',
      edit: 'تعديل',
      delete: 'حذف',
      loading: 'جارٍ التحميل...',
      error: 'خطأ',
      success: 'تم بنجاح',
      close: 'إغلاق',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      view: 'عرض',
      share: 'مشاركة',
      favorite: 'مفضلة',
      report: 'إبلاغ'
    },
    navigation: {
      home: 'الرئيسية',
      browse: 'تصفح المعدات',
      listItem: 'انشر عنصرًا',
      dashboard: 'لوحة التحكم',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      help: 'مساعدة'
    },
    search: {
      placeholder: 'عمّ تبحث؟',
      location: 'الموقع',
      dates: 'التواريخ',
      category: 'الفئة',
      price: 'السعر',
      radius: 'نطاق البحث',
      filters: 'مرشحات',
      sortBy: 'ترتيب حسب',
      nearest: 'الأقرب',
      priceAsc: 'السعر: من الأقل إلى الأعلى',
      priceDesc: 'السعر: من الأعلى إلى الأقل',
      rating: 'التقييم',
      available: 'متوفر فقط',
      verified: 'المستخدمون الموثقون فقط',
      insured: 'العناصر المؤمنة فقط'
    },
    categories: {
      cameras: 'كاميرات',
      drones: 'طائرات بدون طيار',
      construction: 'إنشاءات',
      gardening: 'بستنة',
      'event-equipment': 'معدات الفعاليات',
      'power-tools': 'أدوات كهربائية',
      camping: 'تخييم',
      'audio-pa': 'صوت/PA'
    },
    item: {
      pricePerDay: 'في اليوم',
      deposit: 'تأمين',
      rating: 'تقييم',
      reviews: 'مراجعات',
      verified: 'موثق',
      insured: 'مؤمن',
      instantBook: 'حجز فوري',
      available: 'متاح',
      unavailable: 'غير متاح',
      bookNow: 'احجز الآن',
      contactOwner: 'تواصل مع المالك',
      viewDetails: 'عرض التفاصيل'
    },
    booking: {
      selectDates: 'اختر التواريخ',
      total: 'الإجمالي',
      subtotal: 'المجموع الفرعي',
      insurance: 'تأمين',
      platformFee: 'رسوم المنصة',
      deposit: 'تأمين',
      bookNow: 'احجز الآن',
      bookingConfirmation: 'تأكيد الحجز',
      bookingSuccess: 'تم الحجز بنجاح!'
    },
    marketing: {
      hero: {
        titleLine1: 'استأجر أي شيء بالقرب منك —',
        titleLine2: 'مؤمّن وموثق',
        subtitle: 'اكتشف معدات عالية الجودة من مالكين موثقين في منطقتك. كل شيء مؤمّن، وكل عملية إيجار محمية.',
        successfulRentalsSuffix: '+ عمليات إيجار ناجحة',
        browseCta: 'تصفح الفئات',
        listCta: 'انشر معداتك',
        verifiedUsersLabel: 'مستخدمون موثقون',
        averageRatingLabel: 'تقييم متوسط',
        responseTimeLabel: 'وقت الاستجابة'
      },
      protectionCta: 'كيف تعمل الحماية'
    },
    trust: {
      verifiedUsers: 'مستخدمون موثقون',
      fullyInsured: 'مؤمن بالكامل',
      instantBooking: 'حجز فوري',
      localCommunity: 'مجتمع محلي',
      safetyBuiltIn: 'السلامة مدمجة',
      idVerification: 'توثيق الهوية',
      depositHold: 'حجز التأمين (يُسحب عند الحاجة فقط)',
      perRentalInsurance: 'تأمين لكل عملية إيجار',
      disputeResolution: 'حل النزاعات خلال 72 ساعة'
    }
  }
}

/**
 * Check if current language is RTL (Right-to-Left)
 * @param lang Language code (optional, defaults to current URL param)
 * @returns True if RTL
 */
export function isRTL(lang?: string): boolean {
  if (typeof window === 'undefined') return false
  
  const urlLang = new URLSearchParams(window.location.search).get('lang')
  const currentLang = lang || urlLang || 'en'
  return currentLang === 'he' || currentLang === 'ar'
}

/**
 * Get current language from URL or default to 'en'
 * @returns Current language code
 */
export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  
  const urlLang = new URLSearchParams(window.location.search).get('lang')
  if (urlLang === 'he') return 'he'
  if (urlLang === 'ar') return 'ar'
  return 'en'
}

/**
 * Get translation for a key
 * @param key Translation key (supports nested keys with dots)
 * @param lang Language code (optional)
 * @returns Translated string or key if not found
 */
export function t(key: string, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage()
  const keys = key.split('.')
  
  let value: any = translations[currentLang]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      // Fallback to English if translation not found
      value = translations.en
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey]
        } else {
          return key // Return key if no translation found
        }
      }
      break
    }
  }
  
  return typeof value === 'string' ? value : key
}

/**
 * Format date according to current locale
 * @param date Date to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const currentLang = getCurrentLanguage()
  const locale = currentLang === 'he' ? 'he-IL' : 'en-US'
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  }).format(dateObj)
}

/**
 * Format number according to current locale
 * @param number Number to format
 * @param options Intl.NumberFormatOptions
 * @returns Formatted number string
 */
export function formatNumber(
  number: number,
  options: Intl.NumberFormatOptions = {}
): string {
  const currentLang = getCurrentLanguage()
  const locale = currentLang === 'he' ? 'he-IL' : 'en-US'
  
  return new Intl.NumberFormat(locale, options).format(number)
}

/**
 * Get direction attribute for current language
 * @returns 'rtl' or 'ltr'
 */
export function getDirection(): 'rtl' | 'ltr' {
  return isRTL() ? 'rtl' : 'ltr'
}

/**
 * Mirror padding/margin classes for RTL
 * @param classes CSS classes with directional properties
 * @returns Classes with RTL-aware directional properties
 */
export function rtlClasses(classes: string): string {
  if (!isRTL()) return classes
  
  return classes
    .replace(/pl-(\d+)/g, 'pr-$1')
    .replace(/pr-(\d+)/g, 'pl-$1')
    .replace(/ml-(\d+)/g, 'mr-$1')
    .replace(/mr-(\d+)/g, 'ml-$1')
    .replace(/left-/g, 'right-')
    .replace(/right-/g, 'left-')
}
