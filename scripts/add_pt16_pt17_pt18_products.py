import os
import re
import shutil
import json

base_dir = os.getcwd()
resimler_dir = os.path.join(base_dir, "public", "resimler")

# Step 1: Normalize PT17 folder to pt17 if needed
pt17_upper = os.path.join(resimler_dir, "PT17")
pt17_lower = os.path.join(resimler_dir, "pt17")
if os.path.exists(pt17_upper) and not os.path.exists(pt17_lower):
    os.rename(pt17_upper, pt17_lower)
    print("Renamed directory PT17 -> pt17")

# Step 2: Rename pt16 files
pt16_dir = os.path.join(resimler_dir, "pt16")
if os.path.exists(pt16_dir):
    files = sorted(os.listdir(pt16_dir))
    raw_files = [f for f in files if f.startswith("DSC") and f.endswith(".png")]
    if raw_files:
        for idx, f in enumerate(raw_files, 1):
            src = os.path.join(pt16_dir, f)
            dst = os.path.join(pt16_dir, f"pt16_{idx}.png")
            shutil.move(src, dst)
            print(f"Renamed pt16: {f} -> pt16_{idx}.png")

# Step 3: Rename pt17 files
pt17_dir = os.path.join(resimler_dir, "pt17")
if os.path.exists(pt17_dir):
    files = sorted(os.listdir(pt17_dir))
    raw_files = [f for f in files if f.startswith("DSC") and f.endswith(".png")]
    if raw_files:
        for idx, f in enumerate(raw_files, 1):
            src = os.path.join(pt17_dir, f)
            dst = os.path.join(pt17_dir, f"pt17_{idx}.png")
            shutil.move(src, dst)
            print(f"Renamed pt17: {f} -> pt17_{idx}.png")

# Step 4: Rename pt18 files
pt18_dir = os.path.join(resimler_dir, "pt18")
if os.path.exists(pt18_dir):
    files = sorted(os.listdir(pt18_dir))
    raw_files = [f for f in files if f.startswith("DSC") and f.endswith(".png")]
    if raw_files:
        for idx, f in enumerate(raw_files, 1):
            src = os.path.join(pt18_dir, f)
            dst = os.path.join(pt18_dir, f"pt18_{idx}.png")
            shutil.move(src, dst)
            print(f"Renamed pt18: {f} -> pt18_{idx}.png")

# Step 5: Define the 54 new products
NEW_PRODUCTS = [
    # --- PT16 (1 - 20) ---
    {
        "id": "prod-pt16-1",
        "name": "Donuk Mango Trompe-l'œil Gurme Mono Pasta",
        "code": "PST-DNK-MN-MNG-TRM",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Usta pastacılık tekniğiyle gerçek mango formunda şekillendirilmiş, doğal meyve renk geçişli kadife kabuklu, içi tropikal mango mousse ve taze meyve kompostosu dolgulu Fransız usulü illüzyon mono pasta.",
        "imageUrl": "/resimler/pt16/pt16_1.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Trompe L'oeil", "Mango", "Tropikal", "İllüzyon Pasta", "Gurme Tatlı"],
        "specs": {
            "Porsiyon": "Tek Kişilik Gurme Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Çözündükten sonra doğrudan tabak sunumu yapılır."
        }
    },
    {
        "id": "prod-pt16-2",
        "name": "Donuk Tropikal Mango Mousse İllüzyon Mono Pasta",
        "code": "PST-DNK-MN-MNG-V2",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Taze mango püresi ile hazırlanan hafif meyve köpüğü kreması ve vanilyalı sünger pandispanya çekirdeği, menülerde fark yaratan gerçekçi mango görünümü.",
        "imageUrl": "/resimler/pt16/pt16_2.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Mango", "Trompe L'oeil", "Meyveli Pasta"],
        "specs": {
            "Porsiyon": "Tek Kişilik Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Soğuk servis ediniz."
        }
    },
    {
        "id": "prod-pt16-3",
        "name": "Donuk Antep Fıstığı Görünümlü Trompe-l'œil Mono Pasta",
        "code": "PST-DNK-MN-PST-TRM",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Antep fıstığı kabuğu formunda özel kalıplanmış, hafif ebruli fıstık yeşili glazür kaplama ve yoğun kavrulmuş Antep fıstığı ezmeli krema dolgusuyla gurme lezzet.",
        "imageUrl": "/resimler/pt16/pt16_3.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Antep Fıstığı", "Trompe L'oeil", "Pistachio", "Gurme"],
        "specs": {
            "Porsiyon": "Tek Kişilik Gurme Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Özel tabak sunumları için mükemmeldir."
        }
    },
    {
        "id": "prod-pt16-4",
        "name": "Donuk Fıstık Rüyası Gurme Mono İllüzyon Pasta",
        "code": "PST-DNK-MN-PST-V2",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Çıtır fıstıklı pralin tabanı, ipeksi fıstık ganajı ve gerçek Antep fıstığı aromalı dolgusuyla üst düzey gastronomi sunumu sunan illüzyon pasta.",
        "imageUrl": "/resimler/pt16/pt16_4.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Antep Fıstığı", "Pistachio", "İllüzyon"],
        "specs": {
            "Porsiyon": "Tek Kişilik Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Soğuk servis ediniz."
        }
    },
    {
        "id": "prod-pt16-5",
        "name": "Donuk Yoğun Bitter Çikolatalı Devil's Dilim Pasta",
        "code": "PST-DNK-DLM-DEV-CHO",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Kat kat nemli kakaolu pandispanya, zengin bitter çikolatalı ganaj krema katmanları ve üzeri parlak çikolata sosu kaplamalı klasik Amerikan Devil's Food cake.",
        "imageUrl": "/resimler/pt16/pt16_5.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Pasta", "Bitter Çikolata", "Devil's Food", "Çikolatalı Pasta"],
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
        "name": "Donuk Fransız Usulü Çıtır Craquelin Kremalı Choux Halka Pasta",
        "code": "PST-DNK-MN-CHX-PRS",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Üzeri çıtır kıtır craquelin kabuklu pişmiş şu hamuru halkası içinde ipeksi vanilyalı pastacı kreması dolgulu nefis Paris-Brest yorumu mono tatlı.",
        "imageUrl": "/resimler/pt16/pt16_6.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Craquelin", "Choux", "Paris-Brest", "Pastacı Kreması"],
        "specs": {
            "Porsiyon": "Tek Kişilik Mono Porsiyon",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Çözündükten sonra doğrudan servis edilir."
        }
    },
    {
        "id": "prod-pt16-7",
        "name": "Donuk Geleneksel Çikolatalı Bisküvili Mozaik Dilim Pasta",
        "code": "PST-DNK-DLM-MOZ-CLS",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Çıtır petibör bisküvileri, yoğun kakao ve tereyağlı çikolata harcı, üzeri bitter çikolata kaplama ve Antep fıstığı taneli nostaljik mozaik pasta dilimi.",
        "imageUrl": "/resimler/pt16/pt16_7.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Pasta", "Mozaik Pasta", "Bisküvili", "Antep Fıstığı", "Klasik Tatlı"],
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
        "name": "Donuk Orijinal San Sebastian Yanık Cheesecake Dilim Pasta",
        "code": "PST-DNK-DLM-SAN-SEB",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "İçi akışkan ve kremsi dokuda, üzeri hafif karamelize yanık kabuklu, katkısız taze peynirle fırınlanmış İspanyol Bask usulü meşhur San Sebastian cheesecake.",
        "imageUrl": "/resimler/pt16/pt16_8.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cheesecake", "San Sebastian", "Bask Cheesecake", "Dilim Pasta", "Yanık Cheesecake"],
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
        "name": "Donuk Bol Antep Fıstığı Kaplı Kubbe Mono Pasta",
        "code": "PST-DNK-MN-PST-DOM",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "İçi ipeksi pastacı kreması ve fıstık ezmesi dolgulu, dışı tamamen toz ve parça Antep fıstıklarıyla kaplanmış şık porsiyonluk kubbe pasta.",
        "imageUrl": "/resimler/pt16/pt16_9.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Kubbe Pasta", "Antep Fıstığı", "Pistachio Dome"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kubbe Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Soğuk servis ediniz."
        }
    },
    {
        "id": "prod-pt16-10",
        "name": "Donuk Lotus Biscoff Karamel Bisküvili Cheesecake Dilim",
        "code": "PST-DNK-DLM-CHK-LOT",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Çıtır karamelize bisküvi tabanı, kadifemsi cheesecake kreması ve üzerinde akışkan Lotus kreması ile orijinal Lotus bisküvisi dekorlu enfes dilim.",
        "imageUrl": "/resimler/pt16/pt16_10.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cheesecake", "Lotus Biscoff", "Karamel", "Dilim Pasta", "Bisküvili"],
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
        "name": "Donuk Vişneli Kara Orman Meyveli Çikolatalı Dilim Pasta",
        "code": "PST-DNK-DLM-BLK-FOR",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Yumuşacık kakaolu pandispanya, taze sütlü krema, mayhoş ekşi vişne taneleri ve bol çikolata rendesiyle süslenmiş klasik Black Forest dilim pasta.",
        "imageUrl": "/resimler/pt16/pt16_11.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Pasta", "Kara Orman", "Black Forest", "Vişneli", "Çikolatalı"],
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
        "id": "prod-pt16-12",
        "name": "Donuk Fransız Usulü Çıtır Craquelin Kremalı Gurme Ekler",
        "code": "PST-DNK-EKL-CRQ-LNG",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Fırınlanmış çıtır craquelin kabuklu uzun şu hamuru arasında taşan lezzette yoğun vanilyalı pastacı kreması dolgulu kafe ekleri.",
        "imageUrl": "/resimler/pt16/pt16_12.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Ekler", "Craquelin", "Pastacı Kreması", "Fransız Ekler"],
        "specs": {
            "Porsiyon": "Tek Kişilik Uzun Ekler",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Pudra şekeri serpilerek servis edilebilir."
        }
    },
    {
        "id": "prod-pt16-13",
        "name": "Donuk Orman Meyveli & Makaronlu Glazür Kubbe Mono Pasta",
        "code": "PST-DNK-MN-FRT-DOM",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Bordo renkli parlak ayna glazür kaplama, alt çeperinde hindistan cevizi kırıntıları, tepesinde çıtır mini makaron ve içi orman meyveli mousse dolgulu mono tatlı.",
        "imageUrl": "/resimler/pt16/pt16_13.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Orman Meyveli", "Makaronlu", "Kubbe Pasta", "Glazür"],
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
        "id": "prod-pt16-14",
        "name": "Donuk Beyaz Çikolata Parçacıklı Profiterollü Polka Mono Pasta",
        "code": "PST-DNK-MN-WHT-POL",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Üzerinde krema dolgulu şu topları, bol beyaz çikolata rendesi ve çikolata çizgileriyle kaplı kare porsiyonluk Polka mono pasta.",
        "imageUrl": "/resimler/pt16/pt16_14.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Polka Pasta", "Beyaz Çikolata", "Profiterol", "Kare Mono"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kare Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Soğuk servis ediniz."
        }
    },
    {
        "id": "prod-pt16-15",
        "name": "Donuk Klasik Red Velvet (Kırmızı Kadife) Dilim Pasta",
        "code": "PST-DNK-DLM-RED-VEL",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "4 kat kadifemsi kırmızı pandispanya arasında ipeksi vanilyalı labne peynirli krema ve kırmızı kek kırıntıları kaplı Amerikan klasiği.",
        "imageUrl": "/resimler/pt16/pt16_15.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Pasta", "Red Velvet", "Kırmızı Kadife", "Labne Kremalı"],
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
        "name": "Donuk Vişneli & Beyaz Kremalı Dikdörtgen Dilim Pasta",
        "code": "PST-DNK-DLM-OPR-BER",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Kakaolu pandispanya, pembe meyveli krema, beyaz pastacı kreması ve üzerinde parıltılı vişne/frambuaz jeli ile beyaz çikolata pirinçleri.",
        "imageUrl": "/resimler/pt16/pt16_16.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Pasta", "Dikdörtgen Dilim", "Vişneli", "Meyveli Pasta"],
        "specs": {
            "Porsiyon": "Dikdörtgen Dilim Servis",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Soğuk servis ediniz."
        }
    },
    {
        "id": "prod-pt16-17",
        "name": "Donuk Mocha & Karamel Glazürlü Çok Katlı Opera Dilim Pasta",
        "code": "PST-DNK-DLM-OPR-MCH",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Kahve şurubuyla ıslatılmış ince pandispanya katları, aromatik kahveli tereyağlı krema ve yanık desenli karamel glazür üst katmanı.",
        "imageUrl": "/resimler/pt16/pt16_17.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Opera Pasta", "Mocha", "Karamel", "Dilim Pasta", "Kahveli"],
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
        "name": "Donuk Kahveli & Fırınlanmış Karamel Opera Dilim Pasta",
        "code": "PST-DNK-DLM-OPR-ESP",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Zengin espresso aroması, karamel jeli ve çok katlı Fransız opera mimarisiyle kahve menülerine eşlik eden enfes dilim.",
        "imageUrl": "/resimler/pt16/pt16_18.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Opera Pasta", "Espresso", "Karamel", "Dilim Pasta"],
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
        "name": "Donuk Kremalı Havuçlu, Tarçınlı & Bol Cevizli Dilim Pasta",
        "code": "PST-DNK-DLM-HVC-CRM",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Taze havuç rendesi, tarçın ve cevizli nemli kek katmanları, arasında ve üzerinde hafif labne kreması ile ceviz kırıntıları kaplaması.",
        "imageUrl": "/resimler/pt16/pt16_19.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Pasta", "Havuçlu Kek", "Cevizli Pasta", "Tarçınlı", "Carrot Cake"],
        "specs": {
            "Porsiyon": "Dilimli Servis",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1 saat veya oda sıcaklığında 30 dk",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Sıcak çay ve kahve eşliğinde ikram edilir."
        }
    },
    {
        "id": "prod-pt16-20",
        "name": "Donuk Çikolatalı, Fındıklı & Hindistan Cevizli Kubbe Mono Pasta",
        "code": "PST-DNK-MN-CHO-FND",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Parlak çikolata sosu, pirinç fındık taneleri, alt bordürde hindistan cevizi ve içi yoğun Belçika çikolata muslu porsiyonluk kubbe tatlı.",
        "imageUrl": "/resimler/pt16/pt16_20.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Kubbe Pasta", "Çikolatalı", "Fındıklı", "Hindistan Cevizli"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kubbe Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Soğuk servis ediniz."
        }
    },

    # --- PT17 (1 - 20) ---
    {
        "id": "prod-pt17-1",
        "name": "Donuk Belçika Çikolatalı Yoğun Mousse Dilim Pasta",
        "code": "PST-DNK-DLM-BEL-MOU",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Çikolatalı bisküvi tabanı, kat kat ipeksi Belçika çikolatası musu, parlak ayna ganaj ve beyaz çikolata madalyon süslemesi.",
        "imageUrl": "/resimler/pt17/pt17_1.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Pasta", "Mousse Pasta", "Belçika Çikolatası", "Ganaj"],
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
        "name": "Donuk Bitter Çikolata Kaplı Profiterollü Polka Mono Pasta",
        "code": "PST-DNK-MN-BIT-POL",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Üzerinde çikolata dolgulu şu topları, dış çeperinde bol bitter çikolata rendesi ve çikolata dolgulu kare mono pasta.",
        "imageUrl": "/resimler/pt17/pt17_2.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Polka Pasta", "Bitter Çikolata", "Profiterollü"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kare Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Soğuk servis ediniz."
        }
    },
    {
        "id": "prod-pt17-3",
        "name": "Donuk Limon Soslu Klasik New York Cheesecake Dilim",
        "code": "PST-DNK-DLM-CHK-LIM",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Fırınlanmış zengin peynir dolgusu, tereyağlı bisküvi tabanı ve üzerinde ferahlatıcı ekşi-tatlı limon peltesi glazürü.",
        "imageUrl": "/resimler/pt17/pt17_3.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cheesecake", "Limonlu", "Dilim Pasta", "New York Cheesecake"],
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
        "name": "Donuk Sicilya Limonlu Gurme Cheesecake Dilim",
        "code": "PST-DNK-DLM-CHK-LM2",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Kadifemsi pürüzsüz peynir kreması ve taze limon kabuğu aromasıyla dengelenmiş, parlak limon soslu porsiyonluk cheesecake.",
        "imageUrl": "/resimler/pt17/pt17_4.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cheesecake", "Limonlu", "Dilim Pasta"],
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
        "name": "Donuk Çikolatalı & Bol Hindistan Cevizli Kartopu Mono Pasta",
        "code": "PST-DNK-MN-COC-BAL",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Dışı tamamen ince rendelenmiş kar beyazı hindistan cevizi ile kaplı, içi akışkan çikolata kreması ve yumuşak kek dolgulu kubbe tatlı.",
        "imageUrl": "/resimler/pt17/pt17_5.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Kartopu", "Hindistan Cevizli", "Çikolatalı Kubbe"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kubbe Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Soğuk servis ediniz."
        }
    },
    {
        "id": "prod-pt17-6",
        "name": "Donuk Kavrulmuş Fındık Kaplı Karamel Kare Mono Pasta",
        "code": "PST-DNK-MN-KRO-FND",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Dört bir yanı altın kavrulmuş çıtır fındık kırıklarıyla kaplı, üzerinde zikzak çikolata çizgileri ve içi fındıklı karamel kremalı kare pasta.",
        "imageUrl": "/resimler/pt17/pt17_6.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Kavrulmuş Fındık", "Karamel", "Kare Mono"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kare Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Soğuk servis ediniz."
        }
    },
    {
        "id": "prod-pt17-7",
        "name": "Donuk Süt Karamel & Dulce de Leche Kubbe Mono Pasta",
        "code": "PST-DNK-MN-DUL-CAR",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "İpeksi süt reçeli/karamel kaplama, halka rölyef desenleri ve içi zengin karamel mousse dolgulu enfes porsiyonluk kubbe pasta.",
        "imageUrl": "/resimler/pt17/pt17_7.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Dulce de Leche", "Süt Karamel", "Kubbe Pasta"],
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
        "id": "prod-pt17-8",
        "name": "Donuk Çikolata Mousse & Beyaz Çikolata Bukleli Kubbe Mono",
        "code": "PST-DNK-MN-CHO-WTR",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Kakao kaplı kubbe, tepesinde sıkma krema rozeti ve beyaz Belçika çikolatası bukleleri, alt bordüründe çıtır fındıklı hindistan cevizi.",
        "imageUrl": "/resimler/pt17/pt17_8.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Kubbe Pasta", "Çikolata Mousse", "Beyaz Çikolata"],
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
        "id": "prod-pt17-9",
        "name": "Donuk Frambuaz Soslu Klasik New York Cheesecake Dilim",
        "code": "PST-DNK-DLM-CHK-FRM",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Gevrek bisküvi tabanı, fırınlanmış yoğun peynir dolgusu ve üzerinde doğal tane frambuaz peltesi ile mayhoş meyve lezzeti.",
        "imageUrl": "/resimler/pt17/pt17_9.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cheesecake", "Frambuazlı", "Dilim Pasta", "New York Cheesecake"],
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
        "name": "Donuk Orijinal İtalyan Usulü Tiramisu Dilim Pasta",
        "code": "PST-DNK-DLM-TIR-ITA",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Espresso kahveyle demlenmiş kedi dili pandispanya katları, zengin mascarpone peynir kreması ve üzeri bol elenmiş saf kakao tozu.",
        "imageUrl": "/resimler/pt17/pt17_10.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Pasta", "Tiramisu", "Mascarpone", "İtalyan Tatlısı", "Espresso"],
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
        "name": "Donuk Çikolata Glazürlü & Mascarpone Tiramisu Dilim Pasta",
        "code": "PST-DNK-DLM-TIR-GLZ",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Mascarpone krema katı üzerinde parlak çikolata aynası ve çikolata rendesi dokunuşuyla zenginleştirilmiş modern tiramisu dilimi.",
        "imageUrl": "/resimler/pt17/pt17_11.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Pasta", "Tiramisu", "Çikolata Glazür", "Mascarpone"],
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
        "name": "Donuk Espresso Aromalı Mascarpone Tiramisu Dilim",
        "code": "PST-DNK-DLM-TIR-ESP",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Kahve severlerin vazgeçilmezi; dengeli tatlılık, hafif kahve notası ve kadifemsi krema yapısıyla kafe menüleri için ideal dilim pasta.",
        "imageUrl": "/resimler/pt17/pt17_12.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilim Pasta", "Tiramisu", "Espresso", "Mascarpone"],
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
        "name": "Donuk Frambuazlı & Kırmızı Kadife 'Love' Kalp Mono Pasta",
        "code": "PST-DNK-MN-HRT-LOV",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Şık kalp formunda, alt katı nefis frambuaz püresi dolgusu, üst katı peynirli krema ve kırmızı kadife tozu üzerinde 'Love' çikolata madalyonlu özel pasta.",
        "imageUrl": "/resimler/pt17/pt17_13.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Kalp Pasta", "Red Velvet", "Frambuazlı", "Özel Gün Tatlısı"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kalp Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Özel gün menüleri için idealdir."
        }
    },
    {
        "id": "prod-pt17-14",
        "name": "Donuk Red Velvet & Beyaz Çikolata Parçacıklı Gurme Cookie (2'li)",
        "code": "PST-DNK-CKI-RED-WHT",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Canlı kırmızı kadife renginde, bol fildişi beyaz çikolata damlalarıyla pişirilmeye/çözünmeye hazır yumuşak Amerikan kafe kurabiyesi.",
        "imageUrl": "/resimler/pt17/pt17_14.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cookie", "Kurabiye", "Red Velvet", "Beyaz Çikolata", "Amerikan Cookie"],
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
        "name": "Donuk Orman Meyveli & Böğürtlenli Cheesecake Dilim",
        "code": "PST-DNK-DLM-CHK-BER",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Fırınlanmış pürüzsüz peynir tabakası ve üstünde yoğun orman meyveleri / vişne-frambuaz püreli parlak sos kaplaması.",
        "imageUrl": "/resimler/pt17/pt17_15.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cheesecake", "Orman Meyveli", "Böğürtlenli", "Dilim Pasta"],
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
        "name": "Donuk Karamel Soslu & File Bademli Cheesecake Dilim",
        "code": "PST-DNK-DLM-CHK-ALM",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Oluklu sıkılmış akışkan karamel sosu ve üzerinde kavrulmuş çıtır file badem taneleriyle taçlandırılmış gurme cheesecake dilimi.",
        "imageUrl": "/resimler/pt17/pt17_16.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cheesecake", "Karamel", "File Badem", "Dilim Pasta", "Bademli"],
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
        "name": "Donuk Çilekli & Ruby Magnolia Parfe Kup Tatlısı",
        "code": "PST-DNK-KP-STR-RUB",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Pembe kadife çilek/ruby kreması, dipte bisküvi kırıntıları ve üzerinde beyaz çikolata kıtırlarıyla şeffaf kasede pratik tek kişilik kup tatlısı.",
        "imageUrl": "/resimler/pt17/pt17_17.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Kup Tatlısı", "Magnolia", "Çilekli", "Ruby Çikolata", "Mono Tatlı"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kup Kase",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Kendi şık kasesinde kaşıkla servis edilir."
        }
    },
    {
        "id": "prod-pt17-18",
        "name": "Donuk Süt Karamel & Bitter Ganajlı Gurme Kup Tatlısı",
        "code": "PST-DNK-KP-DUL-CHO",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Çift katmanlı lezzet; alt katta kadifemsi karamel kreması, üst katta akışkan çikolata ganajı ve krokan serpintili tek kişilik kutu tatlı.",
        "imageUrl": "/resimler/pt17/pt17_18.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Kup Tatlısı", "Dulce de Leche", "Karamel", "Bitter Ganaj", "Krokan"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kup Kase",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Doğrudan kasesinde servis edilir."
        }
    },
    {
        "id": "prod-pt17-19",
        "name": "Donuk Limonlu & Karamel Katmanlı Oval Mono Box Tatlısı",
        "code": "PST-DNK-BX-LIM-OVL",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Şeffaf oval sunum kutusunda sünger kek, karamel katmanı, hafif pastacı vanilyası ve üzerinde hindistan cevizi süslemeli ferah limon sosu.",
        "imageUrl": "/resimler/pt17/pt17_19.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Box", "Kutu Tatlısı", "Limonlu", "Karamelli", "Oval Mono"],
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
        "name": "Donuk Çikolata Ganajlı & Bisküvili Dikdörtgen Mono Box Tatlısı",
        "code": "PST-DNK-BX-CHO-REC",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Kakaolu çıtır taban, ipeksi vanilya mousse, yoğun parlak çikolata ganajı ve üstünde fındıklı çıtır bisküvi kırıntılı kutu tatlı.",
        "imageUrl": "/resimler/pt17/pt17_20.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Box", "Kutu Tatlısı", "Çikolata Ganaj", "Bisküvili"],
        "specs": {
            "Porsiyon": "Tek Kişilik Dikdörtgen Mono Box",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Kutusunda pratik servis."
        }
    },

    # --- PT18 (1 - 14) ---
    {
        "id": "prod-pt18-1",
        "name": "Donuk Red Velvet & Antep Fıstıklı Dikdörtgen Mono Pasta",
        "code": "PST-DNK-MN-RED-PST-REC",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Kırmızı kadife pandispanya katları, labneli beyaz krema, ara katmanda gizli Antep fıstıkları ve üzeri yoğun kırmızı kek tozu kaplı şık mono dilim.",
        "imageUrl": "/resimler/pt18/pt18_1.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Red Velvet", "Antep Fıstığı", "Dikdörtgen Dilim"],
        "specs": {
            "Porsiyon": "Tek Kişilik Dikdörtgen Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Soğuk servis ediniz."
        }
    },
    {
        "id": "prod-pt18-2",
        "name": "Donuk Çilek & Frambuaz Dolgulu Kalp Mono Aşk Pastası",
        "code": "PST-DNK-MN-HRT-LOV-2",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Sevgililer günü, yıl dönümü ve özel kutlamalar için tasarlanmış, meyve jölesi ve peynir kremalı kalp formunda mono pasta.",
        "imageUrl": "/resimler/pt18/pt18_2.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Kalp Pasta", "Çilekli", "Frambuazlı", "Aşk Pastası"],
        "specs": {
            "Porsiyon": "Tek Kişilik Kalp Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Soğuk servis ediniz."
        }
    },
    {
        "id": "prod-pt18-3",
        "name": "Donuk Çikolata Kaplamalı Orman Meyveli Rulo Mono Pasta",
        "code": "PST-DNK-MN-RUL-FRT",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Kakaolu pandispanya rulosu içinde orman meyveli kremamsı dolgu, dışı çıtır bitter çikolata kaplama ve kurutulmuş meyve parçacıkları.",
        "imageUrl": "/resimler/pt18/pt18_3.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Rulo Pasta", "Orman Meyveli", "Çikolata Kaplı"],
        "specs": {
            "Porsiyon": "Tek Kişilik Rulo Mono",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Soğuk servis ediniz."
        }
    },
    {
        "id": "prod-pt18-4",
        "name": "Donuk Yoğun Fındıklı & Kuru Meyveli Kare Brownie Dilim Pasta",
        "code": "PST-DNK-DLM-BRW-FND",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Nemli ve yoğun kakao dokulu çift kat brownie, çikolatalı fudge kreması ve üzerinde kavrulmuş fındık ile kuru meyve parçacıkları.",
        "imageUrl": "/resimler/pt18/pt18_4.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Brownie", "Fındıklı", "Dilim Pasta", "Yoğun Çikolatalı"],
        "specs": {
            "Porsiyon": "Kare Dilim Porsiyon",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme / Isıtma": "Oda sıcaklığında 30 dk veya mikrodalgada 15-20 sn hafif ılık",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Ilık servis edildiğinde yanında vanilyalı dondurma önerilir."
        }
    },
    {
        "id": "prod-pt18-5",
        "name": "Donuk Narenciye & Antep Fıstıklı Sarı Glazür Kubbe Mono Pasta",
        "code": "PST-DNK-MN-LIM-PST-DOM",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Fıstık parçacıklı sarı çikolata/glazür kabuk, tepesinde karamelize kuru limon dilimi ve içi ferahlatıcı narenciye muslu gurme kubbe tatlı.",
        "imageUrl": "/resimler/pt18/pt18_5.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Kubbe Pasta", "Narenciye", "Antep Fıstığı", "Limonlu"],
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
        "id": "prod-pt18-6",
        "name": "Donuk Tane Yaban Mersinli & Krokan Kenarlı Cheesecake Dilim",
        "code": "PST-DNK-DLM-CHK-BLU-TN",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Fırınlanmış New York cheesecake üzerinde bol bütün yaban mersini taneleri ve arka bordüründe ince fındık krokan süslemesi.",
        "imageUrl": "/resimler/pt18/pt18_6.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cheesecake", "Yaban Mersini", "Blueberry", "Dilim Pasta", "Krokan"],
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
        "name": "Donuk Fransız Tereyağlı Sade Klasik Kruvasan (Pişmeye / Servise Hazır)",
        "code": "PST-DNK-UNL-KRV-SAD",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "%100 saf tereyağı ile kat kat açılmış, dışı çıtır lamine katmanlı, içi petek dokulu yumuşacık geleneksel Fransız kruvasanı.",
        "imageUrl": "/resimler/pt18/pt18_7.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Unlu Mamuller", "Kruvasan", "Tereyağlı", "Fransız Kruvasan", "Kahvaltı"],
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
        "name": "Donuk New York Roll Spiral Kat Kat Kruvasan Çöreği",
        "code": "PST-DNK-UNL-NY-ROLL",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Trend New York usulü yuvarlak spiral formda sarılmış, altın sarısı karamelize dış kabuk ve çıtır tereyağlı lamine hamur yapısı.",
        "imageUrl": "/resimler/pt18/pt18_8.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Unlu Mamuller", "New York Roll", "Spiral Kruvasan", "Lamine Hamur", "Kafe Trend"],
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
        "name": "Donuk Çikolata Dolgulu & Kavrulmuş Fındıklı Gurme Kruvasan",
        "code": "PST-DNK-UNL-KRV-CHO-FND",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "İçi akışkan fındıklı çikolata kreması dolgulu, üzerinde çıtır fındık parçacıkları ve fırından yeni çıkmış gibi kabarık tereyağlı kruvasan.",
        "imageUrl": "/resimler/pt18/pt18_9.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Unlu Mamuller", "Kruvasan", "Çikolata Dolgulu", "Fındıklı Kruvasan"],
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
        "name": "Donuk Fransız Pain au Chocolat (Çift Çikolata Çubuklu Çörek)",
        "code": "PST-DNK-UNL-PAIN-CHO",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "İki sıra fırına dayanıklı bitter Belçika çikolata çubuğu içeren, kare formlu, lamine tereyağlı çıtır Fransız kahvaltı çöreği.",
        "imageUrl": "/resimler/pt18/pt18_10.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Unlu Mamuller", "Pain au Chocolat", "Çikolatalı Çörek", "Tereyağlı"],
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
        "name": "Donuk Gurme Tost & Sandviç Ekmeği Kalın Dilim (2'li Servis)",
        "code": "PST-DNK-UNL-TST-EKM",
        "codeGroup": "20:45 Pastacılık",
        "categoryId": "cat-5",
        "categoryName": "Donuk Pasta & Unlu Mamuller",
        "categorySlug": "donuk-pasta",
        "description": "Kafeterya ve bistrolar için ideal kalınlıkta kesilmiş, yumuşak süngerimsi dokulu, ızgarada mükemmel kızaran gurme tost ekmeği.",
        "imageUrl": "/resimler/pt18/pt18_11.png",
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Unlu Mamuller", "Tost Ekmeği", "Sandviç Ekmeği", "Gurme Ekmek"],
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
        "categoryName": "Waffle & Krep Çikolataları",
        "categorySlug": "waffle-malzemeleri",
        "description": "Derin petekli Brüksel usulü formunda, dışı çıtır içi hafif ve havadar, tost makinesi veya fırında 2 dakikada servise hazır donuk waffle ekmeği.",
        "imageUrl": "/resimler/pt18/pt18_12.png",
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Waffle", "Belçika Waffle", "Brüksel Waffle", "Waffle Ekmeği", "Donuk Waffle", "CALLEI"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Kremalı Ürünler", "Sprey Şanti", "Krem Şanti", "Whipped Cream", "Barista", "SAMARA"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Şuruplar", "Monte Cristo", "Cool Lime", "Lime Şurubu", "Barista", "Kokteyl Şurubu", "Mocktail"],
        "specs": {
            "Hacim": "1000 ml (Cam / PET Şişe)",
            "Kullanım Oranı": "1:7 veya 1:8 oranında su ve buz ile seyreltiniz.",
            "Kullanım Alanı": "Cool Lime içecekleri, limonatalar, ferahlatıcı kokteyller.",
            "Raf Ömrü": "Açıldıktan sonra serin ve kuru yerde 12 Ay",
            "Saklama Koşulu": "Oda sıcaklığında, güneş ışığından uzakta muhafaza ediniz."
        }
    }
]

# Step 6: Update lib/mock-data.ts
mock_data_path = os.path.join(base_dir, "lib", "mock-data.ts")
with open(mock_data_path, "r", encoding="utf-8") as f:
    content = f.read()

match_raw = re.search(r'const RAW_PRODUCTS = (\[[\s\S]*?\n\]);', content)
if not match_raw:
    print("Could not find RAW_PRODUCTS in mock-data.ts")
    exit(1)

raw_products_str = match_raw.group(1)
raw_products = json.loads(raw_products_str)
print(f"Current raw products count: {len(raw_products)}")

# Add products that are not yet added
existing_ids = set(p["id"] for p in raw_products)
new_to_add = [p for p in NEW_PRODUCTS if p["id"] not in existing_ids]
print(f"Adding {len(new_to_add)} new products...")
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
    "productCount": counts.get("suruplar", 50),
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
    "productCount": counts.get("waffle-malzemeleri", 24),
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
    "productCount": counts.get("donuk-pasta", 125),
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
    "productCount": counts.get("kremali-urunler", 5),
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
