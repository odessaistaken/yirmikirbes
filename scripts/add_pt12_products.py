import json

PT12_PRODUCTS = [
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Monte Cristo", "Tarçın", "Şurup", "Kahve", "Barista", "Kokteyl"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Monte Cristo", "Nar", "Şurup", "Kokteyl", "Limonata", "Frozen"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Monte Cristo", "Hindistan Cevizi", "Şurup", "Latte", "Kokteyl", "Egzotik"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Monte Cristo", "Fındık", "Şurup", "Kahve", "Barista", "Latte"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Monte Cristo", "Karpuz", "Şurup", "Frozen", "Kokteyl", "Soğuk İçecek"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Monte Cristo", "Lime", "Misket Limonu", "Şurup", "Mojito", "Barista"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["CALLEI Chocolate", "Beyaz Çikolata", "Pirinç Patlağı", "Draje", "Waffle", "Topping"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Monte Cristo", "Yeşil Limon", "Lime", "Kokteyl", "Şurup"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["CALLEI Chocolate", "Pembe", "Pirinç Patlağı", "Draje", "Süsleme", "Waffle"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["CALLEI Chocolate", "Sütlü Çikolata", "Pirinç Patlağı", "Draje", "Waffle", "Krep"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["CALLEI Chocolate", "Fuşya", "Pirinç Patlağı", "Pasta", "Waffle", "Dekor"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["CALLEI Chocolate", "Bitter Çikolata", "Pirinç Patlağı", "Draje", "Waffle", "Pasta"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cheesecake", "Mango", "Chia", "Dilimli", "Pastane"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Tiramisu", "İtalyan", "Kahveli", "Dilimli", "Kafe"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Antep Fıstığı", "Dubai Pasta", "Mono Pasta", "Kutu Pasta", "Çikolata"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Lotus", "Yaban Mersini", "Bütün Pasta", "Dilimli", "Karamel"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Çikolata", "Fıstık Ezmesi", "Ganaj", "Dilimli", "Pastane"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Karamel", "Fındık", "Krokant", "Tek Kişilik"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Brownie", "Kuruyemiş", "Kırmızı Meyve", "Fudgy", "Çikolata"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Antep Fıstığı", "Ahududu", "Dilimli", "Pastane", "Gurme"],
        "specs": {
            "Porsiyon": "10-12 Dilim",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 3 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Kullanım": "Servis öncesi buzdolabında çözündürünüz."
        }
    }
]

# Read existing products_json.json
with open("products_json.json", "r", encoding="utf-8") as f:
    existing_products = json.load(f)

# Filter out any existing pt12 items if previously added
existing_ids = {p["id"] for p in existing_products}
new_added = 0
for p in PT12_PRODUCTS:
    if p["id"] not in existing_ids:
        existing_products.append(p)
        new_added += 1

print(f"Total products now: {len(existing_products)} (Added {new_added} new pt12 products)")

with open("products_json.json", "w", encoding="utf-8") as f:
    json.dump(existing_products, f, ensure_ascii=False, indent=2)

# Compute category counts
cat_counts = {}
for p in existing_products:
    slug = p["categorySlug"]
    cat_counts[slug] = cat_counts.get(slug, 0) + 1

print("Updated Category Counts:", cat_counts)

# Generate updated lib/mock-data.ts
categories = [
    {
        "id": "cat-1",
        "name": "Püreler & Meyve Miksleri",
        "slug": "pureler",
        "description": "Caffè NONNO Frozen püreleri, DaVinci Fruit Mix ve Krater meyve karışımlarından oluşan zengin bar ve pastacılık koleksiyonumuz.",
        "icon": "🍓",
        "productCount": cat_counts.get("pureler", 44),
        "imageUrl": "/resimler/pt1/pt1_1.png",
        "order": 1,
        "isActive": True
    },
    {
        "id": "cat-2",
        "name": "Şuruplar",
        "slug": "suruplar",
        "description": "DaVinci Gourmet, Caffè NONNO ve Monte Cristo aromalı kahve, kokteyl ve barista şurupları.",
        "icon": "🍯",
        "productCount": cat_counts.get("suruplar", 49),
        "imageUrl": "/resimler/p4/p4_1.png",
        "order": 2,
        "isActive": True
    },
    {
        "id": "cat-3",
        "name": "Waffle & Krep Çikolataları",
        "slug": "waffle-malzemeleri",
        "description": "CALLEI sürülebilir renkli kremalar, hazır waffle tozu, draje ve krokan süsleme çeşitleri.",
        "icon": "🧇",
        "productCount": cat_counts.get("waffle-malzemeleri", 23),
        "imageUrl": "/resimler/p10/p10_1.png",
        "order": 3,
        "isActive": True
    },
    {
        "id": "cat-4",
        "name": "Tatlı & Bar Sosları",
        "slug": "tatli-soslar",
        "description": "DaVinci 2L ve Caffè NONNO 750g karamel, çikolata, beyaz çikolata ve meyve sosları.",
        "icon": "🍫",
        "productCount": cat_counts.get("tatli-soslar", 11),
        "imageUrl": "/resimler/p6/p6_7.png",
        "order": 4,
        "isActive": True
    },
    {
        "id": "cat-5",
        "name": "Donuk Pasta & Unlu Mamuller",
        "slug": "donuk-pasta",
        "description": "Kafeterya ve restoranlar için pratik, lezzetli donuk cheesecake'ler, tiramisu, mono kutu pastalar, dilimli pastalar ve unlu mamuller.",
        "icon": "🎂",
        "productCount": cat_counts.get("donuk-pasta", 12),
        "imageUrl": "/resimler/pt12/pt12_14.png",
        "order": 5,
        "isActive": True
    },
    {
        "id": "cat-6",
        "name": "Kremalı Ürünler & Pastacılık",
        "slug": "kremali-urunler",
        "description": "Chantilly, ganaj ve profesyonel pastacılık krema hammaddeleri.",
        "icon": "🍰",
        "productCount": cat_counts.get("kremali-urunler", 4),
        "imageUrl": "/resimler/p9/p9_1.png",
        "order": 6,
        "isActive": True
    }
]

ts_code = f"""/**
 * Mock data for 20:45 Pastacılık catalog.
 * Generated with 100% accurate Turkish naming, categories, specs, and local image paths.
 * Total 6 categories and {len(existing_products)} products.
 */

import type {{ Category, Product }} from "@/lib/types";
export type {{ Category, Product }};

export const CATEGORIES: Category[] = {json.dumps(categories, ensure_ascii=False, indent=2)};

const RAW_PRODUCTS = {json.dumps(existing_products, ensure_ascii=False, indent=2)};

export const PRODUCTS: Product[] = (RAW_PRODUCTS as any[]).map((p: any, index: number) => ({{
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
  specs: (p.specs ?? {{}}) as Record<string, string>,
}}));

export function getProductById(id: string): Product | undefined {{
  return PRODUCTS.find((p) => p.id === id);
}}

export function getProductByCode(code: string): Product | undefined {{
  return PRODUCTS.find((p) => p.code.toLowerCase() === code.toLowerCase());
}}

export function getProductsByCategory(categorySlug: string): Product[] {{
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug && p.isActive);
}}

export function getFeaturedProducts(): Product[] {{
  return PRODUCTS.filter((p) => p.isFeatured && p.isActive);
}}

export function getCategoryBySlug(slug: string): Category | undefined {{
  return CATEGORIES.find((c) => c.slug === slug);
}}

export function searchProducts(query: string): Product[] {{
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
}}
"""

with open(r"lib\mock-data.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Updated lib/mock-data.ts successfully!")
