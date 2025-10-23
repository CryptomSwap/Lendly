import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create users
  const ownerPassword = await bcrypt.hash('password123', 12);
  const renterPassword = await bcrypt.hash('password123', 12);

  const owner = await prisma.user.upsert({
    where: { email: 'owner@lendly.co.il' },
    update: {},
    create: {
      email: 'owner@lendly.co.il',
      name: 'דוד כהן',
      phone: '050-1234567',
      password: ownerPassword,
      role: 'OWNER',
      verified: true,
    },
  });

  const renter = await prisma.user.upsert({
    where: { email: 'renter@lendly.co.il' },
    update: {},
    create: {
      email: 'renter@lendly.co.il',
      name: 'שרה לוי',
      phone: '052-9876543',
      password: renterPassword,
      role: 'RENTER',
      verified: true,
    },
  });

  console.log('👤 Created users');

  // Tel Aviv area coordinates
  const telAvivItems = [
    {
      title: 'מל"ט DJI Mavic 3 Pro',
      description: 'מל"ט מקצועי לצילום אווירי באיכות גבוהה. כולל 3 מצלמות, טווח טיסה של 43 ק"מ, וזמן טיסה של 46 דקות.',
      category: 'DRONE' as const,
      dailyPriceILS: 350,
      city: 'תל אביב',
      latitude: 32.0853,
      longitude: 34.7818,
      specs: {
        'דגם': 'DJI Mavic 3 Pro',
        'משקל': '958 גרם',
        'זמן טיסה': '46 דקות',
        'טווח טיסה': '43 ק"מ',
        'רזולוציה': '5.1K',
      },
    },
    {
      title: 'מצלמת Canon EOS R5',
      description: 'מצלמת DSLR מקצועית עם חיישן 45MP, צילום וידאו 8K, וייצוב תמונה מובנה.',
      category: 'CAMERA' as const,
      dailyPriceILS: 280,
      city: 'יפו',
      latitude: 32.0522,
      longitude: 34.7500,
      specs: {
        'דגם': 'Canon EOS R5',
        'חיישן': '45MP Full Frame',
        'וידאו': '8K RAW',
        'ייצוב': 'מובנה',
        'סוללה': 'LP-E6NH',
      },
    },
    {
      title: 'מקדחה חשמלית DeWalt',
      description: 'מקדחה חשמלית מקצועית עם סוללה 20V, מהירות משתנה, וכלי עבודה נלווים.',
      category: 'POWER_TOOL' as const,
      dailyPriceILS: 80,
      city: 'גבעתיים',
      latitude: 32.0722,
      longitude: 34.8125,
      specs: {
        'דגם': 'DeWalt DCD791',
        'מתח': '20V',
        'מהירות': '0-2000 RPM',
        'כלי': 'כולל 15 כלי',
        'סוללה': '5Ah',
      },
    },
    {
      title: 'מערכת הגברה JBL',
      description: 'מערכת הגברה מקצועית לאירועים עם מיקסר דיגיטלי, מיקרופונים אלחוטיים, ועמודים.',
      category: 'EVENTS' as const,
      dailyPriceILS: 450,
      city: 'רמת גן',
      latitude: 32.0809,
      longitude: 34.8142,
      specs: {
        'דגם': 'JBL EON615',
        'הספק': '1000W',
        'מיקסר': 'דיגיטלי 12 ערוצים',
        'מיקרופונים': '2 אלחוטיים',
        'עמודים': 'כולל',
      },
    },
    {
      title: 'מל"ט DJI Mini 3',
      description: 'מל"ט קל וקטן לצילום חובבים. משקל נמוך, צילום 4K, וזמן טיסה של 38 דקות.',
      category: 'DRONE' as const,
      dailyPriceILS: 200,
      city: 'תל אביב',
      latitude: 32.1093,
      longitude: 34.8055,
      specs: {
        'דגם': 'DJI Mini 3',
        'משקל': '249 גרם',
        'זמן טיסה': '38 דקות',
        'רזולוציה': '4K',
        'טווח': '12 ק"מ',
      },
    },
    {
      title: 'מצלמת Sony A7 IV',
      description: 'מצלמת DSLR מקצועית עם חיישן 33MP, צילום וידאו 4K, וייצוב תמונה מתקדם.',
      category: 'CAMERA' as const,
      dailyPriceILS: 320,
      city: 'תל אביב',
      latitude: 32.0603,
      longitude: 34.7705,
      specs: {
        'דגם': 'Sony A7 IV',
        'חיישן': '33MP Full Frame',
        'וידאו': '4K 60fps',
        'ייצוב': '5-axis',
        'סוללה': 'NP-FZ100',
      },
    },
    {
      title: 'מסור חשמלי Makita',
      description: 'מסור חשמלי מקצועי עם להב 18 ס"מ, סוללה 18V, וכלי עבודה נלווים.',
      category: 'POWER_TOOL' as const,
      dailyPriceILS: 120,
      city: 'יפו',
      latitude: 32.0522,
      longitude: 34.7500,
      specs: {
        'דגם': 'Makita DHS680Z',
        'מתח': '18V',
        'להב': '18 ס"מ',
        'מהירות': '0-3500 RPM',
        'כלי': 'כולל 5 כלי',
      },
    },
    {
      title: 'מערכת תאורה LED',
      description: 'מערכת תאורה מקצועית לאירועים עם פנסי LED, דימרים, ועמודים מתכווננים.',
      category: 'EVENTS' as const,
      dailyPriceILS: 300,
      city: 'גבעתיים',
      latitude: 32.0722,
      longitude: 34.8125,
      specs: {
        'דגם': 'Chauvet DJ Intimidator',
        'הספק': '150W LED',
        'צבעים': 'RGB + White',
        'דימרים': '4 ערוצים',
        'עמודים': '3 מטר',
      },
    },
    {
      title: 'מל"ט DJI Air 2S',
      description: 'מל"ט בינוני עם חיישן 1 אינץ', צילום 5.4K, וזמן טיסה של 31 דקות.',
      category: 'DRONE' as const,
      dailyPriceILS: 250,
      city: 'רמת גן',
      latitude: 32.0809,
      longitude: 34.8142,
      specs: {
        'דגם': 'DJI Air 2S',
        'חיישן': '1 אינץ',
        'רזולוציה': '5.4K',
        'זמן טיסה': '31 דקות',
        'טווח': '12 ק"מ',
      },
    },
    {
      title: 'מצלמת GoPro Hero 11',
      description: 'מצלמת אקשן עם צילום 5.3K, ייצוב HyperSmooth, ועמידות למים.',
      category: 'CAMERA' as const,
      dailyPriceILS: 150,
      city: 'תל אביב',
      latitude: 32.0853,
      longitude: 34.7818,
      specs: {
        'דגם': 'GoPro Hero 11',
        'רזולוציה': '5.3K',
        'ייצוב': 'HyperSmooth 4.0',
        'עמידות': '10 מטר מים',
        'סוללה': 'Enduro',
      },
    },
    {
      title: 'פטיש חשמלי Bosch',
      description: 'פטיש חשמלי מקצועי עם סוללה 18V, מהירות משתנה, וכלי עבודה נלווים.',
      category: 'POWER_TOOL' as const,
      dailyPriceILS: 90,
      city: 'יפו',
      latitude: 32.0522,
      longitude: 34.7500,
      specs: {
        'דגם': 'Bosch GSB 18V-21',
        'מתח': '18V',
        'מהירות': '0-2800 RPM',
        'כוח': '21Nm',
        'כלי': 'כולל 10 כלי',
      },
    },
    {
      title: 'מערכת מיקרופונים',
      description: 'מערכת מיקרופונים אלחוטיים לאירועים עם מקלטים, מיקסר קטן, ועמודים.',
      category: 'EVENTS' as const,
      dailyPriceILS: 200,
      city: 'גבעתיים',
      latitude: 32.0722,
      longitude: 34.8125,
      specs: {
        'דגם': 'Shure BLX24R',
        'מיקרופונים': '2 אלחוטיים',
        'טווח': '100 מטר',
        'מיקסר': '4 ערוצים',
        'עמודים': 'כולל',
      },
    },
  ];

  // Create items
  for (const itemData of telAvivItems) {
    await prisma.item.upsert({
      where: { id: `item-${itemData.title}` },
      update: {},
      create: {
        ...itemData,
        id: `item-${itemData.title}`,
        ownerId: owner.id,
        images: [`https://picsum.photos/800/600?random=${Math.random()}`],
      },
    });
  }

  console.log('📦 Created items');

  // Create availability windows
  const items = await prisma.item.findMany();
  for (const item of items) {
    // Create availability for next 30 days
    for (let i = 0; i < 30; i++) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + i);
      startDate.setHours(9, 0, 0, 0);

      const endDate = new Date(startDate);
      endDate.setHours(18, 0, 0, 0);

      await prisma.availability.create({
        data: {
          itemId: item.id,
          startDate,
          endDate,
          isAvailable: Math.random() > 0.3, // 70% availability
        },
      });
    }
  }

  console.log('📅 Created availability windows');

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
