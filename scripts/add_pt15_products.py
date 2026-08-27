import os
import re
import shutil
import json

# Step 1: Rename images in public/resimler/pt15
pt15_dir = os.path.join(os.getcwd(), "public", "resimler", "pt15")
files = os.listdir(pt15_dir)

# Map index from filename like (1).png -> pt15_1.png
for f in files:
    match = re.search(r'\((\d+)\)\.png$', f)
    if match:
        idx = match.group(1)
        src = os.path.join(pt15_dir, f)
        dst = os.path.join(pt15_dir, f"pt15_{idx}.png")
        shutil.move(src, dst)
        print(f"Renamed: {f} -> pt15_{idx}.png")

# Verify all 22 files
renamed_files = [f for f in os.listdir(pt15_dir) if f.startswith("pt15_")]
print(f"Total renamed pt15 files: {len(renamed_files)}")

# Step 2: Define the 22 PT15 products
PT15_PRODUCTS = [
    {
        "id": "prod-pt15-1",
        "name": "Donuk Antep Fıstıklı Magnolia Mono Box Tatlısı",
        "code": "PST-DNK-BX-PST",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Özel Antep fıstığı kreması, ipeksi pastacı vanilyası ve üzeri iri fıstık parçacıklarıyla zenginleştirilmiş tek kişilik mono box kutu tatlı.",
        "imageUrl": "/resimler/pt15/pt15_1.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Box", "Kutu Tatlısı", "Antep Fıstığı", "Pistachio", "Magnolia"],
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
        "id": "prod-pt15-2",
        "name": "Donuk Yaban Mersinli & Böğürtlenli Dilim Pasta",
        "code": "PST-DNK-DLM-BLU",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Yumuşak kakaolu pandispanya katları arasında mayhoş yaban mersini ve böğürtlenli hafif mus krema, üzerinde parlak meyve glazürü.",
        "imageUrl": "/resimler/pt15/pt15_2.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Pasta", "Yaban Mersini", "Böğürtlen", "Kakaolu Pandispanya", "Glazür"],
        "specs": {
            "Porsiyon": "Dilimli Servis (Tek Kişilik)",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Soğuk servis ediniz."
        }
    },
    {
        "id": "prod-pt15-3",
        "name": "Donuk İtalyan Tiramisu & Kakaolu Mousse Dilim Pasta",
        "code": "PST-DNK-DLM-TIR-CHOC",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Espresso aromalı yumuşak kek tabanı, kadifemsi mascarpone vanilya dolgusu ve yoğun çikolata mousse katmanı, üzeri bol kakao tozlu.",
        "imageUrl": "/resimler/pt15/pt15_3.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Pasta", "Tiramisu", "Çikolata Mousse", "Mascarpone", "Kakao"],
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
        "name": "Donuk Frambuazlı & Çikolatalı Parfe Kup Tatlısı",
        "code": "PST-DNK-KP-FRM-CHO",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Bireysel sunum bardağında kremsi çikolata ve moka musu, taze bütün frambuaz meyveleri ve pudra şekeri serpiştirmeli nefis parfe kup.",
        "imageUrl": "/resimler/pt15/pt15_4.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Kup Tatlısı", "Frambuaz", "Çikolatalı Parfe", "Mono Tatlı", "Kafe Menüsü"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kup Bardak",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Bardağında doğrudan servis edilir."
        }
    },
    {
        "id": "prod-pt15-5",
        "name": "Donuk Karamelize Fındık & Krokanlı Mono Pasta",
        "code": "PST-DNK-MN-KRO-CAR",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Karamelli ve fındıklı çift katmanlı krema, yumuşak kek tabanı ve üzerinde sıkma karamel kreması ile çıtır karamelize fındık krokanları.",
        "imageUrl": "/resimler/pt15/pt15_5.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Krokan", "Fındıklı", "Karamel", "Porsiyonluk Pasta"],
        "specs": {
            "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Çözündükten sonra doğrudan servis ediniz."
        }
    },
    {
        "id": "prod-pt15-6",
        "name": "Donuk Bol Çikolata Parçacıklı Gurme Amerikan Cookie (2'li / Koli)",
        "code": "PST-DNK-CKI-CHOC-2",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Dışı hafif kıtır, içi yumuşacık ve akışkan bitter & sütlü Belçika çikolatası parçacıklı Amerikan tipi jumbo boy gurme kurabiye.",
        "imageUrl": "/resimler/pt15/pt15_6.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Unlu Mamuller", "Kurabiye", "Cookie", "Çikolata Parçacıklı", "Amerikan Cookie"],
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
        "name": "Donuk Klasik Vanilyalı & Çikolata Taneli Jumbo Cookie (3'lü Sunum)",
        "code": "PST-DNK-CKI-JUMBO-3",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Hakiki tereyağı ve vanilya aromasıyla harmanlanmış, yoğun çikolata dolgulu jumbo boy kafe tipi fırınlanmaya hazır gurme cookie.",
        "imageUrl": "/resimler/pt15/pt15_7.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Unlu Mamuller", "Cookie", "Jumbo Cookie", "Tereyağlı", "Kahve Yanı"],
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
        "name": "Donuk Mavi Haşhaşlı & Limonlu Baton Dilim Kek",
        "code": "PST-DNK-KEK-HSH-LIM",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Ferahlatıcı limon kabuğu rendesi ve çıtır mavi haşhaş tohumları ile kabarmış, kahve yanı servisleri için kalın dilimli nefis baton kek.",
        "imageUrl": "/resimler/pt15/pt15_8.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Baton Kek", "Dilim Kek", "Haşhaşlı Kek", "Limonlu", "Kafe Keki"],
        "specs": {
            "Porsiyon": "Kalın Baton Dilim",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1 saat veya oda sıcaklığında 30 dk",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Çay ve kahve sunumlarına uygundur."
        }
    },
    {
        "id": "prod-pt15-9",
        "name": "Donuk Fırın Tipi Çift Çikolatalı Gurme Cookie (2'li Paket)",
        "code": "PST-DNK-CKI-DBL-CHO",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Bol bitter çikolata parçaları ve altın sarısı pişmiş gevrek dokusuyla çay-kahve saatlerine özel porsiyonluk hazır donuk cookie.",
        "imageUrl": "/resimler/pt15/pt15_9.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cookie", "Kurabiye", "Çift Çikolatalı", "Unlu Mamuller"],
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
        "name": "Donuk Mozaik (Ebruli) Kakaolu & Sade Baton Dilim Kek",
        "code": "PST-DNK-KEK-MOZ-BAT",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Geleneksel lezzette kakaolu ve vanilyalı hamurun ebruli kıvrımlarıyla harmanlandığı, porsiyonluk dilimli yumuşacık mozaik baton kek.",
        "imageUrl": "/resimler/pt15/pt15_10.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Kek", "Mozaik Kek", "Kakaolu Kek", "Baton Kek", "Unlu Mamuller"],
        "specs": {
            "Porsiyon": "Baton Dilim (Tek Porsiyon)",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Sıcak içecekler ile mükemmel uyum sağlar."
        }
    },
    {
        "id": "prod-pt15-11",
        "name": "Donuk Havuçlu, Tarçınlı & Cevizli Gurme Baton Dilim Kek",
        "code": "PST-DNK-KEK-HVC-TRC",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Taze rendelenmiş havuç, aromatik Seylan tarçını ve dövülmüş ceviz parçalarıyla zenginleştirilmiş, nemli dokulu klasik havuçlu kek dilimi.",
        "imageUrl": "/resimler/pt15/pt15_11.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Havuçlu Kek", "Tarçınlı", "Cevizli Kek", "Baton Dilim", "Kafe Keki"],
        "specs": {
            "Porsiyon": "Gurme Baton Dilim",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1 saat veya oda sıcaklığında 30 dk",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Kahve yanı menülerinde en çok tercih edilen lezzet."
        }
    },
    {
        "id": "prod-pt15-12",
        "name": "Donuk Çikolata Ganajlı & Vanilyalı Kare Mono Kup Tatlısı",
        "code": "PST-DNK-KP-VAN-CHO",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Şeffaf kare sunum kabında kat kat vanilya kreması, yumuşak pandispanya ve üzerinde kavrulmuş fındıklı akışkan çikolata ganajı.",
        "imageUrl": "/resimler/pt15/pt15_12.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Kup Tatlısı", "Kare Mono", "Vanilyalı", "Çikolata Ganaj", "Mono Tatlı"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kare Mono Kup",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Kendi şık kabında kaşıkla pratik servis."
        }
    },
    {
        "id": "prod-pt15-13",
        "name": "Donuk Red Velvet Kalp Mono Pasta",
        "code": "PST-DNK-MN-RED-HRT",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Romantik kalp formunda, kadifemsi kırmızı kek kırıntılarıyla kaplanmış, içi yumuşacık peynirli vanilya kremalı özel mono pasta.",
        "imageUrl": "/resimler/pt15/pt15_13.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Red Velvet", "Kalp Pasta", "Kırmızı Kadife", "Özel Gün"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kalp Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Tabak sunumunda nane yaprağı ve taze meyveyle süslenebilir."
        }
    },
    {
        "id": "prod-pt15-14",
        "name": "Donuk Boston Kremalı & Çikolata Soslu Dilim Pasta",
        "code": "PST-DNK-DLM-BST-CRM",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Altın sarısı sünger pandispanya arasında yoğun çikolata mousse dolgusu, üzeri vanilyalı beyaz krema ve zikzak çikolata çizgili zarif dilim pasta.",
        "imageUrl": "/resimler/pt15/pt15_14.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Pasta", "Boston Krema", "Çikolatalı Pasta", "Kafeterya Tatlısı"],
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
        "name": "Donuk Yulaflı & Damla Çikolatalı Gurme Cookie (2'li)",
        "code": "PST-DNK-CKI-OAT-CHO",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Besleyici yulaf ezmesi ve yoğun kakao taneleriyle harmanlanmış, çıtır kenarlı ve tok dokulu gurme fırın cookie.",
        "imageUrl": "/resimler/pt15/pt15_15.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cookie", "Yulaflı Kurabiye", "Damla Çikolatalı", "Unlu Mamuller"],
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
        "name": "Donuk Limonlu Kadife Kubbe (Lemon Dome) Mono Pasta",
        "code": "PST-DNK-MN-LIM-DOM",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Kadife sarı püskürtme dokusuyla göz alıcı kubbe şeklinde, içi ferah limon dolgusu ve hafif bisküvi tabanlı porsiyonluk mono pasta.",
        "imageUrl": "/resimler/pt15/pt15_16.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Limonlu", "Kubbe Pasta", "Lemon Dome", "Kadife Doku"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kubbe Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Tabak sunumunda şık bir tatlı alternatifi."
        }
    },
    {
        "id": "prod-pt15-17",
        "name": "Donuk Tropikal Mango & Çarkıfelek Kubbe Mono Pasta",
        "code": "PST-DNK-MN-MNG-PAS",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Tropikal mango ve passion fruit pürelerinin ferahlatıcı ekşi-tatlı dengesi ile hazırlanan sarı kubbe mono tatlı.",
        "imageUrl": "/resimler/pt15/pt15_17.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Mango", "Passion Fruit", "Tropikal", "Kubbe"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kubbe Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Soğuk servis ediniz."
        }
    },
    {
        "id": "prod-pt15-18",
        "name": "Donuk Karamelli & Fıstıklı Snickers Mono Pasta",
        "code": "PST-DNK-MN-SNK-CAR",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Kakaolu kek tabanı, fıstık ezmeli krema katmanı, akışkan sütlü karamel sosu ve bol kavrulmuş yer fıstığı kaplı gurme mono pasta.",
        "imageUrl": "/resimler/pt15/pt15_18.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Snickers", "Karamel", "Yer Fıstığı", "Çikolatalı"],
        "specs": {
            "Porsiyon": "Tek Kişilik Porsiyon (Mono)",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Çözündükten sonra doğrudan servis ediniz."
        }
    },
    {
        "id": "prod-pt15-19",
        "name": "Donuk Red Velvet & Antep Fıstıklı Gurme Dilim Pasta",
        "code": "PST-DNK-DLM-RED-PST",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Kırmızı kadife kek tabanı üzerinde kadifemsi peynir kreması, üzeri bol kırmızı kek tozu ve kırık Antep fıstığı süslemeli şık dilim pasta.",
        "imageUrl": "/resimler/pt15/pt15_19.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Pasta", "Red Velvet", "Antep Fıstığı", "Cheesecake", "Kırmızı Kadife"],
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
        "id": "prod-pt15-20",
        "name": "Donuk Red Velvet Cheesecake Dilim Pasta",
        "code": "PST-DNK-DLM-RED-CHK",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "New York usulü fırınlanmış yoğun peynir dolgusu, kırmızı kadife bisküvi tabanı ve fıstıklı kırmızı kadife kaplama ile mükemmel uyum.",
        "imageUrl": "/resimler/pt15/pt15_20.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cheesecake", "Red Velvet", "Dilim Pasta", "Gurme Tatlı"],
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
        "name": "Donuk Yoğun Bitter Çikolatalı & Deniz Tuzlu Gurme Tartlet",
        "code": "PST-DNK-TRT-BIT-CHOC",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Gevrek kakaolu tart hamuru içerisinde akışkan ve yoğun bitter Belçika çikolatası ganajı, hafif pudra şekeri ve deniz tuzu dokunuşlu.",
        "imageUrl": "/resimler/pt15/pt15_21.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Tartlet", "Bitter Çikolata", "Ganaj", "Deniz Tuzlu", "Gurme Tart"],
        "specs": {
            "Porsiyon": "Tek Kişilik Gurme Tartlet",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1 saat veya oda sıcaklığında 20 dk",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Hafif ısıtıldığında akışkan sufle kıvamına gelir."
        }
    },
    {
        "id": "prod-pt15-22",
        "name": "Donuk Çıtır Kıtır Craquelin Ekler Kabuğu & Dolgulu Ekler",
        "code": "PST-DNK-EKL-CRQ-10",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Fransız usulü craquelin kıtır kaplamalı şu hamuru, vanilyalı pastacı kreması dolgulu veya dolgusuz servise hazır çıtır ekler.",
        "imageUrl": "/resimler/pt15/pt15_22.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Ekler", "Craquelin", "Şu Hamuru", "Fransız Pastacılığı", "Unlu Mamuller"],
        "specs": {
            "Porsiyon": "Tekli / Koli İçi Çoklu",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme / Servis": "+4°C dolapta 1 saatte servise hazır hale gelir.",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Üzerine çikolata ganaj veya pudra şekeri ile servis edilir."
        }
    }
]

# Step 3: Parse existing lib/mock-data.ts and append PT15_PRODUCTS
mock_data_path = os.path.join(os.getcwd(), "lib", "mock-data.ts")
with open(mock_data_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract RAW_PRODUCTS array
match_raw = re.search(r'const RAW_PRODUCTS = (\[[\s\S]*?\n\]);', content)
if not match_raw:
    print("Could not find RAW_PRODUCTS in mock-data.ts")
    exit(1)

raw_products_str = match_raw.group(1)
raw_products = json.loads(raw_products_str)

print(f"Current raw products count: {len(raw_products)}")

# Check if pt15 products already added
existing_ids = set(p["id"] for p in raw_products)
new_to_add = [p for p in PT15_PRODUCTS if p["id"] not in existing_ids]
print(f"Adding {len(new_to_add)} new PT15 products...")

raw_products.extend(new_to_add)

# Category counts
counts = {}
for p in raw_products:
    cslug = p.get("categorySlug", "donuk-pasta")
    counts[cslug] = counts.get(cslug, 0) + 1

print("Updated category counts:", counts)

categories = [
  {
    "id": "cat-1",
    "name": "Püreler & Meyve Miksleri",
    "slug": "pureler",
    "description": "Caffè NONNO Frozen püreleri, DaVinci Fruit Mix ve Krater meyve karışımlarından oluşan zengin bar ve pastacılık koleksiyonumuz.",
    "icon": "🍓",
    "productCount": counts.get("pureler", 44),
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
    "productCount": counts.get("suruplar", 49),
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
    "productCount": counts.get("waffle-malzemeleri", 23),
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
    "productCount": counts.get("tatli-soslar", 11),
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
    "productCount": counts.get("donuk-pasta", 74),
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
    "productCount": counts.get("kremali-urunler", 4),
    "imageUrl": "/resimler/p9/p9_1.png",
    "order": 6,
    "isActive": True
  }
]

ts_code = f"""/**
 * Mock data for 20:45 Pastacılık catalog.
 * Generated with 100% accurate Turkish naming, categories, specs, and local image paths.
 * Total {len(categories)} categories and {len(raw_products)} products.
 */

import type {{ Category, Product }} from "@/lib/types";
export type {{ Category, Product }};

export const CATEGORIES: Category[] = {json.dumps(categories, indent=2, ensure_ascii=False)};

const RAW_PRODUCTS = {json.dumps(raw_products, indent=2, ensure_ascii=False)};

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

export function getRelatedProducts(productOrId: string | Product, limit = 4): Product[] {{
  const current = typeof productOrId === "string" ? getProductById(productOrId) : productOrId;
  if (!current) return PRODUCTS.slice(0, limit);
  return PRODUCTS.filter(
    (p) =>
      p.id !== current.id &&
      p.isActive &&
      (p.categoryId === current.categoryId || p.categorySlug === current.categorySlug)
  ).slice(0, limit);
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

with open(mock_data_path, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Updated {mock_data_path} successfully with {len(raw_products)} products!")
