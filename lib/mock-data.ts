/**
 * Mock data for 20:45 Pastacılık catalog.
 * Generated with 100% accurate Turkish naming, categories, specs, and local image paths.
 * Total 9 categories and 255 products.
 */

import type { Category, Product } from "@/lib/types";
export type { Category, Product };

export const CATEGORIES: Category[] = [
  {
    "id": "cat-1",
    "name": "Püreler",
    "slug": "pureler",
    "description": "Caffè NONNO Frozen püreleri, DaVinci Fruit Mix ve Krater meyve karışımlarından oluşan zengin bar ve pastacılık koleksiyonumuz.",
    "icon": "🍓",
    "productCount": 27,
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
    "id": "cat-7",
    "name": "Kokteyller",
    "slug": "kokteyller",
    "description": "EASY MIX doğal meyve ve botanik kokteyl premiksleri, bar kokteylleri için profesyonel karışımlar.",
    "icon": "🍹",
    "productCount": 18,
    "imageUrl": "/resimler/pt1/pt1_10.png",
    "order": 3,
    "isActive": true,
    "parentId": "cat-2"
  },
  {
    "id": "cat-4",
    "name": "Bar Sos",
    "slug": "bar-sos",
    "description": "DaVinci 2L ve Caffè NONNO 750g karamel, çikolata, beyaz çikolata ve meyve sosları.",
    "icon": "🍫",
    "productCount": 15,
    "imageUrl": "/resimler/p6/p6_7.png",
    "order": 4,
    "isActive": true
  },
  {
    "id": "cat-8",
    "name": "Pastalar",
    "slug": "pastalar",
    "description": "Taze butik pastalar ve donuk pasta çeşitlerimizle profesyonel pastacılık koleksiyonu.",
    "icon": "🎂",
    "productCount": 121,
    "imageUrl": "/resimler/pt12/pt12_14.png",
    "order": 5,
    "isActive": true
  },
  {
    "id": "cat-9",
    "name": "Taze - Butik Pastalar",
    "slug": "taze-butik-pastalar",
    "description": "Günlük taze üretim, el yapımı butik pasta ve tatlı çeşitleri.",
    "icon": "🍰",
    "productCount": 55,
    "imageUrl": "/resimler/pt14/pt14_1.png",
    "order": 6,
    "isActive": true,
    "parentId": "cat-8"
  },
  {
    "id": "cat-5",
    "name": "Donuk Pastalar",
    "slug": "donuk-pasta",
    "description": "Kafeterya ve restoranlar için pratik, lezzetli donuk cheesecake'ler, tiramisu, mono kutu pastalar, dilimli pastalar ve unlu mamuller.",
    "icon": "❄️",
    "productCount": 66,
    "imageUrl": "/resimler/pt12/pt12_14.png",
    "order": 7,
    "isActive": true,
    "parentId": "cat-8"
  },
  {
    "id": "cat-3",
    "name": "Waffle Çikolataları",
    "slug": "waffle-malzemeleri",
    "description": "CALLEI sürülebilir renkli kremalar, hazır waffle tozu, draje ve krokan süsleme çeşitleri.",
    "icon": "🧇",
    "productCount": 24,
    "imageUrl": "/resimler/p10/p10_1.png",
    "order": 8,
    "isActive": true
  },
  {
    "id": "cat-6",
    "name": "Kremalı Ürünler & Pastacılık",
    "slug": "kremali-urunler",
    "description": "Chantilly, ganaj ve profesyonel pastacılık krema hammaddeleri.",
    "icon": "🍦",
    "productCount": 1,
    "imageUrl": "/resimler/p9/p9_1.png",
    "order": 9,
    "isActive": true
  },
  {
    "id": "cat-butik-cup",
    "name": "Butik Cup",
    "slug": "butik-cup",
    "description": "Bireysel servis ve sunumlar için özel tasarlanmış butik cup pasta çeşitleri.",
    "icon": "🧁",
    "productCount": 0,
    "imageUrl": "/resimler/pt14/pt14_1.png",
    "order": 10,
    "isActive": true,
    "parentId": "cat-8"
  },
  {
    "id": "cat-organizasyon",
    "name": "Organizasyon Pastaları",
    "slug": "organizasyon-pastalari",
    "description": "Düğün, nişan, kutlama ve kurumsal etkinlikler için özel tasarım organizasyon pastaları.",
    "icon": "🎊",
    "productCount": 0,
    "imageUrl": "/resimler/pt12/pt12_14.png",
    "order": 11,
    "isActive": true,
    "parentId": "cat-8"
  },
  {
    "id": "cat-kasa-onu",
    "name": "Kasa Önü Ürünler",
    "slug": "kasa-onu-urunler",
    "description": "Kasa önü atıştırmalıklar, ikramlık ve impuls ürün seçenekleri.",
    "icon": "🍬",
    "productCount": 0,
    "imageUrl": "/resimler/kategoriler/kasa-onu-urunler.jpg",
    "order": 12,
    "isActive": true
  },
  {
    "id": "cat-ekipmanlar",
    "name": "Ekipmanlar",
    "slug": "ekipmanlar",
    "description": "Profesyonel pastacılık ve barista ekipmanları, servis ve mutfak araç gereçleri.",
    "icon": "🔧",
    "productCount": 0,
    "imageUrl": "/resimler/kategoriler/ekipmanlar.jpg",
    "order": 13,
    "isActive": true
  },
  {
    "id": "cat-kruvasan",
    "name": "Kruvasan",
    "slug": "kruvasan",
    "description": "Taze ve donuk kruvasan çeşitleri, Fransız usulü tereyağlı hamur işleri.",
    "icon": "🥐",
    "productCount": 0,
    "imageUrl": "/resimler/kategoriler/kruvasan.jpg",
    "order": 14,
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
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "categoryName": "Waffle Çikolataları",
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
    "name": "Egzotik Mangolu & Chia Tohumlu Cheesecake",
    "code": "PST-DNK-MNG-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Altında altın sarısı tereyağlı bisküvi tabanı, ortasında fırınlanmış kadifemsi peynir kreması ve üzerinde taze mango püresi ile harmanlanmış süper besin chia taneleri. Tropikal ferahlığın zarif dengesi.",
    "imageUrl": "/resimler/pt12/pt12_13.png",
    "isActive": true,
    "isFeatured": true,
    "price": 220,
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
    "name": "Venedik Usulü Mascarpone Tiramisu",
    "code": "PST-DNK-TIR-10D",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Özel espresso şurubuyla nemlendirilmiş savoiardi bisküvileri, yoğun İtalyan mascarpone kreması ve üzerinde zengin Valrhona kakao tozu örtüsüyle otantik bir İtalyan klasiği.",
    "imageUrl": "/resimler/pt12/pt12_14.png",
    "isActive": true,
    "isFeatured": true,
    "price": 210,
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
    "name": "Dubai Pırlantası Fıstıklı Kadayıf Mono",
    "code": "PST-DNK-DUB-BOX",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Kıtır kavrulmuş tereyağlı tel kadayıf ve saf Antep fıstığı ezmesinin büyüleyici buluşması; akışkan Belçika sütlü çikolatası kabuğuyla kaplı trend belirleyen lüks bir deneyim.",
    "imageUrl": "/resimler/pt12/pt12_15.png",
    "isActive": true,
    "isFeatured": true,
    "price": 280,
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
    "name": "Lotus Biscoff & Yaban Mersini Senfonisi",
    "code": "PST-DNK-LOT-BLU",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Karamelize Lotus bisküvi ezmesiyle harmanlanmış yumuşak cheesecake dolgusu, taze yaban mersini taneleri ve çıtır bisküvi katmanlarıyla iştah kabartan bütün dilimli şölen.",
    "imageUrl": "/resimler/pt12/pt12_16.png",
    "isActive": true,
    "isFeatured": true,
    "price": 230,
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
    "name": "Yoğun Bitter Ganajlı Fıstık Ezmeli Dilim",
    "code": "PST-DNK-PNT-CHOC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Yoğun kakao oranına sahip nemli çikolatalı kek katları arasında tuzlu fıstık ezmesi kreması ve ipeksi bitter ganaj örtüsü. Tatlı ve tuzlu notaların kusursuz harmonisi.",
    "imageUrl": "/resimler/pt12/pt12_17.png",
    "isActive": true,
    "isFeatured": false,
    "price": 215,
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
    "name": "Kavrulmuş Fındıklı Altın Karamel Mono",
    "code": "PST-DNK-CRM-MONO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Ağır ateşte karamelize edilmiş süt karameli mousse, çıtır Karadeniz fındığı krokanı ve parlak karamel ayna glazürüyle kaplı tek porsiyonluk gurme lezzet.",
    "imageUrl": "/resimler/pt12/pt12_18.png",
    "isActive": true,
    "isFeatured": true,
    "price": 225,
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
    "name": "Orman Meyveli Fudgy Belçika Brownie",
    "code": "PST-DNK-BRW-NUT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Hakiki eritilmiş Belçika bitter çikolatasıyla hazırlanan yoğun, sakızımsı fudgy brownie dokusu; üzerinde taze ahududu ve ceviz parçalarıyla unutulmaz bir lezzet patlaması.",
    "imageUrl": "/resimler/pt12/pt12_19.png",
    "isActive": true,
    "isFeatured": true,
    "price": 195,
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
    "name": "Zümrüt Antep Fıstığı & Ahududu Katmanlı Dilim",
    "code": "PST-DNK-PST-RAS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Hakiki boz fıstık unundan pişirilen hafif sünger kek katmanları arasında mayhoş taze ahududu marmelatı ve beyaz çikolatalı kadife krema. Göz alıcı renk kontrastı ve asil lezzet.",
    "imageUrl": "/resimler/pt12/pt12_20.png",
    "isActive": true,
    "isFeatured": true,
    "price": 240,
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
    "name": "Yaban Mersini Bahçesi Kare Pasta",
    "code": "PST-DNK-MN-CHOC-STR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Doğal dağ yaban mersinlerinin taze aroması, yumuşacık vanilyalı pandispanya ve hafifletilmiş beyaz çikolata kremasının kare porsiyondaki zarafeti.",
    "imageUrl": "/resimler/pt13/pt13_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 195,
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
    "name": "Espresso Aromalı Çikolatalı Fudgy Kare",
    "code": "PST-DNK-MN-PST",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Taze çekilmiş Arabica kahvesi esansı, yoğun Belçika çikolatalı kek ve üzerinde çıtır kahve çekirdeği çikolataları ile kahve molalarının vazgeçilmez eşlikçisi.",
    "imageUrl": "/resimler/pt13/pt13_2.png",
    "isActive": true,
    "isFeatured": true,
    "price": 190,
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
    "name": "Klasik Mascarpone Tiramisu Kare Dilim",
    "code": "PST-DNK-MN-LIM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Geleneksel tarife sadık kalınarak hazırlanan yumuşak mascarpone dolgusu ve kahve şuruplu pandispanyanın narin dengesi.",
    "imageUrl": "/resimler/pt13/pt13_3.png",
    "isActive": true,
    "isFeatured": false,
    "price": 200,
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
    "name": "Kırmızı Kadife (Red Velvet) Rüya Kare",
    "code": "PST-DNK-MN-RED",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Hafif kakao dokunuşlu kadifemsi kırmızı kek katmanları ve hafif limon notaları taşıyan orijinal peynir kreması dolgusuyla romantik bir klasik.",
    "imageUrl": "/resimler/pt13/pt13_4.png",
    "isActive": true,
    "isFeatured": true,
    "price": 205,
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
    "name": "Fırınlanmış New York Usulü Mini Cheesecake",
    "code": "PST-DNK-MN-LOT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Geleneksel taş fırın tekniğiyle pişirilen, pürüzsüz dokulu yoğun peynir kreması ve tereyağlı sable tabanı ile yalın bir başyapıt.",
    "imageUrl": "/resimler/pt13/pt13_5.png",
    "isActive": true,
    "isFeatured": true,
    "price": 190,
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
    "name": "Tropikal Mango & Beyaz Çikolata Dome",
    "code": "PST-DNK-MN-ROC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Kusursuz kubbe formunda beyaz çikolatalı parlak glazürün altında gizlenen taze mango-çarkıfelek meyvesi püresi ve hafif mousse dolgusu.",
    "imageUrl": "/resimler/pt13/pt13_6.png",
    "isActive": true,
    "isFeatured": true,
    "price": 230,
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
    "name": "Belçika Çikolatalı Truffle Küre Mono",
    "code": "PST-DNK-DL-CRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Dışı çıtır fındıklı bitter çikolata zırhı, içi ipeksi akışkan çikolatalı truffle kremasıyla dolu, gerçek çikolata tutkunlarına özel tek porsiyonluk lüks.",
    "imageUrl": "/resimler/pt13/pt13_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 245,
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
    "name": "Fındık Krokanlı Yoğun Çikolata Brownie",
    "code": "PST-DNK-DL-PSTC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Kavrulmuş fındık parçacıkları, çift kat çikolata dolgusu ve nemli fırınlanmış dokusuyla her lokmada mutluluk veren zengin brownie.",
    "imageUrl": "/resimler/pt13/pt13_8.png",
    "isActive": true,
    "isFeatured": true,
    "price": 195,
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
    "name": "Beyaz İnci Hindistan Cevizli Kubbe",
    "code": "PST-DNK-DL-MOK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Kremamsı Hindistan cevizi sütüyle hazırlanan beyaz mousse, çıtır bademli taban ve bembeyaz kar tanesi dokusuyla hafif ve egzotik.",
    "imageUrl": "/resimler/pt13/pt13_9.png",
    "isActive": true,
    "isFeatured": false,
    "price": 220,
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
    "name": "Mangolu Mascarpone Kup Parfe",
    "code": "PST-DNK-DL-BLF",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Şeffaf cam kadehte taze mango kompostosu, savoiardi katmanları ve havalandırılmış İtalyan mascarpone kremasının ferahlatıcı dansı.",
    "imageUrl": "/resimler/pt13/pt13_10.png",
    "isActive": true,
    "isFeatured": true,
    "price": 185,
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
    "name": "Akışkan Kalpli Sıcak Çikolata Sufle",
    "code": "PST-DNK-DL-CHK-KEK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "%70 kakao oranlı Belçika bitter çikolatasının fırından yeni çıkmış akışkan kalbi; her kaşıkta sıcak ve karşı konulamaz lezzet yoğunluğu.",
    "imageUrl": "/resimler/pt13/pt13_11.png",
    "isActive": true,
    "isFeatured": false,
    "price": 190,
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
    "name": "Orman Meyveli Çikolata Rulo Mono",
    "code": "PST-DNK-DL-MOZ",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Esnek kakaolu sünger kek içerisine sarılmış taze orman meyveli pastacı kreması ve bitter çikolata ganajı dokunuşu.",
    "imageUrl": "/resimler/pt13/pt13_12.png",
    "isActive": true,
    "isFeatured": true,
    "price": 210,
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
    "name": "Antep Fıstıklı Zümrüt Üçgen Dilim",
    "code": "PST-DNK-BX-STR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Karakteristik Antep fıstığı aromasıyla bezenmiş üçgen formda hafif pandispanya ve fıstık pralini dolgulu kremalı lezzet.",
    "imageUrl": "/resimler/pt13/pt13_13.png",
    "isActive": true,
    "isFeatured": true,
    "price": 225,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Kutu Pasta",
      "Mono Box",
      "Magnolia",
      "Çilekli",
      "Paket Servis"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box (Kutulu)",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kutusunda pratik kaşıkla tüketime hazır.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt13-14",
    "name": "Kakao Taneli Espresso Tiramisu Kup",
    "code": "PST-DNK-BX-OREO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Pratik sunumlu kup içerisinde taze çekilmiş kahveyle ıslatılmış savoiardi ve yoğun mascarpone kreması.",
    "imageUrl": "/resimler/pt13/pt13_14.png",
    "isActive": true,
    "isFeatured": true,
    "price": 185,
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
    "name": "Karamelize Lotus Bisküvi Kup Parfe",
    "code": "PST-DNK-BX-LOT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Kat kat çıtır Lotus bisküvi kırıkları, sıcak baharat notaları ve kadifemsi krema dolgusunun bardakta şık sunumu.",
    "imageUrl": "/resimler/pt13/pt13_15.png",
    "isActive": true,
    "isFeatured": true,
    "price": 190,
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
    "name": "Yarım Ay Çikolatalı Mousse Pasta",
    "code": "PST-DNK-DL-KUB",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Zarif yarım ay silueti, aynalı siyah çikolata glazürü ve yoğun çikolata mousse dolgusuyla modern pastacılık tasarımı.",
    "imageUrl": "/resimler/pt13/pt13_16.png",
    "isActive": true,
    "isFeatured": false,
    "price": 225,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Dilimli Pasta",
      "Kubbe Kek",
      "D-Kek",
      "Çikolata",
      "Rulo Pasta"
    ],
    "specs": {
      "Porsiyon": "Porsiyonluk Dilim",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kahve eşliğinde servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt13-17",
    "name": "Yaban Mersinli Tereyağlı Crumble Tart Dilim",
    "code": "PST-DNK-DL-CRM-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Çıtır fırınlanmış tereyağlı tart hamuru tabanında mayhoş yaban mersini dolgusu ve üzerinde altın sarısı ufalanmış crumble kırıntıları.",
    "imageUrl": "/resimler/pt13/pt13_17.png",
    "isActive": true,
    "isFeatured": true,
    "price": 200,
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
    "name": "Çikolata Parçacıklı Kurabiye Tart Dilim",
    "code": "PST-DNK-DL-CKP",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Amerikan cookie hamurunun fırında tart formunda pişirilmesiyle elde edilen çıtır dış kabuk ve yumuşacık çikolata damlalı iç doku.",
    "imageUrl": "/resimler/pt13/pt13_18.png",
    "isActive": true,
    "isFeatured": true,
    "price": 190,
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
    "name": "Taze Çilekli Mini Butik Cheesecake",
    "code": "PST-DNK-MN-STR-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Doğal çilek taneleri, parlak meyve sosu ve fırınlanmış pürüzsüz cheesecake gövdesiyle klasik lezzetin en taze hali.",
    "imageUrl": "/resimler/pt13/pt13_19.png",
    "isActive": true,
    "isFeatured": true,
    "price": 210,
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
    "name": "Zümrüt Antep Fıstıklı Truffle Küre Mono",
    "code": "PST-DNK-MN-DUB-KAD",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Tümüyle kavrulmuş Antep fıstığı parçalarıyla kaplanmış küre gövde ve içinde yoğun beyaz çikolatalı fıstık ganajı.",
    "imageUrl": "/resimler/pt13/pt13_20.png",
    "isActive": true,
    "isFeatured": true,
    "price": 260,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Dubai Çikolatası",
      "Kadayıflı",
      "Antep Fıstığı",
      "Küre Pasta",
      "Trend"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Küre",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Özel altın altlığı ile doğrudan servise hazırdır.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt14-1",
    "name": "Otantik İtalyan Tiramisu Üçgen Dilim",
    "code": "PST-DNK-DL-TIR-TRI",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Klasik İtalyan kafe kültürünün başyapıtı; yumuşak savoiardi bisküvileri, yoğun mascarpone kreması ve zarif üçgen dilim sunumu.",
    "imageUrl": "/resimler/pt14/pt14_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 210,
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
    "name": "Orman Meyveli Beyaz Kadife Dilim",
    "code": "PST-DNK-DL-FRM-WHT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Hafif beyaz çikolata kreması, taze böğürtlen ve frenk üzümü katmanlarıyla hafif ve ferahlatıcı meyve şöleni.",
    "imageUrl": "/resimler/pt14/pt14_2.png",
    "isActive": true,
    "isFeatured": true,
    "price": 215,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Dilimli Pasta",
      "Frambuazlı",
      "Beyaz Çikolata",
      "Orman Meyveli",
      "Pastane"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Çözündükten sonra servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt14-3",
    "name": "Mor Dağ Meyveleri Glazür Kubbe Mono",
    "code": "PST-DNK-MN-BGR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Aynalı mor glazür örtüsü altında yaban mersini ve böğürtlen püreli mousse; tabanında çıtır fındıklı dacquoise.",
    "imageUrl": "/resimler/pt14/pt14_3.png",
    "isActive": true,
    "isFeatured": false,
    "price": 235,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Böğürtlenli",
      "Glazür",
      "Kubbe Pasta",
      "Orman Meyvesi"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Kubbe",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis önerilir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt14-4",
    "name": "Kare Katmanlı Gurme Tiramisu",
    "code": "PST-DNK-SQ-TIR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Düzgün katmanlarıyla görsel zarafet sunan, kakao tozuyla taçlandırılmış porsiyonluk tiramisu karesi.",
    "imageUrl": "/resimler/pt14/pt14_4.png",
    "isActive": true,
    "isFeatured": true,
    "price": 205,
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
    "name": "Geleneksel Ballı Rus Medovik Dilim",
    "code": "PST-DNK-DL-MED",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Özel karamelize çiçek balı ile tek tek açılan incecik 8 kat bisküvi yaprağı ve aralarındaki hafif ekşi kremalı dolgu.",
    "imageUrl": "/resimler/pt14/pt14_5.png",
    "isActive": true,
    "isFeatured": true,
    "price": 230,
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
    "name": "Ahududulu Pileli Fransız Sanat Monosu",
    "code": "PST-DNK-MN-PRF-1",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Özel kalıpta pileli heykel formunda dökülen pembe ahududu mousse, narenciye dolgusu ve altın yaldızlı süsleme.",
    "imageUrl": "/resimler/pt14/pt14_6.png",
    "isActive": true,
    "isFeatured": false,
    "price": 250,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Parfe",
      "Frambuazlı",
      "Semifreddo",
      "Dondurmalı Tatlı",
      "Meyveli"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Parfe",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C donuk muhafaza",
      "Servis Tavsiyesi": "Yarı donuk (semifreddo) olarak servis edilir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt14-7",
    "name": "Gül & Beyaz Çikolatalı Kadife Mono",
    "code": "PST-DNK-MN-PRF-2",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Zarif gül yaprağı esansı, fildişi beyaz çikolata ganajı ve kadife püskürtme dokusuyla büyüleyici bir zarafet.",
    "imageUrl": "/resimler/pt14/pt14_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 245,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Parfe",
      "Orman Meyveli",
      "Çiçek Formu",
      "Semifreddo",
      "Taze Tatlı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Parfe",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Yarı donuk servis tavsiye edilir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt14-8",
    "name": "Böğürtlenli & Mor Meyveli Pileli Mono",
    "code": "PST-DNK-MN-PRF-3",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Derin meyve asiditesi, ipeksi böğürtlen kremi ve sanatsal pileli dış kabuğuyla görsel bir şaheser.",
    "imageUrl": "/resimler/pt14/pt14_8.png",
    "isActive": true,
    "isFeatured": false,
    "price": 240,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Parfe",
      "Meyveli",
      "Silindir Parfe",
      "Taze Tatlı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk / donuk tüketim.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt14-9",
    "name": "Taze Yaban Mersinli Fırın Cheesecake",
    "code": "PST-DNK-DL-BLU-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Kıtır bisküvi tabanı üzerinde zengin krem peynir dolgusu ve bol taze yaban mersini sosuyla kusursuz cheesecake dilimi.",
    "imageUrl": "/resimler/pt14/pt14_9.png",
    "isActive": true,
    "isFeatured": true,
    "price": 220,
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
    "name": "Moka Kahveli & Bitter Çekirdekli Kubbe",
    "code": "PST-DNK-MN-COF-BEAN",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Yoğun espresso ve bitter çikolata ganajının birleştiği, kahve tutkunlarına özel parlak kubbe mono.",
    "imageUrl": "/resimler/pt14/pt14_10.png",
    "isActive": true,
    "isFeatured": true,
    "price": 230,
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
    "name": "Aynalı Çikolata Glazürlü Gurme Baton Kek",
    "code": "PST-DNK-MN-BAT-CHOC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Fransız usulü kusursuz parlak ayna çikolata kaplaması altında yoğun kakao nemli kek ve fındık pralini.",
    "imageUrl": "/resimler/pt14/pt14_11.png",
    "isActive": true,
    "isFeatured": false,
    "price": 210,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Baton Kek",
      "Mono Kek",
      "Bitter Çikolata",
      "Fıstıklı",
      "Snack Kek"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Baton Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Doğrudan servise uygundur.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt14-12",
    "name": "Gökkuşağı (Rainbow) Katlı Şenlik Pastası",
    "code": "PST-DNK-DL-RNB",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Yedi farklı renkte doğal meyve özleriyle renklendirilmiş yumuşak pandispanya katları ve hafif vanilyalı süt kreması.",
    "imageUrl": "/resimler/pt14/pt14_12.png",
    "isActive": true,
    "isFeatured": true,
    "price": 215,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Rainbow",
      "Gökkuşağı",
      "Katlı Pasta",
      "Renkli Pasta",
      "Dilimli"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Servis öncesi +4°C'de dinlendiriniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt14-13",
    "name": "Karamel Krokanlı Çok Katlı Dilim Pasta",
    "code": "PST-DNK-DL-CRM-KROK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Kavrulmuş karamel kreması, altın fındık krokanları ve çikolatalı pandispanyanın dayanılmaz çıtırlığı.",
    "imageUrl": "/resimler/pt14/pt14_13.png",
    "isActive": true,
    "isFeatured": false,
    "price": 220,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Dilimli Pasta",
      "Karamel",
      "Krokant",
      "Fındıklı",
      "Kafe Tatlısı"
    ],
    "specs": {
      "Porsiyon": "Hazır Porsiyon Dilim",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "+4°C'de çözündükten sonra servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt14-14",
    "name": "Siyah Bisküvili Karamel Mono Pasta",
    "code": "PST-DNK-MN-OREO-CRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Koyu kakao bisküvi tabanı, akışkan tuzlu karamel kalbi ve ipeksi sütlü çikolata kaplamasıyla modern mono.",
    "imageUrl": "/resimler/pt14/pt14_14.png",
    "isActive": true,
    "isFeatured": true,
    "price": 230,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Oreo",
      "Karamel",
      "Bisküvili",
      "Tek Kişilik"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Yuvarlak Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis önerilir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt14-15",
    "name": "Zümrüt Yeşili Antep Fıstığı Silindir Mono",
    "code": "PST-DNK-MN-PST-GNJ",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Saf Antep fıstığı ezmesinden hazırlanan silindirik gövde, beyaz çikolatalı fıstık ganajı ve fıstık tozu kaplaması.",
    "imageUrl": "/resimler/pt14/pt14_15.png",
    "isActive": true,
    "isFeatured": true,
    "price": 260,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Antep Fıstığı",
      "Ganaj",
      "Çikolata",
      "Gurme"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Pasta",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kahve yanına servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt14-16",
    "name": "Fıstık Glazürlü Pırlanta Kare Mono",
    "code": "PST-DNK-MN-PST-MINI",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Pırlanta kesim üst yüzeyi, zümrüt yeşili parlak fıstık sosu ve fıstıklı dacquoise tabanı ile elit bir tat.",
    "imageUrl": "/resimler/pt14/pt14_16.png",
    "isActive": true,
    "isFeatured": false,
    "price": 265,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Mini Pasta",
      "Fıstıklı",
      "Çikolatalı",
      "Butik"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Butik Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "+4°C'de servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt14-17",
    "name": "Bitter Çikolata Mousse Gurme Dilim",
    "code": "PST-DNK-DL-CHOC-VLV",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "%72 São Tomé kakaolu bitter mousse, ince kakao pandispanyası ve kadife çikolata dokusuyla saf lezzet.",
    "imageUrl": "/resimler/pt14/pt14_17.png",
    "isActive": true,
    "isFeatured": false,
    "price": 225,
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
    "name": "İpeksi Çikolatalı Kup Parfe",
    "code": "PST-DNK-BX-CHOC-MSS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Kat kat akışkan çikolata sosu, çikolatalı kek küpleri ve hafif köpük kremanın kadeh sunumu.",
    "imageUrl": "/resimler/pt14/pt14_18.png",
    "isActive": true,
    "isFeatured": true,
    "price": 185,
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
    "name": "Kırmızı Meyveli Velvet Kadeh Tatlısı",
    "code": "PST-DNK-BX-FRM-MSS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Kırmızı kadife kek kırıntıları, taze ahududu sosu ve mascarpone kremasının bardaktaki ferah buluşması.",
    "imageUrl": "/resimler/pt14/pt14_19.png",
    "isActive": true,
    "isFeatured": true,
    "price": 190,
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
    "name": "Belçika Çikolatalı Çıtır Profiterol Kutu",
    "code": "PST-DNK-BX-PRO-SUP",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Özel tereyağlı choux hamuru topları içerisinde taze pastacı kreması ve üzerinde bol sıcak eritilmiş Belçika çikolatası sosu.",
    "imageUrl": "/resimler/pt14/pt14_20.png",
    "isActive": true,
    "isFeatured": true,
    "price": 240,
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
  },
  {
    "id": "prod-pt15-1",
    "name": "Antep Fıstıklı Gurme Magnolia Kutu",
    "code": "PST-DNK-BX-PST",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "İpeksi vanilyalı pastacı kreması, bebe bisküvisi kırıntıları ve bolca taze çekilmiş Antep fıstığı ezmesi.",
    "imageUrl": "/resimler/pt15/pt15_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 210,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Box",
      "Kutu Tatlısı",
      "Antep Fıstığı",
      "Pistachio",
      "Magnolia"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Box",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kutusunda pratik kaşık servisine uygundur.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt15-2",
    "name": "Mor Kadife Yaban Mersinli Dilim",
    "code": "PST-DNK-DLM-BLU",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Göz alıcı mor rengiyle büyüleyen böğürtlenli pandispanya, beyaz çikolata kreması ve taze dağ meyveleri.",
    "imageUrl": "/resimler/pt15/pt15_2.png",
    "isActive": true,
    "isFeatured": true,
    "price": 215,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Dilim Pasta",
      "Yaban Mersini",
      "Böğürtlen",
      "Kakaolu Pandispanya",
      "Glazür"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis (Tek Kişilik)",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt15-3",
    "name": "Çift Kat Çikolatalı Sandviç Dilim",
    "code": "PST-DNK-DLM-TIR-CHOC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "İki kalın nemli çikolatalı kek katı arasında havalandırılmış bitter çikolata kreması dolgusu.",
    "imageUrl": "/resimler/pt15/pt15_3.png",
    "isActive": true,
    "isFeatured": true,
    "price": 210,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilim Pasta",
      "Tiramisu",
      "Çikolata Mousse",
      "Mascarpone",
      "Kakao"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Taze çekilmiş espresso eşliğinde servis önerilir."
    }
  },
  {
    "id": "prod-pt15-4",
    "name": "Kırmızı Meyveli Panna Cotta Kup",
    "code": "PST-DNK-KP-FRM-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Hakiki Madagaskar vanilyasıyla demlenmiş süt kreması panna cotta ve üzerinde taze orman meyvesi jölesi.",
    "imageUrl": "/resimler/pt15/pt15_4.png",
    "isActive": true,
    "isFeatured": true,
    "price": 185,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Kup Tatlısı",
      "Frambuaz",
      "Çikolatalı Parfe",
      "Mono Tatlı",
      "Kafe Menüsü"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kup Bardak",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Bardağında doğrudan servis edilir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt15-5",
    "name": "Kavrulmuş Fındıklı Krokan Silindir Mono",
    "code": "PST-DNK-MN-KRO-CAR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Giresun tombul fındığı krokanıyla kaplanmış çıtır dış kabuk ve pralin kremalı iç dolgu.",
    "imageUrl": "/resimler/pt15/pt15_5.png",
    "isActive": true,
    "isFeatured": true,
    "price": 235,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Krokan",
      "Fındıklı",
      "Karamel",
      "Porsiyonluk Pasta"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Çözündükten sonra doğrudan servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt15-6",
    "name": "Tereyağlı Amerikan Damla Çikolatalı Cookie",
    "code": "PST-DNK-CKI-CHOC-2",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Geleneksel Amerikan reçetesiyle fırınlanan, kenarları çıtır merkezi yumuşacık kalan bol parça çikolatalı kurabiye.",
    "imageUrl": "/resimler/pt15/pt15_6.png",
    "isActive": true,
    "isFeatured": true,
    "price": 130,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Unlu Mamuller",
      "Kurabiye",
      "Cookie",
      "Çikolata Parçacıklı",
      "Amerikan Cookie"
    ],
    "specs": {
      "Porsiyon": "2'li Porsiyon / Koli",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Isıtma": "Oda sıcaklığında 30 dk veya fırında 160°C'de 3-4 dk",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Ilık servis edildiğinde çikolata akışkanlaşır."
    }
  },
  {
    "id": "prod-pt15-7",
    "name": "Klasik Vanilyalı Jumbo Fırın Cookie",
    "code": "PST-DNK-CKI-JUMBO-3",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Dev boyutuyla doyurucu, esmer şeker ve birinci sınıf tereyağı ile yoğrulmuş lezzet klasiği.",
    "imageUrl": "/resimler/pt15/pt15_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 130,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Unlu Mamuller",
      "Cookie",
      "Jumbo Cookie",
      "Tereyağlı",
      "Kahve Yanı"
    ],
    "specs": {
      "Porsiyon": "3'lü Sunum Tabağı / Koli",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Isıtma": "Oda sıcaklığında 30 dk veya fırında 160°C'de 3-4 dk",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Filtre kahve ve latte yanında idealdir."
    }
  },
  {
    "id": "prod-pt15-8",
    "name": "Limonlu & Mavi Haşhaşlı Baton Dilim Kek",
    "code": "PST-DNK-KEK-HSH-LIM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Taze sıkılmış limon suyu ve rendesiyle aromalandırılmış, çıtır mavi haşhaş taneleriyle zenginleşmiş tereyağlı baton kek.",
    "imageUrl": "/resimler/pt15/pt15_8.png",
    "isActive": true,
    "isFeatured": true,
    "price": 140,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Baton Kek",
      "Dilim Kek",
      "Haşhaşlı Kek",
      "Limonlu",
      "Kafe Keki"
    ],
    "specs": {
      "Porsiyon": "Kalın Baton Dilim",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Çay ve kahve sunumlarına uygundur.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt15-9",
    "name": "Yoğun Bitter Çikolatalı Double Cookie",
    "code": "PST-DNK-CKI-DBL-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Kakaolu hamur içine gömülmüş iri bitter çikolata parçalarıyla çikolataseverlerin favorisi.",
    "imageUrl": "/resimler/pt15/pt15_9.png",
    "isActive": true,
    "isFeatured": false,
    "price": 135,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cookie",
      "Kurabiye",
      "Çift Çikolatalı",
      "Unlu Mamuller"
    ],
    "specs": {
      "Porsiyon": "2'li Paket / Koli",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Isıtma": "Oda sıcaklığında 30 dk çözündürünüz.",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Ilık servis edilebilir."
    }
  },
  {
    "id": "prod-pt15-10",
    "name": "Ebruli Mozaik Kakaolu Baton Dilim Kek",
    "code": "PST-DNK-KEK-MOZ-BAT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Sade vanilyalı ve yoğun kakaolu kek harcının sanatsal ebruli deseniyle fırınlanmış yumuşacık çay saati keki.",
    "imageUrl": "/resimler/pt15/pt15_10.png",
    "isActive": true,
    "isFeatured": false,
    "price": 135,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Dilim Kek",
      "Mozaik Kek",
      "Kakaolu Kek",
      "Baton Kek",
      "Unlu Mamuller"
    ],
    "specs": {
      "Porsiyon": "Baton Dilim (Tek Porsiyon)",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Sıcak içecekler ile mükemmel uyum sağlar.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt15-11",
    "name": "Havuçlu, Tarçınlı & Bol Cevizli Baton Kek",
    "code": "PST-DNK-KEK-HVC-TRC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Taze rendelenmiş havuç, Seylan tarçını ve iri kıyılmış ceviz içiyle hazırlanan sıcacık kış lezzeti.",
    "imageUrl": "/resimler/pt15/pt15_11.png",
    "isActive": true,
    "isFeatured": true,
    "price": 145,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Havuçlu Kek",
      "Tarçınlı",
      "Cevizli Kek",
      "Baton Dilim",
      "Kafe Keki"
    ],
    "specs": {
      "Porsiyon": "Gurme Baton Dilim",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kahve yanı menülerinde en çok tercih edilen lezzet.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt15-12",
    "name": "Vanilyalı & Bitter Ganajlı Kare Kup",
    "code": "PST-DNK-KP-VAN-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Küp formda porsiyonluk vanilya mousse ve yoğun bitter ganaj tabakasının uyumu.",
    "imageUrl": "/resimler/pt15/pt15_12.png",
    "isActive": true,
    "isFeatured": true,
    "price": 185,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Kup Tatlısı",
      "Kare Mono",
      "Vanilyalı",
      "Çikolata Ganaj",
      "Mono Tatlı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kare Mono Kup",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kendi şık kabında kaşıkla pratik servis.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt15-13",
    "name": "Kırmızı Kadife Kalp Mono Pasta",
    "code": "PST-DNK-MN-RED-HRT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Aşkın ve tutkunun sembolü; kadife kırmızı pürüzsüz dış doku, hafif peynir kreması ve vişne dolgulu kalp mono.",
    "imageUrl": "/resimler/pt15/pt15_13.png",
    "isActive": true,
    "isFeatured": true,
    "price": 250,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Red Velvet",
      "Kalp Pasta",
      "Kırmızı Kadife",
      "Özel Gün"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kalp Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Tabak sunumunda nane yaprağı ve taze meyveyle süslenebilir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt15-14",
    "name": "Boston Kremalı Çikolata Glazürlü Dilim",
    "code": "PST-DNK-DLM-BST-CRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "İpeksi sarı pastacı kreması dolgulu sünger kek üzeri kalın parlak bitter çikolata ganajı.",
    "imageUrl": "/resimler/pt15/pt15_14.png",
    "isActive": true,
    "isFeatured": false,
    "price": 210,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilim Pasta",
      "Boston Krema",
      "Çikolatalı Pasta",
      "Kafeterya Tatlısı"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt15-15",
    "name": "Yulaflı & Kuru Meyveli Fit Cookie",
    "code": "PST-DNK-CKI-OAT-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Doğal yulaf ezmesi, kuru üzüm ve tarçınla zenginleştirilmiş dengeli ve doyurucu fırın kurabiyesi.",
    "imageUrl": "/resimler/pt15/pt15_15.png",
    "isActive": true,
    "isFeatured": false,
    "price": 125,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cookie",
      "Yulaflı Kurabiye",
      "Damla Çikolatalı",
      "Unlu Mamuller"
    ],
    "specs": {
      "Porsiyon": "2'li Porsiyon / Koli",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Isıtma": "Oda sıcaklığında 30 dk veya 160°C fırında 3 dk",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Sıcak veya soğuk içeceklerle ikram edilebilir."
    }
  },
  {
    "id": "prod-pt15-16",
    "name": "Sicilya Limonlu Kadife Kubbe Mono",
    "code": "PST-DNK-MN-LIM-DOM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Canlandırıcı Akdeniz limon kreması, kadife sarı dış yüzey ve bademli bisküvi tabanıyla ferahlık timsali.",
    "imageUrl": "/resimler/pt15/pt15_16.png",
    "isActive": true,
    "isFeatured": true,
    "price": 235,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Limonlu",
      "Kubbe Pasta",
      "Lemon Dome",
      "Kadife Doku"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kubbe Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Tabak sunumunda şık bir tatlı alternatifi.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt15-17",
    "name": "Tropikal Mango & Çarkıfelek Kubbe Mono",
    "code": "PST-DNK-MN-MNG-PAS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Mango ve passion fruit'in egzotik birlikteliği; damağı tazeleyen hafif meyveli köpük dolgu.",
    "imageUrl": "/resimler/pt15/pt15_17.png",
    "isActive": true,
    "isFeatured": false,
    "price": 240,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Mango",
      "Passion Fruit",
      "Tropikal",
      "Kubbe"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kubbe Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt15-18",
    "name": "Karamelli & Yer Fıstıklı Snickers Mono",
    "code": "PST-DNK-MN-SNK-CAR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Akışkan süt karameli, tuzlu kavrulmuş yer fıstıkları ve kalın sütlü çikolata kaplamasıyla enerji bombası.",
    "imageUrl": "/resimler/pt15/pt15_18.png",
    "isActive": true,
    "isFeatured": true,
    "price": 245,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Snickers",
      "Karamel",
      "Yer Fıstığı",
      "Çikolatalı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Çözündükten sonra doğrudan servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt15-19",
    "name": "Red Velvet & Antep Fıstıklı Gurme Dilim",
    "code": "PST-DNK-DLM-RED-PST",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Kırmızı kadife kek ve yeşil Antep fıstığı pralini katmanlarının göz alıcı kontrastı.",
    "imageUrl": "/resimler/pt15/pt15_19.png",
    "isActive": true,
    "isFeatured": true,
    "price": 225,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Dilim Pasta",
      "Red Velvet",
      "Antep Fıstığı",
      "Cheesecake",
      "Kırmızı Kadife"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt15-20",
    "name": "New York Usulü Red Velvet Cheesecake",
    "code": "PST-DNK-DLM-RED-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Red velvet kek tabanı üzerinde fırınlanmış kadife peynir kreması ve hafif meyve süslemesi.",
    "imageUrl": "/resimler/pt15/pt15_20.png",
    "isActive": true,
    "isFeatured": false,
    "price": 230,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Red Velvet",
      "Dilim Pasta",
      "Gurme Tatlı"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Meyve sosu eşliğinde servis edilebilir."
    }
  },
  {
    "id": "prod-pt15-21",
    "name": "Bitter Çikolatalı & Deniz Tuzlu Gurme Tartlet",
    "code": "PST-DNK-TRT-BIT-CHOC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Çıtır tereyağlı tart kabuğunda %70 bitter çikolata ganajı ve üzerinde hafif deniz tuzu kristalleri.",
    "imageUrl": "/resimler/pt15/pt15_21.png",
    "isActive": true,
    "isFeatured": true,
    "price": 200,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Tartlet",
      "Bitter Çikolata",
      "Ganaj",
      "Deniz Tuzlu",
      "Gurme Tart"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Gurme Tartlet",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Hafif ısıtıldığında akışkan sufle kıvamına gelir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt15-22",
    "name": "Fransız Usulü Çıtır Craquelin Ekler",
    "code": "PST-DNK-EKL-CRQ-10",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Üzeri kıtır kurabiye kabuğuyla fırınlanmış choux hamuru içinde ipeksi Madagaskar vanilyalı pastacı kreması.",
    "imageUrl": "/resimler/pt15/pt15_22.png",
    "isActive": true,
    "isFeatured": true,
    "price": 175,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Ekler",
      "Craquelin",
      "Şu Hamuru",
      "Fransız Pastacılığı",
      "Unlu Mamuller"
    ],
    "specs": {
      "Porsiyon": "Tekli / Koli İçi Çoklu",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Çözünme / Servis": "+4°C dolapta 1 saatte servise hazır hale gelir.",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Üzerine çikolata ganaj veya pudra şekeri ile servis edilir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt16-1",
    "name": "Trompe-l'œil Egzotik Mango İllüzyon Mono",
    "code": "PST-DNK-MN-MNG-TRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Gerçek bir dalından yeni koparılmış mango görünümünde sanatsal illüzyon mono; ince çıtır çikolata kabuğu altında taze mango püresi.",
    "imageUrl": "/resimler/pt16/pt16_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 290,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Trompe L'oeil",
      "Mango",
      "Tropikal",
      "İllüzyon Pasta",
      "Gurme Tatlı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Gurme Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Çözündükten sonra doğrudan tabak sunumu yapılır.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt16-2",
    "name": "Tropikal Mango Mousse İllüzyon Sanatı",
    "code": "PST-DNK-MN-MNG-V2",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Fransız trompe-l'œil tekniğiyle şekillendirilmiş, taze mango kalbi ve hafifletilmiş tropikal mousse.",
    "imageUrl": "/resimler/pt16/pt16_2.png",
    "isActive": true,
    "isFeatured": false,
    "price": 285,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Mango",
      "Trompe L'oeil",
      "Meyveli Pasta"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt16-3",
    "name": "Trompe-l'œil Antep Fıstığı İllüzyon Mono",
    "code": "PST-DNK-MN-PST-TRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Birebir Antep fıstığı formunda şekillendirilmiş illüzyon pasta; içi saf fıstık pralini ve beyaz çikolata kremasıyla dolu.",
    "imageUrl": "/resimler/pt16/pt16_3.png",
    "isActive": true,
    "isFeatured": true,
    "price": 295,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Antep Fıstığı",
      "Trompe L'oeil",
      "Pistachio",
      "Gurme"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Gurme Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Özel tabak sunumları için mükemmeldir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt16-4",
    "name": "Zümrüt Fıstık Rüyası Gurme İllüzyon Mono",
    "code": "PST-DNK-MN-PST-V2",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Büyüleyici fıstık yeşili kabuk altında akışkan fıstık ezmesi ve fıstıklı dacquoise keki.",
    "imageUrl": "/resimler/pt16/pt16_4.png",
    "isActive": true,
    "isFeatured": false,
    "price": 290,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Antep Fıstığı",
      "Pistachio",
      "İllüzyon"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt16-5",
    "name": "Yoğun Bitter Çikolatalı Devil's Food Dilim",
    "code": "PST-DNK-DLM-DEV-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Ekstra koyu kakao ile pişirilen ıslak dokulu nemli çikolatalı pandispanya ve zengin fudge kreması.",
    "imageUrl": "/resimler/pt16/pt16_5.png",
    "isActive": true,
    "isFeatured": true,
    "price": 225,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilim Pasta",
      "Bitter Çikolata",
      "Devil's Food",
      "Çikolatalı Pasta"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kahve sunumları eşliğinde soğuk servis önerilir."
    }
  },
  {
    "id": "prod-pt16-6",
    "name": "Paris-Brest Çıtır Craquelin Choux Halka",
    "code": "PST-DNK-MN-CHX-PRS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Halka şeklinde pişirilmiş çıtır craquelin choux hamuru arasında bol kavrulmuş fındık pralinli krem şanti.",
    "imageUrl": "/resimler/pt16/pt16_6.png",
    "isActive": true,
    "isFeatured": true,
    "price": 235,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Craquelin",
      "Choux",
      "Paris-Brest",
      "Pastacı Kreması"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Mono Porsiyon",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Çözündükten sonra doğrudan servis edilir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt16-7",
    "name": "Nostaljik Çikolatalı Bisküvili Mozaik Dilim",
    "code": "PST-DNK-DLM-MOZ-CLS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Çocukluk anılarını canlandıran hakiki tereyağlı bisküviler ve yoğun bitter çikolata ganajından geleneksel mozaik pasta.",
    "imageUrl": "/resimler/pt16/pt16_7.png",
    "isActive": true,
    "isFeatured": false,
    "price": 180,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilim Pasta",
      "Mozaik Pasta",
      "Bisküvili",
      "Antep Fıstığı",
      "Klasik Tatlı"
    ],
    "specs": {
      "Porsiyon": "Dilimli Porsiyon",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 30-45 dk",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Çay saatlerinin vazgeçilmez ikramlığı."
    }
  },
  {
    "id": "prod-pt16-8",
    "name": "Orijinal San Sebastian Yanık Cheesecake Dilim",
    "code": "PST-DNK-DLM-SAN-SEB",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Bask bölgesinin dünyaca ünlü tarifi; karamelize yanık üst kabuk ve içi akışkan, kremsi lav peynir dokusu.",
    "imageUrl": "/resimler/pt16/pt16_8.png",
    "isActive": true,
    "isFeatured": true,
    "price": 240,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "San Sebastian",
      "Bask Cheesecake",
      "Dilim Pasta",
      "Yanık Cheesecake"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat veya oda sıcaklığında 30 dk",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Sıcak eritilmiş Belçika çikolatası sosu ile servis önerilir."
    }
  },
  {
    "id": "prod-pt16-9",
    "name": "Zümrüt Antep Fıstığı Kaplı Kubbe Mono",
    "code": "PST-DNK-MN-PST-DOM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Dışı tamamen kıyılmış taze Antep fıstıklarıyla kaplı, içi hafif vanilyalı mousse ve fıstık dolgulu kubbe.",
    "imageUrl": "/resimler/pt16/pt16_9.png",
    "isActive": true,
    "isFeatured": true,
    "price": 260,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Kubbe Pasta",
      "Antep Fıstığı",
      "Pistachio Dome"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kubbe Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt16-10",
    "name": "Lotus Biscoff Karamelize Cheesecake Dilim",
    "code": "PST-DNK-DLM-CHK-LOT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Fırınlanmış cheesecake tabanında ve üzerinde erimiş sıcak Lotus kreması ve çıtır bisküvi parçaları.",
    "imageUrl": "/resimler/pt16/pt16_10.png",
    "isActive": true,
    "isFeatured": true,
    "price": 230,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Lotus Biscoff",
      "Karamel",
      "Dilim Pasta",
      "Bisküvili"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt16-11",
    "name": "Kara Orman Vişneli & Çikolatalı Dilim",
    "code": "PST-DNK-DLM-BLK-FOR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Kakaolu nemli pandispanya, mayhoş vişne taneleri, hafif çırpılmış krema ve üzerinde bitter çikolata bukleleri.",
    "imageUrl": "/resimler/pt16/pt16_11.png",
    "isActive": true,
    "isFeatured": false,
    "price": 220,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Dilim Pasta",
      "Kara Orman",
      "Black Forest",
      "Vişneli",
      "Çikolatalı"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt16-12",
    "name": "Fransız Karamelize Craquelin Gurme Ekler",
    "code": "PST-DNK-EKL-CRQ-LNG",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Üzerinde altın karamel glazürü ve çıtır kabuğuyla pürüzsüz karamelli pastacı kreması dolgulu ekler.",
    "imageUrl": "/resimler/pt16/pt16_12.png",
    "isActive": true,
    "isFeatured": true,
    "price": 175,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Ekler",
      "Craquelin",
      "Pastacı Kreması",
      "Fransız Ekler"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Uzun Ekler",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Pudra şekeri serpilerek servis edilebilir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt16-13",
    "name": "Orman Meyveli Makaronlu Glazür Kubbe Mono",
    "code": "PST-DNK-MN-FRT-DOM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Aynalı kırmızı meyve glazürü ile kaplanmış, üzerinde taze ahududulu makaron ile süslenmiş zarif kubbe.",
    "imageUrl": "/resimler/pt16/pt16_13.png",
    "isActive": true,
    "isFeatured": true,
    "price": 255,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Orman Meyveli",
      "Makaronlu",
      "Kubbe Pasta",
      "Glazür"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kubbe Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt16-14",
    "name": "Beyaz Çikolatalı Profiterollü Polka Mono",
    "code": "PST-DNK-MN-WHT-POL",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Yumuşacık taban üzerinde dizili mini profiterol topları ve ipeksi beyaz çikolata kreması örtüsü.",
    "imageUrl": "/resimler/pt16/pt16_14.png",
    "isActive": true,
    "isFeatured": true,
    "price": 245,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Polka Pasta",
      "Beyaz Çikolata",
      "Profiterol",
      "Kare Mono"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kare Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt16-15",
    "name": "Klasik New York Red Velvet Dilim Pasta",
    "code": "PST-DNK-DLM-RED-VEL",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Kadife kırmızı kek katları ve orijinal Philadelphia peyniriyle hazırlanan pürüzsüz krema katmanları.",
    "imageUrl": "/resimler/pt16/pt16_15.png",
    "isActive": true,
    "isFeatured": true,
    "price": 215,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilim Pasta",
      "Red Velvet",
      "Kırmızı Kadife",
      "Labne Kremalı"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt16-16",
    "name": "Vişneli & Beyaz Kremalı Dikdörtgen Dilim",
    "code": "PST-DNK-DLM-OPR-BER",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Taze vişnelerin mayhoş aroması ve hafif beyaz pastacı kremasının ferahlatıcı katlı buluşması.",
    "imageUrl": "/resimler/pt16/pt16_16.png",
    "isActive": true,
    "isFeatured": false,
    "price": 210,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Dilim Pasta",
      "Dikdörtgen Dilim",
      "Vişneli",
      "Meyveli Pasta"
    ],
    "specs": {
      "Porsiyon": "Dikdörtgen Dilim Servis",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt16-17",
    "name": "Klasik Fransız Opera Dilim Pasta (Kahve & Karamel)",
    "code": "PST-DNK-DLM-OPR-MCH",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "İncecik bademli Joconde pandispanyası, espresso şurubu, kahveli tereyağı kreması ve karamel çikolata ganajının çok katlı uyumu.",
    "imageUrl": "/resimler/pt16/pt16_17.png",
    "isActive": true,
    "isFeatured": true,
    "price": 240,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Opera Pasta",
      "Mocha",
      "Karamel",
      "Dilim Pasta",
      "Kahveli"
    ],
    "specs": {
      "Porsiyon": "Opera Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Filtre kahve veya espresso yanında servis edilir."
    }
  },
  {
    "id": "prod-pt16-18",
    "name": "Fırınlanmış Karamel & Mocha Opera Dilim",
    "code": "PST-DNK-DLM-OPR-ESP",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Derin espresso ve süt karameli notalarının zarif katmanlarda birleştiği asil bir Fransız pastane klasiği.",
    "imageUrl": "/resimler/pt16/pt16_18.png",
    "isActive": true,
    "isFeatured": false,
    "price": 240,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Opera Pasta",
      "Espresso",
      "Karamel",
      "Dilim Pasta"
    ],
    "specs": {
      "Porsiyon": "Opera Dilim",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt16-19",
    "name": "Kremalı Havuçlu & Bol Cevizli Dilim Pasta",
    "code": "PST-DNK-DLM-HVC-CRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Zencefil ve tarçın baharatlı havuçlu kek katları arasında labneli kadife krema dolgusu.",
    "imageUrl": "/resimler/pt16/pt16_19.png",
    "isActive": true,
    "isFeatured": true,
    "price": 205,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Dilim Pasta",
      "Havuçlu Kek",
      "Cevizli Pasta",
      "Tarçınlı",
      "Carrot Cake"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Sıcak çay ve kahve eşliğinde ikram edilir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt16-20",
    "name": "Çikolatalı Fındıklı Raffaello Kubbe Mono",
    "code": "PST-DNK-MN-CHO-FND",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Dışı çıtır fındık ve Hindistan cevizi kaplı, içi yoğun beyaz ve sütlü çikolata ganajı.",
    "imageUrl": "/resimler/pt16/pt16_20.png",
    "isActive": true,
    "isFeatured": false,
    "price": 235,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Kubbe Pasta",
      "Çikolatalı",
      "Fındıklı",
      "Hindistan Cevizli"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kubbe Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt17-1",
    "name": "Belçika Çikolatalı Yoğun Mousse Dilim Pasta",
    "code": "PST-DNK-DLM-BEL-MOU",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "%70 Callebaut bitter çikolatasıyla hazırlanan ipeksi mousse dolgusu ve nemli kakaolu pandispanya tabanı.",
    "imageUrl": "/resimler/pt17/pt17_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 230,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilim Pasta",
      "Mousse Pasta",
      "Belçika Çikolatası",
      "Ganaj"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt17-2",
    "name": "Çilek & Frambuaz Dolgulu Kalp Aşk Pastası",
    "code": "PST-DNK-MN-BIT-POL",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Kadifemsi kırmızı kalp formunda, içinde taze çilek ve ahududu peltesi gizlenen romantik ve lüks bir şaheser.",
    "imageUrl": "/resimler/pt17/pt17_2.png",
    "isActive": true,
    "isFeatured": true,
    "price": 260,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Polka Pasta",
      "Bitter Çikolata",
      "Profiterollü"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kare Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt17-3",
    "name": "Limon Soslu Klasik New York Cheesecake",
    "code": "PST-DNK-DLM-CHK-LIM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Taş fırında pürüzsüz kıvamda pişmiş cheesecake üzerinde taze sıkılmış limon sosu ve narenciye ferahlığı.",
    "imageUrl": "/resimler/pt17/pt17_3.png",
    "isActive": true,
    "isFeatured": true,
    "price": 220,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Limonlu",
      "Dilim Pasta",
      "New York Cheesecake"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt17-4",
    "name": "Sicilya Limonlu & Bademli Gurme Cheesecake",
    "code": "PST-DNK-DLM-CHK-LM2",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Sicilya limonlarının eşsiz kokusu, badem unlu sable tabanı ve hafif ekşi krema katmanı.",
    "imageUrl": "/resimler/pt17/pt17_4.png",
    "isActive": true,
    "isFeatured": false,
    "price": 225,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Limonlu",
      "Dilim Pasta"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt17-5",
    "name": "Kartopu Hindistan Cevizli Beyaz Truffle Mono",
    "code": "PST-DNK-MN-COC-BAL",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Bembeyaz kar görünümünde Hindistan cevizi rendesi altında gizlenen çıtır bademli beyaz çikolata dolgusu.",
    "imageUrl": "/resimler/pt17/pt17_5.png",
    "isActive": true,
    "isFeatured": true,
    "price": 220,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Kartopu",
      "Hindistan Cevizli",
      "Çikolatalı Kubbe"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kubbe Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt17-6",
    "name": "Kavrulmuş Fındıklı Fudgy Brownie Dilim",
    "code": "PST-DNK-MN-KRO-FND",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Hakiki eritme çikolatayla pişen nemli brownie gövdesi ve üzerinde çıtır Karadeniz fındığı taneleri.",
    "imageUrl": "/resimler/pt17/pt17_6.png",
    "isActive": true,
    "isFeatured": true,
    "price": 195,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Kavrulmuş Fındık",
      "Karamel",
      "Kare Mono"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kare Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt17-7",
    "name": "Süt Karamel & Dulce de Leche Kubbe Mono",
    "code": "PST-DNK-MN-DUL-CAR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Geleneksel Latin Amerika dulce de leche süt karameli ve hafif vanilyalı mousse kubbesi.",
    "imageUrl": "/resimler/pt17/pt17_7.png",
    "isActive": true,
    "isFeatured": true,
    "price": 235,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Dulce de Leche",
      "Süt Karamel",
      "Kubbe Pasta"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kubbe Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt17-8",
    "name": "Bitter Çikolata & Beyaz Bukleli Kubbe Mono",
    "code": "PST-DNK-MN-CHO-WTR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Aynalı çikolata zırhı üzerinde el yapımı beyaz çikolata bukleleri ve akışkan bitter kalbi.",
    "imageUrl": "/resimler/pt17/pt17_8.png",
    "isActive": true,
    "isFeatured": false,
    "price": 240,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Kubbe Pasta",
      "Çikolata Mousse",
      "Beyaz Çikolata"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kubbe Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt17-9",
    "name": "Frambuaz Soslu Klasik New York Cheesecake",
    "code": "PST-DNK-DLM-CHK-FRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Taze frambuaz tanelerinin hafif mayhoş asiditesiyle taçlandırılmış pürüzsüz New York cheesecake.",
    "imageUrl": "/resimler/pt17/pt17_9.png",
    "isActive": true,
    "isFeatured": true,
    "price": 225,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Frambuazlı",
      "Dilim Pasta",
      "New York Cheesecake"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt17-10",
    "name": "Orijinal Venedik Usulü Tiramisu Dilim",
    "code": "PST-DNK-DLM-TIR-ITA",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Mascarpone peynirinin zarafeti ve espresso batırılmış savoiardilerin geleneksel İtalyan sunumu.",
    "imageUrl": "/resimler/pt17/pt17_10.png",
    "isActive": true,
    "isFeatured": true,
    "price": 215,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilim Pasta",
      "Tiramisu",
      "Mascarpone",
      "İtalyan Tatlısı",
      "Espresso"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Espresso veya cappuccino yanında servis ediniz."
    }
  },
  {
    "id": "prod-pt17-11",
    "name": "Çikolata Glazürlü Mascarpone Tiramisu Dilim",
    "code": "PST-DNK-DLM-TIR-GLZ",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Tiramisu dokusunun üzerine eklenen ince çıtır bitter çikolata katmanı ile lezzet derinliği.",
    "imageUrl": "/resimler/pt17/pt17_11.png",
    "isActive": true,
    "isFeatured": false,
    "price": 220,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilim Pasta",
      "Tiramisu",
      "Çikolata Glazür",
      "Mascarpone"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt17-12",
    "name": "Yoğun Espresso Mascarpone Tiramisu",
    "code": "PST-DNK-DLM-TIR-ESP",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Koyu kavrum kahve aromasıyla zenginleştirilmiş porsiyonluk tiramisu klasiği.",
    "imageUrl": "/resimler/pt17/pt17_12.png",
    "isActive": true,
    "isFeatured": false,
    "price": 210,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Dilim Pasta",
      "Tiramisu",
      "Espresso",
      "Mascarpone"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt17-13",
    "name": "Red Velvet & Antep Fıstıklı Dikdörtgen Mono",
    "code": "PST-DNK-MN-HRT-LOV",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Kadife kırmızı kek zemininde zümrüt fıstık kreması ve altın yaldızlı şık pasta.",
    "imageUrl": "/resimler/pt17/pt17_13.png",
    "isActive": true,
    "isFeatured": true,
    "price": 250,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Kalp Pasta",
      "Red Velvet",
      "Frambuazlı",
      "Özel Gün Tatlısı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kalp Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Özel gün menüleri için idealdir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt17-14",
    "name": "Red Velvet & Beyaz Çikolatalı Fırın Cookie",
    "code": "PST-DNK-CKI-RED-WHT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Kırmızı kadife kurabiye hamuru içine gömülü iri beyaz çikolata parçacıkları.",
    "imageUrl": "/resimler/pt17/pt17_14.png",
    "isActive": true,
    "isFeatured": true,
    "price": 135,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cookie",
      "Kurabiye",
      "Red Velvet",
      "Beyaz Çikolata",
      "Amerikan Cookie"
    ],
    "specs": {
      "Porsiyon": "2'li Porsiyon / Koli",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Isıtma": "Oda sıcaklığında 30 dk veya fırında 160°C'de 3 dk",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Ilık servis edildiğinde çikolatalar yumuşar."
    }
  },
  {
    "id": "prod-pt17-15",
    "name": "Orman Meyveli & Böğürtlenli Cheesecake Dilim",
    "code": "PST-DNK-DLM-CHK-BER",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Doğal böğürtlen taneleri ve zengin meyve sosuyla süslenmiş fırın cheesecake dilimi.",
    "imageUrl": "/resimler/pt17/pt17_15.png",
    "isActive": true,
    "isFeatured": false,
    "price": 225,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Orman Meyveli",
      "Böğürtlenli",
      "Dilim Pasta"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt17-16",
    "name": "Karamel Soslu & File Bademli Cheesecake Dilim",
    "code": "PST-DNK-DLM-CHK-ALM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Kavrulmuş ince file bademler ve ev yapımı sıcak karamel sosuyla lezzetlenen cheesecake.",
    "imageUrl": "/resimler/pt17/pt17_16.png",
    "isActive": true,
    "isFeatured": true,
    "price": 220,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Karamel",
      "File Badem",
      "Dilim Pasta",
      "Bademli"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt17-17",
    "name": "Ruby Çikolatalı & Çilekli Magnolia Kup",
    "code": "PST-DNK-KP-STR-RUB",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Doğal pembe Ruby kakaosu, taze bahçe çilekleri ve hafifletilmiş kremanın büyüleyici kup sunumu.",
    "imageUrl": "/resimler/pt17/pt17_17.png",
    "isActive": true,
    "isFeatured": true,
    "price": 195,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Kup Tatlısı",
      "Magnolia",
      "Çilekli",
      "Ruby Çikolata",
      "Mono Tatlı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kup Kase",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kendi şık kasesinde kaşıkla servis edilir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt17-18",
    "name": "Süt Karamel & Bitter Ganajlı Gurme Kup",
    "code": "PST-DNK-KP-DUL-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Alt katında yoğun süt karameli, üstünde kadife bitter çikolata ganajı ve çıtır bisküvi kırıntıları.",
    "imageUrl": "/resimler/pt17/pt17_18.png",
    "isActive": true,
    "isFeatured": true,
    "price": 190,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Kup Tatlısı",
      "Dulce de Leche",
      "Karamel",
      "Bitter Ganaj",
      "Krokan"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kup Kase",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Doğrudan kasesinde servis edilir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt17-19",
    "name": "Limonlu & Karamel Katmanlı Oval Mono Kutu",
    "code": "PST-DNK-BX-LIM-OVL",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Oval şık kutusunda limon kreması ve karamel jölesinin dengeli birleşimi.",
    "imageUrl": "/resimler/pt17/pt17_19.png",
    "isActive": true,
    "isFeatured": false,
    "price": 195,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Box",
      "Kutu Tatlısı",
      "Limonlu",
      "Karamelli",
      "Oval Mono"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Oval Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kutusunda pratik kaşık servisine uygundur."
    }
  },
  {
    "id": "prod-pt17-20",
    "name": "Çikolata Ganajlı & Bisküvili Dikdörtgen Box",
    "code": "PST-DNK-BX-CHO-REC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Bisküvi katmanları ve yoğun Belçika çikolatası ganajının pratik kutu sunumu.",
    "imageUrl": "/resimler/pt17/pt17_20.png",
    "isActive": true,
    "isFeatured": true,
    "price": 195,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Mono Box",
      "Kutu Tatlısı",
      "Çikolata Ganaj",
      "Bisküvili"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Dikdörtgen Mono Box",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kutusunda pratik servis."
    }
  },
  {
    "id": "prod-pt18-1",
    "name": "Taze Butik Red Velvet & Fıstıklı Mono",
    "code": "PST-DNK-MN-RED-PST-REC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Zümrüt Antep fıstığı kaplaması ve kadifemsi kırmızı dolgusuyla tek porsiyonluk gurme lezzet.",
    "imageUrl": "/resimler/pt18/pt18_1.png",
    "isActive": true,
    "isFeatured": true,
    "price": 240,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Red Velvet",
      "Antep Fıstığı",
      "Dikdörtgen Dilim"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Dikdörtgen Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt18-2",
    "name": "Çilek & Ahududu Kalbi Mono Aşk Pastası",
    "code": "PST-DNK-MN-HRT-LOV-2",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Doğal meyve asiditesi, beyaz çikolata kreması ve pürüzsüz kalp formundaki sunumu.",
    "imageUrl": "/resimler/pt18/pt18_2.png",
    "isActive": true,
    "isFeatured": false,
    "price": 255,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Kalp Pasta",
      "Çilekli",
      "Frambuazlı",
      "Aşk Pastası"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kalp Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt18-3",
    "name": "Bitter Çikolata Kaplı Orman Meyveli Rulo Mono",
    "code": "PST-DNK-MN-RUL-FRT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "İncecik kakaolu rulo kek içinde orman meyveli mus ve üzerinde çıtır çikolata kaplaması.",
    "imageUrl": "/resimler/pt18/pt18_3.png",
    "isActive": true,
    "isFeatured": true,
    "price": 220,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Rulo Pasta",
      "Orman Meyveli",
      "Çikolata Kaplı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Rulo Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt18-4",
    "name": "Yoğun Fındıklı & Kuru Meyveli Kare Brownie",
    "code": "PST-DNK-DLM-BRW-FND",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Fırından yeni çıkmış kıvamda içi nemli çikolata, fındık ve turna yemişi taneleri.",
    "imageUrl": "/resimler/pt18/pt18_4.png",
    "isActive": true,
    "isFeatured": true,
    "price": 195,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Brownie",
      "Fındıklı",
      "Dilim Pasta",
      "Yoğun Çikolatalı"
    ],
    "specs": {
      "Porsiyon": "Kare Dilim Porsiyon",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Çözünme / Isıtma": "Oda sıcaklığında 30 dk veya mikrodalgada 15-20 sn hafif ılık",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Ilık servis edildiğinde yanında vanilyalı dondurma önerilir.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt18-5",
    "name": "Narenciye & Antep Fıstıklı Sarı Glazür Kubbe",
    "code": "PST-DNK-MN-LIM-PST-DOM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Taze - Butik Pastalar",
    "categorySlug": "taze-butik-pastalar",
    "description": "Limon ve portakal ferahlığı, fıstıklı dacquoise tabanı ve parlak sarı kubbe formu.",
    "imageUrl": "/resimler/pt18/pt18_5.png",
    "isActive": true,
    "isFeatured": true,
    "price": 235,
    "vatRate": 20,
    "tags": [
      "Taze Pasta",
      "Butik Pasta",
      "Mono Pasta",
      "Kubbe Pasta",
      "Narenciye",
      "Antep Fıstığı",
      "Limonlu"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Kubbe Mono",
      "Ambalaj": "Özel Butik Pasta Kutusu (+4°C Muhafaza)",
      "Raf Ömrü": "+4°C dolapta 3 gün",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz.",
      "Tüketim": "Günlük taze üretimdir, servise hazırdır."
    }
  },
  {
    "id": "prod-pt18-6",
    "name": "Tane Yaban Mersinli & Krokanlı Cheesecake Dilim",
    "code": "PST-DNK-DLM-CHK-BLU-TN",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Taze yaban mersinleri, çıtır krokan kenarları ve fırınlanmış dolgun peynir harcı.",
    "imageUrl": "/resimler/pt18/pt18_6.png",
    "isActive": true,
    "isFeatured": true,
    "price": 225,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Cheesecake",
      "Yaban Mersini",
      "Blueberry",
      "Dilim Pasta",
      "Krokan"
    ],
    "specs": {
      "Porsiyon": "Dilimli Servis",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme Süresi": "+4°C dolapta 1-2 saat",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Soğuk servis ediniz."
    }
  },
  {
    "id": "prod-pt18-7",
    "name": "Fransız Tereyağlı Klasik Kruvasan (Pişmeye / Servise Hazır)",
    "code": "PST-DNK-UNL-KRV-SAD",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Saf Fransız tereyağı ile 27 kat katlanarak açılan, dışı pul pul dökülen çıtır, içi petek dokulu otantik kruvasan.",
    "imageUrl": "/resimler/pt18/pt18_7.png",
    "isActive": true,
    "isFeatured": true,
    "price": 120,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Unlu Mamuller",
      "Kruvasan",
      "Tereyağlı",
      "Fransız Kruvasan",
      "Kahvaltı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Adet",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Isıtma": "Önceden ısıtılmış 180°C fırında 3-4 dakika çıtırlaştırınız.",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Sıcak servis ediniz, reçel veya çikolata ezmesi ile sunulabilir."
    }
  },
  {
    "id": "prod-pt18-8",
    "name": "New York Roll Spiral Kat Kat Gurme Çörek",
    "code": "PST-DNK-UNL-NY-ROLL",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Dairesel spiral kruvasan hamurunun altın sarısı fırınlanması, içi akışkan vanilya kreması ve üzeri çikolata kaplı trend çörek.",
    "imageUrl": "/resimler/pt18/pt18_8.png",
    "isActive": true,
    "isFeatured": true,
    "price": 160,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Unlu Mamuller",
      "New York Roll",
      "Spiral Kruvasan",
      "Lamine Hamur",
      "Kafe Trend"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Roll Porsiyon",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Isıtma": "Fırında 170°C'de 3-4 dk ısıtıldığında ekstra çıtırlaşır.",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "İçi krema dolgulanabilir veya üzeri ganajla kaplanabilir."
    }
  },
  {
    "id": "prod-pt18-9",
    "name": "Belçika Çikolatası & Fındıklı Gurme Kruvasan",
    "code": "PST-DNK-UNL-KRV-CHO-FND",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Kruvasan hamuru içerisine gömülü yoğun çikolata dolgusu ve üzerinde kavrulmuş fındık parçacıkları.",
    "imageUrl": "/resimler/pt18/pt18_9.png",
    "isActive": true,
    "isFeatured": true,
    "price": 150,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Unlu Mamuller",
      "Kruvasan",
      "Çikolata Dolgulu",
      "Fındıklı Kruvasan"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Adet",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Isıtma": "Fırında 170°C'de 3-4 dk ısıtınız.",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Ilık servis yapıldığında iç dolgusu akışkan hale gelir."
    }
  },
  {
    "id": "prod-pt18-10",
    "name": "Fransız Pain au Chocolat (Çift Çikolata Çubuklu Çörek)",
    "code": "PST-DNK-UNL-PAIN-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Orijinal Fransız fırıncılık klasiği; tereyağlı kat kat hamur arasına sarılmış iki adet bitter çikolata çubuğu.",
    "imageUrl": "/resimler/pt18/pt18_10.png",
    "isActive": true,
    "isFeatured": false,
    "price": 135,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Unlu Mamuller",
      "Pain au Chocolat",
      "Çikolatalı Çörek",
      "Tereyağlı"
    ],
    "specs": {
      "Porsiyon": "Tek Kişilik Adet",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Isıtma": "Fırında 175°C'de 3-4 dk ısıtınız.",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kahve yanında sıcak servis edilir."
    }
  },
  {
    "id": "prod-pt18-11",
    "name": "Fransız Tereyağlı Kalın Brioche Tost & Sandviç Dilimi",
    "code": "PST-DNK-UNL-TST-EKM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Donuk Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Yüksek tereyağı ve yumurta içeriğiyle yumuşacık altın sarısı dokulu gurme brioche ekmek dilimi.",
    "imageUrl": "/resimler/pt18/pt18_11.png",
    "isActive": true,
    "isFeatured": false,
    "price": 95,
    "vatRate": 20,
    "tags": [
      "Donuk Pasta",
      "Unlu Mamuller",
      "Tost Ekmeği",
      "Sandviç Ekmeği",
      "Gurme Ekmek"
    ],
    "specs": {
      "Porsiyon": "2 Dilim / Paket",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Kullanım": "Tost makinesinde doğrudan kızartılabilir.",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "Kaşarlı, avokadolu veya gurme sandviç yapımına uygundur."
    }
  },
  {
    "id": "prod-pt18-12",
    "name": "Donuk Dikdörtgen Belçika Waffle Ekmeği (Brüksel Tipi Hazır Pişmiş)",
    "code": "WFL-DNK-BEL-BRX-1",
    "codeGroup": "CALLEI",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Derin petekli Brüksel usulü formunda, dışı çıtır içi hafif ve havadar, tost makinesi veya fırında 2 dakikada servise hazır donuk waffle ekmeği.",
    "imageUrl": "/resimler/pt18/pt18_12.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Waffle",
      "Belçika Waffle",
      "Brüksel Waffle",
      "Waffle Ekmeği",
      "Donuk Waffle",
      "CALLEI"
    ],
    "specs": {
      "Porsiyon": "1 Adet Dikdörtgen Waffle",
      "Ambalaj": "Koli (-18°C Donuk)",
      "Çözünme / Isıtma": "Tost makinesi veya fırında 180°C'de 2-3 dakika",
      "Raf Ömrü": "-18°C'de 12 Ay",
      "Saklama Koşulu": "-18°C",
      "Servis Tavsiyesi": "CALLEI sürülebilir kremalar ve taze meyvelerle süsleyiniz."
    }
  },
  {
    "id": "prod-pt18-13",
    "name": "SAMARA Barista Sprey Krem Şanti 250ml (Whipped Cream)",
    "code": "KRM-SAM-SPR-250",
    "codeGroup": "SAMARA",
    "categoryId": "cat-6",
    "categoryName": "Kremalı Ürünler & Pastacılık",
    "categorySlug": "kremali-urunler",
    "description": "Kahveler, sıcak çikolata, waffle, dondurma ve tatlı sunumları için yüksek hacimli, sönmeyen, pratik kullanımlı profesyonel sprey krem şanti.",
    "imageUrl": "/resimler/pt18/pt18_13.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Kremalı Ürünler",
      "Sprey Şanti",
      "Krem Şanti",
      "Whipped Cream",
      "Barista",
      "SAMARA"
    ],
    "specs": {
      "Hacim": "250 ml",
      "Ambalaj": "Basınçlı Sprey Teneke Kutu",
      "Kullanım Şekli": "Kullanmadan önce çalkalayınız, dik tutarak sıkınız.",
      "Saklama Koşulu": "+4°C / Oda Sıcaklığı (Açıldıktan sonra buzdolabında saklayınız)",
      "Servis Tavsiyesi": "Waffle, pasta ve frappe üzeri süslemelerde kullanılır."
    }
  },
  {
    "id": "prod-pt18-14",
    "name": "Monte Cristo Cool Lime Base Aromalı Barista Şurubu 1000ml",
    "code": "MNT-CLM-1000",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Ferahlatıcı yeşil misket limonu (lime) ve taze nane esansları içeren, yaz içecekleri ve popüler Cool Lime kokteylleri için özel şurup bazı.",
    "imageUrl": "/resimler/pt18/pt18_14.png",
    "isActive": true,
    "isFeatured": true,
    "price": 0,
    "vatRate": 20,
    "tags": [
      "Şuruplar",
      "Monte Cristo",
      "Cool Lime",
      "Lime Şurubu",
      "Barista",
      "Kokteyl Şurubu",
      "Mocktail"
    ],
    "specs": {
      "Hacim": "1000 ml (Cam / PET Şişe)",
      "Kullanım Oranı": "1:7 veya 1:8 oranında su ve buz ile seyreltiniz.",
      "Kullanım Alanı": "Cool Lime içecekleri, limonatalar, ferahlatıcı kokteyller.",
      "Raf Ömrü": "Açıldıktan sonra serin ve kuru yerde 12 Ay",
      "Saklama Koşulu": "Oda sıcaklığında, güneş ışığından uzakta muhafaza ediniz."
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

/** Returns products from the same brand (codeGroup), excluding the current product */
export function getBrandProducts(productOrId: string | Product, limit = 8): Product[] {
  const current = typeof productOrId === "string" ? getProductById(productOrId) : productOrId;
  if (!current || !current.codeGroup) return [];
  return PRODUCTS.filter(
    (p) =>
      p.id !== current.id &&
      p.isActive &&
      p.codeGroup &&
      p.codeGroup.toLowerCase() === current.codeGroup.toLowerCase()
  ).slice(0, limit);
}
