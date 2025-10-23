import { NextRequest, NextResponse } from 'next/server';

const mockItems = [
  {
    id: '1',
    title: 'מל"ט DJI Mavic 3 Pro',
    description: 'מל"ט מקצועי לצילום אווירי באיכות גבוהה. כולל 3 מצלמות, טווח טיסה של 43 ק"מ, וזמן טיסה של 46 דקות.',
    category: 'DRONE',
    dailyPriceILS: 350,
    city: 'תל אביב',
    latitude: 32.0853,
    longitude: 34.7818,
    images: ['https://picsum.photos/800/600?random=1'],
    specs: {
      'דגם': 'DJI Mavic 3 Pro',
      'משקל': '958 גרם',
      'זמן טיסה': '46 דקות',
      'טווח טיסה': '43 ק"מ',
      'רזולוציה': '5.1K',
    },
    owner: {
      id: 'owner-1',
      name: 'דוד כהן',
      verified: true,
    },
  },
  {
    id: '2',
    title: 'מצלמת Canon EOS R5',
    description: 'מצלמת DSLR מקצועית עם חיישן 45MP, צילום וידאו 8K, וייצוב תמונה מובנה.',
    category: 'CAMERA',
    dailyPriceILS: 280,
    city: 'יפו',
    latitude: 32.0522,
    longitude: 34.7500,
    images: ['https://picsum.photos/800/600?random=2'],
    specs: {
      'דגם': 'Canon EOS R5',
      'חיישן': '45MP Full Frame',
      'וידאו': '8K RAW',
      'ייצוב': 'מובנה',
      'סוללה': 'LP-E6NH',
    },
    owner: {
      id: 'owner-2',
      name: 'שרה לוי',
      verified: true,
    },
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const category = searchParams.get('category');

  let filteredItems = mockItems;

  if (city) {
    filteredItems = filteredItems.filter(item => 
      item.city.includes(city)
    );
  }

  if (category) {
    filteredItems = filteredItems.filter(item => 
      item.category === category
    );
  }

  return NextResponse.json(filteredItems);
}