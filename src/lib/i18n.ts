export const translations = {
  en: {
    hero: {
      title: "Rent cool stuff in Tel Aviv — 🎥 🎧 🔧 ⛺ insured, verified, instant.",
      subtitle: "Book in minutes. Earn from your gear when you're not using it.",
      searchPlaceholder: "What do you need?",
      bookNow: "Book Now",
      howItWorks: "How it works"
    },
    categories: {
      cameras: "Cameras & Drones",
      dj: "DJ & Party",
      appliances: "Event Appliances", 
      tools: "Handyman Tools",
      camping: "Camping & Outdoors"
    },
    booking: {
      trustRow: "ID verified ✅ • Secure payments 🔒 • Insurance optional 🛡️",
      depositNote: "Deposits are just holds—no charge unless there's an issue.",
      bookingConfirmed: "🎉 Booking confirmed! We pinged the owner."
    },
    dashboard: {
      trips: "Trips",
      receipts: "Receipts", 
      listings: "Listings",
      earnings: "Earnings",
      availability: "Availability",
      payouts: "Payouts"
    }
  },
  he: {
    hero: {
      title: "שכור דברים מגניבים בתל אביב — 🎥 🎧 🔧 ⛺ מבוטח, מאומת, מיידי.",
      subtitle: "הזמן תוך דקות. הרווח מהציוד שלך כשלא משתמש בו.",
      searchPlaceholder: "מה אתה צריך?",
      bookNow: "הזמן עכשיו",
      howItWorks: "איך זה עובד"
    },
    categories: {
      cameras: "מצלמות ורחפנים",
      dj: "DJ ומסיבות",
      appliances: "מכשירי אירועים",
      tools: "כלי עבודה",
      camping: "קמפינג וחוץ"
    },
    booking: {
      trustRow: "מזהה מאומת ✅ • תשלומים מאובטחים 🔒 • ביטוח אופציונלי 🛡️",
      depositNote: "ערבונות הם רק החזקות—אין חיוב אלא אם יש בעיה.",
      bookingConfirmed: "🎉 הזמנה אושרה! שלחנו הודעה לבעלים."
    },
    dashboard: {
      trips: "נסיעות",
      receipts: "קבלות",
      listings: "רשימות",
      earnings: "הכנסות",
      availability: "זמינות",
      payouts: "תשלומים"
    }
  }
}

export function t(key: string, lang: 'en' | 'he' = 'en'): string {
  const keys = key.split('.')
  let value: any = translations[lang]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}
