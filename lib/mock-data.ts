/**
 * Mock data for 20:45 Pastacılık catalog.
 * Generated with 100% accurate Turkish naming, categories, specs, and local image paths.
 * Total 6 categories and 179 products.
 */

import type { Category, Product } from "@/lib/types";
export type { Category, Product };

export const CATEGORIES: Category[] = [
  {
    "id": "cat-1",
    "name": "Püreler & Meyve Miksleri",
    "slug": "pureler",
    "description": "Caffè NONNO Frozen püreleri, DaVinci Fruit Mix ve Krater meyve karışımlarından oluşan zengin bar ve pastacılık koleksiyonumuz.",
    "icon": "🍓",
    "productCount": 44,
    "imageUrl": "/resimler/pt1/pt1_1.png",
    "order": 1,
    "isActive": true
  },
  {
    "id": "cat-2",
    "name": "Şuruplar",
    "slug": "suruplar",
    "description": "DaVinci Gourmet, Caffè NONNO ve Monte Cristo aromalı kahve, kokteyl ve barista şurupları.",
    "icon": "🍯",
    "productCount": 49,
    "imageUrl": "/resimler/p4/p4_1.png",
    "order": 2,
    "isActive": true
  },
  {
    "id": "cat-3",
    "name": "Waffle & Krep Çikolataları",
    "slug": "waffle-malzemeleri",
    "description": "CALLEI sürülebilir renkli kremalar, hazır waffle tozu, draje ve krokan süsleme çeşitleri.",
    "icon": "🧇",
    "productCount": 23,
    "imageUrl": "/resimler/p10/p10_1.png",
    "order": 3,
    "isActive": true
  },
  {
    "id": "cat-4",
    "name": "Tatlı & Bar Sosları",
    "slug": "tatli-soslar",
    "description": "DaVinci 2L ve Caffè NONNO 750g karamel, çikolata, beyaz çikolata ve meyve sosları.",
    "icon": "🍫",
    "productCount": 11,
    "imageUrl": "/resimler/p6/p6_7.png",
    "order": 4,
    "isActive": true
  },
  {
    "id": "cat-5",
    "name": "Donuk Pasta & Unlu Mamuller",
    "slug": "donuk-pasta",
    "description": "Kafeterya ve restoranlar için pratik, lezzetli donuk cheesecake'ler, tiramisu, mono kutu pastalar, dilimli pastalar ve unlu mamuller.",
    "icon": "🎂",
    "productCount": 52,
    "imageUrl": "/resimler/pt12/pt12_14.png",
    "order": 5,
    "isActive": true
  },
  {
    "id": "cat-6",
    "name": "Kremalı Ürünler & Pastacılık",
    "slug": "kremali-urunler",
    "description": "Chantilly, ganaj ve profesyonel pastacılık krema hammaddeleri.",
    "icon": "🍰",
    "productCount": 4,
    "imageUrl": "/resimler/p9/p9_1.png",
    "order": 6,
    "isActive": true
  }
];

const RAW_PRODUCTS = [
  {
    "id": "prod-p3-1",
    "name": "Caffè NONNO Caramel Aromalı Şurup 750ml",
    "code": "NON-CAR-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kahveler, sıcak ve soğuk içecekler için zengin ve kremsi karamel aromalı premium bar şurubu.",
    "imageUrl": "/resimler/p3/p3_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 1,
    "tags": [
      "Caffè NONNO",
      "Karamel",
      "Şurup",
      "Kahve",
      "Barista"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Sıcak/Soğuk Kahve, Latte, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p3-2",
    "name": "Caffè NONNO Mint Aromalı Nane Şurubu 750ml",
    "code": "NON-MNT-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Ferahlatıcı nane lezzetiyle kokteyller, limonatalar ve soğuk içecekler için ferahlatıcı şurup.",
    "imageUrl": "/resimler/p3/p3_2.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 2,
    "tags": [
      "Caffè NONNO",
      "Nane",
      "Mint",
      "Şurup",
      "Limonata",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Kokteyl, Mocktail, Limonata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p3-3",
    "name": "Caffè NONNO Raspberry Frozen Frambuaz Püresi 750ml",
    "code": "NON-RAS-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Taze frambuaz tanelerinin yoğun lezzetini içeren özel akışkan kapaklı frozen ve smoothie püresi.",
    "imageUrl": "/resimler/p3/p3_3.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 3,
    "tags": [
      "Caffè NONNO",
      "Frambuaz",
      "Ahududu",
      "Püre",
      "Frozen",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Frozen, Smoothie, Kokteyl, Pasta",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p3-4",
    "name": "Caffè NONNO Mojito Aromalı Şurup 750ml",
    "code": "NON-MOJ-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Misket limonu ve taze nane uyumuyla mükemmel alkolsüz mojito ve kokteyl hazırlama şurubu.",
    "imageUrl": "/resimler/p3/p3_4.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 4,
    "tags": [
      "Caffè NONNO",
      "Mojito",
      "Lime",
      "Şurup",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Mojito, Kokteyl, Mocktail",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p3-5",
    "name": "Caffè NONNO Hazelnut Fındık Aromalı Şurup 750ml",
    "code": "NON-HAZ-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kavrulmuş fındık aromasıyla kahve ve sıcak çikolatalarınıza derinlik katan lezzet şurubu.",
    "imageUrl": "/resimler/p3/p3_5.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 5,
    "tags": [
      "Caffè NONNO",
      "Fındık",
      "Hazelnut",
      "Şurup",
      "Kahve",
      "Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Espresso, Latte, Sıcak Çikolata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p3-6",
    "name": "Caffè NONNO Cool Berry Orman Meyveleri Şurubu 750ml",
    "code": "NON-CBR-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Böğürtlen, çilek ve yaban mersini aromalarının buzlu ferahlatıcı lezzet şurubu.",
    "imageUrl": "/resimler/p3/p3_6.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 6,
    "tags": [
      "Caffè NONNO",
      "Cool Berry",
      "Orman Meyvesi",
      "Şurup",
      "İçecek"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Cool Berry, Buzlu İçecek, Soda",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p3-7",
    "name": "Caffè NONNO Cool Lime Misket Limonu Şurubu 750ml",
    "code": "NON-CLM-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Yaz aylarının vazgeçilmezi buzlu Cool Lime içecekleri için özel formül konsantre şurup.",
    "imageUrl": "/resimler/p3/p3_7.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 7,
    "tags": [
      "Caffè NONNO",
      "Cool Lime",
      "Misket Limonu",
      "Şurup",
      "Refresher"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Cool Lime, Buzlu İçecek, Mocktail",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p3-8",
    "name": "Caffè NONNO Vanilla Vanilya Aromalı Şurup 750ml",
    "code": "NON-VAN-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Doğal Madagaskar vanilyası notalarıyla kahve ve tatlı tariflerini zenginleştiren klasik şurup.",
    "imageUrl": "/resimler/p3/p3_8.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 8,
    "tags": [
      "Caffè NONNO",
      "Vanilya",
      "Vanilla",
      "Şurup",
      "Kahve",
      "Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Vanilla Latte, Frappe, Tatlı",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p3-9",
    "name": "Caffè NONNO Chocolate Çikolata Aromalı Şurup 750ml",
    "code": "NON-CHO-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Yoğun kakao aroması ile mocha, sıcak çikolata ve milkshake yapımı için özel lezzet şurubu.",
    "imageUrl": "/resimler/p3/p3_9.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 9,
    "tags": [
      "Caffè NONNO",
      "Çikolata",
      "Chocolate",
      "Şurup",
      "Mocha",
      "Frappe"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Mocha, Milkshake, Sıcak Çikolata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p3-10",
    "name": "Caffè NONNO White Chocolate Beyaz Çikolata Şurubu 750ml",
    "code": "NON-WCH-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kremsi beyaz çikolata lezzeti sunan White Mocha ve özel içecekler için gurme şurup.",
    "imageUrl": "/resimler/p3/p3_10.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 10,
    "tags": [
      "Caffè NONNO",
      "Beyaz Çikolata",
      "White Mocha",
      "Şurup",
      "Kahve"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "White Mocha, Kahve, Milkshake",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p4-1",
    "name": "DaVinci Gourmet Blue Ocean Aromalı Şurup 750ml",
    "code": "DVG-BOC-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Tropikal portakal ve narenciye dokunuşlarıyla egzotik mavi kokteyller için DaVinci Blue Ocean.",
    "imageUrl": "/resimler/p4/p4_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 11,
    "tags": [
      "DaVinci Gourmet",
      "Blue Ocean",
      "Mavi Portakal",
      "Şurup",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Mocktail, Kokteyl, Limonata",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p4-2",
    "name": "DaVinci Gourmet Lemon Tea Aromalı Şurup 750ml",
    "code": "DVG-LTE-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Geleneksel demlenmiş çay ve ferahlatıcı limon lezzetini bir araya getiren gurme buzlu çay şurubu.",
    "imageUrl": "/resimler/p4/p4_2.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 12,
    "tags": [
      "DaVinci Gourmet",
      "Limon Çayı",
      "Ice Tea",
      "Şurup",
      "Soğuk Çay"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Ice Tea, Soğuk İçecek",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p4-3",
    "name": "DaVinci Gourmet Classic Vanilla Aromalı Şurup 750ml",
    "code": "DVG-VAN-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Dünya standartlarında saf vanilya çekirdeği aroması sunan DaVinci Classic Vanilla şurubu.",
    "imageUrl": "/resimler/p4/p4_3.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 13,
    "tags": [
      "DaVinci Gourmet",
      "Vanilla",
      "Vanilya",
      "Şurup",
      "Kahve",
      "Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Kahve, Latte, Cappuccino, Frappe",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p4-4",
    "name": "DaVinci Gourmet Shortbread Cookies Aromalı Şurup 750ml",
    "code": "DVG-SBC-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Taze fırından çıkmış tereyağlı İskoç kurabiyesi lezzeti sunan özel DaVinci kurabiye şurubu.",
    "imageUrl": "/resimler/p4/p4_4.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 14,
    "tags": [
      "DaVinci Gourmet",
      "Kurabiye",
      "Shortbread Cookies",
      "Şurup",
      "Kahve"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Latte, Frappe, Milkshake",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p4-5",
    "name": "DaVinci Gourmet Menta Cubano Aromalı Şurup 750ml",
    "code": "DVG-MCU-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Küba nanesinin doğal ferahlığıyla hazırlanan otantik mojito ve kokteyl şurubu.",
    "imageUrl": "/resimler/p4/p4_1.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 15,
    "tags": [
      "DaVinci Gourmet",
      "Menta Cubano",
      "Nane",
      "Mojito",
      "Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Mojito, Kokteyl, Soda",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p4-6",
    "name": "DaVinci Gourmet Classic Strawberry Çilek Şurubu 750ml",
    "code": "DVG-STR-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Olgun bahçe çileklerinin tatlı ve ferah aromasıyla hazırlanan DaVinci gurme şurup.",
    "imageUrl": "/resimler/p4/p4_6.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 16,
    "tags": [
      "DaVinci Gourmet",
      "Çilek",
      "Strawberry",
      "Şurup",
      "Limonata",
      "Milkshake"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Milkshake, Smoothie, Limonata, Kokteyl",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p4-7",
    "name": "DaVinci Gourmet Peach Garden Şeftali Şurubu 750ml",
    "code": "DVG-PGA-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Yaz şeftalisinin sulu ve tatlı lezzetiyle buzlu çaylar ve ferahlatıcı içecekler için DaVinci şurup.",
    "imageUrl": "/resimler/p4/p4_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 17,
    "tags": [
      "DaVinci Gourmet",
      "Şeftali",
      "Peach",
      "Ice Tea",
      "Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Peach Ice Tea, Limonata, Kokteyl",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p4-8",
    "name": "DaVinci Gourmet Classic Hazelnut Fındık Şurubu 750ml",
    "code": "DVG-HAZ-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Zengin kavrulmuş fındık aromasıyla kahve zincirlerinin bir numaralı tercihi DaVinci Classic Hazelnut.",
    "imageUrl": "/resimler/p4/p4_8.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 18,
    "tags": [
      "DaVinci Gourmet",
      "Fındık",
      "Hazelnut",
      "Kahve Şurubu",
      "Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Latte, Cappuccino, Sıcak Çikolata",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p4-9",
    "name": "DaVinci Gourmet Pecan Praline Aromalı Şurup 750ml",
    "code": "DVG-PPR-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Pekan cevizi ve karamelize pralin notalarıyla zenginleştirilmiş özel gurme kahve şurubu.",
    "imageUrl": "/resimler/p4/p4_9.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 19,
    "tags": [
      "DaVinci Gourmet",
      "Pecan Praline",
      "Pekan Cevizi",
      "Şurup",
      "Kahve"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Özel Kahve Reçeteleri, Frappe",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p4-10",
    "name": "DaVinci Gourmet Forest Berries Orman Meyveleri Şurubu 750ml",
    "code": "DVG-FBR-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Böğürtlen, frambuaz ve ahududu meyve kombinasyonuyla zengin lezzet profili sunar.",
    "imageUrl": "/resimler/p4/p4_10.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 20,
    "tags": [
      "DaVinci Gourmet",
      "Forest Berries",
      "Orman Meyvesi",
      "Şurup",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Ice Tea, Limonata, Kokteyl",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p5-1",
    "name": "DaVinci Gourmet Classic Caramel Şurubu 750ml",
    "code": "DVG-CAR-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Karamelize şeker ve hafif vanilya tonlarının dengeli uyumuyla üretilen en popüler kahve şurubu.",
    "imageUrl": "/resimler/p5/p5_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 21,
    "tags": [
      "DaVinci Gourmet",
      "Caramel",
      "Karamel",
      "Şurup",
      "Caramel Macchiato"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Caramel Macchiato, Latte, Frappe",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p5-2",
    "name": "DaVinci Gourmet Butterscotch Aromalı Sos 2L",
    "code": "DVG-BSC-2000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-6",
    "categoryName": "Tatlı Soslar",
    "categorySlug": "tatli-soslar",
    "description": "Eski usul tereyağı ve esmer şekerin karamelize lezzetini sunan yoğun kıvamlı DaVinci Butterscotch sos.",
    "imageUrl": "/resimler/p5/p5_2.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 22,
    "tags": [
      "DaVinci Gourmet",
      "Butterscotch",
      "Karamel Sos",
      "Kahve Sosu",
      "Dondurma Sosu"
    ],
    "specs": {
      "Hacim": "2 Litre",
      "Kullanım": "Kahve Üstü Süsleme, Waffle, Dondurma, Pasta",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p5-3",
    "name": "DaVinci Gourmet Classic Blueberry Şurubu 750ml",
    "code": "DVG-BLU-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Doğal yaban mersini aromasıyla soğuk çaylar, limonatalar ve kokteyller için mor renkli şurup.",
    "imageUrl": "/resimler/p5/p5_3.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 23,
    "tags": [
      "DaVinci Gourmet",
      "Blueberry",
      "Yaban Mersini",
      "Şurup",
      "Limonata"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Limonata, Kokteyl, Mocktail",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p5-4",
    "name": "DaVinci Gourmet Classic Roasted Almond Şurubu 750ml",
    "code": "DVG-ALM-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Fırınlanmış acıbadem ve tatlı badem aromalarının harmanlandığı özel kahve şurubu.",
    "imageUrl": "/resimler/p5/p5_4.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 24,
    "tags": [
      "DaVinci Gourmet",
      "Badem",
      "Roasted Almond",
      "Şurup",
      "Kahve"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Latte, Sıcak Çikolata, Kokteyl",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p5-5",
    "name": "DaVinci Gourmet White Chocolate Şurubu 750ml",
    "code": "DVG-WCH-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kakao yağı ve vanilyanın pürüzsüz karışımıyla White Chocolate Mocha tutkunları için ideal şurup.",
    "imageUrl": "/resimler/p5/p5_5.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 25,
    "tags": [
      "DaVinci Gourmet",
      "White Chocolate",
      "Beyaz Çikolata",
      "Şurup",
      "Mocha"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "White Mocha, Frappe, Sıcak Süt",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p5-6",
    "name": "DaVinci Gourmet Toffeenut Aromalı Şurup 750ml",
    "code": "DVG-TOF-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Tereyağlı tofi şekeri ve kavrulmuş fındık tanelerinin muazzam buluşmasıyla kış aylarının favorisi.",
    "imageUrl": "/resimler/p5/p5_6.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 26,
    "tags": [
      "DaVinci Gourmet",
      "Toffeenut",
      "Tofi",
      "Fındık",
      "Şurup",
      "Toffee Nut Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Toffee Nut Latte, Frappe, Mocha",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p5-7",
    "name": "DaVinci Gourmet Classic Coconut Şurubu 750ml",
    "code": "DVG-COC-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Tropikal hindistan cevizinin egzotik aromasıyla Pina Colada ve özel kahve tarifleri için şurup.",
    "imageUrl": "/resimler/p5/p5_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 27,
    "tags": [
      "DaVinci Gourmet",
      "Hindistan Cevizi",
      "Coconut",
      "Şurup",
      "Pina Colada"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Tropikal Kokteyl, Mocha, Frappe",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p5-8",
    "name": "DaVinci Gourmet Juicy Lime Aromalı Şurup 750ml",
    "code": "DVG-JLM-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Taze sıkılmış misket limonu suyu tazeliği sunan kokteyl ve soğuk meşrubat şurubu.",
    "imageUrl": "/resimler/p5/p5_8.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 28,
    "tags": [
      "DaVinci Gourmet",
      "Juicy Lime",
      "Misket Limonu",
      "Şurup",
      "Limonata"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Limonata, Kokteyl, Soda",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p5-9",
    "name": "DaVinci Gourmet Spiced Chai Tea Konsantre Şurup 750ml",
    "code": "DVG-CHA-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Tarçın, kakule, zencefil ve karanfil baharatlarıyla harmanlanmış otantik Chai Tea Latte konsantresi.",
    "imageUrl": "/resimler/p5/p5_9.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 29,
    "tags": [
      "DaVinci Gourmet",
      "Chai Tea",
      "Baharatlı Çay",
      "Chai Latte",
      "Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Chai Tea Latte, Sıcak/Soğuk Sütlü Çay",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p5-10",
    "name": "DaVinci Gourmet Classic Chocolate Şurubu 750ml",
    "code": "DVG-CHO-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Koyu kakao çekirdeklerinin yoğun aromasıyla sıcak ve soğuk kahvelerde mükemmel çikolata lezzeti.",
    "imageUrl": "/resimler/p5/p5_10.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 30,
    "tags": [
      "DaVinci Gourmet",
      "Çikolata",
      "Chocolate",
      "Mocha",
      "Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Caffè Mocha, Milkshake, Frappe",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p6-1",
    "name": "Caffè NONNO Blue Curacao Bar Sosu 750g",
    "code": "NON-BCS-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-6",
    "categoryName": "Tatlı Soslar",
    "categorySlug": "tatli-soslar",
    "description": "Canlı mavi rengi ve narenciye aromasıyla bar sunumları, tatlılar ve kokteyller için özel sıkma sos.",
    "imageUrl": "/resimler/p6/p6_1.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 31,
    "tags": [
      "Caffè NONNO",
      "Blue Curacao",
      "Bar Sosu",
      "Tatlı Sosu",
      "Kokteyl"
    ],
    "specs": {
      "Gramaj": "750 g",
      "Kullanım": "Bar Süsleme, Tatlı Tabağı Dekoru, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p6-2",
    "name": "Caffè NONNO Muz Aromalı Bar Sosu 750g",
    "code": "NON-BNS-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-6",
    "categoryName": "Tatlı Soslar",
    "categorySlug": "tatli-soslar",
    "description": "Sarı muz aromalı akışkan dekor sosu; dondurma, waffle ve pastacılık tabaklarında harika sunum sağlar.",
    "imageUrl": "/resimler/p6/p6_2.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 32,
    "tags": [
      "Caffè NONNO",
      "Muz",
      "Muz Sosu",
      "Tatlı Sosu",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "750 g",
      "Kullanım": "Waffle, Dondurma, Pasta Süsleme",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p6-3",
    "name": "EASY MIX Orange Mango Kokteyl Premiksi 1000ml",
    "code": "EMX-OMG-1000",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Portakal ve mango meyvelerinin mükemmel dengesiyle hızlı ve pratik kokteyl & mocktail miksi.",
    "imageUrl": "/resimler/p6/p6_3.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 33,
    "tags": [
      "EASY MIX",
      "Portakal",
      "Mango",
      "Kokteyl Premiksi",
      "Barista"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Kokteyl, Mocktail, Frozen",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p6-4",
    "name": "EASY MIX Bodrum Mandalin Kokteyl Premiksi 1000ml",
    "code": "EMX-BDR-1000",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Coğrafi işaretli Bodrum mandalinasının eşsiz kokusu ve tadıyla profesyonel barlar için hazır premiks.",
    "imageUrl": "/resimler/p6/p6_4.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 34,
    "tags": [
      "EASY MIX",
      "Bodrum Mandalina",
      "Kokteyl Miksi",
      "Premix"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Kokteyl, Mocktail, Limonata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p6-5",
    "name": "DaVinci Gourmet Cheese Cake Aromalı Sos 2L",
    "code": "DVG-CHK-2000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-6",
    "categoryName": "Tatlı Soslar",
    "categorySlug": "tatli-soslar",
    "description": "Kremamsı New York cheesecake lezzetini kahvelere, frappeler ve tatlı tabaklarına taşıyan özel 2L sos.",
    "imageUrl": "/resimler/p6/p6_5.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 35,
    "tags": [
      "DaVinci Gourmet",
      "Cheesecake Sos",
      "Tatlı Sosu",
      "Kahve Sosu",
      "Frappe"
    ],
    "specs": {
      "Hacim": "2 Litre",
      "Kullanım": "Cheesecake Latte, Frappe, Dondurma, Pasta",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p6-6",
    "name": "DaVinci Gourmet White Chocolate Aromalı Sos 2L",
    "code": "DVG-WCS-2000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-6",
    "categoryName": "Tatlı Soslar",
    "categorySlug": "tatli-soslar",
    "description": "İpeksi beyaz çikolata dokusu ve zengin süt aromasıyla baristaların vazgeçilmezi 2 litrelik sos.",
    "imageUrl": "/resimler/p6/p6_6.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 36,
    "tags": [
      "DaVinci Gourmet",
      "White Chocolate",
      "Beyaz Çikolata Sosu",
      "Mocha"
    ],
    "specs": {
      "Hacim": "2 Litre",
      "Kullanım": "White Mocha, Sıcak Çikolata, Waffle, Dondurma",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p6-7",
    "name": "DaVinci Gourmet Caramel Aromalı Sos 2L",
    "code": "DVG-CRS-2000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-6",
    "categoryName": "Tatlı Soslar",
    "categorySlug": "tatli-soslar",
    "description": "Geleneksel tereyağlı karamel kıvamı ve parlak dokusuyla kahve ve tatlı sunumlarında lider sos.",
    "imageUrl": "/resimler/p6/p6_7.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 37,
    "tags": [
      "DaVinci Gourmet",
      "Karamel Sos",
      "Caramel Drizzle",
      "Kahve Sosu"
    ],
    "specs": {
      "Hacim": "2 Litre",
      "Kullanım": "Caramel Macchiato, Waffle, Pasta, Dondurma",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p6-8",
    "name": "DaVinci Gourmet Chocolate Aromalı Sos 2L",
    "code": "DVG-CHS-2000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-6",
    "categoryName": "Tatlı Soslar",
    "categorySlug": "tatli-soslar",
    "description": "Zengin kakao çekirdeklerinden üretilen koyu çikolata sosu; sıcak ve soğuk içeceklerde kusursuz erir.",
    "imageUrl": "/resimler/p6/p6_8.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 38,
    "tags": [
      "DaVinci Gourmet",
      "Çikolata Sosu",
      "Mocha Sos",
      "Waffle",
      "Pasta"
    ],
    "specs": {
      "Hacim": "2 Litre",
      "Kullanım": "Caffè Mocha, Dondurma, Waffle, Pancake",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-p6-9",
    "name": "Caffè NONNO White Chocolate Bar Sosu 750g",
    "code": "NON-WCS-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-6",
    "categoryName": "Tatlı Soslar",
    "categorySlug": "tatli-soslar",
    "description": "Özel ince uçlu sıkma şişesiyle pasta, waffle ve kahve üzeri desenler için beyaz çikolata dekor sosu.",
    "imageUrl": "/resimler/p6/p6_9.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 39,
    "tags": [
      "Caffè NONNO",
      "Beyaz Çikolata Sosu",
      "Dekor Sos",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "750 g",
      "Kullanım": "Kahve Süsleme, Waffle, Tabak Dekoru",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p6-10",
    "name": "Caffè NONNO Blue Curacao Bar & Tatlı Sosu 750g",
    "code": "NON-BCS-750B",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-6",
    "categoryName": "Tatlı Soslar",
    "categorySlug": "tatli-soslar",
    "description": "Kokteyl ve tatlı sunumlarına derin mavi ton ve tatlı portakal lezzeti kazandıran özel dekor sos.",
    "imageUrl": "/resimler/p6/p6_10.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 40,
    "tags": [
      "Caffè NONNO",
      "Blue Curacao",
      "Dekor Sos",
      "Barista"
    ],
    "specs": {
      "Gramaj": "750 g",
      "Kullanım": "Bardak Süsleme, Kokteyl, Tatlı Tabağı",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p7-1",
    "name": "EASY MIX Citrus Blend Kokteyl Premiksi 1000ml",
    "code": "EMX-CIT-1000",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Limon, misket limonu ve portakalın ferahlatıcı dengesiyle sour kokteyllerin temel harcı.",
    "imageUrl": "/resimler/p7/p7_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 41,
    "tags": [
      "EASY MIX",
      "Citrus Blend",
      "Narenciye",
      "Kokteyl Premiksi",
      "Sour"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Sour Kokteyller, Limonata, Mocktail",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p7-2",
    "name": "EASY MIX Pitaya Refresher İçecek 700ml",
    "code": "EMX-PIT-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Ejder meyvesi (Pitaya) ve yeşil çay bazıyla pembe renkli tropikal ferahlık sunan konsantre içecek.",
    "imageUrl": "/resimler/p7/p7_2.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 42,
    "tags": [
      "EASY MIX",
      "Pitaya",
      "Ejder Meyvesi",
      "Refresher",
      "Buzlu İçecek"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Buzlu Refresher, Mocktail, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p7-3",
    "name": "EASY MIX Cherry & Chocolate Kokteyl Premiksi 500ml",
    "code": "EMX-CCH-500",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Koyu kiraz ve bitter çikolata uyumuyla gurme kokteyller ve tatlı içecekler için premiks.",
    "imageUrl": "/resimler/p7/p7_3.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 43,
    "tags": [
      "EASY MIX",
      "Kiraz Çikolata",
      "Cherry Chocolate",
      "Kokteyl Miksi"
    ],
    "specs": {
      "Hacim": "500 ml",
      "Kullanım": "Gurme Kokteyl, Tatlı İçecek",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p7-4",
    "name": "EASY MIX Rooibos Peach Refresher İçecek 700ml",
    "code": "EMX-RBP-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Güney Afrika Rooibos çayı ve tatlı şeftali harmanıyla kafeinsiz doğal buzlu içecek bazı.",
    "imageUrl": "/resimler/p7/p7_4.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 44,
    "tags": [
      "EASY MIX",
      "Rooibos",
      "Şeftali",
      "Refresher",
      "Ice Tea"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Buzlu Çay, Refresher, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p7-5",
    "name": "EASY MIX Tuxedo Çikolata & Vanilya Premiksi 1000ml",
    "code": "EMX-TUX-1000",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Siyah ve beyaz çikolatanın vanilya ile mükemmel dengesiyle lüks kokteyl bazı.",
    "imageUrl": "/resimler/p7/p7_5.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 45,
    "tags": [
      "EASY MIX",
      "Tuxedo",
      "Çikolata",
      "Vanilya",
      "Premix"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Tatlı Kokteyller, Barista İçecekleri",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p7-6",
    "name": "EASY MIX Passion Martini Kokteyl Premiksi 1000ml",
    "code": "EMX-PSM-1000",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Çarkıfelek meyvesi, vanilya ve narenciye notalarıyla dünyaca ünlü Passion Martini hazırlama miksi.",
    "imageUrl": "/resimler/p7/p7_6.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 46,
    "tags": [
      "EASY MIX",
      "Passion Martini",
      "Çarkıfelek",
      "Kokteyl Premiksi"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Pornstar Martini, Passion Mocktail, Frozen",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p7-7",
    "name": "EASY MIX Passion Martini Kokteyl Miksi 1000ml",
    "code": "EMX-PSM-1000B",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Barlar ve restoranlar için standart reçeteli yoğun çarkıfelek meyveli kokteyl bazı.",
    "imageUrl": "/resimler/p7/p7_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 47,
    "tags": [
      "EASY MIX",
      "Passion Fruit",
      "Martini Miksi",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Kokteyl, Mocktail, Frozen",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p7-8",
    "name": "EASY MIX Chili Mango Kokteyl Premiksi 1000ml",
    "code": "EMX-CHM-1000",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Tatlı tropikal mango ile hafif acı acı biberin heyecan verici ve cüretkar kokteyl kombinasyonu.",
    "imageUrl": "/resimler/p7/p7_8.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 48,
    "tags": [
      "EASY MIX",
      "Chili Mango",
      "Acılı Mango",
      "Kokteyl Premiksi",
      "Margarita"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Spicy Mango Margarita, Frozen, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p7-9",
    "name": "EASY MIX Purple Basil Limon & Reyhan Premiksi 1000ml",
    "code": "EMX-PRB-1000",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Mor reyhanın aromatik yapısı ve taze limon suyuyla hazırlanan otantik gurme kokteyl premiksi.",
    "imageUrl": "/resimler/p7/p7_9.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 49,
    "tags": [
      "EASY MIX",
      "Mor Reyhan",
      "Purple Basil",
      "Reyhan Şerbeti",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Reyhan Kokteyli, Gurme Limonata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p7-10",
    "name": "EASY MIX Sorrel & Green Plum Refresher 700ml",
    "code": "EMX-SGP-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Ekşi yeşil erik ve taze kuzu kulağının ferahlatıcı yeşil çay bazıyla eşsiz uyumu.",
    "imageUrl": "/resimler/p7/p7_10.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 50,
    "tags": [
      "EASY MIX",
      "Yeşil Erik",
      "Kuzukulağı",
      "Refresher",
      "Ekşi İçecek"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Buzlu Refresher, Ekşi Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p8-1",
    "name": "Caffè NONNO Tiramisu Aromalı Şurup 750ml",
    "code": "NON-TIR-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "İtalyan maskarpone peyniri, bisküvi ve kahve notalarıyla zenginleştirilmiş özel tiramisu şurubu.",
    "imageUrl": "/resimler/p8/p8_1.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 51,
    "tags": [
      "Caffè NONNO",
      "Tiramisu",
      "Şurup",
      "Kahve",
      "Tatlı"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Tiramisu Latte, Sıcak İçecekler, Frappe",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p8-2",
    "name": "Caffè NONNO Toffee Nut Aromalı Şurup 750ml",
    "code": "NON-TFN-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Karamelize tereyağı ve fındık tanelerinin buluşmasıyla kış kahvelerinin vazgeçilmezi.",
    "imageUrl": "/resimler/p8/p8_2.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 52,
    "tags": [
      "Caffè NONNO",
      "Toffee Nut",
      "Fındık Şurubu",
      "Kahve"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Toffee Nut Latte, Cappuccino",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p8-3",
    "name": "Caffè NONNO Toffee Nut Gourmet Şurup 750ml",
    "code": "NON-TFN-750B",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Yoğun tofi şekeri ve kavrulmuş kuruyemiş profili sunan gurme seri kahve şurubu.",
    "imageUrl": "/resimler/p8/p8_3.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 53,
    "tags": [
      "Caffè NONNO",
      "Toffee Nut",
      "Gourmet Şurup",
      "Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Kahve, Sıcak Süt, Frappe",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p8-4",
    "name": "EASY MIX Watermelon Margarita Kokteyl Premiksi 500ml",
    "code": "EMX-WMM-500",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Sulu karpuz ve misket limonunun dengeli formülüyle mükemmel Watermelon Margarita bazı.",
    "imageUrl": "/resimler/p8/p8_4.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 54,
    "tags": [
      "EASY MIX",
      "Karpuz",
      "Margarita",
      "Kokteyl Premiksi"
    ],
    "specs": {
      "Hacim": "500 ml",
      "Kullanım": "Karpuz Margarita, Frozen, Mocktail",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p8-5",
    "name": "EASY MIX Libido Orman Meyveli Kokteyl Premiksi 1000ml",
    "code": "EMX-LBD-1000",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Kırmızı orman meyveleri ve Bodrum mandalinasının canlı rengi ve lezzetiyle özel parti miksi.",
    "imageUrl": "/resimler/p8/p8_5.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 55,
    "tags": [
      "EASY MIX",
      "Orman Meyvesi",
      "Mandalina",
      "Kokteyl Premiksi"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Kullanım": "Kokteyl, Mocktail, Shot",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p8-6",
    "name": "EASY MIX Ocean Karadut & Narenciye Refresher 700ml",
    "code": "EMX-OCN-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Portakal, greyfurt ve karadut meyvelerinin berrak mavi okyanus tonuyla buluştuğu refresher.",
    "imageUrl": "/resimler/p8/p8_6.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 56,
    "tags": [
      "EASY MIX",
      "Ocean",
      "Karadut",
      "Refresher",
      "Mavi İçecek"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Buzlu Refresher, Okyanus Kokteyli",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p8-7",
    "name": "EASY MIX Yeşil Çay & Kavun Kokteyl Premiksi 700ml",
    "code": "EMX-MLN-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Antioksidan zengini yeşil çay özü ve tatlı yaz kavunu harmanı.",
    "imageUrl": "/resimler/p8/p8_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 57,
    "tags": [
      "EASY MIX",
      "Kavun",
      "Yeşil Çay",
      "Kokteyl Premiksi",
      "Refresher"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Kavunlu Ice Tea, Kokteyl, Mocktail",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p8-8",
    "name": "EASY MIX Beyaz Çay & Şeftali Kokteyl Premiksi 700ml",
    "code": "EMX-WPC-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Hafif beyaz çay yaprakları ve taze sulu şeftali aromasıyla zarif bir içecek bazı.",
    "imageUrl": "/resimler/p8/p8_8.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 58,
    "tags": [
      "EASY MIX",
      "Beyaz Çay",
      "Şeftali",
      "Ice Tea",
      "Premix"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Beyaz Çaylı İçecek, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p8-9",
    "name": "EASY MIX Frambuaz Artisan Bar Şurubu 700ml",
    "code": "EMX-RAS-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "The Pumps serisi özel basmalı başlığıyla barlar ve kafeler için pratik frambuaz şurubu.",
    "imageUrl": "/resimler/p8/p8_9.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 59,
    "tags": [
      "EASY MIX",
      "Frambuaz",
      "Artisan Şurup",
      "Barista"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Kokteyl, Kahve, Limonata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p8-10",
    "name": "Caffè NONNO Nar Aromalı Şurup 750ml",
    "code": "NON-POM-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Tatlı ve mayhoş nar lezzetiyle limonatalar, mocktail ve sıcak kış çayları için özel şurup.",
    "imageUrl": "/resimler/p8/p8_10.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 60,
    "tags": [
      "Caffè NONNO",
      "Nar",
      "Pomegranate",
      "Şurup",
      "Limonata"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Limonata, Kokteyl, Sıcak Meyve Çayı",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p8-11",
    "name": "Caffè NONNO Muz Aromalı Şurup 750ml",
    "code": "NON-BAN-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Tropikal muz lezzetiyle sütlü kahveler, milkshake ve frappe çeşitlerine tatlılık katar.",
    "imageUrl": "/resimler/p8/p8_11.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 61,
    "tags": [
      "Caffè NONNO",
      "Muz",
      "Banana",
      "Şurup",
      "Milkshake"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Milkshake, Muzlu Latte, Frappe",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p9-1",
    "name": "CALLEI Bitter Çikolatalı Waffle & Krep Kreması 1kg",
    "code": "CAL-BIT-1000",
    "codeGroup": "CALLEI",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Zengin bitter kakao içeriği ve pürüzsüz sürülebilir kıvamıyla profesyonel waffle ve krep kreması.",
    "imageUrl": "/resimler/p9/p9_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 62,
    "tags": [
      "CALLEI",
      "Bitter Çikolata",
      "Waffle Kreması",
      "Krep",
      "Sürülebilir Çikolata"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Pancake, Kruvasan Dolgusu",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p9-2",
    "name": "Renkli Granül Pasta & Waffle Süsleme Şekeri 1kg",
    "code": "TOP-SPR-1000",
    "codeGroup": "Pastacılık Süsleme",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Waffle, dondurma, pasta ve cupcake sunumları için renkli granül süsleme şekerlemeleri.",
    "imageUrl": "/resimler/p9/p9_2.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 63,
    "tags": [
      "Granül Şeker",
      "Renkli Pasta Süsü",
      "Waffle Topping",
      "Süsleme"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Dondurma, Cupcake, Pasta",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p9-3",
    "name": "Karamelize Fındık Krokan Parçacıkları 1kg",
    "code": "TOP-CRK-1000",
    "codeGroup": "Pastacılık Süsleme",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Çıtır karamel ve fındık parçacıklarının harmanıyla waffle ve pasta üstü için gurme krokan.",
    "imageUrl": "/resimler/p9/p9_3.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 64,
    "tags": [
      "Krokan",
      "Fındık Krokan",
      "Waffle Süsleme",
      "Çıtır Topping"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Pasta, Dondurma, Tatlı",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p9-4",
    "name": "Renkli Mini Bonibon Draje Çikolata 1kg",
    "code": "TOP-BNB-1000",
    "codeGroup": "Pastacılık Süsleme",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Çıtır şeker kaplamalı renkli mini sütlü çikolata drajeleri.",
    "imageUrl": "/resimler/p9/p9_4.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 65,
    "tags": [
      "Bonibon",
      "Renkli Draje",
      "Waffle Süsleme",
      "Çikolata Draje"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Dondurma, Pasta",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p9-5",
    "name": "Sütlü Damla Çikolata Drops 1kg",
    "code": "TOP-MDC-1000",
    "codeGroup": "Pastacılık Hammadde",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Fırına ve eritmeye dayanıklı kaliteli sütlü damla çikolata; kurabiye, kek ve waffle için.",
    "imageUrl": "/resimler/p9/p9_5.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 66,
    "tags": [
      "Sütlü Damla Çikolata",
      "Çikolata Drops",
      "Kurabiye Çikolatası",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Kurabiye, Kek, Waffle, Dondurma",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p9-6",
    "name": "Renkli Çakıl Taşı Draje Çikolata 1kg",
    "code": "TOP-CKL-1000",
    "codeGroup": "Pastacılık Süsleme",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Doğal taş görünümünde renkli şeker kaplı sütlü çikolata taneleri.",
    "imageUrl": "/resimler/p9/p9_6.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 67,
    "tags": [
      "Çakıl Taşı Çikolata",
      "Draje",
      "Waffle Süsü",
      "Pasta Süsleme"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Dondurma, Pasta",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p9-7",
    "name": "Bitter Damla Çikolata Drops 1kg",
    "code": "TOP-BDC-1000",
    "codeGroup": "Pastacılık Hammadde",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Yüksek kakao oranlı ısıya dayanıklı bitter damla çikolata parçaları.",
    "imageUrl": "/resimler/p9/p9_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 68,
    "tags": [
      "Bitter Damla Çikolata",
      "Kakao Drops",
      "Kurabiye",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Kurabiye, Muffin, Waffle",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p9-8",
    "name": "Beyaz Damla Çikolata Drops 1kg",
    "code": "TOP-WDC-1000",
    "codeGroup": "Pastacılık Hammadde",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Kakao yağı ve vanilyalı beyaz damla çikolata; kurabiye ve pasta süslemelerinde estetik dokunuş.",
    "imageUrl": "/resimler/p9/p9_8.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 69,
    "tags": [
      "Beyaz Damla Çikolata",
      "White Drops",
      "Kurabiye",
      "Pasta"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Kurabiye, Pasta Süsleme, Waffle",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p9-9",
    "name": "CALLEI Hazır Waffle, Krep & Pancake Toz Karışımı 1kg",
    "code": "CAL-WFX-1000",
    "codeGroup": "CALLEI",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Su ve yağ ilavesiyle dakikalar içinde dışı çıtır, içi yumuşacık altın sarısı waffle, krep ve pankek harcı.",
    "imageUrl": "/resimler/p9/p9_9.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 70,
    "tags": [
      "CALLEI",
      "Waffle Tozu",
      "Waffle Mix",
      "Krep Harcı",
      "Pancake Tozu"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Karışım": "1kg Mix + 1.25L Su + 200g Sıvı Yağ",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p9-10",
    "name": "Kavrulmuş Pirinç Fındık Parçacıkları 1kg",
    "code": "TOP-FND-1000",
    "codeGroup": "Pastacılık Süsleme",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Özenle kavrulmuş ve elenmiş pirinç fındık taneleri; waffle, çikolata ve pastalara eşsiz çıtırlık katar.",
    "imageUrl": "/resimler/p9/p9_10.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 71,
    "tags": [
      "Pirinç Fındık",
      "Kavrulmuş Fındık",
      "Waffle Süsü",
      "Pasta Topping"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Pasta, Dondurma",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p10-1",
    "name": "CALLEI Speculoos Bisküvili Waffle & Krep Kreması 1kg",
    "code": "CAL-SPC-1000",
    "codeGroup": "CALLEI",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Orijinal karamelize Belçika Speculoos bisküvisi parçacıklı lüks sürülebilir krema.",
    "imageUrl": "/resimler/p10/p10_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 72,
    "tags": [
      "CALLEI",
      "Speculoos",
      "Bisküvi Kreması",
      "Lotus",
      "Waffle Kreması"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Kruvasan Dolgusu, Cheesecake",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p10-2",
    "name": "CALLEI Çilek Aromalı Pembe Waffle & Krep Kreması 1kg",
    "code": "CAL-STR-1000",
    "codeGroup": "CALLEI",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Canlı pembe rengi ve tatlı çilek aromasıyla dikkat çeken özel sürülebilir krema.",
    "imageUrl": "/resimler/p10/p10_2.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 73,
    "tags": [
      "CALLEI",
      "Çilek Kreması",
      "Pembe Çikolata",
      "Waffle",
      "Krep"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Pasta Kaplama",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p10-3",
    "name": "CALLEI Beyaz Çikolatalı Waffle & Krep Kreması 1kg",
    "code": "CAL-WHT-1000",
    "codeGroup": "CALLEI",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Kremsi dokusu ve yoğun sütlü beyaz çikolata lezzetiyle vazgeçilmez waffle kreması.",
    "imageUrl": "/resimler/p10/p10_3.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 74,
    "tags": [
      "CALLEI",
      "Beyaz Çikolata",
      "Sürülebilir Krema",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Profiterol Dolgusu",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p10-4",
    "name": "CALLEI Sütlü Çikolatalı Waffle & Krep Kreması 1kg",
    "code": "CAL-MLK-1000",
    "codeGroup": "CALLEI",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Bol sütlü ve fındıklı geleneksel çikolata kreması; profesyonel işletmeler için 1 kg ambalajda.",
    "imageUrl": "/resimler/p10/p10_4.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 75,
    "tags": [
      "CALLEI",
      "Sütlü Çikolata",
      "Fındık Kreması",
      "Waffle",
      "Krep"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Pancake, Kruvasan",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p10-5",
    "name": "CALLEI Frambuaz Aromalı Waffle & Krep Kreması 1kg",
    "code": "CAL-RAS-1000",
    "codeGroup": "CALLEI",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Frambuaz meyvesinin mayhoş tatlı aromasıyla tatlı tabaklarına renk katan krema.",
    "imageUrl": "/resimler/p10/p10_5.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 76,
    "tags": [
      "CALLEI",
      "Frambuaz Kreması",
      "Ahududu",
      "Waffle",
      "Krep"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Tatlı Dolgusu",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p10-6",
    "name": "CALLEI Bubble Gum Aromalı Mavi Waffle Kreması 1kg",
    "code": "CAL-BBG-1000",
    "codeGroup": "CALLEI",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Eğlenceli sakız aroması ve göz alıcı turkuaz mavi rengiyle çocukların ve gençlerin gözdesi.",
    "imageUrl": "/resimler/p10/p10_6.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 77,
    "tags": [
      "CALLEI",
      "Bubble Gum",
      "Sakız Aromalı",
      "Mavi Krema",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Milkshake, Dondurma",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p10-7",
    "name": "CALLEI Antep Fıstıklı Yeşil Waffle & Krep Kreması 1kg",
    "code": "CAL-PST-1000",
    "codeGroup": "CALLEI",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Gerçek Antep fıstığı ezmesi içeren zengin yeşil renkli ve gurme lezzetli sürülebilir krema.",
    "imageUrl": "/resimler/p10/p10_7.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 78,
    "tags": [
      "CALLEI",
      "Antep Fıstığı",
      "Fıstık Kreması",
      "Dubai Çikolatası",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Dubai Çikolatası, Krep, Kruvasan",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p10-8",
    "name": "CALLEI Karamel Aromalı Sürülebilir Krema 1kg",
    "code": "CAL-CAR-1000",
    "codeGroup": "CALLEI",
    "categoryId": "cat-3",
    "categoryName": "Waffle Malzemeleri",
    "categorySlug": "waffle-malzemeleri",
    "description": "Koyu altın rengi ve karamelize şeker tadıyla krep, waffle ve pasta aralarında eşsiz tat.",
    "imageUrl": "/resimler/p10/p10_8.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 79,
    "tags": [
      "CALLEI",
      "Karamel Kreması",
      "Dulce de Leche",
      "Waffle",
      "Krep"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Kullanım": "Waffle, Krep, Kek Dolgusu",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p12-1",
    "name": "Caffè NONNO Passion Fruit Çarkıfelek Püresi 750ml",
    "code": "NON-PAS-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Tropikal çarkıfelek meyvesi çekirdekleri ve püresi içeren yoğun meyve konsantresi.",
    "imageUrl": "/resimler/p12/p12_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 80,
    "tags": [
      "Caffè NONNO",
      "Passion Fruit",
      "Çarkıfelek",
      "Püre",
      "Frozen"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Frozen, Smoothie, Kokteyl, Pasta",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p12-2",
    "name": "Monte Cristo Speculaas Bisküvi Aromalı Şurup 700ml",
    "code": "MTC-SPC-700",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Tarçın, zencefil ve karamelize bisküvi lezzetini kahveye taşıyan otantik Monte Cristo Speculaas şurubu.",
    "imageUrl": "/resimler/p12/p12_2.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 81,
    "tags": [
      "Monte Cristo",
      "Speculaas",
      "Bisküvi Şurubu",
      "Kahve",
      "Latte"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Speculaas Latte, Frappe, Sıcak Süt",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p12-3",
    "name": "Caffè NONNO Kivi Aromalı Frozen Püre 750ml",
    "code": "NON-KIW-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Doğal yeşil rengi ve kivi taneleriyle frozen ve kokteyller için ferahlatıcı ekşi-tatlı püre.",
    "imageUrl": "/resimler/p12/p12_3.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 82,
    "tags": [
      "Caffè NONNO",
      "Kivi",
      "Kiwi Frozen",
      "Püre",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Frozen, Smoothie, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p12-4",
    "name": "Krater Elmalı Meyve Karışımı 1000g",
    "code": "KRT-APL-1000",
    "codeGroup": "Krater",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Maestro del Gelato serisi ekşi yeşil elma harcı; dondurma, pasta ve frozen yapımında üstün lezzet.",
    "imageUrl": "/resimler/p12/p12_4.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 83,
    "tags": [
      "Krater",
      "Elma",
      "Yeşil Elma",
      "Dondurma",
      "Meyve Karışımı"
    ],
    "specs": {
      "Gramaj": "1000 g",
      "Kullanım": "Gelato, Dondurma, Frozen, Pasta",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p12-5",
    "name": "Krater Ananaslı Meyve Karışımı 1000g",
    "code": "KRT-PIN-1000",
    "codeGroup": "Krater",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Tropikal ananas lezzeti ve kokusunu dondurma ve tatlılarınıza kazandıran profesyonel meyve sosu.",
    "imageUrl": "/resimler/p12/p12_5.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 84,
    "tags": [
      "Krater",
      "Ananas",
      "Pineapple",
      "Gelato",
      "Dondurma Harcı"
    ],
    "specs": {
      "Gramaj": "1000 g",
      "Kullanım": "Gelato, Frozen, Dondurma, Pasta",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p12-6",
    "name": "Monte Cristo Badem Aromalı Şurup 700ml",
    "code": "MTC-ALM-700",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Doğal kavrulmuş badem ve acıbadem dokunuşuyla kahveler ve sıcak içecekler için Monte Cristo şurubu.",
    "imageUrl": "/resimler/p12/p12_6.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 85,
    "tags": [
      "Monte Cristo",
      "Badem",
      "Almond",
      "Şurup",
      "Kahve"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Almond Latte, Sıcak İçecekler",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p12-7",
    "name": "Monte Cristo Chai Tea Baharatlı Şurup 700ml",
    "code": "MTC-CHT-700",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Geleneksel Hint baharatları karanfil, tarçın ve kakule özüyle Chai Tea Latte hazırlama şurubu.",
    "imageUrl": "/resimler/p12/p12_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 86,
    "tags": [
      "Monte Cristo",
      "Chai Tea",
      "Baharatlı Şurup",
      "Chai Latte"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Chai Latte, Sıcak Süt, Çay",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p12-8",
    "name": "Monte Cristo Antep Fıstığı Aromalı Şurup 700ml",
    "code": "MTC-PST-700",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Göz alıcı zümrüt yeşili rengi ve yoğun Antep fıstığı aromasıyla özel kahveler ve kokteyller için.",
    "imageUrl": "/resimler/p12/p12_8.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 87,
    "tags": [
      "Monte Cristo",
      "Antep Fıstığı",
      "Pistachio",
      "Şurup",
      "Pistachio Latte"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Pistachio Latte, Frappe, Mocktail",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p12-9",
    "name": "Monte Cristo Çikolata Aromalı Şurup 700ml",
    "code": "MTC-CHO-700",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Koyu İsviçre çikolatası aromasıyla mocha ve sıcak tatlı içeceklerinize lezzet katar.",
    "imageUrl": "/resimler/p12/p12_9.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 88,
    "tags": [
      "Monte Cristo",
      "Çikolata",
      "Chocolate",
      "Mocha",
      "Şurup"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Mocha, Milkshake, Frappe",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-p12-10",
    "name": "Monte Cristo Pumpkin Spice Balkabağı Şurubu 700ml",
    "code": "MTC-PMP-700",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Sonbahar klasiği balkabağı püresi, tarçın ve muskat baharatı uyumuyla Pumpkin Spice Latte şurubu.",
    "imageUrl": "/resimler/p12/p12_10.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 89,
    "tags": [
      "Monte Cristo",
      "Pumpkin Spice",
      "Balkabağı",
      "Latte",
      "Şurup"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Kullanım": "Pumpkin Spice Latte, Frappe",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt1-1",
    "name": "Krater Çilekli Meyve Karışımı 1000g",
    "code": "KRT-STR-1000",
    "codeGroup": "Krater",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Doğal çilek püresi içeren altın ambalajlı dondurma, pasta ve bar sos & püre karışımı.",
    "imageUrl": "/resimler/pt1/pt1_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 90,
    "tags": [
      "Krater",
      "Çilek",
      "Püre",
      "Gelato",
      "Dondurma"
    ],
    "specs": {
      "Gramaj": "1000 g",
      "Kullanım": "Dondurma, Pasta, Frozen, Tatlı",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt1-2",
    "name": "Krater Frambuazlı Meyve Karışımı 1000g",
    "code": "KRT-RAS-1000",
    "codeGroup": "Krater",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Taze frambuaz taneleriyle zenginleştirilmiş yoğun lezzetli gelato ve pastacılık meyve miksi.",
    "imageUrl": "/resimler/pt1/pt1_2.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 91,
    "tags": [
      "Krater",
      "Frambuaz",
      "Ahududu",
      "Püre",
      "Dondurma"
    ],
    "specs": {
      "Gramaj": "1000 g",
      "Kullanım": "Dondurma, Pasta, Cheesecake",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt1-3",
    "name": "Krater Kavunlu Meyve Karışımı 1000g",
    "code": "KRT-MEL-1000",
    "codeGroup": "Krater",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Mis kokulu sarı kavun püresi; dondurma ve soğuk içecek reçetelerinde taze yaz esintisi.",
    "imageUrl": "/resimler/pt1/pt1_3.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 92,
    "tags": [
      "Krater",
      "Kavun",
      "Melon",
      "Püre",
      "Gelato"
    ],
    "specs": {
      "Gramaj": "1000 g",
      "Kullanım": "Gelato, Frozen, Dondurma",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt1-4",
    "name": "Krater Elmalı Meyve Karışımı Gold 1000g",
    "code": "KRT-APG-1000",
    "codeGroup": "Krater",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Yeşil elmanın ferahlatıcı ekşiliğiyle donatılmış profesyonel pastacılık ve dondurma bazı.",
    "imageUrl": "/resimler/pt1/pt1_4.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 93,
    "tags": [
      "Krater",
      "Yeşil Elma",
      "Apple Mix",
      "Püre",
      "Tatlı"
    ],
    "specs": {
      "Gramaj": "1000 g",
      "Kullanım": "Dondurma, Pasta, Frozen",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt1-5",
    "name": "DaVinci Gourmet Condensed Milk Koyulaştırılmış Süt Sosu 1L",
    "code": "DVG-CND-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-6",
    "categoryName": "Tatlı Soslar",
    "categorySlug": "tatli-soslar",
    "description": "İspanyol kahvesi, Vietnam kahvesi ve özel tatlılar için yoğunlaştırılmış süt lezzeti sunan 1L sos.",
    "imageUrl": "/resimler/pt1/pt1_5.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 94,
    "tags": [
      "DaVinci Gourmet",
      "Condensed Milk",
      "Koyulaştırılmış Süt",
      "Süt Sosu",
      "Kahve"
    ],
    "specs": {
      "Hacim": "1 Litre",
      "Kullanım": "Spanish Latte, Vietnam Kahvesi, Tatlı",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-pt1-6",
    "name": "Krater Şeftalili Meyve Karışımı 1000g",
    "code": "KRT-PCH-1000",
    "codeGroup": "Krater",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Olgun bahçe şeftalilerinin doğal tadını barındıran altın şişeli gurme meyve karışımı.",
    "imageUrl": "/resimler/pt1/pt1_6.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 95,
    "tags": [
      "Krater",
      "Şeftali",
      "Peach",
      "Püre",
      "Dondurma"
    ],
    "specs": {
      "Gramaj": "1000 g",
      "Kullanım": "Gelato, Dondurma, Frozen, Pasta",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt1-7",
    "name": "DaVinci Gourmet Yoğunlaştırılmış Süt Aromalı Sos 1L",
    "code": "DVG-CND-1000B",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-6",
    "categoryName": "Tatlı Soslar",
    "categorySlug": "tatli-soslar",
    "description": "Kahve zincirleri için özel tasarlanmış ipeksi kıvamlı koyulaştırılmış süt sosu.",
    "imageUrl": "/resimler/pt1/pt1_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 96,
    "tags": [
      "DaVinci Gourmet",
      "Condensed Milk",
      "Barista Sosu",
      "Latte"
    ],
    "specs": {
      "Hacim": "1 Litre",
      "Kullanım": "Kahve, Latte, Bubble Tea",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-pt1-8",
    "name": "DaVinci Gourmet Mango Fruit Beverage Mix 1L",
    "code": "DVG-MNG-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Egzotik Alfonso mangolarının bol etli püresiyle hazırlanan premium smoothie ve kokteyl bazı.",
    "imageUrl": "/resimler/pt1/pt1_8.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 97,
    "tags": [
      "DaVinci Gourmet",
      "Mango Püresi",
      "Fruit Mix",
      "Smoothie",
      "Frozen"
    ],
    "specs": {
      "Hacim": "1 Litre",
      "Kullanım": "Mango Smoothie, Frozen, Kokteyl",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-pt1-9",
    "name": "DaVinci Gourmet Strawberry Fruit Beverage Mix 1L",
    "code": "DVG-STR-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Doğal çilek parçacıklı kıvamıyla milkshake, smoothie ve kokteyller için vazgeçilmez içecek miksi.",
    "imageUrl": "/resimler/pt1/pt1_9.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 98,
    "tags": [
      "DaVinci Gourmet",
      "Çilek Püresi",
      "Strawberry Mix",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "1 Litre",
      "Kullanım": "Çilek Smoothie, Frozen, Kokteyl",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-pt1-10",
    "name": "DaVinci Gourmet Mixed Berry Fruit Beverage Mix 1L",
    "code": "DVG-MXB-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Ahududu, böğürtlen, çilek ve yaban mersininin muazzam birleşimiyle antioksidan dolu meyve püresi.",
    "imageUrl": "/resimler/pt1/pt1_10.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 99,
    "tags": [
      "DaVinci Gourmet",
      "Mixed Berry",
      "Orman Meyvesi Püresi",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "1 Litre",
      "Kullanım": "Berry Smoothie, Frozen, Kokteyl",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-pt2-1",
    "name": "Caffè NONNO Coconut Hindistan Cevizi Frozen Püre 750ml",
    "code": "NON-COC-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Egzotik hindistan cevizi sütü ve püresi; Pina Colada ve tropikal içecekler için mükemmel kıvam.",
    "imageUrl": "/resimler/pt2/pt2_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 100,
    "tags": [
      "Caffè NONNO",
      "Hindistan Cevizi",
      "Coconut Frozen",
      "Püre",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Pina Colada, Smoothie, Frappe, Tatlı",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt2-2",
    "name": "Caffè NONNO Karpuz Aromalı Frozen Püre 750ml",
    "code": "NON-WTR-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Ferahlatıcı yaz karpuzunun taze tadıyla buz gibi frozen ve frozen margarita tarifleri için püre.",
    "imageUrl": "/resimler/pt2/pt2_2.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 101,
    "tags": [
      "Caffè NONNO",
      "Karpuz",
      "Watermelon Frozen",
      "Püre",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Karpuz Frozen, Kokteyl, Mocktail",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt2-3",
    "name": "Caffè NONNO Red Forest Kırmızı Orman Meyveli Frozen 750ml",
    "code": "NON-ROF-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Kırmızı frenk üzümü, çilek ve ahududu harmanıyla canlı kırmızı renkte ferahlatıcı meyve püresi.",
    "imageUrl": "/resimler/pt2/pt2_3.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 102,
    "tags": [
      "Caffè NONNO",
      "Red Forest",
      "Kırmızı Orman Meyvesi",
      "Püre",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Frozen, Smoothie, Kokteyl, Pasta",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt2-4",
    "name": "Caffè NONNO Kavun Aromalı Frozen Püre 750ml",
    "code": "NON-MEL-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Yoğun kokulu yaz kavunu aromasıyla kafeler ve barlar için pratik sıkmalı frozen püresi.",
    "imageUrl": "/resimler/pt2/pt2_4.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 103,
    "tags": [
      "Caffè NONNO",
      "Kavun",
      "Melon Frozen",
      "Püre",
      "İçecek"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Kavun Frozen, Smoothie, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt2-5",
    "name": "Caffè NONNO Karadut Aromalı Frozen Püre 750ml",
    "code": "NON-BKM-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Ege karadutunun zengin koyu mor rengi ve aromasıyla buzlu içeceklerinize doğal dokunuş.",
    "imageUrl": "/resimler/pt2/pt2_5.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 104,
    "tags": [
      "Caffè NONNO",
      "Karadut",
      "Black Mulberry",
      "Püre",
      "Frozen"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Karadut Frozen, Limonata, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt2-6",
    "name": "Caffè NONNO Çilek Aromalı Frozen Püre 750ml",
    "code": "NON-STR-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Taze hasat bahçe çileklerinden elde edilen pürüzsüz ve lezzetli frozen içecek püresi.",
    "imageUrl": "/resimler/pt2/pt2_6.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 105,
    "tags": [
      "Caffè NONNO",
      "Çilek",
      "Strawberry Frozen",
      "Püre",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Çilek Frozen, Smoothie, Milkshake",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt2-7",
    "name": "Caffè NONNO Şeftali Aromalı Frozen Püre 750ml",
    "code": "NON-PCH-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Bursa şeftalisinin tatlı aromasıyla hazırlanan yoğun kıvamlı ve ferahlatıcı püre.",
    "imageUrl": "/resimler/pt2/pt2_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 106,
    "tags": [
      "Caffè NONNO",
      "Şeftali",
      "Peach Frozen",
      "Püre",
      "Ice Tea"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Şeftali Frozen, Smoothie, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt2-8",
    "name": "Caffè NONNO Mango & Maracuja Frozen Püre 750ml",
    "code": "NON-MNG-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Egzotik mango ve marakuya meyvelerinin mükemmel birleşimiyle tropikal tat deneyimi.",
    "imageUrl": "/resimler/pt2/pt2_8.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 107,
    "tags": [
      "Caffè NONNO",
      "Mango",
      "Maracuja",
      "Tropikal Püre",
      "Frozen"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Mango Frozen, Tropikal Kokteyl, Smoothie",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt2-9",
    "name": "DaVinci Gourmet Mixed Berry Orman Meyveli Mix 1L",
    "code": "DVG-MXB-1000B",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Yaban mersini, nar, böğürtlen ve ahududu harmanıyla hazırlanmış profesyonel meyve karışımı.",
    "imageUrl": "/resimler/pt2/pt2_9.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 108,
    "tags": [
      "DaVinci Gourmet",
      "Mixed Berry",
      "Meyve Miksi",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "1 Litre",
      "Kullanım": "Kokteyl, Smoothie, Frozen",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-pt2-10",
    "name": "DaVinci Gourmet Passionfruit Çarkıfelek Mix 1L",
    "code": "DVG-PAS-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Tropikaların vazgeçilmezi marakuya çarkıfelek meyvesi özüyle hazırlanan konsantre içecek harcı.",
    "imageUrl": "/resimler/pt2/pt2_10.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 109,
    "tags": [
      "DaVinci Gourmet",
      "Passionfruit",
      "Çarkıfelek",
      "Püre",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "1 Litre",
      "Kullanım": "Passion Smoothie, Kokteyl, Mocktail",
      "Menşei": "Malezya / ABD"
    }
  },
  {
    "id": "prod-pt11-1",
    "name": "Donuk Çörek Otlu & Susamlı Mini Tuzlu Kurabiye",
    "code": "DNK-KRB-001",
    "codeGroup": "Donuk Pastacılık",
    "categoryId": "cat-4",
    "categoryName": "Donuk Pasta",
    "categorySlug": "donuk-pasta",
    "description": "Ağızda dağılan çıtır yapısı, bol susam ve çörek otu aromasıyla çay saatlerinin vazgeçilmez mini kurabiyesi.",
    "imageUrl": "/resimler/pt11/pt11_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 110,
    "tags": [
      "Donuk Kurabiye",
      "Tuzlu Kurabiye",
      "Çörek Otlu",
      "Unlu Mamul",
      "Kafeterya"
    ],
    "specs": {
      "Muhafaza": "-18°C",
      "Hazırlık": "Oda sıcaklığında 20 dk çözünme / 180°C 5 dk ısıtma",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt11-2",
    "name": "Donuk Gurme Susamlı Tuzlu Atıştırmalık Tabağı",
    "code": "DNK-KRB-002",
    "codeGroup": "Donuk Pastacılık",
    "categoryId": "cat-4",
    "categoryName": "Donuk Pasta",
    "categorySlug": "donuk-pasta",
    "description": "Kafeler ve oteller için pratik porsiyonlanan tereyağlı çıtır tuzlu kurabiye atıştırmalığı.",
    "imageUrl": "/resimler/pt11/pt11_2.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 111,
    "tags": [
      "Donuk Kurabiye",
      "Tuzlu Atıştırmalık",
      "İkramlık",
      "Kafeterya"
    ],
    "specs": {
      "Muhafaza": "-18°C",
      "Kullanım": "Çözündür ve Servis Et",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt11-3",
    "name": "Caffè NONNO Ananas Aromalı Frozen Püre 750ml",
    "code": "NON-PIN-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Taze tropikal ananas aromasıyla ferahlatıcı smoothie ve kokteyller için püre.",
    "imageUrl": "/resimler/pt11/pt11_3.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 112,
    "tags": [
      "Caffè NONNO",
      "Ananas",
      "Pineapple Frozen",
      "Püre"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Ananas Frozen, Smoothie, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt11-4",
    "name": "Caffè NONNO Cool Poka Portakallı Şurup 750ml",
    "code": "NON-CPK-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Buzlu narenciye ve tatlı portakal aromasıyla Cool Poka yaz içecekleri için özel şurup.",
    "imageUrl": "/resimler/pt11/pt11_4.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 113,
    "tags": [
      "Caffè NONNO",
      "Cool Poka",
      "Portakal",
      "Şurup",
      "Soğuk İçecek"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Cool Poka, Buzlu İçecek, Soda",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt11-5",
    "name": "Caffè NONNO Çikolatalı Kurabiye Şurubu 750ml",
    "code": "NON-CKY-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Çikolata parçacıklı Amerikan kurabiyesi lezzetiyle kahve ve frappeler için özel şurup.",
    "imageUrl": "/resimler/pt11/pt11_5.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "order": 114,
    "tags": [
      "Caffè NONNO",
      "Çikolata Kurabiye",
      "Cookie Şurubu",
      "Kahve",
      "Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Cookie Latte, Frappe, Milkshake",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt11-6",
    "name": "Caffè NONNO Vişne Aromalı Frozen Püre 750ml",
    "code": "NON-CHR-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Koyu kırmızı vişne ekşiliği ve tatlılığıyla mükemmel dengeli frozen meyve püresi.",
    "imageUrl": "/resimler/pt11/pt11_6.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 115,
    "tags": [
      "Caffè NONNO",
      "Vişne",
      "Cherry Frozen",
      "Püre",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Vişne Frozen, Kokteyl, Pasta",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt11-7",
    "name": "Caffè NONNO Muz Aromalı Frozen Püre 750ml",
    "code": "NON-BNF-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Doğal muz püresi dokusuyla milkshake ve smoothie çeşitlerine dolgunluk kazandırır.",
    "imageUrl": "/resimler/pt11/pt11_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 116,
    "tags": [
      "Caffè NONNO",
      "Muz",
      "Banana Frozen",
      "Püre",
      "Milkshake"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Muzlu Smoothie, Frozen, Milkshake",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt11-8",
    "name": "Donuk Peynirli Mini Poğaça Topları",
    "code": "DNK-PGC-001",
    "codeGroup": "Donuk Pastacılık",
    "categoryId": "cat-4",
    "categoryName": "Donuk Pasta",
    "categorySlug": "donuk-pasta",
    "description": "Mayalı yumuşacık hamur içerisinde leziz peynir dolgusu; fırında 10 dakikada servise hazır.",
    "imageUrl": "/resimler/pt11/pt11_8.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 117,
    "tags": [
      "Donuk Poğaça",
      "Peynirli Poğaça",
      "Unlu Mamul",
      "Kahvaltı"
    ],
    "specs": {
      "Muhafaza": "-18°C",
      "Pişirme": "180°C önceden ısıtılmış fırında 10-12 dk",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt11-9",
    "name": "Caffè NONNO Yeşil Elma Frozen Püre 750ml",
    "code": "NON-GAP-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Canlandırıcı ekşi Granny Smith yeşil elma aromasıyla serinletici frozen püresi.",
    "imageUrl": "/resimler/pt11/pt11_9.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 118,
    "tags": [
      "Caffè NONNO",
      "Yeşil Elma",
      "Green Apple",
      "Püre",
      "Frozen"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Kullanım": "Elma Frozen, Kokteyl, Limonata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt11-10",
    "name": "Donuk Mini Ekmek & Sandviç Hamur Topu",
    "code": "DNK-EKM-001",
    "codeGroup": "Donuk Pastacılık",
    "categoryId": "cat-4",
    "categoryName": "Donuk Pasta",
    "categorySlug": "donuk-pasta",
    "description": "Çıtır kabuklu, içi gözenekli mini gurme ekmek ve sandviç hamuru.",
    "imageUrl": "/resimler/pt11/pt11_10.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "order": 119,
    "tags": [
      "Donuk Ekmek",
      "Sandviç Ekmeği",
      "Gurme Ekmek",
      "Unlu Mamul"
    ],
    "specs": {
      "Muhafaza": "-18°C",
      "Pişirme": "200°C fırında 8-10 dk",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-pt12-1",
    "name": "Monte Cristo Tarçın Aromalı Şurup 700 ml",
    "code": "MC-SYR-CIN-700",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Sıcak ve soğuk kahve çeşitlerinde, kokteyllerde ve tatlılarda yoğun aromatik tarçın lezzeti sağlayan premium gurme bar şurubu.",
    "imageUrl": "/resimler/pt12/pt12_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Monte Cristo",
      "Tarçın",
      "Şurup",
      "Kahve",
      "Barista",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Ambalaj": "Cam Şişe",
      "Menşei": "Türkiye",
      "Kullanım Alanı": "Kahve, Sıcak Çikolata, Kokteyller, Tatlılar",
      "Saklama Koşulu": "Oda sıcaklığında, kuru ve serin yerde saklayınız."
    }
  },
  {
    "id": "prod-pt12-2",
    "name": "Monte Cristo Nar Aromalı Şurup 700 ml",
    "code": "MC-SYR-POM-700",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Taze mayhoş nar tadıyla kokteyller, mocktailler, limonatalar ve frozen içecekler için özel gurme şurup.",
    "imageUrl": "/resimler/pt12/pt12_2.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Monte Cristo",
      "Nar",
      "Şurup",
      "Kokteyl",
      "Limonata",
      "Frozen"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Ambalaj": "Cam Şişe",
      "Menşei": "Türkiye",
      "Kullanım Alanı": "Kokteyller, Limonata, Frozen, Soğuk Çaylar",
      "Saklama Koşulu": "Güneş ışığından uzak, serin yerde muhafaza ediniz."
    }
  },
  {
    "id": "prod-pt12-3",
    "name": "Monte Cristo Hindistan Cevizi Aromalı Şurup 700 ml",
    "code": "MC-SYR-COC-700",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Egzotik hindistan cevizi lezzeti sunan, latte, kokteyl ve soğuk içecekler için mükemmel kıvamlı bar şurubu.",
    "imageUrl": "/resimler/pt12/pt12_3.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Monte Cristo",
      "Hindistan Cevizi",
      "Şurup",
      "Latte",
      "Kokteyl",
      "Egzotik"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Ambalaj": "Cam Şişe",
      "Menşei": "Türkiye",
      "Kullanım Alanı": "Kahve Çeşitleri, Pina Colada, Mocktail, Milkshake",
      "Saklama Koşulu": "Kapağı kapalı olarak serin ortamda saklayınız."
    }
  },
  {
    "id": "prod-pt12-4",
    "name": "Monte Cristo Fındık Aromalı Şurup 700 ml",
    "code": "MC-SYR-HAZ-700",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kavrulmuş fındık notalarıyla kahve ve sıcak içecek menülerinin vazgeçilmezi gurme bar şurubu.",
    "imageUrl": "/resimler/pt12/pt12_4.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Monte Cristo",
      "Fındık",
      "Şurup",
      "Kahve",
      "Barista",
      "Latte"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Ambalaj": "Cam Şişe",
      "Menşei": "Türkiye",
      "Kullanım Alanı": "Filtre Kahve, Espresso, Latte, Sıcak İçecekler",
      "Saklama Koşulu": "Oda sıcaklığında kuru yerde saklayınız."
    }
  },
  {
    "id": "prod-pt12-5",
    "name": "Monte Cristo Karpuz Aromalı Şurup 700 ml",
    "code": "MC-SYR-WAT-700",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Yaz içecekleri, ferahlatıcı frozen ve soğuk kokteyller için yoğun taze karpuz aromalı şurup.",
    "imageUrl": "/resimler/pt12/pt12_5.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Monte Cristo",
      "Karpuz",
      "Şurup",
      "Frozen",
      "Kokteyl",
      "Soğuk İçecek"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Ambalaj": "Cam Şişe",
      "Menşei": "Türkiye",
      "Kullanım Alanı": "Frozen İçecekler, Limonata, Kokteyller, Smoothie",
      "Saklama Koşulu": "Serin ve kuru yerde muhafaza ediniz."
    }
  },
  {
    "id": "prod-pt12-6",
    "name": "Monte Cristo Misket Limonu (Lime) Aromalı Şurup 700 ml",
    "code": "MC-SYR-LIM-700",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Mojito, limonata ve narenciye bazlı bar miksleri için taze misket limonu (lime) aromalı şurup.",
    "imageUrl": "/resimler/pt12/pt12_6.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Monte Cristo",
      "Lime",
      "Misket Limonu",
      "Şurup",
      "Mojito",
      "Barista"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Ambalaj": "Cam Şişe",
      "Menşei": "Türkiye",
      "Kullanım Alanı": "Mojito, Kokteyl, Soğuk Çay, Limonata Çeşitleri",
      "Saklama Koşulu": "Güneş görmeyen serin yerde muhafaza ediniz."
    }
  },
  {
    "id": "prod-pt12-7",
    "name": "CALLEI Beyaz Çikolatalı Çıtır Pirinç Patlağı Draje (İnci Topping)",
    "code": "CAL-TOP-WHT-1K",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle & Krep Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Waffle, dondurma, krep ve pastacılık süslemeleri için çıtır dokulu beyaz çikolatalı inci patlak.",
    "imageUrl": "/resimler/pt12/pt12_7.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "CALLEI Chocolate",
      "Beyaz Çikolata",
      "Pirinç Patlağı",
      "Draje",
      "Waffle",
      "Topping"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Ambalaj": "Kilitli Doypack / Kova",
      "Çikolata Türü": "Beyaz Çikolata Kaplama",
      "Kullanım Alanı": "Waffle, Krep, Dondurma, Pasta ve Tatlı Süslemeleri",
      "Saklama Koşulu": "15-20°C sıcaklıkta, nemsiz ortamda saklayınız."
    }
  },
  {
    "id": "prod-pt12-8",
    "name": "Monte Cristo Yeşil Limon (Lime) Kokteyl Şurubu 700 ml",
    "code": "MC-SYR-LIM2-700",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Barlarda ve kafelerde kokteyl ve soğuk çay hazırlığı için dengeli asiditeye sahip ferahlatıcı lime şurubu.",
    "imageUrl": "/resimler/pt12/pt12_8.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Monte Cristo",
      "Yeşil Limon",
      "Lime",
      "Kokteyl",
      "Şurup"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Ambalaj": "Cam Şişe",
      "Menşei": "Türkiye",
      "Kullanım Alanı": "Barista Miksleri, Kokteyller, Limonata",
      "Saklama Koşulu": "Kuru ve serin ortamda saklayınız."
    }
  },
  {
    "id": "prod-pt12-9",
    "name": "CALLEI Pembe Çıtır Pirinç Patlağı Süsleme Drajesi (Fuşya İnci)",
    "code": "CAL-TOP-PNK-1K",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle & Krep Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Waffle, donut ve pasta süslemelerinde görsel canlılık ve çıtırlık katan pembe çikolatalı inci draje.",
    "imageUrl": "/resimler/pt12/pt12_9.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "CALLEI Chocolate",
      "Pembe",
      "Pirinç Patlağı",
      "Draje",
      "Süsleme",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Ambalaj": "Kilitli Ambalaj",
      "Kullanım Alanı": "Waffle, Donut, Cupcake, Pasta Dekorasyonu",
      "Saklama Koşulu": "18-22°C oda sıcaklığında saklayınız."
    }
  },
  {
    "id": "prod-pt12-10",
    "name": "CALLEI Sütlü Çikolatalı Çıtır Pirinç Patlağı Draje Topping",
    "code": "CAL-TOP-MLK-1K",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle & Krep Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Waffle, krep ve dondurma üzeri için gerçek sütlü çikolata kaplı çıtır pirinç draje.",
    "imageUrl": "/resimler/pt12/pt12_10.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "CALLEI Chocolate",
      "Sütlü Çikolata",
      "Pirinç Patlağı",
      "Draje",
      "Waffle",
      "Krep"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Ambalaj": "Kilitli Ambalaj",
      "Çikolata Türü": "Sütlü Çikolata Kaplama",
      "Kullanım Alanı": "Waffle, Krep, Pancake, Dondurma, Pasta",
      "Saklama Koşulu": "Kuru ve serin ortamda muhafaza ediniz."
    }
  },
  {
    "id": "prod-pt12-11",
    "name": "CALLEI Canlı Fuşya Çıtır Pirinç Patlağı Pasta & Waffle Drajesi",
    "code": "CAL-TOP-FUS-1K",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle & Krep Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Pasta, kek ve tatlı sunumlarına canlılık ve çıtırlık katan parlak fuşya renkli çıtır pirinç süslemesi.",
    "imageUrl": "/resimler/pt12/pt12_11.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "CALLEI Chocolate",
      "Fuşya",
      "Pirinç Patlağı",
      "Pasta",
      "Waffle",
      "Dekor"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Ambalaj": "Kilitli Ambalaj",
      "Kullanım Alanı": "Waffle, Pasta, Dondurma, Butik Tatlılar",
      "Saklama Koşulu": "Güneş görmeyen serin yerde saklayınız."
    }
  },
  {
    "id": "prod-pt12-12",
    "name": "CALLEI Bitter Çikolatalı Çıtır Pirinç Patlağı Draje Topping",
    "code": "CAL-TOP-DRK-1K",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle & Krep Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Yoğun kakao lezzeti ve çıtır yapısıyla profesyonel pastacılık ve waffle süsleme drajesi.",
    "imageUrl": "/resimler/pt12/pt12_12.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "CALLEI Chocolate",
      "Bitter Çikolata",
      "Pirinç Patlağı",
      "Draje",
      "Waffle",
      "Pasta"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Ambalaj": "Kilitli Ambalaj",
      "Çikolata Türü": "Bitter Çikolata Kaplama",
      "Kullanım Alanı": "Waffle, Profiterol, Pasta, Tatlı Sunumları",
      "Saklama Koşulu": "15-20°C nemsiz ortamda muhafaza ediniz."
    }
  },
  {
    "id": "prod-pt12-13",
    "name": "Donuk Mangolu & Chia Tohumlu Dilimli Cheesecake",
    "code": "PST-DNK-MNG-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Kremamsı peynir dolgusu, tereyağlı bisküvi tabanı ve egzotik mango-chia jölesi ile porsiyonluk donuk cheesecake (10-12 dilim).",
    "imageUrl": "/resimler/pt12/pt12_13.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Mango",
      "Chia",
      "Dilimli",
      "Pastane"
    ],
    "specs": {
      "Porsiyon": "10-12 Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 3-4 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Çözündükten sonra servise hazırdır, tekrar dondurmayınız."
    }
  },
  {
    "id": "prod-pt12-14",
    "name": "Donuk İtalyan Tiramisu Dilimli Pasta",
    "code": "PST-DNK-TIR-10D",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Orijinal kedidili bisküvi, espresso şurubu ve zengin mascarpone kreması ile hazırlanmış porsiyonluk İtalyan tiramisu.",
    "imageUrl": "/resimler/pt12/pt12_14.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Tiramisu",
      "İtalyan",
      "Kahveli",
      "Dilimli",
      "Kafe"
    ],
    "specs": {
      "Porsiyon": "10-12 Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Servis öncesi buzdolabında dinlendiriniz."
    }
  },
  {
    "id": "prod-pt12-15",
    "name": "Donuk Antep Fıstıklı & Çikolatalı Mono Kutu Pasta (Dubai Pasta)",
    "code": "PST-DNK-DUB-BOX",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Şeffaf monobox ambalajında, çıtır kadayıf, yoğun Antep fıstığı ezmesi ve akışkan çikolata ganajlı mono pasta.",
    "imageUrl": "/resimler/pt12/pt12_15.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Antep Fıstığı",
      "Dubai Pasta",
      "Mono Pasta",
      "Kutu Pasta",
      "Çikolata"
    ],
    "specs": {
      "Porsiyon": "12 Adet Bireysel Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Kendi özel kutusunda pratik paket ve masa servisi."
    }
  },
  {
    "id": "prod-pt12-16",
    "name": "Donuk Lotus Bisküvili & Yaban Mersinli Bütün Pasta (Dilimli)",
    "code": "PST-DNK-LOT-BLU",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Lotus karamel bisküvisi, yoğun çikolata tabanı ve taze yaban mersini taneleriyle süslenmiş hazır dilimli bütün pasta.",
    "imageUrl": "/resimler/pt12/pt12_16.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Lotus",
      "Yaban Mersini",
      "Bütün Pasta",
      "Dilimli",
      "Karamel"
    ],
    "specs": {
      "Porsiyon": "12 Dilim Bütün Pasta",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 4 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Dilim bazlı veya bütün olarak servis edilebilir."
    }
  },
  {
    "id": "prod-pt12-17",
    "name": "Donuk Yoğun Çikolatalı & Fıstık Ezmeli Dilim Pasta",
    "code": "PST-DNK-PNT-CHOC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Nemli kakaolu pandispanya, fıstık ezmeli krema dolgusu ve bitter çikolata ganajlı dilim pasta.",
    "imageUrl": "/resimler/pt12/pt12_17.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Çikolata",
      "Fıstık Ezmesi",
      "Ganaj",
      "Dilimli",
      "Pastane"
    ],
    "specs": {
      "Porsiyon": "10-12 Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Servis öncesi +4°C'de çözündürünüz."
    }
  },
  {
    "id": "prod-pt12-18",
    "name": "Donuk Karamelli & Fındık Parçacıklı Mono Pasta",
    "code": "PST-DNK-CRM-MONO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Karamel sos kaplamalı, kavrulmuş fındık krokantlı ve vanilyalı mus dolgulu tek kişilik mono pasta.",
    "imageUrl": "/resimler/pt12/pt12_18.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Karamel",
      "Fındık",
      "Krokant",
      "Tek Kişilik"
    ],
    "specs": {
      "Porsiyon": "12 Adet Tek Kişilik Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Tabakta şık sunumlar için ideal tek kişilik porsiyon."
    }
  },
  {
    "id": "prod-pt12-19",
    "name": "Donuk Kuruyemişli & Kırmızı Meyveli Fudgy Brownie Dilim",
    "code": "PST-DNK-BRW-NUT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Fındık, ceviz ve kurutulmuş kırmızı meyvelerle zenginleştirilmiş, yoğun çikolatalı fudgy brownie dilimi.",
    "imageUrl": "/resimler/pt12/pt12_19.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Brownie",
      "Kuruyemiş",
      "Kırmızı Meyve",
      "Fudgy",
      "Çikolata"
    ],
    "specs": {
      "Porsiyon": "12-16 Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat veya ılık servis",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Ilık servis edilerek dondurma eşliğinde sunulabilir."
    }
  },
  {
    "id": "prod-pt12-20",
    "name": "Donuk Antep Fıstıklı & Ahududu Katmanlı Dilim Pasta",
    "code": "PST-DNK-PST-RAS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Yoğun Antep fıstıklı pandispanya katmanları arasında mayhoş ahududu marmelatı ve beyaz çikolata kreması.",
    "imageUrl": "/resimler/pt12/pt12_20.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Antep Fıstığı",
      "Ahududu",
      "Dilimli",
      "Pastane",
      "Gurme"
    ],
    "specs": {
      "Porsiyon": "10-12 Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Kullanım": "Servis öncesi buzdolabında çözündürünüz."
    }
  },
  {
    "id": "prod-pt13-1",
    "name": "Donuk Çikolata Kaplı Çilekli Mono Pasta",
    "code": "PST-DNK-MN-CHOC-STR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Parlak çikolata glazür kaplaması, ipeksi krema dolgusu ve üzerinde taze çilek dilimi ile şık sunumlu bireysel mono pasta.",
    "imageUrl": "/resimler/pt13/pt13_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Çikolata",
      "Çilek",
      "Tek Kişilik",
      "Glazür",
      "Kafe Tatlısı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C donuk muhafaza ediniz.",
      "Servis Tavsiyesi": "Çözündükten sonra doğrudan servis ediniz."
    }
  },
  {
    "id": "prod-pt13-2",
    "name": "Donuk Antep Fıstıklı Mono Pasta (Fıstık Rüyası)",
    "code": "PST-DNK-MN-PST",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Yoğun Antep fıstıklı ganaj kaplama, hafif bisküvi tabanı ve fıstık taneleriyle süslenmiş gurme tek kişilik pasta.",
    "imageUrl": "/resimler/pt13/pt13_2.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Antep Fıstığı",
      "Fıstık Ganaj",
      "Gurme",
      "Tek Kişilik"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C donuk muhafaza ediniz.",
      "Servis Tavsiyesi": "Taze kahve ve çay ile mükemmel uyum."
    }
  },
  {
    "id": "prod-pt13-3",
    "name": "Donuk Limonlu & Glazürlü Mono Kubbe Pasta",
    "code": "PST-DNK-MN-LIM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Ferahlatıcı limon kreması, parlak sarı ayna glazür kaplama ve nane yaprağı süslemesiyle hafif narenciye mono tatlısı.",
    "imageUrl": "/resimler/pt13/pt13_3.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Limonlu",
      "Kubbe Pasta",
      "Ferahlatıcı",
      "Narenciye"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C'de saklayınız.",
      "Servis Tavsiyesi": "Soğuk servis önerilir."
    }
  },
  {
    "id": "prod-pt13-4",
    "name": "Donuk Orman Meyveli & Ahududulu Mono Pasta (Red Berry)",
    "code": "PST-DNK-MN-RED",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Canlı kırmızı glazür kaplı, taze ahududu meyvesi ve fındık tabanlı mayhoş orman meyveli bireysel mono pasta.",
    "imageUrl": "/resimler/pt13/pt13_4.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Orman Meyveli",
      "Ahududu",
      "Red Berry",
      "Glazür"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C donuk muhafaza ediniz.",
      "Servis Tavsiyesi": "Çözündükten sonra tabak sunumuna hazırdır."
    }
  },
  {
    "id": "prod-pt13-5",
    "name": "Donuk Lotus Bisküvili Karamel Mono Pasta",
    "code": "PST-DNK-MN-LOT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Orijinal Lotus Biscoff karamel ezmesi, baharatlı bisküvi parçaları ve vanilyalı mus dolgulu mono kubbe pasta.",
    "imageUrl": "/resimler/pt13/pt13_5.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Lotus",
      "Biscoff",
      "Karamel",
      "Bisküvili"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C donuk",
      "Servis Tavsiyesi": "Espresso ve filtre kahve yanına tavsiye edilir."
    }
  },
  {
    "id": "prod-pt13-6",
    "name": "Donuk Rocher Fındıklı & Çikolatalı Mono Pasta",
    "code": "PST-DNK-MN-ROC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Kavrulmuş fındık parçacıklı çıtır sütlü çikolata kabuğu, akışkan pralin ve fındık krema dolgulu lüks mono tatlı.",
    "imageUrl": "/resimler/pt13/pt13_6.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Rocher",
      "Fındıklı",
      "Çikolata",
      "Pralin"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C muhafaza ediniz.",
      "Servis Tavsiyesi": "Oda sıcaklığına yakın kıvamda tüketilmesi önerilir."
    }
  },
  {
    "id": "prod-pt13-7",
    "name": "Donuk Karamel Soslu & Kremalı Katlı Dilim Pasta",
    "code": "PST-DNK-DL-CRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Tereyağlı bisküvi tabanı, kat kat ipeksi pastacı kreması ve yoğun akışkan karamel sos kaplamalı hazır dilimli pasta.",
    "imageUrl": "/resimler/pt13/pt13_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Karamel",
      "Kremalı",
      "Kafe Pasta",
      "Porsiyonluk"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C muhafaza",
      "Servis Tavsiyesi": "+4°C'de çözündürünüz."
    }
  },
  {
    "id": "prod-pt13-8",
    "name": "Donuk Antep Fıstıklı & Çikolatalı Katlı Dilim Pasta",
    "code": "PST-DNK-DL-PSTC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Zengin Antep fıstığı kreması ve nemli kakaolu pandispanya katmanlarının uyumuyla hazırlanan dilim pasta.",
    "imageUrl": "/resimler/pt13/pt13_8.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Antep Fıstığı",
      "Çikolata",
      "Katlı Pasta",
      "Gurme"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C donuk",
      "Servis Tavsiyesi": "Çözündükten sonra servis ediniz."
    }
  },
  {
    "id": "prod-pt13-9",
    "name": "Donuk Moka Kahveli & Fındıklı Dilim Pasta",
    "code": "PST-DNK-DL-MOK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Aromatik kahve dolgusu, kavrulmuş fındık parçaları ve yumuşak kahveli pandispanya katmanları içeren dilim pasta.",
    "imageUrl": "/resimler/pt13/pt13_9.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Moka",
      "Kahveli",
      "Fındıklı",
      "Barista"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Sıcak içecekler eşliğinde servis ediniz."
    }
  },
  {
    "id": "prod-pt13-10",
    "name": "Donuk Karaorman Meyveli (Schwarzwalder) Dilim Pasta",
    "code": "PST-DNK-DL-BLF",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Klasik Alman Karaorman pastası; yoğun bitter kakaolu pandispanya, vişne sosu ve beyaz krema katmanları.",
    "imageUrl": "/resimler/pt13/pt13_10.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Karaorman",
      "Vişneli",
      "Schwarzwalder",
      "Çikolata"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Servis öncesi +4°C'de dinlendiriniz."
    }
  },
  {
    "id": "prod-pt13-11",
    "name": "Donuk Çikolatalı & Fındık Parçacıklı Dilim Kek",
    "code": "PST-DNK-DL-CHK-KEK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Yoğun kakaolu kek tabanı, kremamsı çikolata dolgusu ve kıtır fındık kaplamasıyla porsiyonluk hazır dilim kek.",
    "imageUrl": "/resimler/pt13/pt13_11.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilimli Kek",
      "Çikolata",
      "Fındıklı",
      "Kafe Keki",
      "Porsiyonluk"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Oda sıcaklığına gelince servis ediniz."
    }
  },
  {
    "id": "prod-pt13-12",
    "name": "Donuk Geleneksel Çikolatalı Mozaik Pasta Dilimi",
    "code": "PST-DNK-DL-MOZ",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Geleneksel lezzetiyle tereyağlı bisküvi parçaları ve hakiki kakao ganajından üretilen pratik mozaik pasta dilimi.",
    "imageUrl": "/resimler/pt13/pt13_12.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mozaik Pasta",
      "Bisküvili",
      "Çikolata",
      "Geleneksel",
      "Dilimli"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis edilir."
    }
  },
  {
    "id": "prod-pt13-13",
    "name": "Donuk Çilekli Mono Box Magnolia & Kutu Pasta",
    "code": "PST-DNK-BX-STR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Özel şeffaf kutusunda, taze çilek sosu, ufalanmış bebe bisküvisi ve kadife magnolia kreması içeren kutu tatlısı.",
    "imageUrl": "/resimler/pt13/pt13_13.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Kutu Pasta",
      "Mono Box",
      "Magnolia",
      "Çilekli",
      "Paket Servis"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box (Kutulu)",
      "Ambalaj": "Koli / Kutu (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kutusunda pratik kaşıkla tüketime hazır."
    }
  },
  {
    "id": "prod-pt13-14",
    "name": "Donuk Oreo & Çikolatalı Mono Box Kutu Pasta",
    "code": "PST-DNK-BX-OREO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Şeffaf kutuda Oreo bisküvi kırıntıları, çift katmanlı çikolata ganajı ve vanilyalı pürüzsüz krema.",
    "imageUrl": "/resimler/pt13/pt13_14.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Kutu Pasta",
      "Mono Box",
      "Oreo",
      "Çikolata",
      "Kafe Tatlısı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis yapınız."
    }
  },
  {
    "id": "prod-pt13-15",
    "name": "Donuk Lotus Biscoff Mono Box Kutu Pasta",
    "code": "PST-DNK-BX-LOT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Bütün Lotus bisküvi taçlandırması, karamelize bisküvi ezmesi ve ipeksi tatlı kremasıyla hazırlanan popüler kutu tatlı.",
    "imageUrl": "/resimler/pt13/pt13_15.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Kutu Pasta",
      "Mono Box",
      "Lotus Biscoff",
      "Karamel",
      "Magnolia"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kendi kutusunda veya tabakta sunulabilir."
    }
  },
  {
    "id": "prod-pt13-16",
    "name": "Donuk Çikolatalı Kubbe Rulo Dilim Pasta (D-Kek)",
    "code": "PST-DNK-DL-KUB",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Kubbe formunda yoğun kakaolu nemli kek, çikolata kaplama ve rende çikolata talaşlarıyla bezenmiş porsiyonluk pasta.",
    "imageUrl": "/resimler/pt13/pt13_16.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Kubbe Kek",
      "D-Kek",
      "Çikolata",
      "Rulo Pasta"
    ],
    "specs": {
      "Porsiyon": "Porsiyonluk Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kahve eşliğinde servis ediniz."
    }
  },
  {
    "id": "prod-pt13-17",
    "name": "Donuk Orman Meyveli & Crumble Cheesecake Dilimi",
    "code": "PST-DNK-DL-CRM-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Fırınlanmış tereyağlı çıtır crumble (kırıntı) üst katmanı, taze yaban mersini dolgusu ve kremsi cheesecake dokusu.",
    "imageUrl": "/resimler/pt13/pt13_17.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Crumble",
      "Orman Meyveli",
      "Kırıntılı",
      "Dilimli"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "+4°C dolapta çözündükten sonra servis ediniz."
    }
  },
  {
    "id": "prod-pt13-18",
    "name": "Donuk Çikolata Dolgulu Cookie Turta (Cookie Pie) Dilimi",
    "code": "PST-DNK-DL-CKP",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Amerikan tarzı dev kurabiye hamuru arasında akışkan çikolata kreması dolgulu gurme Cookie Pie dilimi.",
    "imageUrl": "/resimler/pt13/pt13_18.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cookie Pie",
      "Kurabiye Turta",
      "Çikolata Dolgulu",
      "Ilık Tatlı",
      "Kafe"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "Mikrodalgada 20-30 sn veya +4°C dolapta 1 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Hafif ısıtılarak vanilyalı dondurma ile servis önerilir."
    }
  },
  {
    "id": "prod-pt13-19",
    "name": "Donuk Çilekli & Antep Fıstıklı Mono Cheesecake",
    "code": "PST-DNK-MN-STR-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Bireysel yuvarlak formda bisküvi tabanı, fırın cheesecake dolgusu, çilek marmelatı ve beyaz çikolata süslemesi.",
    "imageUrl": "/resimler/pt13/pt13_19.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Cheesecake",
      "Çilekli",
      "Antep Fıstıklı",
      "Tek Kişilik"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Cheesecake",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt13-20",
    "name": "Donuk Dubai Kadayıflı & Fıstıklı Mono Küre Pasta",
    "code": "PST-DNK-MN-DUB-KAD",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Dışı tereyağında kavrulmuş çıtır tel kadayıfla kaplı, içi yoğun Antep fıstığı ezmeli krema ve çikolata dolgulu trend Dubai küre pasta.",
    "imageUrl": "/resimler/pt13/pt13_20.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Dubai Çikolatası",
      "Kadayıflı",
      "Antep Fıstığı",
      "Küre Pasta",
      "Trend"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Küre",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Özel altın altlığı ile doğrudan servise hazırdır."
    }
  },
  {
    "id": "prod-pt14-1",
    "name": "Donuk İtalyan Tiramisu Üçgen Dilim Pasta",
    "code": "PST-DNK-DL-TIR-TRI",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Espresso şurubuyla ıslatılmış yumuşacık pandispanya katları, zengin mascarpone peynirli krema ve yoğun kakao tozu.",
    "imageUrl": "/resimler/pt14/pt14_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Tiramisu",
      "İtalyan",
      "Kahveli",
      "Dilimli Pasta",
      "Mascarpone"
    ],
    "specs": {
      "Porsiyon": "Hazır Üçgen Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt14-2",
    "name": "Donuk Frambuazlı & Beyaz Çikolatalı Dilim Pasta",
    "code": "PST-DNK-DL-FRM-WHT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Kakaolu pandispanya katları arasında ipeksi beyaz çikolata kreması ve üstte bol taze frambuaz jölesi.",
    "imageUrl": "/resimler/pt14/pt14_2.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Frambuazlı",
      "Beyaz Çikolata",
      "Orman Meyveli",
      "Pastane"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Çözündükten sonra servis ediniz."
    }
  },
  {
    "id": "prod-pt14-3",
    "name": "Donuk Böğürtlenli & Mor Glazürlü Mono Kubbe Pasta",
    "code": "PST-DNK-MN-BGR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Mor orman meyveli ayna glazür kaplama, hindistan cevizi işlemeli etek, böğürtlen mus dolgulu tek kişilik zarif kubbe pasta.",
    "imageUrl": "/resimler/pt14/pt14_3.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Böğürtlenli",
      "Glazür",
      "Kubbe Pasta",
      "Orman Meyvesi"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Kubbe",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis önerilir."
    }
  },
  {
    "id": "prod-pt14-4",
    "name": "Donuk Kare Porsiyon İtalyan Tiramisu",
    "code": "PST-DNK-SQ-TIR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Kare kesim modern formuyla espresso aromalı kedidili bisküvi, mascarpone mus ve kakao örtüsüyle hazırlanmış tiramisu.",
    "imageUrl": "/resimler/pt14/pt14_4.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Tiramisu",
      "Kare Dilim",
      "İtalyan",
      "Kahveli",
      "Kafe"
    ],
    "specs": {
      "Porsiyon": "Bireysel Kare Porsiyon",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "+4°C dolapta dinlendirip servis ediniz."
    }
  },
  {
    "id": "prod-pt14-5",
    "name": "Donuk Geleneksel Ballı Medovik Dilim Pasta",
    "code": "PST-DNK-DL-MED",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Geleneksel Rus tarifine sadık, incecik karamelize ballı bisküvi yaprakları ve hafif ekşi krema katmanlı gurme Medovik pasta.",
    "imageUrl": "/resimler/pt14/pt14_5.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Medovik",
      "Bal Pastası",
      "Ballı",
      "Rus Pastası",
      "Dilimli"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Sıcak çay veya filtre kahve eşliğinde mükemmel lezzet."
    }
  },
  {
    "id": "prod-pt14-6",
    "name": "Donuk Frambuazlı & Egzotik Meyveli Mono Parfe",
    "code": "PST-DNK-MN-PRF-1",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Yivli pembe parfe gövdesi, üzerinde donuk böğürtlen, frambuaz ve mango küpleri bulunan ferahlatıcı dondurmalı tatlı.",
    "imageUrl": "/resimler/pt14/pt14_6.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Parfe",
      "Frambuazlı",
      "Semifreddo",
      "Dondurmalı Tatlı",
      "Meyveli"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Parfe",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "Servisten 10-15 dk önce buzluktan çıkarınız",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C donuk muhafaza",
      "Servis Tavsiyesi": "Yarı donuk (semifreddo) olarak servis edilir."
    }
  },
  {
    "id": "prod-pt14-7",
    "name": "Donuk Orman Meyveli Çiçek Desenli Mono Parfe",
    "code": "PST-DNK-MN-PRF-2",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Kristalize orman meyveleriyle taçlandırılmış, pembe meyve kremalı özel formlu mono parfe tatlısı.",
    "imageUrl": "/resimler/pt14/pt14_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Parfe",
      "Orman Meyveli",
      "Çiçek Formu",
      "Semifreddo",
      "Donuk Tatlı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Parfe",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "Servis öncesi 10 dk oda sıcaklığında dinlendirin",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Yarı donuk servis tavsiye edilir."
    }
  },
  {
    "id": "prod-pt14-8",
    "name": "Donuk Karışık Meyveli Silindir Mono Parfe",
    "code": "PST-DNK-MN-PRF-3",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Meyve taneleri, taze süt kreması ve frambuaz püresiyle hazırlanan silindirik formlu soğuk mono parfe.",
    "imageUrl": "/resimler/pt14/pt14_8.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Parfe",
      "Meyveli",
      "Silindir Parfe",
      "Donuk Tatlı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "10-15 dakika",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk / donuk tüketim."
    }
  },
  {
    "id": "prod-pt14-9",
    "name": "Donuk Yaban Mersinli (Blueberry) Cheesecake Dilimi",
    "code": "PST-DNK-DL-BLU-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "New York stili fırınlanmış peynir dolgusu, tereyağlı bisküvi tabanı ve üstte tane yaban mersini soslu nefis cheesecake dilimi.",
    "imageUrl": "/resimler/pt14/pt14_9.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Yaban Mersinli",
      "Blueberry",
      "Dilimli Pasta",
      "Kafe"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 3-4 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "+4°C'de çözündürerek soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt14-10",
    "name": "Donuk Kahve Çekirdeği Şekilli Mono Mousse Pasta",
    "code": "PST-DNK-MN-COF-BEAN",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Gerçek kahve çekirdeği görünümünde, espresso aromalı bitter çikolata ganajı ve kahveli mus dolgulu özel tasarım mono tatlı.",
    "imageUrl": "/resimler/pt14/pt14_10.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Kahve Çekirdeği",
      "Espresso",
      "Mousse",
      "Çikolata",
      "Özel Tasarım"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Özel Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Nitelikli kahve sunumları için idealdir."
    }
  },
  {
    "id": "prod-pt14-11",
    "name": "Donuk Bitter Çikolata & Fıstık Kaplı Baton Mono Kek",
    "code": "PST-DNK-MN-BAT-CHOC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Rocher çikolata kaplamalı, fıstık dokunuşlu, içi nemli çikolatalı brownie ve krema dolgulu dikdörtgen baton mono kek.",
    "imageUrl": "/resimler/pt14/pt14_11.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Baton Kek",
      "Mono Kek",
      "Bitter Çikolata",
      "Fıstıklı",
      "Snack Kek"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Baton Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Doğrudan servise uygundur."
    }
  },
  {
    "id": "prod-pt14-12",
    "name": "Donuk Gökkuşağı (Rainbow) Katlı Dilim Pasta",
    "code": "PST-DNK-DL-RNB",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Rengarenk pandispanya katları, hafif vanilyalı süt kreması ve üzeri fıstık-bisküvi kırıntılarıyla neşeli dilim pasta.",
    "imageUrl": "/resimler/pt14/pt14_12.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Rainbow",
      "Gökkuşağı",
      "Katlı Pasta",
      "Renkli Pasta",
      "Dilimli"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2-3 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Servis öncesi +4°C'de dinlendiriniz."
    }
  },
  {
    "id": "prod-pt14-13",
    "name": "Donuk Karamelli & Krokantlı Dilim Pasta",
    "code": "PST-DNK-DL-CRM-KROK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Karamel kreması, çıtır fındık krokant parçacıkları ve yumuşacık pandispanya katmanlarıyla zengin dilim pasta.",
    "imageUrl": "/resimler/pt14/pt14_13.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Karamel",
      "Krokant",
      "Fındıklı",
      "Kafe Tatlısı"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "+4°C'de çözündükten sonra servis ediniz."
    }
  },
  {
    "id": "prod-pt14-14",
    "name": "Donuk Oreo & Karamel Kremalı Mono Pasta",
    "code": "PST-DNK-MN-OREO-CRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Siyah Oreo bisküvi tabanı, karamel mousse, çırpılmış vanilya kreması ve bütün Oreo bisküvisiyle tek kişilik mono tatlı.",
    "imageUrl": "/resimler/pt14/pt14_14.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Oreo",
      "Karamel",
      "Bisküvili",
      "Tek Kişilik"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Yuvarlak Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis önerilir."
    }
  },
  {
    "id": "prod-pt14-15",
    "name": "Donuk Antep Fıstıklı & Ganajlı Mono Pasta",
    "code": "PST-DNK-MN-PST-GNJ",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Doğal yeşil fıstıklı pandispanya, yoğun çikolata ganaj tabakası ve fıstıklı krem şantiyle süslenmiş mono pasta.",
    "imageUrl": "/resimler/pt14/pt14_15.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Antep Fıstığı",
      "Ganaj",
      "Çikolata",
      "Gurme"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Pasta",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kahve yanına servis ediniz."
    }
  },
  {
    "id": "prod-pt14-16",
    "name": "Donuk Fıstıklı & Çikolata Kremalı Mini Mono Pasta",
    "code": "PST-DNK-MN-PST-MINI",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Fıstık tozu kaplamalı kenarlar, çikolatalı ipeksi mousse ve fıstık draje detaylı butik mono tatlı.",
    "imageUrl": "/resimler/pt14/pt14_16.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Pasta",
      "Mini Pasta",
      "Fıstıklı",
      "Çikolatalı",
      "Butik"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Butik Mono",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "+4°C'de servis ediniz."
    }
  },
  {
    "id": "prod-pt14-17",
    "name": "Donuk Çikolatalı Kadife Mousse Dilim Pasta",
    "code": "PST-DNK-DL-CHOC-VLV",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Kadife kakaolu sünger katmanları, yoğun çikolatalı ipeksi mousse dolgusu ve toz çikolata örtülü dilim pasta.",
    "imageUrl": "/resimler/pt14/pt14_17.png",
    "isActive": true,
    "isFeatured": false,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilimli Pasta",
      "Çikolata",
      "Mousse",
      "Kadife",
      "Kakaolu"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Servis öncesi dolapta dinlendiriniz."
    }
  },
  {
    "id": "prod-pt14-18",
    "name": "Donuk Yoğun Çikolatalı Mono Box Mousse Tatlısı",
    "code": "PST-DNK-BX-CHOC-MSS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Özel şeffaf kutusunda, çift kademeli bitter ve sütlü çikolata mus, akışkan ganaj ve rende çikolata talaşları.",
    "imageUrl": "/resimler/pt14/pt14_18.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Kutu Tatlısı",
      "Mono Box",
      "Çikolata Mousse",
      "Bitter",
      "Yoğun Lezzet"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kutusunda pratik kaşık servisine uygundur."
    }
  },
  {
    "id": "prod-pt14-19",
    "name": "Donuk Orman Meyveli & Kadife Mono Box Kutu Pasta",
    "code": "PST-DNK-BX-FRM-MSS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Red velvet kek kırıntıları, taze orman meyvesi marmelatı ve beyaz vanilyalı krema katmanlı kutu mono tatlı.",
    "imageUrl": "/resimler/pt14/pt14_19.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Kutu Pasta",
      "Mono Box",
      "Orman Meyveli",
      "Red Velvet",
      "Magnolia"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt14-20",
    "name": "Donuk Profiterollü & Supangle Mono Box Tatlısı",
    "code": "PST-DNK-BX-PRO-SUP",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pasta & Unlu Mamuller",
    "categorySlug": "donuk-pasta",
    "description": "Kutu içerisinde geleneksel vanilya kreması, koyu çikolatalı supangle sosu, çıtır fıstık ve çikolata rendeli tatlı şöleni.",
    "imageUrl": "/resimler/pt14/pt14_20.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Kutu Tatlısı",
      "Mono Box",
      "Supangle",
      "Profiterol",
      "Çikolata Sos"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kendi kutusunda kaşıkla servise hazır."
    }
  }
];

export const PRODUCTS: Product[] = (RAW_PRODUCTS as any[]).map((p: any, index: number) => ({
  id: p.id,
  name: p.name,
  code: p.code,
  codeGroup: p.codeGroup || "",
  categoryId: p.categoryId,
  categoryName: p.categoryName,
  categorySlug: p.categorySlug,
  description: p.description,
  imageUrl: p.imageUrl,
  isActive: p.isActive !== false,
  isFeatured: Boolean(p.isFeatured),
  price: p.price ?? 0,
  vatRate: p.vatRate ?? 20,
  order: index + 1,
  tags: p.tags ?? [],
  specs: (p.specs ?? {}) as Record<string, string>,
}));

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductByCode(code: string): Product | undefined {
  return PRODUCTS.find((p) => p.code.toLowerCase() === code.toLowerCase());
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug && p.isActive);
}

export function getRelatedProducts(productOrId: string | Product, limit = 4): Product[] {
  const current = typeof productOrId === "string" ? getProductById(productOrId) : productOrId;
  if (!current) return PRODUCTS.slice(0, limit);
  return PRODUCTS.filter(
    (p) =>
      p.id !== current.id &&
      p.isActive &&
      (p.categoryId === current.categoryId || p.categorySlug === current.categorySlug)
  ).slice(0, limit);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isFeatured && p.isActive);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return PRODUCTS.filter((p) => p.isActive);
  return PRODUCTS.filter(
    (p) =>
      p.isActive &&
      (p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.codeGroup.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)))
  );
}
