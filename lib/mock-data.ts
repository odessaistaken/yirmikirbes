/**
 * Mock data for 20:45 Pastacılık catalog.
 * Generated with 100% accurate Turkish naming, canonical categories, specs, and local image paths.
 * Total 15 categories and 260 products.
 */

import type { Category, Product } from "@/lib/types";
export type { Category, Product };

export const CATEGORIES: Category[] = [
  {
    "id": "cat-8",
    "name": "Pastalar",
    "slug": "pastalar",
    "description": "Özenle seçilmiş malzemelerle hazırlanan el yapımı butik pastalar, donuk cheesecake'ler ve tek porsiyonluk gurme lezzetler.",
    "icon": "🎂",
    "productCount": 129,
    "imageUrl": "/resimler/pt13/pt13_1.png",
    "order": 1,
    "isActive": true
  },
  {
    "id": "cat-9",
    "name": "Butik Pastalar",
    "slug": "taze-butik-pastalar",
    "description": "Günlük taze üretim, el yapımı mono ve dilimli butik pasta ve tatlı çeşitleri.",
    "icon": "🍰",
    "productCount": 55,
    "imageUrl": "/resimler/pt14/pt14_2.png",
    "order": 2,
    "isActive": true,
    "parentId": "cat-8"
  },
  {
    "id": "cat-5",
    "name": "Donuk Pastalar",
    "slug": "donuk-pasta",
    "description": "Kafeterya ve restoranlar için pratik, lezzetli donuk cheesecake'ler, tiramisu, mono kutu pastalar, dilimli pastalar ve unlu mamuller.",
    "icon": "❄️",
    "productCount": 74,
    "imageUrl": "/resimler/pt12/pt12_13.png",
    "order": 3,
    "isActive": true,
    "parentId": "cat-8"
  },
  {
    "id": "cat-butik-cup",
    "name": "Butik Cup",
    "slug": "butik-cup",
    "description": "Bireysel servis ve sunumlar için özel tasarlanmış butik cup tatlı ve magnolia çeşitleri.",
    "icon": "🧁",
    "productCount": 0,
    "imageUrl": "/resimler/pt15/pt15_1.png",
    "order": 4,
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
    "imageUrl": "/resimler/pt13/pt13_2.png",
    "order": 5,
    "isActive": true,
    "parentId": "cat-8"
  },
  {
    "id": "cat-3",
    "name": "Waffle Çikolataları",
    "slug": "waffle-malzemeleri",
    "description": "CALLEI sürülebilir renkli aromalı kremalar, çıtır pirinç patlakları, drajeler ve fındık krokan süsleme çeşitleri.",
    "icon": "🧇",
    "productCount": 21,
    "imageUrl": "/beyazresimler/karisik/karisik_081.png",
    "order": 6,
    "isActive": true
  },
  {
    "id": "cat-kruvasan",
    "name": "Kruvasan",
    "slug": "kruvasan",
    "description": "Taze ve donuk kruvasan çeşitleri, Fransız usulü tereyağlı hamur işleri ve New York roll.",
    "icon": "🥐",
    "productCount": 0,
    "imageUrl": "/resimler/pt18/pt18_7.png",
    "order": 7,
    "isActive": true
  },
  {
    "id": "cat-6",
    "name": "Kremalı Ürünler & Pastacılık",
    "slug": "kremali-urunler",
    "description": "Chantilly, ganaj ve profesyonel pastacılık krema hammaddeleri.",
    "icon": "🍦",
    "productCount": 0,
    "imageUrl": "/beyazresimler/karisik/karisik_021.png",
    "order": 8,
    "isActive": true
  },
  {
    "id": "cat-2",
    "name": "Şuruplar",
    "slug": "suruplar",
    "description": "DaVinci Gourmet, Caffè NONNO ve Monte Cristo aromalı kahve, kokteyl ve barista şurupları.",
    "icon": "🍯",
    "productCount": 51,
    "imageUrl": "/beyazresimler/karisik/karisik_021.png",
    "order": 9,
    "isActive": true
  },
  {
    "id": "cat-7",
    "name": "Kokteyller",
    "slug": "kokteyller",
    "description": "EASY MIX doğal meyve ve botanik kokteyl premiksleri, bar kokteylleri ve mocktailler için profesyonel karışımlar.",
    "icon": "🍹",
    "productCount": 18,
    "imageUrl": "/beyazresimler/karisik/karisik_052.png",
    "order": 10,
    "isActive": true,
    "parentId": "cat-2"
  },
  {
    "id": "cat-4",
    "name": "Bar Sos",
    "slug": "bar-sos",
    "description": "DaVinci Gourmet ve Caffè NONNO karamel, çikolata, beyaz çikolata ve condensed milk gurme bar sosları.",
    "icon": "🍫",
    "productCount": 10,
    "imageUrl": "/beyazresimler/karisik/karisik_004.png",
    "order": 11,
    "isActive": true
  },
  {
    "id": "cat-1",
    "name": "Püreler",
    "slug": "pureler",
    "description": "DaVinci Fruit Mix ve Krater zengin meyve püreleri ile bar ve pastacılık meyve karışımları.",
    "icon": "🍓",
    "productCount": 31,
    "imageUrl": "/beyazresimler/karisik/karisik_001.png",
    "order": 12,
    "isActive": true
  },
  {
    "id": "cat-kasa-onu",
    "name": "Kasa Önü Ürünler",
    "slug": "kasa-onu-urunler",
    "description": "Kasa önü atıştırmalıklar, ikramlık ve impuls ürün seçenekleri.",
    "icon": "🍬",
    "productCount": 0,
    "imageUrl": "/beyazresimler/karisik/karisik_081.png",
    "order": 13,
    "isActive": true
  },
  {
    "id": "cat-kremalar",
    "name": "Kremalar",
    "slug": "kremalar",
    "description": "Özel pastacılık, waffle ve tatlı kremaları, dolgu ve kaplama krema çeşitleri.",
    "icon": "🧁",
    "productCount": 0,
    "imageUrl": "/beyazresimler/karisik/karisik_081.png",
    "order": 14,
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
    "order": 15,
    "isActive": false
  }
];

const RAW_PRODUCTS = [
  {
    "id": "prod-pt12-13",
    "name": "Mangolu & Chia Tohumlu Dilimli Cheesecake",
    "code": "PST-DNK-MNG-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 1
  },
  {
    "id": "prod-pt12-14",
    "name": "İtalyan Tiramisu Dilimli Pasta",
    "code": "PST-DNK-TIR-10D",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 2
  },
  {
    "id": "prod-pt12-15",
    "name": "Antep Fıstıklı & Çikolatalı Mono Kutu Pasta (Dubai Pasta)",
    "code": "PST-DNK-DUB-BOX",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 3
  },
  {
    "id": "prod-pt12-16",
    "name": "Lotus Bisküvili & Yaban Mersinli Bütün Pasta (Dilimli)",
    "code": "PST-DNK-LOT-BLU",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 4
  },
  {
    "id": "prod-pt12-17",
    "name": "Yoğun Çikolatalı & Fıstık Ezmeli Dilim Pasta",
    "code": "PST-DNK-PNT-CHOC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 5
  },
  {
    "id": "prod-pt12-18",
    "name": "Karamelli & Fındık Parçacıklı Mono Pasta",
    "code": "PST-DNK-CRM-MONO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 6
  },
  {
    "id": "prod-pt12-19",
    "name": "Kuruyemişli & Kırmızı Meyveli Fudgy Brownie Dilim",
    "code": "PST-DNK-BRW-NUT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 7
  },
  {
    "id": "prod-pt12-20",
    "name": "Antep Fıstıklı & Ahududu Katmanlı Dilim Pasta",
    "code": "PST-DNK-PST-RAS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 8
  },
  {
    "id": "prod-pt13-1",
    "name": "Çikolata Kaplı Çilekli Mono Pasta",
    "code": "PST-DNK-MN-CHOC-STR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 9
  },
  {
    "id": "prod-pt13-2",
    "name": "Antep Fıstıklı Mono Pasta (Fıstık Rüyası)",
    "code": "PST-DNK-MN-PST",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 10
  },
  {
    "id": "prod-pt13-3",
    "name": "Limonlu & Glazürlü Mono Kubbe Pasta",
    "code": "PST-DNK-MN-LIM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 11
  },
  {
    "id": "prod-pt13-4",
    "name": "Orman Meyveli & Ahududulu Mono Pasta (Red Berry)",
    "code": "PST-DNK-MN-RED",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 12
  },
  {
    "id": "prod-pt13-5",
    "name": "Lotus Bisküvili Karamel Mono Pasta",
    "code": "PST-DNK-MN-LOT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 13
  },
  {
    "id": "prod-pt13-6",
    "name": "Rocher Fındıklı & Çikolatalı Mono Pasta",
    "code": "PST-DNK-MN-ROC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 14
  },
  {
    "id": "prod-pt13-7",
    "name": "Karamel Soslu & Kremalı Katlı Dilim Pasta",
    "code": "PST-DNK-DL-CRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 15
  },
  {
    "id": "prod-pt13-8",
    "name": "Antep Fıstıklı & Çikolatalı Katlı Dilim Pasta",
    "code": "PST-DNK-DL-PSTC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 16
  },
  {
    "id": "prod-pt13-9",
    "name": "Moka Kahveli & Fındıklı Dilim Pasta",
    "code": "PST-DNK-DL-MOK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 17
  },
  {
    "id": "prod-pt13-10",
    "name": "Karaorman Meyveli (Schwarzwalder) Dilim Pasta",
    "code": "PST-DNK-DL-BLF",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 18
  },
  {
    "id": "prod-pt13-11",
    "name": "Çikolatalı & Fındık Parçacıklı Dilim Kek",
    "code": "PST-DNK-DL-CHK-KEK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 19
  },
  {
    "id": "prod-pt13-12",
    "name": "Geleneksel Çikolatalı Mozaik Pasta Dilimi",
    "code": "PST-DNK-DL-MOZ",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 20
  },
  {
    "id": "prod-pt13-13",
    "name": "Çilekli Mono Box Magnolia & Kutu Pasta",
    "code": "PST-DNK-BX-STR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 21
  },
  {
    "id": "prod-pt13-14",
    "name": "Oreo & Çikolatalı Mono Box Kutu Pasta",
    "code": "PST-DNK-BX-OREO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 22
  },
  {
    "id": "prod-pt13-15",
    "name": "Lotus Biscoff Mono Box Kutu Pasta",
    "code": "PST-DNK-BX-LOT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 23
  },
  {
    "id": "prod-pt13-16",
    "name": "Çikolatalı Kubbe Rulo Dilim Pasta (D-Kek)",
    "code": "PST-DNK-DL-KUB",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 24
  },
  {
    "id": "prod-pt13-17",
    "name": "Orman Meyveli & Crumble Cheesecake Dilimi",
    "code": "PST-DNK-DL-CRM-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 25
  },
  {
    "id": "prod-pt13-18",
    "name": "Çikolata Dolgulu Cookie Turta (Cookie Pie) Dilimi",
    "code": "PST-DNK-DL-CKP",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 26
  },
  {
    "id": "prod-pt13-19",
    "name": "Çilekli & Antep Fıstıklı Mono Cheesecake",
    "code": "PST-DNK-MN-STR-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 27
  },
  {
    "id": "prod-pt13-20",
    "name": "Dubai Kadayıflı & Fıstıklı Mono Küre Pasta",
    "code": "PST-DNK-MN-DUB-KAD",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 28
  },
  {
    "id": "prod-pt14-1",
    "name": "İtalyan Tiramisu Üçgen Dilim Pasta",
    "code": "PST-DNK-DL-TIR-TRI",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 29
  },
  {
    "id": "prod-pt14-2",
    "name": "Frambuazlı & Beyaz Çikolatalı Dilim Pasta",
    "code": "PST-DNK-DL-FRM-WHT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 30
  },
  {
    "id": "prod-pt14-3",
    "name": "Böğürtlenli & Mor Glazürlü Mono Kubbe Pasta",
    "code": "PST-DNK-MN-BGR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 31
  },
  {
    "id": "prod-pt14-4",
    "name": "Kare Porsiyon İtalyan Tiramisu",
    "code": "PST-DNK-SQ-TIR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 32
  },
  {
    "id": "prod-pt14-5",
    "name": "Geleneksel Ballı Medovik Dilim Pasta",
    "code": "PST-DNK-DL-MED",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 33
  },
  {
    "id": "prod-pt14-6",
    "name": "Frambuazlı & Egzotik Meyveli Mono Parfe",
    "code": "PST-DNK-MN-PRF-1",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 34
  },
  {
    "id": "prod-pt14-7",
    "name": "Orman Meyveli Çiçek Desenli Mono Parfe",
    "code": "PST-DNK-MN-PRF-2",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 35
  },
  {
    "id": "prod-pt14-8",
    "name": "Karışık Meyveli Silindir Mono Parfe",
    "code": "PST-DNK-MN-PRF-3",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 36
  },
  {
    "id": "prod-pt14-9",
    "name": "Yaban Mersinli (Blueberry) Cheesecake Dilimi",
    "code": "PST-DNK-DL-BLU-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 37
  },
  {
    "id": "prod-pt14-10",
    "name": "Kahve Çekirdeği Şekilli Mono Mousse Pasta",
    "code": "PST-DNK-MN-COF-BEAN",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 38
  },
  {
    "id": "prod-pt14-11",
    "name": "Bitter Çikolata & Fıstık Kaplı Baton Mono Kek",
    "code": "PST-DNK-MN-BAT-CHOC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 39
  },
  {
    "id": "prod-pt14-12",
    "name": "Gökkuşağı (Rainbow) Katlı Dilim Pasta",
    "code": "PST-DNK-DL-RNB",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 40
  },
  {
    "id": "prod-pt14-13",
    "name": "Karamelli & Krokantlı Dilim Pasta",
    "code": "PST-DNK-DL-CRM-KROK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 41
  },
  {
    "id": "prod-pt14-14",
    "name": "Oreo & Karamel Kremalı Mono Pasta",
    "code": "PST-DNK-MN-OREO-CRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 42
  },
  {
    "id": "prod-pt14-15",
    "name": "Antep Fıstıklı & Ganajlı Mono Pasta",
    "code": "PST-DNK-MN-PST-GNJ",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 43
  },
  {
    "id": "prod-pt14-16",
    "name": "Fıstıklı & Çikolata Kremalı Mini Mono Pasta",
    "code": "PST-DNK-MN-PST-MINI",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 44
  },
  {
    "id": "prod-pt14-17",
    "name": "Çikolatalı Kadife Mousse Dilim Pasta",
    "code": "PST-DNK-DL-CHOC-VLV",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 45
  },
  {
    "id": "prod-pt14-18",
    "name": "Yoğun Çikolatalı Mono Box Mousse Tatlısı",
    "code": "PST-DNK-BX-CHOC-MSS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 46
  },
  {
    "id": "prod-pt14-19",
    "name": "Orman Meyveli & Kadife Mono Box Kutu Pasta",
    "code": "PST-DNK-BX-FRM-MSS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 47
  },
  {
    "id": "prod-pt14-20",
    "name": "Profiterollü & Supangle Mono Box Tatlısı",
    "code": "PST-DNK-BX-PRO-SUP",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 48
  },
  {
    "id": "prod-pt15-1",
    "name": "Antep Fıstıklı Magnolia Mono Box Tatlısı",
    "code": "PST-DNK-BX-PST",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 49
  },
  {
    "id": "prod-pt15-2",
    "name": "Yaban Mersinli & Böğürtlenli Dilim Pasta",
    "code": "PST-DNK-DLM-BLU",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 50
  },
  {
    "id": "prod-pt15-3",
    "name": "İtalyan Tiramisu & Kakaolu Mousse Dilim Pasta",
    "code": "PST-DNK-DLM-TIR-CHOC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 51
  },
  {
    "id": "prod-pt15-4",
    "name": "Frambuazlı & Çikolatalı Parfe Kup Tatlısı",
    "code": "PST-DNK-KP-FRM-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 52
  },
  {
    "id": "prod-pt15-5",
    "name": "Karamelize Fındık & Krokanlı Mono Pasta",
    "code": "PST-DNK-MN-KRO-CAR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 53
  },
  {
    "id": "prod-pt15-6",
    "name": "Bol Çikolata Parçacıklı Gurme Amerikan Cookie (2'li / Koli)",
    "code": "PST-DNK-CKI-CHOC-2",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 54
  },
  {
    "id": "prod-pt15-7",
    "name": "Klasik Vanilyalı & Çikolata Taneli Jumbo Cookie (3'lü Sunum)",
    "code": "PST-DNK-CKI-JUMBO-3",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 55
  },
  {
    "id": "prod-pt15-8",
    "name": "Mavi Haşhaşlı & Limonlu Baton Dilim Kek",
    "code": "PST-DNK-KEK-HSH-LIM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 56
  },
  {
    "id": "prod-pt15-9",
    "name": "Fırın Tipi Çift Çikolatalı Gurme Cookie (2'li Paket)",
    "code": "PST-DNK-CKI-DBL-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 57
  },
  {
    "id": "prod-pt15-10",
    "name": "Mozaik (Ebruli) Kakaolu & Sade Baton Dilim Kek",
    "code": "PST-DNK-KEK-MOZ-BAT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 58
  },
  {
    "id": "prod-pt15-11",
    "name": "Havuçlu, Tarçınlı & Cevizli Gurme Baton Dilim Kek",
    "code": "PST-DNK-KEK-HVC-TRC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 59
  },
  {
    "id": "prod-pt15-12",
    "name": "Çikolata Ganajlı & Vanilyalı Kare Mono Kup Tatlısı",
    "code": "PST-DNK-KP-VAN-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 60
  },
  {
    "id": "prod-pt15-13",
    "name": "Red Velvet Kalp Mono Pasta",
    "code": "PST-DNK-MN-RED-HRT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 61
  },
  {
    "id": "prod-pt15-14",
    "name": "Boston Kremalı & Çikolata Soslu Dilim Pasta",
    "code": "PST-DNK-DLM-BST-CRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 62
  },
  {
    "id": "prod-pt15-15",
    "name": "Yulaflı & Damla Çikolatalı Gurme Cookie (2'li)",
    "code": "PST-DNK-CKI-OAT-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 63
  },
  {
    "id": "prod-pt15-16",
    "name": "Limonlu Kadife Kubbe (Lemon Dome) Mono Pasta",
    "code": "PST-DNK-MN-LIM-DOM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 64
  },
  {
    "id": "prod-pt15-17",
    "name": "Tropikal Mango & Çarkıfelek Kubbe Mono Pasta",
    "code": "PST-DNK-MN-MNG-PAS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 65
  },
  {
    "id": "prod-pt15-18",
    "name": "Karamelli & Fıstıklı Snickers Mono Pasta",
    "code": "PST-DNK-MN-SNK-CAR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 66
  },
  {
    "id": "prod-pt15-19",
    "name": "Red Velvet & Antep Fıstıklı Gurme Dilim Pasta",
    "code": "PST-DNK-DLM-RED-PST",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 67
  },
  {
    "id": "prod-pt15-20",
    "name": "Red Velvet Cheesecake Dilim Pasta",
    "code": "PST-DNK-DLM-RED-CHK",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 68
  },
  {
    "id": "prod-pt15-21",
    "name": "Yoğun Bitter Çikolatalı & Deniz Tuzlu Gurme Tartlet",
    "code": "PST-DNK-TRT-BIT-CHOC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 69
  },
  {
    "id": "prod-pt15-22",
    "name": "Çıtır Kıtır Craquelin Ekler Kabuğu & Dolgulu Ekler",
    "code": "PST-DNK-EKL-CRQ-10",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 70
  },
  {
    "id": "prod-pt16-1",
    "name": "Mango Trompe-l'œil Gurme Mono Pasta",
    "code": "PST-DNK-MN-MNG-TRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 71
  },
  {
    "id": "prod-pt16-2",
    "name": "Tropikal Mango Mousse İllüzyon Mono Pasta",
    "code": "PST-DNK-MN-MNG-V2",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 72
  },
  {
    "id": "prod-pt16-3",
    "name": "Antep Fıstığı Görünümlü Trompe-l'œil Mono Pasta",
    "code": "PST-DNK-MN-PST-TRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 73
  },
  {
    "id": "prod-pt16-4",
    "name": "Fıstık Rüyası Gurme Mono İllüzyon Pasta",
    "code": "PST-DNK-MN-PST-V2",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 74
  },
  {
    "id": "prod-pt16-5",
    "name": "Yoğun Bitter Çikolatalı Devil's Dilim Pasta",
    "code": "PST-DNK-DLM-DEV-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 75
  },
  {
    "id": "prod-pt16-6",
    "name": "Fransız Usulü Çıtır Craquelin Kremalı Choux Halka Pasta",
    "code": "PST-DNK-MN-CHX-PRS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 76
  },
  {
    "id": "prod-pt16-7",
    "name": "Geleneksel Çikolatalı Bisküvili Mozaik Dilim Pasta",
    "code": "PST-DNK-DLM-MOZ-CLS",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 77
  },
  {
    "id": "prod-pt16-8",
    "name": "Orijinal San Sebastian Yanık Cheesecake Dilim Pasta",
    "code": "PST-DNK-DLM-SAN-SEB",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 78
  },
  {
    "id": "prod-pt16-9",
    "name": "Bol Antep Fıstığı Kaplı Kubbe Mono Pasta",
    "code": "PST-DNK-MN-PST-DOM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 79
  },
  {
    "id": "prod-pt16-10",
    "name": "Lotus Biscoff Karamel Bisküvili Cheesecake Dilim",
    "code": "PST-DNK-DLM-CHK-LOT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 80
  },
  {
    "id": "prod-pt16-11",
    "name": "Vişneli Kara Orman Meyveli Çikolatalı Dilim Pasta",
    "code": "PST-DNK-DLM-BLK-FOR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 81
  },
  {
    "id": "prod-pt16-12",
    "name": "Fransız Usulü Çıtır Craquelin Kremalı Gurme Ekler",
    "code": "PST-DNK-EKL-CRQ-LNG",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 82
  },
  {
    "id": "prod-pt16-13",
    "name": "Orman Meyveli & Makaronlu Glazür Kubbe Mono Pasta",
    "code": "PST-DNK-MN-FRT-DOM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 83
  },
  {
    "id": "prod-pt16-14",
    "name": "Beyaz Çikolata Parçacıklı Profiterollü Polka Mono Pasta",
    "code": "PST-DNK-MN-WHT-POL",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 84
  },
  {
    "id": "prod-pt16-15",
    "name": "Klasik Red Velvet (Kırmızı Kadife) Dilim Pasta",
    "code": "PST-DNK-DLM-RED-VEL",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 85
  },
  {
    "id": "prod-pt16-16",
    "name": "Vişneli & Beyaz Kremalı Dikdörtgen Dilim Pasta",
    "code": "PST-DNK-DLM-OPR-BER",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 86
  },
  {
    "id": "prod-pt16-17",
    "name": "Mocha & Karamel Glazürlü Çok Katlı Opera Dilim Pasta",
    "code": "PST-DNK-DLM-OPR-MCH",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 87
  },
  {
    "id": "prod-pt16-18",
    "name": "Kahveli & Fırınlanmış Karamel Opera Dilim Pasta",
    "code": "PST-DNK-DLM-OPR-ESP",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 88
  },
  {
    "id": "prod-pt16-19",
    "name": "Kremalı Havuçlu, Tarçınlı & Bol Cevizli Dilim Pasta",
    "code": "PST-DNK-DLM-HVC-CRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 89
  },
  {
    "id": "prod-pt16-20",
    "name": "Çikolatalı, Fındıklı & Hindistan Cevizli Kubbe Mono Pasta",
    "code": "PST-DNK-MN-CHO-FND",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 90
  },
  {
    "id": "prod-pt17-1",
    "name": "Belçika Çikolatalı Yoğun Mousse Dilim Pasta",
    "code": "PST-DNK-DLM-BEL-MOU",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 91
  },
  {
    "id": "prod-pt17-2",
    "name": "Bitter Çikolata Kaplı Profiterollü Polka Mono Pasta",
    "code": "PST-DNK-MN-BIT-POL",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 92
  },
  {
    "id": "prod-pt17-3",
    "name": "Limon Soslu Klasik New York Cheesecake Dilim",
    "code": "PST-DNK-DLM-CHK-LIM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 93
  },
  {
    "id": "prod-pt17-4",
    "name": "Sicilya Limonlu Gurme Cheesecake Dilim",
    "code": "PST-DNK-DLM-CHK-LM2",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 94
  },
  {
    "id": "prod-pt17-5",
    "name": "Çikolatalı & Bol Hindistan Cevizli Kartopu Mono Pasta",
    "code": "PST-DNK-MN-COC-BAL",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 95
  },
  {
    "id": "prod-pt17-6",
    "name": "Kavrulmuş Fındık Kaplı Karamel Kare Mono Pasta",
    "code": "PST-DNK-MN-KRO-FND",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 96
  },
  {
    "id": "prod-pt17-7",
    "name": "Süt Karamel & Dulce de Leche Kubbe Mono Pasta",
    "code": "PST-DNK-MN-DUL-CAR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 97
  },
  {
    "id": "prod-pt17-8",
    "name": "Çikolata Mousse & Beyaz Çikolata Bukleli Kubbe Mono",
    "code": "PST-DNK-MN-CHO-WTR",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 98
  },
  {
    "id": "prod-pt17-9",
    "name": "Frambuaz Soslu Klasik New York Cheesecake Dilim",
    "code": "PST-DNK-DLM-CHK-FRM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 99
  },
  {
    "id": "prod-pt17-10",
    "name": "Orijinal İtalyan Usulü Tiramisu Dilim Pasta",
    "code": "PST-DNK-DLM-TIR-ITA",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 100
  },
  {
    "id": "prod-pt17-11",
    "name": "Çikolata Glazürlü & Mascarpone Tiramisu Dilim Pasta",
    "code": "PST-DNK-DLM-TIR-GLZ",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 101
  },
  {
    "id": "prod-pt17-12",
    "name": "Espresso Aromalı Mascarpone Tiramisu Dilim",
    "code": "PST-DNK-DLM-TIR-ESP",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 102
  },
  {
    "id": "prod-pt17-13",
    "name": "Frambuazlı & Kırmızı Kadife 'Love' Kalp Mono Pasta",
    "code": "PST-DNK-MN-HRT-LOV",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 103
  },
  {
    "id": "prod-pt17-14",
    "name": "Red Velvet & Beyaz Çikolata Parçacıklı Gurme Cookie (2'li)",
    "code": "PST-DNK-CKI-RED-WHT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 104
  },
  {
    "id": "prod-pt17-15",
    "name": "Orman Meyveli & Böğürtlenli Cheesecake Dilim",
    "code": "PST-DNK-DLM-CHK-BER",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 105
  },
  {
    "id": "prod-pt17-16",
    "name": "Karamel Soslu & File Bademli Cheesecake Dilim",
    "code": "PST-DNK-DLM-CHK-ALM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 106
  },
  {
    "id": "prod-pt17-17",
    "name": "Çilekli & Ruby Magnolia Parfe Kup Tatlısı",
    "code": "PST-DNK-KP-STR-RUB",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 107
  },
  {
    "id": "prod-pt17-18",
    "name": "Süt Karamel & Bitter Ganajlı Gurme Kup Tatlısı",
    "code": "PST-DNK-KP-DUL-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 108
  },
  {
    "id": "prod-pt17-19",
    "name": "Limonlu & Karamel Katmanlı Oval Mono Box Tatlısı",
    "code": "PST-DNK-BX-LIM-OVL",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 109
  },
  {
    "id": "prod-pt17-20",
    "name": "Çikolata Ganajlı & Bisküvili Dikdörtgen Mono Box Tatlısı",
    "code": "PST-DNK-BX-CHO-REC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 110
  },
  {
    "id": "prod-pt18-1",
    "name": "Red Velvet & Antep Fıstıklı Dikdörtgen Mono Pasta",
    "code": "PST-DNK-MN-RED-PST-REC",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 111
  },
  {
    "id": "prod-pt18-2",
    "name": "Çilek & Frambuaz Dolgulu Kalp Mono Aşk Pastası",
    "code": "PST-DNK-MN-HRT-LOV-2",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 112
  },
  {
    "id": "prod-pt18-3",
    "name": "Çikolata Kaplamalı Orman Meyveli Rulo Mono Pasta",
    "code": "PST-DNK-MN-RUL-FRT",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 113
  },
  {
    "id": "prod-pt18-4",
    "name": "Yoğun Fındıklı & Kuru Meyveli Kare Brownie Dilim Pasta",
    "code": "PST-DNK-DLM-BRW-FND",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 114
  },
  {
    "id": "prod-pt18-5",
    "name": "Narenciye & Antep Fıstıklı Sarı Glazür Kubbe Mono Pasta",
    "code": "PST-DNK-MN-LIM-PST-DOM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-9",
    "categoryName": "Butik Pastalar",
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
    },
    "order": 115
  },
  {
    "id": "prod-pt18-6",
    "name": "Tane Yaban Mersinli & Krokan Kenarlı Cheesecake Dilim",
    "code": "PST-DNK-DLM-CHK-BLU-TN",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 116
  },
  {
    "id": "prod-pt18-7",
    "name": "Fransız Tereyağlı Sade Klasik Kruvasan (Pişmeye / Servise Hazır)",
    "code": "PST-DNK-UNL-KRV-SAD",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 117
  },
  {
    "id": "prod-pt18-8",
    "name": "New York Roll Spiral Kat Kat Kruvasan Çöreği",
    "code": "PST-DNK-UNL-NY-ROLL",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 118
  },
  {
    "id": "prod-pt18-9",
    "name": "Çikolata Dolgulu & Kavrulmuş Fındıklı Gurme Kruvasan",
    "code": "PST-DNK-UNL-KRV-CHO-FND",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 119
  },
  {
    "id": "prod-pt18-10",
    "name": "Fransız Pain au Chocolat (Çift Çikolata Çubuklu Çörek)",
    "code": "PST-DNK-UNL-PAIN-CHO",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 120
  },
  {
    "id": "prod-pt18-11",
    "name": "Gurme Tost & Sandviç Ekmeği Kalın Dilim (2'li Servis)",
    "code": "PST-DNK-UNL-TST-EKM",
    "codeGroup": "20:45 Pastacılık",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
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
    },
    "order": 121
  },
  {
    "id": "prod-byz-001",
    "name": "Krater Çilekli Meyve Karışımı 1kg",
    "code": "KRT-CLK-1000",
    "codeGroup": "Krater",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Olgun taze çileklerin eşsiz aroması ve pürüzsüz kıvamıyla dondurma, kokteyl, smoothie ve pasta dolgularında benzersiz meyve lezzeti sunar.",
    "imageUrl": "/beyazresimler/karisik/karisik_001.png",
    "isActive": true,
    "isFeatured": true,
    "price": 320,
    "vatRate": 20,
    "order": 122,
    "tags": [
      "Krater",
      "Çilek",
      "Meyve Karışımı",
      "Püre",
      "Smoothie",
      "Kokteyl"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Çilek (Strawberry)",
      "Kullanım": "Kokteyl, Smoothie, Dondurma, Pasta",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-002",
    "name": "Krater Kavunlu Meyve Karışımı 1kg",
    "code": "KRT-KVN-1000",
    "codeGroup": "Krater",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Yaz aylarının vazgeçilmezi tatlı kavun aromasıyla zenginleştirilmiş, ferahlatıcı kokteyl, frozen ve dondurma hazırlıkları için ideal meyve karışımı.",
    "imageUrl": "/beyazresimler/karisik/karisik_002.png",
    "isActive": true,
    "isFeatured": false,
    "price": 320,
    "vatRate": 20,
    "order": 123,
    "tags": [
      "Krater",
      "Kavun",
      "Meyve Karışımı",
      "Püre",
      "Frozen"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Kavun (Melon)",
      "Kullanım": "Frozen, Kokteyl, Smoothie, Gelato",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-003",
    "name": "Krater Maestro del Gelato Elmalı Meyve Karışımı 1kg",
    "code": "KRT-ELM-1000",
    "codeGroup": "Krater",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Kıtır ve ferahlatıcı yeşil elma özleriyle hazırlanmış profesyonel dondurma ve bar miksoloji meyve bazı.",
    "imageUrl": "/beyazresimler/karisik/karisik_003.png",
    "isActive": true,
    "isFeatured": false,
    "price": 320,
    "vatRate": 20,
    "order": 124,
    "tags": [
      "Krater",
      "Yeşil Elma",
      "Maestro del Gelato",
      "Püre",
      "Dondurma"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Yeşil Elma (Apple)",
      "Kullanım": "Gelato, Dondurma, Frozen, Mocktail",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-004",
    "name": "DaVinci Gourmet Condensed Milk Aromalı Bar Sosu 1L",
    "code": "DVG-CDL-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
    "description": "Yoğunlaştırılmış süt kıvamı ve karamelize süt tatlılığıyla İspanyol latte, frappé, tatlı ve pasta sunumları için lüks kıvam artırıcı sos.",
    "imageUrl": "/beyazresimler/karisik/karisik_004.png",
    "isActive": true,
    "isFeatured": false,
    "price": 420,
    "vatRate": 20,
    "order": 125,
    "tags": [
      "DaVinci Gourmet",
      "Condensed Milk",
      "Süt Sosu",
      "Spanish Latte",
      "Bar Sos"
    ],
    "specs": {
      "Hacim": "1 L",
      "Aroma": "Koyulaştırılmış Süt (Condensed Milk)",
      "Kullanım": "Spanish Latte, Frappé, Tatlı Süsleme",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-005",
    "name": "Krater Şeftalili Meyve Karışımı 1kg",
    "code": "KRT-SFT-1000",
    "codeGroup": "Krater",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Güneşte olgunlaşmış sulu şeftalilerin kadifemsi püre dokusu; buzlu çay, frozen, kokteyl ve dondurma tariflerinde doğal şeftali lezzeti sağlar.",
    "imageUrl": "/beyazresimler/karisik/karisik_005.png",
    "isActive": true,
    "isFeatured": false,
    "price": 320,
    "vatRate": 20,
    "order": 126,
    "tags": [
      "Krater",
      "Şeftali",
      "Meyve Karışımı",
      "Ice Tea",
      "Püre"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Şeftali (Peach)",
      "Kullanım": "Ice Tea, Frozen, Smoothie, Pasta Dolgusu",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-006",
    "name": "DaVinci Gourmet Çilek Fruit Beverage Mix 1L",
    "code": "DVG-FBM-STW-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Yüksek meyve konsantrasyonuna sahip DaVinci Gourmet çilek meyveli içecek bazı; smoothie, frozen ve imza kokteyller için barista standardı lezzet.",
    "imageUrl": "/beyazresimler/karisik/karisik_006.png",
    "isActive": true,
    "isFeatured": true,
    "price": 490,
    "vatRate": 20,
    "order": 127,
    "tags": [
      "DaVinci Gourmet",
      "Çilek",
      "Fruit Mix",
      "Smoothie",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "1 L",
      "Aroma": "Çilek (Strawberry)",
      "Kullanım": "Smoothie, Frozen Kokteyl, Limonata",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-007",
    "name": "DaVinci Gourmet Condensed Milk Aromalı Gurme Sos 1L (Varyant)",
    "code": "DVG-CDL-1000-B",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
    "description": "Yoğunlaştırılmış süt aromasıyla tatlı, waffle, pancake ve özel kahve reçetelerine zengin kremsi gövde kazandıran DaVinci gurme sos.",
    "imageUrl": "/beyazresimler/karisik/karisik_007.png",
    "isActive": true,
    "isFeatured": false,
    "price": 420,
    "vatRate": 20,
    "order": 128,
    "tags": [
      "DaVinci Gourmet",
      "Condensed Milk",
      "Bar Sos",
      "Latte",
      "Kahve"
    ],
    "specs": {
      "Hacim": "1 L",
      "Aroma": "Koyulaştırılmış Süt (Condensed Milk)",
      "Kullanım": "Kahve Barı, Tatlılar, Waffle",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-008",
    "name": "DaVinci Gourmet Mango Fruit Beverage Mix 1L",
    "code": "DVG-FBM-MNG-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Tropikal Alfonso mangolarının yoğun tatlılığı ve dolgun meyve lifleriyle hazırlanan premium mango meyve miksi.",
    "imageUrl": "/beyazresimler/karisik/karisik_008.png",
    "isActive": true,
    "isFeatured": true,
    "price": 490,
    "vatRate": 20,
    "order": 129,
    "tags": [
      "DaVinci Gourmet",
      "Mango",
      "Fruit Mix",
      "Tropikal",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "1 L",
      "Aroma": "Mango",
      "Kullanım": "Mango Frozen, Smoothie, Tropikal Kokteyl",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-009",
    "name": "DaVinci Gourmet Mixed Berry Fruit Beverage Mix 1L",
    "code": "DVG-FBM-MBR-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Böğürtlen, yaban mersini, ahududu ve frenk üzümünün mükemmel dengesi; hafif ekşimsi ve ferahlatıcı meyve miksi.",
    "imageUrl": "/beyazresimler/karisik/karisik_009.png",
    "isActive": true,
    "isFeatured": false,
    "price": 490,
    "vatRate": 20,
    "order": 130,
    "tags": [
      "DaVinci Gourmet",
      "Orman Meyveleri",
      "Mixed Berry",
      "Smoothie",
      "Fruit Mix"
    ],
    "specs": {
      "Hacim": "1 L",
      "Aroma": "Orman Meyveleri (Mixed Berry)",
      "Kullanım": "Berry Frozen, Smoothie, Kokteyl",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-010",
    "name": "Krater Maestro del Gelato Frambuazlı Meyve Karışımı 1kg",
    "code": "KRT-FRM-1000",
    "codeGroup": "Krater",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Canlı kırmızı rengi ve yoğun frambuaz asiditesiyle dondurma, sorbe, pastacılık sosları ve kokteyller için profesyonel meyve konsantresi.",
    "imageUrl": "/beyazresimler/karisik/karisik_010.png",
    "isActive": true,
    "isFeatured": false,
    "price": 320,
    "vatRate": 20,
    "order": 131,
    "tags": [
      "Krater",
      "Frambuaz",
      "Maestro del Gelato",
      "Püre",
      "Sorbe"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Frambuaz (Raspberry)",
      "Kullanım": "Sorbe, Gelato, Pasta Sosu, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-011",
    "name": "Caffè NONNO Hindistan Cevizi Frozen Meyve Püresi 750ml",
    "code": "NON-FRZ-COC-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Egzotik Hindistan cevizinin kremsi dokusu ve yoğun aroması; Piña Colada, smoothie, milkshake ve buzlu içecekler için hazır püre.",
    "imageUrl": "/beyazresimler/karisik/karisik_011.png",
    "isActive": true,
    "isFeatured": true,
    "price": 310,
    "vatRate": 20,
    "order": 132,
    "tags": [
      "Caffè NONNO",
      "Hindistan Cevizi",
      "Frozen Püre",
      "Piña Colada",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Hindistan Cevizi (Coconut)",
      "Kullanım": "Piña Colada, Frozen, Milkshake",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-012",
    "name": "Caffè NONNO Red Forest (Kırmızı Meyveler) Frozen Püre 750ml",
    "code": "NON-FRZ-RDF-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Kırmızı dağ meyvelerinin cezbedici yakut kırmızısı rengi ve mayhoş lezzetiyle ferahlatıcı frozen ve kokteyl bazı.",
    "imageUrl": "/beyazresimler/karisik/karisik_012.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 133,
    "tags": [
      "Caffè NONNO",
      "Red Forest",
      "Kırmızı Meyveler",
      "Frozen Püre"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Kırmızı Orman Meyveleri",
      "Kullanım": "Frozen, Kokteyl, Limonata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-013",
    "name": "Caffè NONNO Kavun (Melon) Frozen Meyve Püresi 750ml",
    "code": "NON-FRZ-MLN-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Yaz güneşini yansıtan mis kokulu kavun aromasıyla buzlu içeceklerde yoğun meyve hissi veren pratik bar püresi.",
    "imageUrl": "/beyazresimler/karisik/karisik_013.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 134,
    "tags": [
      "Caffè NONNO",
      "Kavun",
      "Frozen Püre",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Kavun (Melon)",
      "Kullanım": "Kavun Frozen, Smoothie, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-014",
    "name": "Caffè NONNO Karadut (Black Mulberry) Frozen Püre 750ml",
    "code": "NON-FRZ-MUL-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Ege karadutunun benzersiz tatlı-ekşi dengesi ve mor rengi; karadutlu limonata, frozen ve pastacılık için ideal.",
    "imageUrl": "/beyazresimler/karisik/karisik_014.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 135,
    "tags": [
      "Caffè NONNO",
      "Karadut",
      "Frozen Püre",
      "Limonata"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Karadut (Black Mulberry)",
      "Kullanım": "Karadut Limonata, Frozen, Smoothie",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-015",
    "name": "Caffè NONNO Çilek (Strawberry) Frozen Meyve Püresi 750ml",
    "code": "NON-FRZ-STW-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "En sevilen yaz klasiği; taze çilek aroması ve pürüzsüz dokusuyla çilekli margarita, frozen ve sütlü içeceklere lezzet katar.",
    "imageUrl": "/beyazresimler/karisik/karisik_015.png",
    "isActive": true,
    "isFeatured": true,
    "price": 310,
    "vatRate": 20,
    "order": 136,
    "tags": [
      "Caffè NONNO",
      "Çilek",
      "Frozen Püre",
      "Margarita"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Çilek (Strawberry)",
      "Kullanım": "Strawberry Frozen, Çilekli Milkshake, Smoothie",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-016",
    "name": "Caffè NONNO Şeftali (Peach) Frozen Meyve Püresi 750ml",
    "code": "NON-FRZ-PCH-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Bursa şeftalisinin buram buram aroması; Bellini kokteylleri, buzlu şeftali çayları ve frozen içecekler için mükemmel.",
    "imageUrl": "/beyazresimler/karisik/karisik_016.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 137,
    "tags": [
      "Caffè NONNO",
      "Şeftali",
      "Frozen Püre",
      "Bellini",
      "Ice Tea"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Şeftali (Peach)",
      "Kullanım": "Bellini, Peach Ice Tea, Frozen",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-017",
    "name": "Caffè NONNO Mango Frozen Meyve Püresi 750ml",
    "code": "NON-FRZ-MNG-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Egzotik sarı mango lezzetiyle bar menülerine tropikal canlılık kazandıran frozen meyve püresi.",
    "imageUrl": "/beyazresimler/karisik/karisik_017.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 138,
    "tags": [
      "Caffè NONNO",
      "Mango",
      "Frozen Püre",
      "Tropikal"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Mango",
      "Kullanım": "Mango Frozen, Tropikal Kokteyl, Smoothie",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-018",
    "name": "DaVinci Gourmet Mixed Berry Fruit Beverage Mix 1L (Gurme Şişe)",
    "code": "DVG-FBM-MBR-1000-B",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Dengeli böğürtlen, çilek ve yaban mersini harmanı; buz ve sütle kolay karışan profesyonel meyve bazı.",
    "imageUrl": "/beyazresimler/karisik/karisik_018.png",
    "isActive": true,
    "isFeatured": false,
    "price": 490,
    "vatRate": 20,
    "order": 139,
    "tags": [
      "DaVinci Gourmet",
      "Orman Meyveleri",
      "Fruit Mix"
    ],
    "specs": {
      "Hacim": "1 L",
      "Aroma": "Orman Meyveleri (Mixed Berry)",
      "Kullanım": "Smoothie, Frozen, Kokteyl",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-019",
    "name": "Caffè NONNO Karpuz (Watermelon) Frozen Meyve Püresi 750ml",
    "code": "NON-FRZ-WTR-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Yaz sıcağında serinletici karpuz tadı; frozen, karpuzlu kokteyl ve slush hazırlıkları için yoğun meyve konsantresi.",
    "imageUrl": "/beyazresimler/karisik/karisik_019.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 140,
    "tags": [
      "Caffè NONNO",
      "Karpuz",
      "Frozen Püre",
      "Yaz İçeceği"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Karpuz (Watermelon)",
      "Kullanım": "Karpuz Frozen, Frozen Margarita",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-020",
    "name": "DaVinci Gourmet Passionfruit Fruit Beverage Mix 1L",
    "code": "DVG-FBM-PAS-1000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Çarkıfelek meyvesinin cezbedici egzotik kokusu ve asiditesi; Pornstar Martini, tropikal limonata ve frozenlar için benzersiz.",
    "imageUrl": "/beyazresimler/karisik/karisik_020.png",
    "isActive": true,
    "isFeatured": false,
    "price": 490,
    "vatRate": 20,
    "order": 141,
    "tags": [
      "DaVinci Gourmet",
      "Passionfruit",
      "Çarkıfelek",
      "Fruit Mix"
    ],
    "specs": {
      "Hacim": "1 L",
      "Aroma": "Çarkıfelek (Passionfruit)",
      "Kullanım": "Pornstar Martini, Tropikal Limonata, Frozen",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-021",
    "name": "Caffè NONNO Karamel Aromalı Kahve Şurubu 750ml",
    "code": "NON-SYR-CAR-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kavrulmuş tereyağlı şeker lezzeti; sıcak ve soğuk latte, macchiato ve frappelerde zengin karamel tadı sunar.",
    "imageUrl": "/beyazresimler/karisik/karisik_021.png",
    "isActive": true,
    "isFeatured": true,
    "price": 270,
    "vatRate": 20,
    "order": 142,
    "tags": [
      "Caffè NONNO",
      "Karamel",
      "Kahve Şurubu",
      "Barista"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Karamel (Caramel)",
      "Kullanım": "Caramel Latte, Macchiato, Frappe",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-022",
    "name": "Caffè NONNO Ahududu (Raspberry) Frozen Meyve Püresi 750ml",
    "code": "NON-FRZ-RAS-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Taptaze ahududuların yoğun aroması ve kırmızı rengiyle kokteyl, frozen ve pastacılık soslarında birinci sınıf performans.",
    "imageUrl": "/beyazresimler/karisik/karisik_022.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 143,
    "tags": [
      "Caffè NONNO",
      "Ahududu",
      "Frambuaz",
      "Frozen Püre"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Ahududu (Raspberry)",
      "Kullanım": "Frozen, Smoothie, Kokteyl, Tatlı Sosu",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-023",
    "name": "Caffè NONNO Mojito Aromalı Kokteyl Şurubu 750ml",
    "code": "NON-SYR-MOJ-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Ferahlatıcı nane yaprakları ve taze misket limonu dengesi; alkollü ve alkolsüz Mojito tariflerini saniyeler içinde hazırlar.",
    "imageUrl": "/beyazresimler/karisik/karisik_023.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 144,
    "tags": [
      "Caffè NONNO",
      "Mojito",
      "Nane",
      "Kokteyl Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Mojito (Nane & Misket Limonu)",
      "Kullanım": "Virgin Mojito, Kokteyl, Soğuk Çay",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-024",
    "name": "Caffè NONNO Fındık (Hazelnut) Aromalı Kahve Şurubu 750ml",
    "code": "NON-SYR-HAZ-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kavrulmuş Karadeniz fındığı aroması; espresso bazlı içeceklere derinlik katan klasik barista şurubu.",
    "imageUrl": "/beyazresimler/karisik/karisik_024.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 145,
    "tags": [
      "Caffè NONNO",
      "Fındık",
      "Kahve Şurubu",
      "Barista"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Fındık (Hazelnut)",
      "Kullanım": "Hazelnut Latte, Cappuccino, Soğuk Kahve",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-025",
    "name": "Caffè NONNO Cool Berry Aromalı Bar Şurubu 750ml",
    "code": "NON-SYR-CBY-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Orman meyveleri ve serinletici ferahlık notalarının harmanı; yaz menülerinin gözdesi buzlu berry içecekler için ideal.",
    "imageUrl": "/beyazresimler/karisik/karisik_025.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 146,
    "tags": [
      "Caffè NONNO",
      "Cool Berry",
      "Soğuk İçecek",
      "Bar Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Cool Berry",
      "Kullanım": "Cooler, Soğuk İçecek, Limonata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-026",
    "name": "Caffè NONNO Cool Lime Aromalı Bar Şurubu 750ml",
    "code": "NON-SYR-CLM-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Ekstra ferah nane ve yeşil misket limonu esansı; kafelerin en çok satan buzlu Cool Lime içeceğini kolayca üretmenizi sağlar.",
    "imageUrl": "/beyazresimler/karisik/karisik_026.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 147,
    "tags": [
      "Caffè NONNO",
      "Cool Lime",
      "Misket Limonu",
      "Refresher"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Cool Lime",
      "Kullanım": "Cool Lime Refresher, Buzlu İçecek",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-027",
    "name": "Caffè NONNO Vanilya Aromalı Kahve Şurubu 750ml",
    "code": "NON-SYR-VAN-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Madagaskar vanilyasının tatlı, yumuşak ve yuvarlak tat profili; kahvenin asiditesini mükemmel yumuşatır.",
    "imageUrl": "/beyazresimler/karisik/karisik_027.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 148,
    "tags": [
      "Caffè NONNO",
      "Vanilya",
      "Kahve Şurubu",
      "Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Vanilya (Vanilla)",
      "Kullanım": "Vanilla Latte, Frappe, Milkshake",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-028",
    "name": "Caffè NONNO Beyaz Çikolata Aromalı Kahve Şurubu 750ml",
    "code": "NON-SYR-WCH-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kakao yağı ve vanilya kremsiliği; White Chocolate Mocha ve sıcak sütlü spesiyaller için vazgeçilmez barista aroması.",
    "imageUrl": "/beyazresimler/karisik/karisik_028.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 149,
    "tags": [
      "Caffè NONNO",
      "Beyaz Çikolata",
      "White Mocha",
      "Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Beyaz Çikolata (White Chocolate)",
      "Kullanım": "White Mocha, Sıcak Çikolata, Frappe",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-029",
    "name": "Caffè NONNO Nane (Mint) Aromalı Kokteyl Şurubu 750ml",
    "code": "NON-SYR-MNT-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Doğal nane yapraklarının keskin ferahlığı; çikolatalı kahvelere nane dokunuşu veya ferahlatıcı kokteyller için.",
    "imageUrl": "/beyazresimler/karisik/karisik_029.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 150,
    "tags": [
      "Caffè NONNO",
      "Nane",
      "Mint",
      "Kokteyl Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Nane (Mint)",
      "Kullanım": "Kokteyl, Nane Çikolata Kahve, Limonata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-030",
    "name": "Caffè NONNO Çikolata Aromalı Kahve Şurubu 750ml",
    "code": "NON-SYR-CHO-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Koyu kakao lezzeti; Caffe Mocha, sıcak çikolata zenginleştirme ve aromalı soğuk kahvelerde dengeli tat sağlar.",
    "imageUrl": "/beyazresimler/karisik/karisik_030.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 151,
    "tags": [
      "Caffè NONNO",
      "Çikolata",
      "Mocha",
      "Kahve Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Çikolata (Chocolate)",
      "Kullanım": "Mocha, Sıcak Çikolata, Buzlu Kahve",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-031",
    "name": "DaVinci Gourmet Blue Ocean Aromalı Bar Şurubu 750ml",
    "code": "DVG-SYR-BOC-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Curaçao turunç narenciye tat profili ve büyüleyici elektrik mavisi rengiyle miksolojide imza sunumlar yaratır.",
    "imageUrl": "/beyazresimler/karisik/karisik_031.png",
    "isActive": true,
    "isFeatured": true,
    "price": 380,
    "vatRate": 20,
    "order": 152,
    "tags": [
      "DaVinci Gourmet",
      "Blue Ocean",
      "Mavi Şurup",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Blue Ocean / Turunç",
      "Kullanım": "Mavi Kokteyller, Mocktail, Tropikal Limonata",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-032",
    "name": "DaVinci Gourmet Classic Vanilla Aromalı Şurup 750ml",
    "code": "DVG-SYR-VAN-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Dünya baristalarının 1 numaralı tercihi; saf şeker kamışından üretilen, sıcak sütle ayrışmayan gerçek vanilya lezzeti.",
    "imageUrl": "/beyazresimler/karisik/karisik_032.png",
    "isActive": true,
    "isFeatured": true,
    "price": 380,
    "vatRate": 20,
    "order": 153,
    "tags": [
      "DaVinci Gourmet",
      "Vanilya",
      "Barista",
      "Classic Syrup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Klasik Vanilya (Classic Vanilla)",
      "Kullanım": "Latte, Flat White, Cold Brew, Milkshake",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-033",
    "name": "DaVinci Gourmet Shortbread Cookies Aromalı Şurup 750ml",
    "code": "DVG-SYR-SBC-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Geleneksel tereyağlı İskoç kurabiyesi lezzeti; kahvelere ve sıcak içeceklere fırından yeni çıkmış kurabiye hissi verir.",
    "imageUrl": "/beyazresimler/karisik/karisik_033.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 154,
    "tags": [
      "DaVinci Gourmet",
      "Kurabiye",
      "Shortbread",
      "Kahve Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Shortbread Cookies (Tereyağlı Kurabiye)",
      "Kullanım": "Kurabiyeli Latte, Frappe, Sıcak Süt",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-034",
    "name": "DaVinci Gourmet Classic Strawberry Aromalı Şurup 750ml",
    "code": "DVG-SYR-STW-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Doğal çilek lezzeti; soğuk çaylar, limonatalar, soda miksleri ve İtalyan sodalarında berrak ve canlı tat sunar.",
    "imageUrl": "/beyazresimler/karisik/karisik_034.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 155,
    "tags": [
      "DaVinci Gourmet",
      "Çilek",
      "İtalyan Sodası",
      "Limonata"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Klasik Çilek (Strawberry)",
      "Kullanım": "Limonata, İtalyan Sodası, Kokteyl, Soğuk Çay",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-035",
    "name": "DaVinci Gourmet Menta Cubano Aromalı Şurup 750ml",
    "code": "DVG-SYR-MCU-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Otantik Küba nanesinin doğal yeşil aroması ve tatlı narenciye dokunuşu; ferahlatıcı Mojito ve yaz kokteylleri için.",
    "imageUrl": "/beyazresimler/karisik/karisik_035.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 156,
    "tags": [
      "DaVinci Gourmet",
      "Menta Cubano",
      "Nane",
      "Mojito"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Menta Cubano (Küba Nanesi)",
      "Kullanım": "Mojito, Frozen, Soğuk İçecekler",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-036",
    "name": "DaVinci Gourmet Peach Garden Aromalı Şurup 750ml",
    "code": "DVG-SYR-PGD-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Taze bahçe şeftalilerinin kokusu; buzlu yeşil ve siyah çaylara, artisan gazozlara meyvemsi bir zenginlik katar.",
    "imageUrl": "/beyazresimler/karisik/karisik_036.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 157,
    "tags": [
      "DaVinci Gourmet",
      "Peach Garden",
      "Şeftali",
      "Ice Tea"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Peach Garden (Şeftali Bahçesi)",
      "Kullanım": "Peach Ice Tea, Artisan Soda, Kokteyl",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-037",
    "name": "DaVinci Gourmet Classic Hazelnut Aromalı Şurup 750ml",
    "code": "DVG-SYR-HAZ-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Zengin ve kavruk fındık notaları; espresso ile kusursuz birleşerek kadifemsi ve fındıklı içecekler yaratır.",
    "imageUrl": "/beyazresimler/karisik/karisik_037.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 158,
    "tags": [
      "DaVinci Gourmet",
      "Fındık",
      "Hazelnut",
      "Barista"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Klasik Fındık (Hazelnut)",
      "Kullanım": "Hazelnut Latte, Americano, Frappe",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-038",
    "name": "DaVinci Gourmet Pecan Praline Aromalı Şurup 750ml",
    "code": "DVG-SYR-PPR-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Pekan cevizi ve karamelize şeker pralinlerinin harika uyumu; gurme kahve menülerine lüks bir tat profili kazandırır.",
    "imageUrl": "/beyazresimler/karisik/karisik_038.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 159,
    "tags": [
      "DaVinci Gourmet",
      "Pecan Praline",
      "Pekan Cevizi",
      "Gurme Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Pecan Praline (Pekan Cevizi & Pralin)",
      "Kullanım": "Gurme Latte, Macchiato, Frappe",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-039",
    "name": "DaVinci Gourmet Lemon Tea Aromalı Şurup 750ml",
    "code": "DVG-SYR-LTE-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Doğal çay ekstraktı ve ferah limon suyu dengesi; sadece su ve buz ekleyerek barista standardında soğuk çay servisi sağlar.",
    "imageUrl": "/beyazresimler/karisik/karisik_039.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 160,
    "tags": [
      "DaVinci Gourmet",
      "Lemon Tea",
      "Soğuk Çay",
      "Limonata"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Lemon Tea (Limonlu Çay)",
      "Kullanım": "Limonlu Soğuk Çay, Kokteyl bazı",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-040",
    "name": "DaVinci Gourmet Forest Berries Aromalı Şurup 750ml",
    "code": "DVG-SYR-FBR-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Yaban mersini, ahududu ve böğürtlen notalarının harmanı; ferahlatıcı renk ve meyve aromasıyla parıldayan içecekler.",
    "imageUrl": "/beyazresimler/karisik/karisik_040.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 161,
    "tags": [
      "DaVinci Gourmet",
      "Forest Berries",
      "Orman Meyveleri",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Forest Berries (Orman Meyveleri)",
      "Kullanım": "Ice Tea, Limonata, Kokteyl, Soda",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-041",
    "name": "DaVinci Gourmet Classic Caramel Aromalı Şurup 750ml",
    "code": "DVG-SYR-CAR-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Erimiş esmer şeker ve kremsi tereyağ aroması; kahve profesyonellerinin vazgeçilmez premium karamel bazı.",
    "imageUrl": "/beyazresimler/karisik/karisik_041.png",
    "isActive": true,
    "isFeatured": true,
    "price": 380,
    "vatRate": 20,
    "order": 162,
    "tags": [
      "DaVinci Gourmet",
      "Karamel",
      "Caramel",
      "Barista"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Klasik Karamel (Classic Caramel)",
      "Kullanım": "Caramel Macchiato, Latte, Frappe",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-042",
    "name": "DaVinci Gourmet Roasted Almond Aromalı Şurup 750ml",
    "code": "DVG-SYR-RAL-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kavrulmuş bademin hafif odunsu ve tatlı lezzeti; özellikle badem sütlü veya yulaf sütlü kahvelerle olağanüstü uyum yakalar.",
    "imageUrl": "/beyazresimler/karisik/karisik_042.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 163,
    "tags": [
      "DaVinci Gourmet",
      "Badem",
      "Roasted Almond",
      "Kahve Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Kavrulmuş Badem (Roasted Almond)",
      "Kullanım": "Bademli Latte, Sıcak İçecekler, Kokteyl",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-043",
    "name": "DaVinci Gourmet Blueberry Aromalı Şurup 750ml",
    "code": "DVG-SYR-BLB-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Taze yaban mersini meyvesinin asil mor rengi ve tatlı ekşiliği; smoothie, milkshake ve imza mocktaillere benzersiz dokunuş.",
    "imageUrl": "/beyazresimler/karisik/karisik_043.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 164,
    "tags": [
      "DaVinci Gourmet",
      "Yaban Mersini",
      "Blueberry",
      "Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Yaban Mersini (Blueberry)",
      "Kullanım": "Blueberry Lemonade, Mocktail, Smoothie",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-044",
    "name": "DaVinci Gourmet White Chocolate Aromalı Şurup 750ml",
    "code": "DVG-SYR-WCH-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Zengin kakao yağı ve süt kreması lezzeti; White Chocolate Mocha içeceklerinde ayrışmadan homojen çözünür.",
    "imageUrl": "/beyazresimler/karisik/karisik_044.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 165,
    "tags": [
      "DaVinci Gourmet",
      "Beyaz Çikolata",
      "White Mocha",
      "Barista"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Beyaz Çikolata (White Chocolate)",
      "Kullanım": "White Mocha, Sıcak Çikolata, Frappe",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-045",
    "name": "DaVinci Gourmet Toffee Nut Aromalı Şurup 750ml",
    "code": "DVG-SYR-TFN-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "İngiliz karameli (toffee) ile kavruk fındığın sıcacık uyumu; kış menülerinin en çok satan latte şurubu.",
    "imageUrl": "/beyazresimler/karisik/karisik_045.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 166,
    "tags": [
      "DaVinci Gourmet",
      "Toffee Nut",
      "Karamel",
      "Fındık"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Toffee Nut (Karamelli Fındık)",
      "Kullanım": "Toffee Nut Latte, Frappé, Sıcak Kahve",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-046",
    "name": "DaVinci Gourmet Coconut Aromalı Şurup 750ml",
    "code": "DVG-SYR-COC-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Hindistan cevizinin taze sütlü egzotik tadı; tropikal mocktail, buzlu latte ve frappe reçetelerinin başrol oyuncusu.",
    "imageUrl": "/beyazresimler/karisik/karisik_046.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 167,
    "tags": [
      "DaVinci Gourmet",
      "Hindistan Cevizi",
      "Coconut",
      "Tropikal"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Hindistan Cevizi (Coconut)",
      "Kullanım": "Coconut Latte, Piña Colada, Kokteyl",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-047",
    "name": "DaVinci Gourmet Juicy Lime Aromalı Şurup 750ml",
    "code": "DVG-SYR-JLM-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Taze sıkılmış sulu misket limonu suyu aroması; içeceklerde keskin narenciye canlılığı ve ferahlık yaratır.",
    "imageUrl": "/beyazresimler/karisik/karisik_047.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 168,
    "tags": [
      "DaVinci Gourmet",
      "Juicy Lime",
      "Misket Limonu",
      "Narenciye"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Juicy Lime (Misket Limonu)",
      "Kullanım": "Margarita, Kokteyl Miksi, Limonata",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-048",
    "name": "DaVinci Gourmet Spiced Chai Aromalı Barista Şurubu 750ml",
    "code": "DVG-SYR-SCH-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Tarçın, kakule, zencefil ve karanfil baharatlarının otantik harmanı; sütle kolayca hazırlanan leziz Chai Tea Latte deneyimi.",
    "imageUrl": "/beyazresimler/karisik/karisik_048.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 169,
    "tags": [
      "DaVinci Gourmet",
      "Spiced Chai",
      "Chai Tea",
      "Baharat"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Spiced Chai (Baharatlı Çay)",
      "Kullanım": "Chai Tea Latte, Sıcak Baharatlı İçecekler",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-049",
    "name": "DaVinci Gourmet Chocolate Aromalı Şurup 750ml",
    "code": "DVG-SYR-CHO-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Saf kakao çekirdeklerinin derin çikolata lezzeti; Caffe Mocha ve çikolatalı içeceklerde pürüzsüz ve kalıcı tat bırakır.",
    "imageUrl": "/beyazresimler/karisik/karisik_049.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 170,
    "tags": [
      "DaVinci Gourmet",
      "Çikolata",
      "Mocha",
      "Kahve Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Çikolata (Chocolate)",
      "Kullanım": "Mocha, Buzlu Çikolata, Frappuccino",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-050",
    "name": "DaVinci Gourmet Butterscotch Aromalı Şurup 750ml",
    "code": "DVG-SYR-BSC-750",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kavrulmuş tereyağı, esmer şeker ve vanilya kremasının gurme uyumu; sıcak kahvelere nostaljik şekerleme lezzeti kazandırır.",
    "imageUrl": "/beyazresimler/karisik/karisik_050.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 171,
    "tags": [
      "DaVinci Gourmet",
      "Butterscotch",
      "Karamel",
      "Gurme Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Butterscotch (Tereyağlı Şekerleme)",
      "Kullanım": "Butterscotch Latte, Sıcak İçecekler",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-051",
    "name": "Caffè NONNO Blue Curacao Bar & Dekor Sosu 750g",
    "code": "NON-SOS-BCU-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
    "description": "Elektrik mavisi rengi ve portakal kabuğu turunç aromasıyla bardak içi süsleme, kokteyl dekorasyonu ve tatlı tabakları için özel kıvamlı sos.",
    "imageUrl": "/beyazresimler/karisik/karisik_051.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 172,
    "tags": [
      "Caffè NONNO",
      "Blue Curacao",
      "Bar Sos",
      "Dekor Sosu"
    ],
    "specs": {
      "Gramaj": "750 g",
      "Aroma": "Blue Curacao (Turunç)",
      "Kullanım": "Bardak İçi Süsleme, Kokteyl Sunumu, Dondurma",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-052",
    "name": "EASY MIX Refresher Orange Mango 700ml",
    "code": "EMX-REF-OMG-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Akdeniz portakalları ve egzotik mango püresinin birleşimi; sadece soda veya buzlu su ilave edilerek saniyeler içinde hazırlanan gurme refresher.",
    "imageUrl": "/beyazresimler/karisik/karisik_052.png",
    "isActive": true,
    "isFeatured": true,
    "price": 350,
    "vatRate": 20,
    "order": 173,
    "tags": [
      "EASY MIX",
      "Orange Mango",
      "Refresher",
      "Kokteyl Premiksi"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Aroma": "Portakal & Mango",
      "Kullanım": "Buzlu Refresher, Alkolsüz Mocktail, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-053",
    "name": "EASY MIX Bodrum Mandarin Kokteyl Premiksi 700ml",
    "code": "EMX-PRM-MND-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Coğrafi işaretli Bodrum mandalinasının taze uçucu yağları ve sulu lezzeti; cin, votka veya soda ile kusursuz uyumlu kokteyl bazı.",
    "imageUrl": "/beyazresimler/karisik/karisik_053.png",
    "isActive": true,
    "isFeatured": false,
    "price": 360,
    "vatRate": 20,
    "order": 174,
    "tags": [
      "EASY MIX",
      "Bodrum Mandalina",
      "Kokteyl Premiksi",
      "Spritz"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Aroma": "Bodrum Mandalinası",
      "Kullanım": "Mandarin Spritz, Gin Mandarin, Mocktail",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-054",
    "name": "DaVinci Gourmet Cheesecake Flavoured Sauce 2L",
    "code": "DVG-SOS-CHK-2000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
    "description": "New York cheesecake lezzeti; pürüzsüz krem peynir ve hafif vanilya tatlılığıyla frappe, milkshake ve pasta süslemelerinde rakipsiz 2 litrelik profesyonel sos.",
    "imageUrl": "/beyazresimler/karisik/karisik_054.png",
    "isActive": true,
    "isFeatured": true,
    "price": 750,
    "vatRate": 20,
    "order": 175,
    "tags": [
      "DaVinci Gourmet",
      "Cheesecake",
      "Bar Sos",
      "2 Litre",
      "Frappe"
    ],
    "specs": {
      "Hacim": "2 L",
      "Aroma": "Cheesecake",
      "Kullanım": "Frappe, Milkshake, Pasta Kaplama, Dondurma",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-055",
    "name": "DaVinci Gourmet White Chocolate Flavoured Sauce 2L",
    "code": "DVG-SOS-WCH-2000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
    "description": "Hakiki kakao yağı içeren kadifemsi beyaz çikolata sosu; White Mocha, sıcak çikolata ve tatlı tabaklarında parlak kıvam sunar.",
    "imageUrl": "/beyazresimler/karisik/karisik_055.png",
    "isActive": true,
    "isFeatured": false,
    "price": 750,
    "vatRate": 20,
    "order": 176,
    "tags": [
      "DaVinci Gourmet",
      "Beyaz Çikolata",
      "Bar Sos",
      "White Mocha"
    ],
    "specs": {
      "Hacim": "2 L",
      "Aroma": "Beyaz Çikolata (White Chocolate)",
      "Kullanım": "White Mocha, Sıcak Çikolata, Tatlı Süsleme",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-056",
    "name": "DaVinci Gourmet Caramel Flavoured Sauce 2L",
    "code": "DVG-SOS-CAR-2000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
    "description": "Geleneksel karamelize şeker ve tereyağı lezzeti; sıcak kahvelerde mükemmel akışkanlık ve soğuk içeceklerde yoğun gövde sağlar.",
    "imageUrl": "/beyazresimler/karisik/karisik_056.png",
    "isActive": true,
    "isFeatured": true,
    "price": 750,
    "vatRate": 20,
    "order": 177,
    "tags": [
      "DaVinci Gourmet",
      "Karamel",
      "Bar Sos",
      "Caramel Macchiato"
    ],
    "specs": {
      "Hacim": "2 L",
      "Aroma": "Karamel (Caramel)",
      "Kullanım": "Caramel Macchiato, Frappe, Waffle, Dondurma",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-057",
    "name": "DaVinci Gourmet Chocolate Flavoured Sauce 2L",
    "code": "DVG-SOS-CHO-2000",
    "codeGroup": "DaVinci Gourmet",
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
    "description": "Derin bitter kakao lezzeti ve parlak siyah dokusuyla Caffe Mocha, sıcak çikolata, profiterol ve waffle sunumları için 2L dev ambalaj.",
    "imageUrl": "/beyazresimler/karisik/karisik_057.png",
    "isActive": true,
    "isFeatured": false,
    "price": 750,
    "vatRate": 20,
    "order": 178,
    "tags": [
      "DaVinci Gourmet",
      "Çikolata",
      "Bar Sos",
      "Mocha",
      "2 Litre"
    ],
    "specs": {
      "Hacim": "2 L",
      "Aroma": "Yoğun Çikolata (Chocolate)",
      "Kullanım": "Mocha, Sıcak Çikolata, Tatlı, Waffle",
      "Menşei": "Malezya"
    }
  },
  {
    "id": "prod-byz-058",
    "name": "Caffè NONNO Beyaz Çikolata Bar & Dekor Sosu 750g",
    "code": "NON-SOS-WCH-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
    "description": "Tatlı tabakları, kahve köpükleri ve dondurma üzerinde parlak beyaz hatlar çizen pratik sıkma kapaklı beyaz çikolata sosu.",
    "imageUrl": "/beyazresimler/karisik/karisik_058.png",
    "isActive": true,
    "isFeatured": false,
    "price": 290,
    "vatRate": 20,
    "order": 179,
    "tags": [
      "Caffè NONNO",
      "Beyaz Çikolata",
      "Dekor Sosu",
      "Latte Art"
    ],
    "specs": {
      "Gramaj": "750 g",
      "Aroma": "Beyaz Çikolata (White Chocolate)",
      "Kullanım": "Latte Art Süsleme, Tatlı Tabağı, Dondurma",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-059",
    "name": "Caffè NONNO Muz Aromalı Bar & Dekor Sosu 750g",
    "code": "NON-SOS-BAN-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
    "description": "Sarı rengi ve yoğun muz lezzetiyle milkshake, waffle, krep ve dondurma sunumlarına neşeli ve lezzetli bir hava katar.",
    "imageUrl": "/beyazresimler/karisik/karisik_059.png",
    "isActive": true,
    "isFeatured": false,
    "price": 290,
    "vatRate": 20,
    "order": 180,
    "tags": [
      "Caffè NONNO",
      "Muz",
      "Dekor Sosu",
      "Waffle",
      "Milkshake"
    ],
    "specs": {
      "Gramaj": "750 g",
      "Aroma": "Muz (Banana)",
      "Kullanım": "Milkshake, Waffle, Dondurma Süsleme",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-060",
    "name": "Caffè NONNO Blue Curacao Bar & Dekor Sosu 750g (Açı 2)",
    "code": "NON-SOS-BCU-750-B",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-4",
    "categoryName": "Bar Sos",
    "categorySlug": "bar-sos",
    "description": "Mavi renkli turunç sosu; akışkan kıvamı sayesinde bardak kenarlarında şık dalga efektleri oluşturur.",
    "imageUrl": "/beyazresimler/karisik/karisik_060.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 181,
    "tags": [
      "Caffè NONNO",
      "Blue Curacao",
      "Dekor Sosu"
    ],
    "specs": {
      "Gramaj": "750 g",
      "Aroma": "Blue Curacao (Turunç)",
      "Kullanım": "Kokteyl Dekoru, Dondurma, Frozen",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-061",
    "name": "EASY MIX Citrus Blend Narenciye Kokteyl Premiksi 1000ml",
    "code": "EMX-PRM-CTR-1000",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Limon, misket limonu, portakal ve greyfurtun taze dengesi; ekşi-tatlı miks gerektiren tüm kokteyller için temel asidite bazı.",
    "imageUrl": "/beyazresimler/karisik/karisik_061.png",
    "isActive": true,
    "isFeatured": true,
    "price": 440,
    "vatRate": 20,
    "order": 182,
    "tags": [
      "EASY MIX",
      "Citrus Blend",
      "Narenciye",
      "Kokteyl Premiksi"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Aroma": "Citrus Blend (Narenciye Karışımı)",
      "Kullanım": "Sour Kokteyller, Collins, Gin Fizz",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-062",
    "name": "EASY MIX Cherry & Chocolate Kokteyl Premiksi 500ml",
    "code": "EMX-PRM-CCH-500",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Ekşi vişne, yabani orman meyveleri ve zengin bitter çikolata harmonisi; Black Forest esintili gurme kokteyller sunar.",
    "imageUrl": "/beyazresimler/karisik/karisik_062.png",
    "isActive": true,
    "isFeatured": false,
    "price": 340,
    "vatRate": 20,
    "order": 183,
    "tags": [
      "EASY MIX",
      "Vişne",
      "Çikolata",
      "Kokteyl Premiksi"
    ],
    "specs": {
      "Hacim": "500 ml",
      "Aroma": "Vişne, Orman Meyveleri & Çikolata",
      "Kullanım": "Gurme Kokteyl, Viski / Rom Eşleşmeleri",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-063",
    "name": "EASY MIX Refresher Rooibos Peach 700ml",
    "code": "EMX-REF-RBP-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Güney Afrika Rooibos çayı ve sulu şeftalinin kafeinsiz doğal birleşimi; ferahlatıcı botanik buzlu çay deneyimi.",
    "imageUrl": "/beyazresimler/karisik/karisik_063.png",
    "isActive": true,
    "isFeatured": false,
    "price": 350,
    "vatRate": 20,
    "order": 184,
    "tags": [
      "EASY MIX",
      "Rooibos Peach",
      "Şeftali",
      "Botanik Çay"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Aroma": "Rooibos Çayı & Şeftali",
      "Kullanım": "Botanik Ice Tea, Mocktail, Refresher",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-064",
    "name": "EASY MIX Tuxedo Kokteyl Premiksi 1000ml",
    "code": "EMX-PRM-TUX-1000",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Şık davetler ve gece menüleri için tasarlanmış; zarif narenciye ve botanik baharat karışımı imza kokteyl miksi.",
    "imageUrl": "/beyazresimler/karisik/karisik_064.png",
    "isActive": true,
    "isFeatured": false,
    "price": 440,
    "vatRate": 20,
    "order": 185,
    "tags": [
      "EASY MIX",
      "Tuxedo",
      "İmza Kokteyl",
      "Premix"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Aroma": "Tuxedo Signature Blend",
      "Kullanım": "İmza Kokteyller, Şampanya Kokteyli",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-065",
    "name": "EASY MIX Passion Martini Kokteyl Premiksi 1000ml",
    "code": "EMX-PRM-PSN-1000",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Dünyanın en popüler kokteyli Passion Fruit / Pornstar Martini için vanilya ve çarkıfelek meyvesiyle dengelenmiş hazır profesyonel karışım.",
    "imageUrl": "/beyazresimler/karisik/karisik_065.png",
    "isActive": true,
    "isFeatured": true,
    "price": 440,
    "vatRate": 20,
    "order": 186,
    "tags": [
      "EASY MIX",
      "Passion Martini",
      "Çarkıfelek",
      "Pornstar Martini"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Aroma": "Passion Martini (Çarkıfelek & Vanilya)",
      "Kullanım": "Passion Fruit Martini, Votka Kokteylleri",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-066",
    "name": "EASY MIX Passion Martini Kokteyl Premiksi 1000ml (Açı 2)",
    "code": "EMX-PRM-PSN-1000-B",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Barlarda servis hızını artıran, her kadehte standart reçete kalitesi sunan çarkıfelek kokteyl premiksi.",
    "imageUrl": "/beyazresimler/karisik/karisik_066.png",
    "isActive": true,
    "isFeatured": false,
    "price": 440,
    "vatRate": 20,
    "order": 187,
    "tags": [
      "EASY MIX",
      "Passion Martini",
      "Kokteyl"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Aroma": "Passion Martini",
      "Kullanım": "Martini, Spritz, Mocktail",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-067",
    "name": "EASY MIX Chili Mango Kokteyl Premiksi 1000ml",
    "code": "EMX-PRM-CHM-1000",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Tatlı tropikal mangonun damağı gıdıklayan tatlı acı kırmızı biber dokunuşuyla buluşması; tekila ve mezcal kokteyllerine mükemmel eşlikçi.",
    "imageUrl": "/beyazresimler/karisik/karisik_067.png",
    "isActive": true,
    "isFeatured": false,
    "price": 440,
    "vatRate": 20,
    "order": 188,
    "tags": [
      "EASY MIX",
      "Chili Mango",
      "Acılı Mango",
      "Margarita"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Aroma": "Chili Mango (Acılı Mango)",
      "Kullanım": "Spicy Margarita, Mezcalita, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-068",
    "name": "EASY MIX Purple Basil (Mor Fesleğen) Kokteyl Premiksi 1000ml",
    "code": "EMX-PRM-PBS-1000",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Taze mor fesleğenin aromatik kokusu ve göz alıcı mor rengi; cin kokteylleri ve ferahlatıcı spritz reçeteleri için.",
    "imageUrl": "/beyazresimler/karisik/karisik_068.png",
    "isActive": true,
    "isFeatured": false,
    "price": 440,
    "vatRate": 20,
    "order": 189,
    "tags": [
      "EASY MIX",
      "Mor Fesleğen",
      "Purple Basil",
      "Gin Kokteyl"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Aroma": "Mor Fesleğen (Purple Basil)",
      "Kullanım": "Basil Smash, Gin Basil, Mocktail",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-069",
    "name": "EASY MIX Refresher Pitaya (Ejder Meyvesi) 700ml",
    "code": "EMX-REF-PIT-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Göz alıcı fuşya rengi ve antioksidan zengini ejder meyvesi lezzeti; kafelerde trend olan Dragonfruit Refresher içecekleri için.",
    "imageUrl": "/beyazresimler/karisik/karisik_069.png",
    "isActive": true,
    "isFeatured": false,
    "price": 350,
    "vatRate": 20,
    "order": 190,
    "tags": [
      "EASY MIX",
      "Pitaya",
      "Ejder Meyvesi",
      "Refresher"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Aroma": "Pitaya / Ejder Meyvesi",
      "Kullanım": "Dragon Drink, Buzlu Refresher, Soda Miksi",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-070",
    "name": "EASY MIX Refresher Sorrel & Green Plum 700ml",
    "code": "EMX-REF-SGP-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Kuzukulağı yapraklarının doğal ekşiliği ile kütür yeşil erik ferahlığı; benzersiz gurme Anadolu lezzeti.",
    "imageUrl": "/beyazresimler/karisik/karisik_070.png",
    "isActive": true,
    "isFeatured": false,
    "price": 350,
    "vatRate": 20,
    "order": 191,
    "tags": [
      "EASY MIX",
      "Yeşil Erik",
      "Kuzukulağı",
      "Refresher"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Aroma": "Kuzukulağı & Yeşil Erik",
      "Kullanım": "Yeşil Erik Refresher, Gurme Mocktail",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-071",
    "name": "Caffè NONNO Toffee Nut Aromalı Kahve Şurubu 750ml",
    "code": "NON-SYR-TFN-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kavrulmuş fındık ve karamel lezzetinin kremsi birleşimi; kış sıcak kahve menülerinin vazgeçilmezi.",
    "imageUrl": "/beyazresimler/karisik/karisik_071.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 192,
    "tags": [
      "Caffè NONNO",
      "Toffee Nut",
      "Karamel",
      "Fındık"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Toffee Nut (Karamelli Fındık)",
      "Kullanım": "Toffee Nut Latte, Macchiato, Frappe",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-072",
    "name": "EASY MIX Watermelon Margarita Kokteyl Premiksi 500ml",
    "code": "EMX-PRM-WMR-500",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Sulu karpuz ve ferahlatıcı misket limonu suyu dengesi; tuzlu kenarlı bardakta buz gibi yaz margaritaları için hazır premiks.",
    "imageUrl": "/beyazresimler/karisik/karisik_072.png",
    "isActive": true,
    "isFeatured": false,
    "price": 340,
    "vatRate": 20,
    "order": 193,
    "tags": [
      "EASY MIX",
      "Watermelon Margarita",
      "Karpuz",
      "Margarita"
    ],
    "specs": {
      "Hacim": "500 ml",
      "Aroma": "Karpuz & Misket Limonu",
      "Kullanım": "Watermelon Margarita, Buzlu Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-073",
    "name": "EASY MIX Libido Egzotik Meyve Kokteyl Premiksi 1000ml",
    "code": "EMX-PRM-LBD-1000",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Tropikal meyveler, nar ve enerji veren botanik aromaların baştan çıkarıcı miksi; parti kokteyllerinin gözdesi.",
    "imageUrl": "/beyazresimler/karisik/karisik_073.png",
    "isActive": true,
    "isFeatured": false,
    "price": 440,
    "vatRate": 20,
    "order": 194,
    "tags": [
      "EASY MIX",
      "Libido",
      "Tropikal",
      "Kokteyl Premiksi"
    ],
    "specs": {
      "Hacim": "1000 ml",
      "Aroma": "Libido Tropikal Miks",
      "Kullanım": "Gece Kokteylleri, Parti İçecekleri",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-074",
    "name": "EASY MIX Refresher Ocean 700ml",
    "code": "EMX-REF-OCN-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Turkuaz deniz ferahlığı; narenciye ve tropikal meyve aromalarıyla buz gibi serinletici mavi refresher içecekleri sunar.",
    "imageUrl": "/beyazresimler/karisik/karisik_074.png",
    "isActive": true,
    "isFeatured": false,
    "price": 350,
    "vatRate": 20,
    "order": 195,
    "tags": [
      "EASY MIX",
      "Ocean",
      "Mavi Refresher",
      "Serinletici"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Aroma": "Ocean / Mavi Narenciye",
      "Kullanım": "Ocean Refresher, Mocktail, Mavi Limonata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-075",
    "name": "EASY MIX Melon (Kavun) Kokteyl Premiksi 700ml",
    "code": "EMX-PRM-MLN-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Yoğun kokulu bal kavunu aroması; Midori sour tarzı kokteyller veya kavunlu ferahlatıcı yaz miksleri için.",
    "imageUrl": "/beyazresimler/karisik/karisik_075.png",
    "isActive": true,
    "isFeatured": false,
    "price": 360,
    "vatRate": 20,
    "order": 196,
    "tags": [
      "EASY MIX",
      "Kavun",
      "Melon",
      "Kokteyl Premiksi"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Aroma": "Kavun (Melon)",
      "Kullanım": "Melon Sour, Kokteyl, Frozen",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-076",
    "name": "EASY MIX White Peach (Beyaz Şeftali) Kokteyl Premiksi 700ml",
    "code": "EMX-PRM-WPC-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Nadir bulunan aromatik beyaz şeftali özleri; Bellini ve zarif şampanya kokteyllerine ipeksi meyve lezzeti sağlar.",
    "imageUrl": "/beyazresimler/karisik/karisik_076.png",
    "isActive": true,
    "isFeatured": false,
    "price": 360,
    "vatRate": 20,
    "order": 197,
    "tags": [
      "EASY MIX",
      "Beyaz Şeftali",
      "White Peach",
      "Bellini"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Aroma": "Beyaz Şeftali (White Peach)",
      "Kullanım": "Bellini, White Peach Spritz, Mocktail",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-077",
    "name": "EASY MIX Raspberry (Frambuaz) Kokteyl Premiksi 700ml",
    "code": "EMX-PRM-RAS-700",
    "codeGroup": "EASY MIX",
    "categoryId": "cat-7",
    "categoryName": "Kokteyller",
    "categorySlug": "kokteyller",
    "description": "Canlı ahududu asiditesi ve aromatik zenginliği; Clover Club, Raspberry Collins ve meyveli mocktailler için ideal.",
    "imageUrl": "/beyazresimler/karisik/karisik_077.png",
    "isActive": true,
    "isFeatured": false,
    "price": 360,
    "vatRate": 20,
    "order": 198,
    "tags": [
      "EASY MIX",
      "Frambuaz",
      "Raspberry",
      "Kokteyl Premiksi"
    ],
    "specs": {
      "Hacim": "700 ml",
      "Aroma": "Frambuaz (Raspberry)",
      "Kullanım": "Clover Club, Raspberry Collins, Frozen",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-078",
    "name": "Caffè NONNO Nar (Pomegranate) Aromalı Kokteyl Şurubu 750ml",
    "code": "NON-SYR-POM-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Grena yakut kırmızısı rengi ve mayhoş nar lezzeti; barlarda nar ekşisi dengeli kokteyller ve limonatalar için.",
    "imageUrl": "/beyazresimler/karisik/karisik_078.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 199,
    "tags": [
      "Caffè NONNO",
      "Nar",
      "Pomegranate",
      "Kokteyl Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Nar (Pomegranate)",
      "Kullanım": "Nar Kokteyli, Grenadine alternatifi, Limonata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-079",
    "name": "Caffè NONNO Muz (Banana) Aromalı Bar Şurubu 750ml",
    "code": "NON-SYR-BAN-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Tropikal muz aroması; milkshake, buzlu kahve ve meyveli kokteyl reçetelerinde tatlı bir muz dokunuşu.",
    "imageUrl": "/beyazresimler/karisik/karisik_079.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 200,
    "tags": [
      "Caffè NONNO",
      "Muz",
      "Banana",
      "Bar Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Muz (Banana)",
      "Kullanım": "Muzlu Milkshake, Muzlu Latte, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-080",
    "name": "Caffè NONNO Tiramisu Aromalı Kahve Şurubu 750ml",
    "code": "NON-SYR-TRM-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Maskarpone peyniri, kedi dili bisküvi ve kakao notaları; kahvelere İtalyan tiramisu tatlısı lezzeti kazandırır.",
    "imageUrl": "/beyazresimler/karisik/karisik_080.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 201,
    "tags": [
      "Caffè NONNO",
      "Tiramisu",
      "İtalyan Kahvesi",
      "Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Tiramisu",
      "Kullanım": "Tiramisu Latte, Soğuk Kahve, Frappe",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-081",
    "name": "CALLEI Bitter Çikolatalı Sürülebilir Waffle & Krep Kreması 1kg",
    "code": "CAL-WFL-BIT-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Yoğun kakao aroması ve akışkan sürülebilir ipeksi dokusuyla sıcak waffle ve kreplerin üzerinde eriyen gurme bitter çikolata kreması.",
    "imageUrl": "/beyazresimler/karisik/karisik_081.png",
    "isActive": true,
    "isFeatured": true,
    "price": 320,
    "vatRate": 20,
    "order": 202,
    "tags": [
      "CALLEI",
      "Bitter Çikolata",
      "Waffle Kreması",
      "Krep"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Bitter Çikolata",
      "Kullanım": "Waffle, Krep, Pankek, Kruvasan Dolgusu",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-082",
    "name": "CALLEI Fındık Krokan Pasta & Waffle Süsleme 1kg",
    "code": "CAL-SUS-KRK-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Karamelize şekerle kaplanmış çıtır fındık parçacıkları; pasta kenarları, waffle ve dondurma üzerinde eşsiz çıtırlık sunar.",
    "imageUrl": "/beyazresimler/karisik/karisik_082.png",
    "isActive": true,
    "isFeatured": true,
    "price": 290,
    "vatRate": 20,
    "order": 203,
    "tags": [
      "CALLEI",
      "Fındık Krokan",
      "Pasta Süsleme",
      "Çıtır Topping"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Çeşit": "Fındık Krokan",
      "Kullanım": "Waffle Süsleme, Pasta Sıvama, Dondurma Topping",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-083",
    "name": "CALLEI Renkli Mini Draje Bonibon Pasta & Waffle Süsleme 1kg",
    "code": "CAL-SUS-DRJ-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Çıtır şeker kaplamalı rengarenk sütlü çikolata drajeleri; waffle, krep ve butik pasta tasarımlarına neşeli renk katar.",
    "imageUrl": "/beyazresimler/karisik/karisik_083.png",
    "isActive": true,
    "isFeatured": true,
    "price": 280,
    "vatRate": 20,
    "order": 204,
    "tags": [
      "CALLEI",
      "Bonibon",
      "Draje",
      "Renkli Şeker",
      "Waffle Süsleme"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Çeşit": "Renkli Mini Draje (Bonibon)",
      "Kullanım": "Waffle, Cupcake, Pasta Dekorasyonu",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-084",
    "name": "CALLEI Sütlü Damla Çikolata Süsleme 1kg",
    "code": "CAL-SUS-SML-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Fırınlanmaya dayanıklı, eridiğinde kremsi doku kazanan gerçek sütlü çikolata damlaları; kurabiye, muffin ve waffle için.",
    "imageUrl": "/beyazresimler/karisik/karisik_084.png",
    "isActive": true,
    "isFeatured": true,
    "price": 310,
    "vatRate": 20,
    "order": 205,
    "tags": [
      "CALLEI",
      "Sütlü Damla Çikolata",
      "Damla Çikolata",
      "Pastacılık"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Çeşit": "Sütlü Damla Çikolata",
      "Kullanım": "Kurabiye, Muffin, Waffle Topping, Kek",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-085",
    "name": "CALLEI Karışık Renkli Pasta & Waffle Şekerlemesi (Vermicelli) 1kg",
    "code": "CAL-SUS-VRM-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Rengarenk pirinç formlu pasta süsleme şekerleri; dondurma külahları, donutlar ve waffle tabaklarında göz alıcı sunumlar.",
    "imageUrl": "/beyazresimler/karisik/karisik_085.png",
    "isActive": true,
    "isFeatured": false,
    "price": 260,
    "vatRate": 20,
    "order": 206,
    "tags": [
      "CALLEI",
      "Pasta Şekeri",
      "Vermicelli",
      "Renkli Süsleme"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Çeşit": "Renkli Vermicelli Şekerleme",
      "Kullanım": "Donut, Waffle, Dondurma, Pasta",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-086",
    "name": "CALLEI Renkli Çakıltaşı Çikolata Draje 1kg",
    "code": "CAL-SUS-CKL-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Gerçek dere çakıltaşları görünümünde şeker kaplı lezzetli çikolata drajeleri; çocuk ve genç menülerinin favori süslemesi.",
    "imageUrl": "/beyazresimler/karisik/karisik_086.png",
    "isActive": true,
    "isFeatured": false,
    "price": 290,
    "vatRate": 20,
    "order": 207,
    "tags": [
      "CALLEI",
      "Çakıltaşı Draje",
      "Çikolata Draje",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Çeşit": "Renkli Çakıltaşı Çikolata",
      "Kullanım": "Waffle, Pasta, Kahve Yanı İkramlık",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-087",
    "name": "CALLEI Bitter Damla Çikolata Süsleme 1kg",
    "code": "CAL-SUS-DBT-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "%54 kakao oranıyla parlak yapısını koruyan profesyonel bitter damla çikolata; kurabiye ve pastacılık uygulamalarında fırın sıcaklığına dirençli.",
    "imageUrl": "/beyazresimler/karisik/karisik_087.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 208,
    "tags": [
      "CALLEI",
      "Bitter Damla Çikolata",
      "Damla Çikolata",
      "Kakao"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Çeşit": "Bitter Damla Çikolata",
      "Kullanım": "Kurabiye, Kek, Waffle, Sıcak Çikolata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-088",
    "name": "CALLEI Kavrulmuş Kıyılmış Fındık Parçaları 1kg",
    "code": "CAL-SUS-FND-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Özel fırınlanmış çıtır Giresun fındığı taneleri; waffle, krep, pasta ve dondurma üzerine doğal fındık zenginliği.",
    "imageUrl": "/beyazresimler/karisik/karisik_088.png",
    "isActive": true,
    "isFeatured": false,
    "price": 380,
    "vatRate": 20,
    "order": 209,
    "tags": [
      "CALLEI",
      "Kavrulmuş Fındık",
      "Fındık Parça",
      "Waffle Süsleme"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Çeşit": "Kavrulmuş Kıyılmış Fındık",
      "Kullanım": "Waffle Topping, Pasta Dekorasyonu, Dondurma",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-089",
    "name": "CALLEI Beyaz Damla Çikolata Süsleme 1kg",
    "code": "CAL-SUS-DBY-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Zengin süt ve vanilya aromalı beyaz çikolata damlaları; kırmızı kadife (red velvet) kekler ve waffle sunumları için mükemmel kontrast.",
    "imageUrl": "/beyazresimler/karisik/karisik_089.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 210,
    "tags": [
      "CALLEI",
      "Beyaz Damla Çikolata",
      "Pastacılık",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Çeşit": "Beyaz Damla Çikolata",
      "Kullanım": "Red Velvet, Kurabiye, Waffle, Pasta",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-090",
    "name": "CALLEI Profesyonel Hazır Waffle Tozu (Waffle Mix) 1kg",
    "code": "CAL-WFL-MIX-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Dışı çıtır çıtır, içi pamuk gibi yumuşak Belçika usulü waffle hazırlamak için sadece su ve yağ ile çırpılan profesyonel waffle harcı.",
    "imageUrl": "/beyazresimler/karisik/karisik_090.png",
    "isActive": true,
    "isFeatured": true,
    "price": 180,
    "vatRate": 20,
    "order": 211,
    "tags": [
      "CALLEI",
      "Waffle Tozu",
      "Waffle Mix",
      "Belçika Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Çeşit": "Hazır Waffle Karışımı",
      "Kullanım": "Waffle Makinesi, Belçika Waffle, Bubble Waffle",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-091",
    "name": "Caffè NONNO Toffee Nut Aromalı Şurup 750ml (Açı 2)",
    "code": "NON-SYR-TFN-750-B",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Karamel ve fındık notalarını dengeli sunan barista kalitesinde kahve şurubu.",
    "imageUrl": "/beyazresimler/karisik/karisik_091.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 212,
    "tags": [
      "Caffè NONNO",
      "Toffee Nut",
      "Kahve Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Toffee Nut",
      "Kullanım": "Sıcak/Soğuk Latte, Frappe",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-092",
    "name": "CALLEI Speculoos (Bisküvi Aromalı) Sürülebilir Waffle Kreması 1kg",
    "code": "CAL-WFL-SPC-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Tarçın ve karamelize Belçika bisküvisi aromalı sürülebilir krema; waffle ve kreplere sofistike Lotus esintisi katar.",
    "imageUrl": "/beyazresimler/karisik/karisik_092.png",
    "isActive": true,
    "isFeatured": false,
    "price": 340,
    "vatRate": 20,
    "order": 213,
    "tags": [
      "CALLEI",
      "Speculoos",
      "Bisküvi Kreması",
      "Waffle",
      "Lotus"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Speculoos (Karamelli Bisküvi)",
      "Kullanım": "Waffle, Krep, Cheesecake Dolgusu",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-093",
    "name": "CALLEI Bueno (Fındıklı Sütlü) Sürülebilir Waffle Kreması 1kg",
    "code": "CAL-WFL-BNO-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Yoğun fındık ezmesi ve beyaz kremanın efsanevi buluşması; Kinder Bueno lezzetini waffle ve kreplere taşıyan favori ürün.",
    "imageUrl": "/beyazresimler/karisik/karisik_093.png",
    "isActive": true,
    "isFeatured": true,
    "price": 340,
    "vatRate": 20,
    "order": 214,
    "tags": [
      "CALLEI",
      "Bueno",
      "Fındık Kreması",
      "Waffle Kreması"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Bueno Fındık & Süt Kreması",
      "Kullanım": "Waffle, Krep, Kruvasan, Pankek",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-094",
    "name": "CALLEI Beyaz Çikolatalı Sürülebilir Waffle & Krep Kreması 1kg",
    "code": "CAL-WFL-WHT-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "İpeksi sürülebilirliği ve saf kakao yağı tadıyla meyveli waffle tabaklarında çilek ve muz ile mükemmel lezzet uyumu.",
    "imageUrl": "/beyazresimler/karisik/karisik_094.png",
    "isActive": true,
    "isFeatured": false,
    "price": 320,
    "vatRate": 20,
    "order": 215,
    "tags": [
      "CALLEI",
      "Beyaz Çikolata",
      "Waffle Kreması",
      "Krep"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Beyaz Çikolata",
      "Kullanım": "Waffle, Krep, Tatlı Dolgusu",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-095",
    "name": "CALLEI Sütlü Çikolatalı Sürülebilir Waffle & Krep Kreması 1kg",
    "code": "CAL-WFL-MLK-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Geleneksel lezzet; yüksek kaliteli süt tozu ve kakao ile hazırlanan akışkan kıvamlı klasik waffle çikolatası.",
    "imageUrl": "/beyazresimler/karisik/karisik_095.png",
    "isActive": true,
    "isFeatured": false,
    "price": 320,
    "vatRate": 20,
    "order": 216,
    "tags": [
      "CALLEI",
      "Sütlü Çikolata",
      "Waffle Çikolatası",
      "Krep"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Sütlü Çikolata",
      "Kullanım": "Klasik Waffle, Krep, Tost Çikolatası",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-096",
    "name": "CALLEI Frambuaz Aromalı Pembe Sürülebilir Waffle Kreması 1kg",
    "code": "CAL-WFL-RAS-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Göz alıcı pembe rengi ve hafif mayhoş frambuaz aromasıyla çocuk ve gençlerin bayıldığı eğlenceli waffle kreması.",
    "imageUrl": "/beyazresimler/karisik/karisik_096.png",
    "isActive": true,
    "isFeatured": false,
    "price": 330,
    "vatRate": 20,
    "order": 217,
    "tags": [
      "CALLEI",
      "Pembe Krema",
      "Frambuaz",
      "Renkli Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Frambuaz (Pembe Krema)",
      "Kullanım": "Renkli Waffle, Krep, Cupcake Süsleme",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-097",
    "name": "CALLEI Bubble Gum Aromalı Mavi Sürülebilir Waffle Kreması 1kg",
    "code": "CAL-WFL-BBG-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Canlı gök mavisi rengi ve nostaljik sakız lezzeti; sosyal medyada fotoğrafı en çok paylaşılan çılgın waffle tasarımları için.",
    "imageUrl": "/beyazresimler/karisik/karisik_097.png",
    "isActive": true,
    "isFeatured": false,
    "price": 330,
    "vatRate": 20,
    "order": 218,
    "tags": [
      "CALLEI",
      "Bubble Gum",
      "Mavi Waffle",
      "Sakız Aromalı"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Bubble Gum (Mavi Krema)",
      "Kullanım": "Mavi Waffle, Krep, Donut Dolgusu",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-098",
    "name": "CALLEI Antep Fıstıklı Yeşil Sürülebilir Waffle Kreması 1kg",
    "code": "CAL-WFL-PST-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Hakiki Antep fıstığı ezmesiyle zenginleştirilmiş fıstık yeşili gurme krema; Dubai çikolatası esintili lüks waffle menüleri için.",
    "imageUrl": "/beyazresimler/karisik/karisik_098.png",
    "isActive": true,
    "isFeatured": true,
    "price": 390,
    "vatRate": 20,
    "order": 219,
    "tags": [
      "CALLEI",
      "Antep Fıstığı",
      "Dubai Waffle",
      "Yeşil Krema",
      "Gurme"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Antep Fıstığı (Yeşil Krema)",
      "Kullanım": "Dubai Waffle, Gurme Krep, Kruvasan",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-099",
    "name": "CALLEI Karamel Aromalı Sürülebilir Waffle & Krep Kreması 1kg",
    "code": "CAL-WFL-CAR-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Kavrulmuş karamel rengi ve yoğun karamel tadı; elma ve cevizli waffle kombinasyonlarında rakipsiz tat uyumu.",
    "imageUrl": "/beyazresimler/karisik/karisik_099.png",
    "isActive": true,
    "isFeatured": false,
    "price": 330,
    "vatRate": 20,
    "order": 220,
    "tags": [
      "CALLEI",
      "Karamel",
      "Karamel Kreması",
      "Waffle"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Karamel",
      "Kullanım": "Karamelli Waffle, Krep, Pankek",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-100",
    "name": "20:45 Donuk Dereotlu & Çörekotlu Mini Tuzlu Kurabiye (Tekli Gurme Sunum)",
    "code": "YKB-DNK-TKR-001",
    "codeGroup": "20:45 Unlu Mamuller",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Ağızda dağılan kıyır kıyır tereyağlı dokusu, taze dereotu ve çörekotu aromasıyla çay saatlerinin vazgeçilmez ikramlığı.",
    "imageUrl": "/beyazresimler/karisik/karisik_100.png",
    "isActive": true,
    "isFeatured": true,
    "price": 240,
    "vatRate": 20,
    "order": 221,
    "tags": [
      "20:45",
      "Tuzlu Kurabiye",
      "Dereotlu",
      "Donuk Unlu Mamul",
      "Çay Saati"
    ],
    "specs": {
      "Gramaj": "1 kg Koli",
      "Çeşit": "Dereotlu Çörekotlu Tuzlu Kurabiye",
      "Kullanım": "Çözündür Servis Et / Fırınlanabilir",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-101",
    "name": "20:45 Donuk Dereotlu & Çörekotlu Mini Tuzlu Kurabiye Porsiyon Tabağı",
    "code": "YKB-DNK-TKR-002",
    "codeGroup": "20:45 Unlu Mamuller",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Kafeterya ve otel açık büfelerinde hızlı servis için porsiyonlanmış, taze pişmiş lezzetinde tuzlu mini kurabiye.",
    "imageUrl": "/beyazresimler/karisik/karisik_101.png",
    "isActive": true,
    "isFeatured": false,
    "price": 240,
    "vatRate": 20,
    "order": 222,
    "tags": [
      "20:45",
      "Kurabiye Tabağı",
      "Tuzlu Kurabiye",
      "Donuk Unlu Mamul"
    ],
    "specs": {
      "Gramaj": "1 kg Koli",
      "Çeşit": "Dereotlu Çörekotlu Mini Kurabiye Tabağı",
      "Kullanım": "Otel Büfe, Kafe Servisi",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-102",
    "name": "Caffè NONNO Ananas (Pineapple) Frozen Meyve Püresi 750ml",
    "code": "NON-FRZ-PIN-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Altın sarısı olgun ananasların canlı tropikal aroması; Piña Colada, ananaslı smoothie ve buzlu içeceklerin vazgeçilmezi.",
    "imageUrl": "/beyazresimler/karisik/karisik_102.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 223,
    "tags": [
      "Caffè NONNO",
      "Ananas",
      "Frozen Püre",
      "Piña Colada"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Ananas (Pineapple)",
      "Kullanım": "Piña Colada, Tropikal Frozen, Smoothie",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-103",
    "name": "Caffè NONNO Cool Poka Aromalı Bar Şurubu 750ml",
    "code": "NON-SYR-CPK-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Ferahlatıcı narenciye ve tropikal botanik bileşenlerin özel harmanı; buz gibi yaz kokteylleri ve artisan sodalar için.",
    "imageUrl": "/beyazresimler/karisik/karisik_103.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 224,
    "tags": [
      "Caffè NONNO",
      "Cool Poka",
      "Bar Şurubu",
      "Refresher"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Cool Poka",
      "Kullanım": "Buzlu İçecek, Artisan Soda, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-104",
    "name": "Caffè NONNO Chocolate Cookies Aromalı Şurup 750ml",
    "code": "NON-SYR-CCK-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kakaolu çıtır kurabiye aroması; latte ve frappelere Oreo / çikolatalı bisküvi lezzeti kazandırır.",
    "imageUrl": "/beyazresimler/karisik/karisik_104.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 225,
    "tags": [
      "Caffè NONNO",
      "Chocolate Cookies",
      "Kurabiye Şurubu",
      "Kahve"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Chocolate Cookies (Kakaolu Kurabiye)",
      "Kullanım": "Kurabiyeli Latte, Frappe, Milkshake",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-105",
    "name": "Caffè NONNO Vişne (Cherry) Frozen Meyve Püresi 750ml",
    "code": "NON-FRZ-CHR-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Koyu kırmızı Kütahya vişnelerinin dolgun mayhoş lezzeti; vişneli frozen, soda miksi ve kokteyller için zengin meyve tabanı.",
    "imageUrl": "/beyazresimler/karisik/karisik_105.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 226,
    "tags": [
      "Caffè NONNO",
      "Vişne",
      "Cherry",
      "Frozen Püre"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Vişne (Cherry)",
      "Kullanım": "Vişneli Frozen, Smoothie, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-106",
    "name": "Caffè NONNO Muz (Banana) Frozen Meyve Püresi 750ml",
    "code": "NON-FRZ-BAN-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Gerçek muz püresi kıvamı ve tatlı aroması; muzlu frozen, milkshake ve meyveli smoothie içeceklerinde kremsi yapı oluşturur.",
    "imageUrl": "/beyazresimler/karisik/karisik_106.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 227,
    "tags": [
      "Caffè NONNO",
      "Muz",
      "Frozen Püre",
      "Smoothie"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Muz (Banana)",
      "Kullanım": "Muz Frozen, Smoothie, Milkshake",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-107",
    "name": "Caffè NONNO Yeşil Elma (Green Apple) Frozen Püre 750ml",
    "code": "NON-FRZ-GAP-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Granny Smith elmasının ferahlatıcı ekşi-tatlı tadı; yeşil elmalı frozen, ekşi kokteyller ve buzlu içeceklerde yüksek verim sağlar.",
    "imageUrl": "/beyazresimler/karisik/karisik_107.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 228,
    "tags": [
      "Caffè NONNO",
      "Yeşil Elma",
      "Green Apple",
      "Frozen Püre"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Yeşil Elma (Green Apple)",
      "Kullanım": "Apple Frozen, Apple Sour, Smoothie",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-108",
    "name": "20:45 Donuk Peynirli & Kaşarlı Mini Top Poğaça Porsiyon Tabağı",
    "code": "YKB-DNK-POG-001",
    "codeGroup": "20:45 Unlu Mamuller",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "İçi lezzetli kaşar ve beyaz peynir dolgulu, puf puf kabaran mini top poğaçalar; kahvaltı büfeleri ve atıştırmalık saatleri için.",
    "imageUrl": "/beyazresimler/karisik/karisik_108.png",
    "isActive": true,
    "isFeatured": true,
    "price": 250,
    "vatRate": 20,
    "order": 229,
    "tags": [
      "20:45",
      "Mini Poğaça",
      "Peynirli Poğaça",
      "Kahvaltı",
      "Donuk Unlu Mamul"
    ],
    "specs": {
      "Gramaj": "1 kg Koli",
      "Çeşit": "Peynirli Kaşarlı Mini Poğaça Tabağı",
      "Kullanım": "Isıt ve Servis Et / Fırınlanabilir",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-109",
    "name": "20:45 Donuk Peynirli & Kaşarlı Mini Top Poğaça (Tekli Gurme Sunum)",
    "code": "YKB-DNK-POG-002",
    "codeGroup": "20:45 Unlu Mamuller",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Altın sarısı fırınlanmış kabuğu ve eriyen peynir dolgusuyla tek lokmalık gurme lezzet.",
    "imageUrl": "/beyazresimler/karisik/karisik_109.png",
    "isActive": true,
    "isFeatured": false,
    "price": 250,
    "vatRate": 20,
    "order": 230,
    "tags": [
      "20:45",
      "Top Poğaça",
      "Kaşarlı",
      "Donuk Unlu Mamul"
    ],
    "specs": {
      "Gramaj": "1 kg Koli",
      "Çeşit": "Peynirli Mini Top Poğaça",
      "Kullanım": "Kafe İkramı, Sıcak Servis",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-110",
    "name": "Caffè NONNO Çarkıfelek (Passion Fruit) Frozen Püre 750ml",
    "code": "NON-FRZ-PAS-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Egzotik çarkıfelek meyvesinin cezbedici kokusu ve mayhoş asiditesi; kokteyl barlarının en çok talep gören püre çeşidi.",
    "imageUrl": "/beyazresimler/karisik/karisik_110.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 231,
    "tags": [
      "Caffè NONNO",
      "Çarkıfelek",
      "Passion Fruit",
      "Frozen Püre"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Çarkıfelek (Passion Fruit)",
      "Kullanım": "Passion Frozen, Tropikal Kokteyl, Limonata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-111",
    "name": "Caffè NONNO Kivi (Kiwi) Frozen Meyve Püresi 750ml",
    "code": "NON-FRZ-KIW-750",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Taze kivi çekirdekleri dokusu ve zümrüt yeşili rengi; ferahlatıcı yeşil detoks kokteylleri ve frozen içecekler için mükemmel.",
    "imageUrl": "/beyazresimler/karisik/karisik_111.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 232,
    "tags": [
      "Caffè NONNO",
      "Kivi",
      "Kiwi",
      "Frozen Püre"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Kivi (Kiwi)",
      "Kullanım": "Kiwi Frozen, Detoks İçecek, Smoothie",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-112",
    "name": "Krater Maestro del Gelato Yeşil Elmalı Meyve Karışımı 1kg (Varyant)",
    "code": "KRT-ELM-1000-B",
    "codeGroup": "Krater",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Doğal yeşil elma asitleri içeren dondurma ve tatlı preparatı; gelato ustaları için özel yoğun formül.",
    "imageUrl": "/beyazresimler/karisik/karisik_112.png",
    "isActive": true,
    "isFeatured": false,
    "price": 320,
    "vatRate": 20,
    "order": 233,
    "tags": [
      "Krater",
      "Yeşil Elma",
      "Gelato",
      "Meyve Karışımı"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Yeşil Elma",
      "Kullanım": "Gelato, Dondurma, Pasta İçi Meyve Sosu",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-113",
    "name": "Krater Maestro del Gelato Ananaslı Meyve Karışımı 1kg",
    "code": "KRT-PIN-1000",
    "codeGroup": "Krater",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Tropikal ananas parçacıkları ve nektarı içeren profesyonel dondurma ve bar miksoloji karışımı.",
    "imageUrl": "/beyazresimler/karisik/karisik_113.png",
    "isActive": true,
    "isFeatured": false,
    "price": 320,
    "vatRate": 20,
    "order": 234,
    "tags": [
      "Krater",
      "Ananas",
      "Maestro del Gelato",
      "Püre"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Aroma": "Ananas (Pineapple)",
      "Kullanım": "Ananas Gelato, Sorbe, Frozen, Tatlı Sosu",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-114",
    "name": "Monte Cristo Badem (Almond) Aromalı Barista Şurubu 750ml",
    "code": "MCR-SYR-ALM-750",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kavrulmuş acıbadem ve tatlı badem dengesi; kahveye ve Orgeat tarzı kokteyllere asil bir kuruyemiş aroması katar.",
    "imageUrl": "/beyazresimler/karisik/karisik_114.png",
    "isActive": true,
    "isFeatured": true,
    "price": 280,
    "vatRate": 20,
    "order": 235,
    "tags": [
      "Monte Cristo",
      "Badem",
      "Almond",
      "Orgeat",
      "Barista Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Badem (Almond)",
      "Kullanım": "Almond Latte, Mai Tai, Sıcak Çikolata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-115",
    "name": "Monte Cristo Chai Tea Aromalı Barista Şurubu 750ml",
    "code": "MCR-SYR-CHT-750",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kakule, tarçın, zencefil ve karanfil baharatlarının mistik Doğu harmanı; saniyeler içinde sıcacık Chai Latte hazırlar.",
    "imageUrl": "/beyazresimler/karisik/karisik_115.png",
    "isActive": true,
    "isFeatured": false,
    "price": 280,
    "vatRate": 20,
    "order": 236,
    "tags": [
      "Monte Cristo",
      "Chai Tea",
      "Baharatlı Şurup",
      "Latte"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Chai Tea (Baharatlı Çay)",
      "Kullanım": "Chai Tea Latte, Baharatlı Sıcak Süt",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-116",
    "name": "Monte Cristo Antep Fıstığı (Pistachio) Aromalı Barista Şurubu 750ml",
    "code": "MCR-SYR-PST-750",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Yeşil Antep fıstığının zarif ve zengin aroması; Pistachio Latte ve gurme kahve spesiyallerinin vazgeçilmezi.",
    "imageUrl": "/beyazresimler/karisik/karisik_116.png",
    "isActive": true,
    "isFeatured": true,
    "price": 280,
    "vatRate": 20,
    "order": 237,
    "tags": [
      "Monte Cristo",
      "Antep Fıstığı",
      "Pistachio",
      "Gurme Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Antep Fıstığı (Pistachio)",
      "Kullanım": "Pistachio Latte, Frappe, Soğuk Kahve",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-117",
    "name": "Monte Cristo Çikolata (Chocolate) Aromalı Barista Şurubu 750ml",
    "code": "MCR-SYR-CHO-750",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Koyu çikolata ve kavruk kakao çekirdeği zenginliği; kahve içeceklerinde dengeli ve kalıcı tatlılık.",
    "imageUrl": "/beyazresimler/karisik/karisik_117.png",
    "isActive": true,
    "isFeatured": false,
    "price": 280,
    "vatRate": 20,
    "order": 238,
    "tags": [
      "Monte Cristo",
      "Çikolata",
      "Mocha",
      "Kahve Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Çikolata (Chocolate)",
      "Kullanım": "Mocha, Çikolatalı Frappe, Sıcak Süt",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-118",
    "name": "Monte Cristo Balkabağı Baharatı (Pumpkin Spice) Aromalı Şurup 750ml",
    "code": "MCR-SYR-PMP-750",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Sonbaharın en popüler içeceği Pumpkin Spice Latte için tarçın, hindistan cevizi cevizi (muskat), karanfil ve tatlı balkabağı miksi.",
    "imageUrl": "/beyazresimler/karisik/karisik_118.png",
    "isActive": true,
    "isFeatured": true,
    "price": 280,
    "vatRate": 20,
    "order": 239,
    "tags": [
      "Monte Cristo",
      "Pumpkin Spice",
      "Balkabağı",
      "Sonbahar"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Pumpkin Spice (Balkabağı Baharatı)",
      "Kullanım": "Pumpkin Spice Latte, Soğuk Köpük, Sıcak Kahve",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-119",
    "name": "Monte Cristo Speculaas (Karamelli Bisküvi) Aromalı Şurup 750ml",
    "code": "MCR-SYR-SPC-750",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Geleneksel Hollanda/Belçika baharatlı bisküvisi lezzeti; kahvelere tereyağlı tarçınlı çıtır bisküvi hissi verir.",
    "imageUrl": "/beyazresimler/karisik/karisik_119.png",
    "isActive": true,
    "isFeatured": false,
    "price": 280,
    "vatRate": 20,
    "order": 240,
    "tags": [
      "Monte Cristo",
      "Speculaas",
      "Bisküvi Şurubu",
      "Lotus"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Speculaas (Karamelli Bisküvi)",
      "Kullanım": "Speculaas Latte, Frappe, Sıcak Çikolata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-120",
    "name": "20:45 Donuk Dereotlu & Çörekotlu Mini Tuzlu Kurabiye (Gurme Sunum 2)",
    "code": "YKB-DNK-TKR-003",
    "codeGroup": "20:45 Unlu Mamuller",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Çörekotu taneleriyle süslenmiş gevrek mini tuzlu kurabiye; toplantı araları ve çay ikramlarında profesyonel çözüm.",
    "imageUrl": "/beyazresimler/karisik/karisik_120.png",
    "isActive": true,
    "isFeatured": false,
    "price": 240,
    "vatRate": 20,
    "order": 241,
    "tags": [
      "20:45",
      "Tuzlu Kurabiye",
      "Donuk Unlu Mamul"
    ],
    "specs": {
      "Gramaj": "1 kg Koli",
      "Çeşit": "Dereotlu Tuzlu Kurabiye",
      "Kullanım": "İkramlık, Çay Saati",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-121",
    "name": "20:45 Donuk Dereotlu & Çörekotlu Mini Tuzlu Kurabiye Tabağı (Gurme Porsiyon 2)",
    "code": "YKB-DNK-TKR-004",
    "codeGroup": "20:45 Unlu Mamuller",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Servise hazır porsiyon sunumuyla kafe ve restoran operasyonlarında zamandan tasarruf sağlayan pratik unlu mamul.",
    "imageUrl": "/beyazresimler/karisik/karisik_121.png",
    "isActive": true,
    "isFeatured": false,
    "price": 240,
    "vatRate": 20,
    "order": 242,
    "tags": [
      "20:45",
      "Kurabiye Tabağı",
      "Donuk Unlu Mamul"
    ],
    "specs": {
      "Gramaj": "1 kg Koli",
      "Çeşit": "Mini Tuzlu Kurabiye Porsiyon",
      "Kullanım": "Kafe Menüsü, Kahve Yanı",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-122",
    "name": "Caffè NONNO Ananas Frozen Meyve Püresi 750ml (Açı 2)",
    "code": "NON-FRZ-PIN-750-B",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Yoğun meyve oranıyla hazırlanan tropikal ananas püresi.",
    "imageUrl": "/beyazresimler/karisik/karisik_122.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 243,
    "tags": [
      "Caffè NONNO",
      "Ananas",
      "Frozen Püre"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Ananas",
      "Kullanım": "Frozen, Kokteyl, Smoothie",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-123",
    "name": "Caffè NONNO Cool Poka Aromalı Şurup 750ml (Açı 2)",
    "code": "NON-SYR-CPK-750-B",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Serinletici aromatik meyve ve botanik şurup bazı.",
    "imageUrl": "/beyazresimler/karisik/karisik_123.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 244,
    "tags": [
      "Caffè NONNO",
      "Cool Poka",
      "Bar Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Cool Poka",
      "Kullanım": "Buzlu İçecek, Soda",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-124",
    "name": "Caffè NONNO Chocolate Cookies Aromalı Şurup 750ml (Açı 2)",
    "code": "NON-SYR-CCK-750-B",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kakaolu çikolatalı kurabiye tadıyla zenginleştirilmiş kahve şurubu.",
    "imageUrl": "/beyazresimler/karisik/karisik_124.png",
    "isActive": true,
    "isFeatured": false,
    "price": 270,
    "vatRate": 20,
    "order": 245,
    "tags": [
      "Caffè NONNO",
      "Kurabiye Şurubu",
      "Kahve"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Chocolate Cookies",
      "Kullanım": "Latte, Frappe, Milkshake",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-125",
    "name": "Caffè NONNO Vişne Frozen Meyve Püresi 750ml (Açı 2)",
    "code": "NON-FRZ-CHR-750-B",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Doğal vişne mayhoşluğu içeren profesyonel frozen meyve püresi.",
    "imageUrl": "/beyazresimler/karisik/karisik_125.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 246,
    "tags": [
      "Caffè NONNO",
      "Vişne",
      "Frozen Püre"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Vişne",
      "Kullanım": "Frozen, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-126",
    "name": "20:45 Donuk Peynirli Mini Top Poğaça (Tekli Gurme Sunum 2)",
    "code": "YKB-DNK-POG-003",
    "codeGroup": "20:45 Unlu Mamuller",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Fırından yeni çıkmış sıcaklığıyla leziz peynirli mini top poğaça.",
    "imageUrl": "/beyazresimler/karisik/karisik_126.png",
    "isActive": true,
    "isFeatured": false,
    "price": 250,
    "vatRate": 20,
    "order": 247,
    "tags": [
      "20:45",
      "Mini Poğaça",
      "Donuk Unlu Mamul"
    ],
    "specs": {
      "Gramaj": "1 kg Koli",
      "Çeşit": "Peynirli Poğaça",
      "Kullanım": "Kahvaltı, Sıcak Servis",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-127",
    "name": "Caffè NONNO Muz Frozen Meyve Püresi 750ml (Açı 2)",
    "code": "NON-FRZ-BAN-750-B",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Tatlı muz lezzeti ve kremsi doku sağlayan meyve püresi.",
    "imageUrl": "/beyazresimler/karisik/karisik_127.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 248,
    "tags": [
      "Caffè NONNO",
      "Muz",
      "Frozen Püre"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Muz",
      "Kullanım": "Smoothie, Milkshake, Frozen",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-128",
    "name": "Caffè NONNO Yeşil Elma Frozen Meyve Püresi 750ml (Açı 2)",
    "code": "NON-FRZ-GAP-750-B",
    "codeGroup": "Caffè NONNO",
    "categoryId": "cat-1",
    "categoryName": "Püreler",
    "categorySlug": "pureler",
    "description": "Ferahlatıcı kütür ekşi elma tadı içeren frozen püresi.",
    "imageUrl": "/beyazresimler/karisik/karisik_128.png",
    "isActive": true,
    "isFeatured": false,
    "price": 310,
    "vatRate": 20,
    "order": 249,
    "tags": [
      "Caffè NONNO",
      "Yeşil Elma",
      "Frozen Püre"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Yeşil Elma",
      "Kullanım": "Frozen, Kokteyl, Soda",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-129",
    "name": "20:45 Donuk Peynirli Mini Top Poğaça Tabağı (Gurme Porsiyon 2)",
    "code": "YKB-DNK-POG-004",
    "codeGroup": "20:45 Unlu Mamuller",
    "categoryId": "cat-5",
    "categoryName": "Pastalar",
    "categorySlug": "donuk-pasta",
    "description": "Peynir dolgulu mini poğaçaların porsiyonluk gurme sunumu.",
    "imageUrl": "/beyazresimler/karisik/karisik_129.png",
    "isActive": true,
    "isFeatured": false,
    "price": 250,
    "vatRate": 20,
    "order": 250,
    "tags": [
      "20:45",
      "Poğaça Tabağı",
      "Donuk Unlu Mamul"
    ],
    "specs": {
      "Gramaj": "1 kg Koli",
      "Çeşit": "Mini Poğaça Tabağı",
      "Kullanım": "Otel Büfe, Kafe Menüsü",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-130",
    "name": "CALLEI Pembe İncili Şekerleme Draje 1kg",
    "code": "CAL-SUS-PIN-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "Sedefli pembe inci görünümünde parlak şekerleme drajeleri; butik pastalar, nişan-düğün tatlıları ve şık waffle tabakları için zarif süsleme.",
    "imageUrl": "/beyazresimler/karisik/karisik_130.png",
    "isActive": true,
    "isFeatured": false,
    "price": 290,
    "vatRate": 20,
    "order": 251,
    "tags": [
      "CALLEI",
      "İnci Draje",
      "Pembe Şekerleme",
      "Pasta Süsleme"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Çeşit": "Pembe İnci Draje",
      "Kullanım": "Butik Pasta, Özel Gün Pastaları, Waffle",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-131",
    "name": "Monte Cristo Tarçın (Cinnamon) Aromalı Barista Şurubu 750ml",
    "code": "MCR-SYR-CIN-750",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Seylan tarçınının sıcacık odunsu ve baharatlı aroması; kış kahveleri, elmalı sıcak içecekler ve salep zenginleştirmede mükemmel.",
    "imageUrl": "/beyazresimler/karisik/karisik_131.png",
    "isActive": true,
    "isFeatured": true,
    "price": 280,
    "vatRate": 20,
    "order": 252,
    "tags": [
      "Monte Cristo",
      "Tarçın",
      "Cinnamon",
      "Barista Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Tarçın (Cinnamon)",
      "Kullanım": "Cinnamon Latte, Sıcak Elma Çayı, Kahve",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-132",
    "name": "CALLEI Bitter Çıtır Pirinç Patlaklı Çikolata Draje (Crispy Pearl) 1kg",
    "code": "CAL-SUS-BCP-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "İçi çıtır çıtır kavrulmuş pirinç patlağı, dışı kaliteli bitter çikolata kaplı minik inciler; mus, tatlı ve waffle üzerinde hafif çıtır doku sağlar.",
    "imageUrl": "/beyazresimler/karisik/karisik_132.png",
    "isActive": true,
    "isFeatured": false,
    "price": 320,
    "vatRate": 20,
    "order": 253,
    "tags": [
      "CALLEI",
      "Pirinç Patlağı",
      "Crispy Pearl",
      "Bitter Çikolata",
      "Draje"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Çeşit": "Bitter Crispy Pearl (Pirinç Patlaklı Draje)",
      "Kullanım": "Pasta, Mus, Waffle, Dondurma Topping",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-133",
    "name": "Monte Cristo Nar (Pomegranate) Aromalı Barista Şurubu 750ml",
    "code": "MCR-SYR-POM-750",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Olgun narların yakut kırmızısı rengi ve ferahlatıcı mayhoşluğu; kokteyl barlarında renklendirme ve meyve tadı için tercih edilir.",
    "imageUrl": "/beyazresimler/karisik/karisik_133.png",
    "isActive": true,
    "isFeatured": false,
    "price": 280,
    "vatRate": 20,
    "order": 254,
    "tags": [
      "Monte Cristo",
      "Nar",
      "Pomegranate",
      "Bar Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Nar (Pomegranate)",
      "Kullanım": "Grenadine İçecekler, Limonata, Kokteyl",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-134",
    "name": "Monte Cristo Hindistan Cevizi (Coconut) Aromalı Barista Şurubu 750ml",
    "code": "MCR-SYR-COC-750",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Taze tropikal Hindistan cevizinin sütlü aroması; buzlu kahveler, soğuk köpükler ve egzotik kokteyllere zenginlik katar.",
    "imageUrl": "/beyazresimler/karisik/karisik_134.png",
    "isActive": true,
    "isFeatured": false,
    "price": 280,
    "vatRate": 20,
    "order": 255,
    "tags": [
      "Monte Cristo",
      "Hindistan Cevizi",
      "Coconut",
      "Tropikal Şurup"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Hindistan Cevizi (Coconut)",
      "Kullanım": "Coconut Cold Brew, Latte, Piña Colada",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-135",
    "name": "Monte Cristo Misket Limonu (Lime) Aromalı Barista Şurubu 750ml",
    "code": "MCR-SYR-LIM-750",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Yeşil lime narenciyesinin canlandırıcı ekşiliği; barlarda hızlı ve dengeli Margarita, Mojito ve limonata hazırlığı sağlar.",
    "imageUrl": "/beyazresimler/karisik/karisik_135.png",
    "isActive": true,
    "isFeatured": false,
    "price": 280,
    "vatRate": 20,
    "order": 256,
    "tags": [
      "Monte Cristo",
      "Lime",
      "Misket Limonu",
      "Kokteyl Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Lime (Misket Limonu)",
      "Kullanım": "Margarita, Mojito, Soğuk Soda, Limonata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-136",
    "name": "CALLEI Beyaz Çıtır Pirinç Patlaklı Çikolata Draje (White Crispy Pearl) 1kg",
    "code": "CAL-SUS-WCP-1000",
    "codeGroup": "CALLEI Chocolate",
    "categoryId": "cat-3",
    "categoryName": "Waffle Çikolataları",
    "categorySlug": "waffle-malzemeleri",
    "description": "İçi gevrek pirinç patlağı, dışı kremsi beyaz çikolata kaplı sedef görünümlü drajeler; pastacılık ve tatlı sunumlarında şıklık yaratır.",
    "imageUrl": "/beyazresimler/karisik/karisik_136.png",
    "isActive": true,
    "isFeatured": false,
    "price": 320,
    "vatRate": 20,
    "order": 257,
    "tags": [
      "CALLEI",
      "Beyaz Çikolata",
      "Crispy Pearl",
      "Pirinç Patlağı",
      "Draje"
    ],
    "specs": {
      "Gramaj": "1 kg",
      "Çeşit": "Beyaz Crispy Pearl (Pirinç Patlaklı Draje)",
      "Kullanım": "Tatlı Süsleme, Waffle, Pasta, Dondurma",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-137",
    "name": "Monte Cristo Misket Limonu Aromalı Barista Şurubu 750ml (Açı 2)",
    "code": "MCR-SYR-LIM-750-B",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Yeşil misket limonu notalarıyla zenginleştirilmiş barmen ve barista şurubu.",
    "imageUrl": "/beyazresimler/karisik/karisik_137.png",
    "isActive": true,
    "isFeatured": false,
    "price": 280,
    "vatRate": 20,
    "order": 258,
    "tags": [
      "Monte Cristo",
      "Lime",
      "Misket Limonu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Lime",
      "Kullanım": "Kokteyl, Mocktail, Limonata",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-138",
    "name": "Monte Cristo Karpuz (Watermelon) Aromalı Barista Şurubu 750ml",
    "code": "MCR-SYR-WTR-750",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Ferahlatıcı yaz karpuzunun tatlı meyve aroması ve canlı kırmızı tonu; buzlu içecek ve frozen reçetelerinde serinlik fırtınası.",
    "imageUrl": "/beyazresimler/karisik/karisik_138.png",
    "isActive": true,
    "isFeatured": false,
    "price": 280,
    "vatRate": 20,
    "order": 259,
    "tags": [
      "Monte Cristo",
      "Karpuz",
      "Watermelon",
      "Bar Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Karpuz (Watermelon)",
      "Kullanım": "Karpuzlu Soda, Frozen, Yaz Kokteylleri",
      "Menşei": "Türkiye"
    }
  },
  {
    "id": "prod-byz-139",
    "name": "Monte Cristo Fındık (Hazelnut) Aromalı Barista Şurubu 750ml",
    "code": "MCR-SYR-HAZ-750",
    "codeGroup": "Monte Cristo",
    "categoryId": "cat-2",
    "categoryName": "Şuruplar",
    "categorySlug": "suruplar",
    "description": "Kavrulmuş fındık tanelerinin dolgun aroması; espresso ve filtre kahveye sıcacık fındık lezzeti katar.",
    "imageUrl": "/beyazresimler/karisik/karisik_139.png",
    "isActive": true,
    "isFeatured": false,
    "price": 280,
    "vatRate": 20,
    "order": 260,
    "tags": [
      "Monte Cristo",
      "Fındık",
      "Hazelnut",
      "Kahve Şurubu"
    ],
    "specs": {
      "Hacim": "750 ml",
      "Aroma": "Fındık (Hazelnut)",
      "Kullanım": "Hazelnut Latte, Americano, Frappe",
      "Menşei": "Türkiye"
    }
  }
];

export const PRODUCTS: Product[] = (RAW_PRODUCTS as any[]).map((p: any, index: number) => ({
  ...p,
  order: p.order ?? index + 1,
  isActive: p.isActive !== false,
  isFeatured: p.isFeatured === true,
  rating: p.rating ?? 4.8,
  reviewCount: p.reviewCount ?? 12,
  price: typeof p.price === "number" ? p.price : 0,
  vatRate: p.vatRate ?? 20,
  tags: Array.isArray(p.tags) ? p.tags : [],
  specs: typeof p.specs === "object" && p.specs !== null ? p.specs : {},
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
        (p.codeGroup && p.codeGroup.toLowerCase().includes(q)) ||
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


