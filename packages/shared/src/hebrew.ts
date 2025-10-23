// Hebrew UI Constants
export const HEBREW_COPY = {
  // Hero & Main CTAs
  HERO_TITLE: "השכרה בטוחה של ציוד מקצועי — קרוב אליך, מאומת ומבוטח",
  SEARCH_PLACEHOLDER_CITY: "עיר / מיקום",
  SEARCH_PLACEHOLDER_DATES: "תאריכים",
  SEARCH_PLACEHOLDER_CATEGORY: "קטגוריה",
  SEARCH_BUTTON: "חיפוש",
  RESERVE_BUTTON: "שמור הזמנה — תשלום באיסוף",
  PUBLISH_EQUIPMENT: "פרסם ציוד",
  ADD_PREMIUM_INSURANCE: "הוסף ביטוח פרימיום",

  // Safety Points
  SAFETY_POINTS: {
    IDENTITY_VERIFICATION: "אימות זהות לשוכרים ולמפרסמים",
    DEPOSIT_SYSTEM: "ערבון בהקפאת כרטיס או מזומן באיסוף (בשלב MVP)",
    DAMAGE_COVERAGE: "כיסוי נזקים תאונתיים עד תקרה בסיסית",
    DEDUCTIBLE: "השתתפות עצמית לפי קטגוריה",
    REPORTING_WINDOW: "חלון דיווח 72–48 שעות",
  },

  // Pickup Options
  PICKUP_OPTIONS: {
    SELF_PICKUP: "איסוף עצמי (חינם)",
    COURIER: "שליח (בקרוב)",
    LOCKER: "תא לוקר (בקרוב)",
  },

  // Navigation
  NAV: {
    HOME: "בית",
    BROWSE: "עיון",
    MY_BOOKINGS: "ההזמנות שלי",
    MY_LISTINGS: "הפרסומים שלי",
    SETTINGS: "הגדרות",
  },

  // Categories
  CATEGORIES: {
    DRONE: "מל\"טים",
    CAMERA: "ציוד צילום",
    POWER_TOOL: "כלי עבודה",
    EVENTS: "ציוד אירועים",
    OTHER: "אחר",
  },

  // Booking Status
  BOOKING_STATUS: {
    RESERVED: "שמור",
    CONFIRMED: "מאושר",
    PICKED_UP: "נאסף",
    RETURNED: "הוחזר",
    CANCELLED: "בוטל",
    EXPIRED: "פג תוקף",
  },

  // Payment Status
  PAYMENT_STATUS: {
    UNPAID: "לא שולם",
    PAID: "שולם",
    REFUNDED: "הוחזר",
  },

  // Forms
  FORMS: {
    EMAIL: "אימייל",
    PASSWORD: "סיסמה",
    NAME: "שם מלא",
    PHONE: "טלפון",
    LOGIN: "התחברות",
    REGISTER: "הרשמה",
    LOGOUT: "התנתקות",
  },

  // Deposit Widget
  DEPOSIT: {
    TITLE: "ערבון נדרש",
    WHY_THIS_AMOUNT: "למה הסכום הזה?",
    DEDUCTIBLE: "השתתפות עצמית",
    INSURANCE_TOGGLE: "ביטוח פרימיום",
  },

  // Checklists
  CHECKLIST: {
    PICKUP_TITLE: "רשימת בדיקה - איסוף",
    RETURN_TITLE: "רשימת בדיקה - החזרה",
    PHOTOS_REQUIRED: "צילום נדרש",
    SERIAL_NUMBER: "מספר סידורי",
    CONDITION_CHECK: "בדיקת תקינות בוצעה",
    CONDITION_NOTE: "הערה על מצב הציוד",
    COMPLETE: "השלם",
  },

  // Notifications
  NOTIFICATIONS: {
    RESERVATION_CREATED: "ההזמנה נשמרה ל-12 שעות",
    PAYMENT_CONFIRMED: "התשלום אושר",
    BOOKING_EXPIRED: "ההזמנה פגה",
  },

  // Admin
  ADMIN: {
    TITLE: "ניהול",
    BOOKINGS: "הזמנות",
    DISPUTES: "סכסוכים",
    CATEGORY_REQUESTS: "בקשות קטגוריות",
    MARK_PAID: "סמן כשולם",
  },

  // Errors
  ERRORS: {
    NETWORK_ERROR: "שגיאת רשת",
    AUTH_REQUIRED: "נדרשת התחברות",
    INVALID_INPUT: "קלט לא תקין",
    BOOKING_EXPIRED: "ההזמנה פגה",
  },
} as const;

// Currency formatting
export const formatCurrency = (amount: number): string => {
  return `₪${amount.toLocaleString('he-IL')}`;
};

// Date formatting for Hebrew locale
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Distance formatting
export const formatDistance = (km: number): string => {
  if (km < 1) {
    return `${Math.round(km * 1000)} מ'`;
  }
  return `${km.toFixed(1)} ק"מ`;
};
