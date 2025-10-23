/** Hebrew i18n — exhaustive */
export const he = {
  appName: 'Lendly',
  appNameHebrew: 'לֶנדְלִי',
  home: {
    title: 'השכרה בטוחה של ציוד מקצועי — קרוב אליך, מאומת ומבוטח',
    subtitle: 'מצלמות, רחפנים, כלי עבודה, ציוד לאירועים ועוד.',
    ctaSearch: 'חיפוש',
    ctaList: 'פרסם ציוד',
    categories: 'קטגוריות פופולריות',
    featured: 'מומלצים עבורך',
  },
  search: {
    city: 'עיר / מיקום',
    dates: 'תאריכים',
    category: 'קטגוריה',
    submit: 'הצג תוצאות',
    placeholder: 'חפש ציוד...'
  },
  filters: {
    title: 'סינון',
    distance: 'מרחק',
    price: 'מחיר ליום',
    rating: 'דירוג',
    availability: 'זמינות',
    apply: 'החל',
    reset: 'איפוס',
  },
  item: {
    description: 'תיאור',
    availability: 'זמינות',
    location: 'מיקום',
    reviews: 'ביקורות',
    addInsurance: 'הוסף ביטוח פרימיום',
    depositTitle: 'ערבון משוער',
    reserve: 'שמור הזמנה — תשלום באיסוף',
  },
  booking: {
    expires: 'פג תוקף ההזמנה בעוד 12 שעות',
    openChat: 'פתח צ׳אט עם המפרסם',
  },
  pickup: {
    title: 'צ׳ק-ליסט איסוף',
    serial: 'מספר סידורי / דגם',
    confirm: 'נבדק ואושר',
  },
  return: {
    title: 'צ׳ק-ליסט החזרה',
    statusOk: 'מצב תקין',
    statusMinor: 'נזק קל',
    statusMajor: 'תקלה חמורה',
  },
  owner: {
    dashboard: 'לוח מפרסם',
    new: 'הוסף ציוד חדש',
  },
  results: {
    title: 'תוצאות',
    perDay: '₪/יום',
    insured: 'מבוטח',
    km: 'ק״מ',
  },
  toasts: {
    saved: 'ההזמנה נשמרה בהצלחה 🎉',
    missingChecklist: 'נא להשלים את הצ׳ק-ליסט לפני המשך',
    network: 'חיבור לאינטרנט אבד',
  },
  categories: {
    cameras: 'מצלמות',
    drones: 'רחפנים',
    tools: 'כלי עבודה',
    dj: 'ציוד DJ',
    camping: 'קמפינג',
    events: 'אירועים',
    more: 'עוד',
  },
  common: {
    apply: 'החל',
    reset: 'איפוס',
    save: 'שמור',
    cancel: 'ביטול',
    close: 'סגור',
    loading: 'טוען...'
  }
} as const;

export type Hebrew = typeof he;
