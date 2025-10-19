import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Lendly Israel API Server is running! 🇮🇱',
    status: 'ok',
    timestamp: new Date().toISOString(),
    features: [
      'Hebrew RTL Support',
      'JWT Authentication', 
      'Risk Assessment',
      'Equipment Rental',
      'Manual Payments'
    ],
    hebrew: {
      hero: 'השכרה בטוחה של ציוד מקצועי — קרוב אליך, מאומת ומבוטח',
      search: 'חיפוש',
      reserve: 'שמור הזמנה — תשלום באיסוף'
    }
  });
}