import json

PT13_PT14_PRODUCTS = [
    # PT13 Products (1 - 20)
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Çikolata", "Çilek", "Tek Kişilik", "Glazür", "Kafe Tatlısı"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Antep Fıstığı", "Fıstık Ganaj", "Gurme", "Tek Kişilik"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Limonlu", "Kubbe Pasta", "Ferahlatıcı", "Narenciye"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Orman Meyveli", "Ahududu", "Red Berry", "Glazür"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Lotus", "Biscoff", "Karamel", "Bisküvili"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Rocher", "Fındıklı", "Çikolata", "Pralin"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilimli Pasta", "Karamel", "Kremalı", "Kafe Pasta", "Porsiyonluk"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilimli Pasta", "Antep Fıstığı", "Çikolata", "Katlı Pasta", "Gurme"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilimli Pasta", "Moka", "Kahveli", "Fındıklı", "Barista"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilimli Pasta", "Karaorman", "Vişneli", "Schwarzwalder", "Çikolata"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilimli Kek", "Çikolata", "Fındıklı", "Kafe Keki", "Porsiyonluk"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mozaik Pasta", "Bisküvili", "Çikolata", "Geleneksel", "Dilimli"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Kutu Pasta", "Mono Box", "Magnolia", "Çilekli", "Paket Servis"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Kutu Pasta", "Mono Box", "Oreo", "Çikolata", "Kafe Tatlısı"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Kutu Pasta", "Mono Box", "Lotus Biscoff", "Karamel", "Magnolia"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilimli Pasta", "Kubbe Kek", "D-Kek", "Çikolata", "Rulo Pasta"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cheesecake", "Crumble", "Orman Meyveli", "Kırıntılı", "Dilimli"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cookie Pie", "Kurabiye Turta", "Çikolata Dolgulu", "Ilık Tatlı", "Kafe"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Cheesecake", "Çilekli", "Antep Fıstıklı", "Tek Kişilik"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Dubai Çikolatası", "Kadayıflı", "Antep Fıstığı", "Küre Pasta", "Trend"],
        "specs": {
            "Porsiyon": "Tek Kişilik Mono Küre",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Özel altın altlığı ile doğrudan servise hazırdır."
        }
    },

    # PT14 Products (1 - 20)
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Tiramisu", "İtalyan", "Kahveli", "Dilimli Pasta", "Mascarpone"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilimli Pasta", "Frambuazlı", "Beyaz Çikolata", "Orman Meyveli", "Pastane"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Böğürtlenli", "Glazür", "Kubbe Pasta", "Orman Meyvesi"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Tiramisu", "Kare Dilim", "İtalyan", "Kahveli", "Kafe"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Medovik", "Bal Pastası", "Ballı", "Rus Pastası", "Dilimli"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Parfe", "Frambuazlı", "Semifreddo", "Dondurmalı Tatlı", "Meyveli"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Parfe", "Orman Meyveli", "Çiçek Formu", "Semifreddo", "Donuk Tatlı"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Parfe", "Meyveli", "Silindir Parfe", "Donuk Tatlı"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Cheesecake", "Yaban Mersinli", "Blueberry", "Dilimli Pasta", "Kafe"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Kahve Çekirdeği", "Espresso", "Mousse", "Çikolata", "Özel Tasarım"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Baton Kek", "Mono Kek", "Bitter Çikolata", "Fıstıklı", "Snack Kek"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Rainbow", "Gökkuşağı", "Katlı Pasta", "Renkli Pasta", "Dilimli"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilimli Pasta", "Karamel", "Krokant", "Fındıklı", "Kafe Tatlısı"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Oreo", "Karamel", "Bisküvili", "Tek Kişilik"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Antep Fıstığı", "Ganaj", "Çikolata", "Gurme"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Mono Pasta", "Mini Pasta", "Fıstıklı", "Çikolatalı", "Butik"],
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
        "isActive": True,
        "isFeatured": False,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Dilimli Pasta", "Çikolata", "Mousse", "Kadife", "Kakaolu"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Kutu Tatlısı", "Mono Box", "Çikolata Mousse", "Bitter", "Yoğun Lezzet"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Kutu Pasta", "Mono Box", "Orman Meyveli", "Red Velvet", "Magnolia"],
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
        "isActive": True,
        "isFeatured": True,
        "price": 0,
        "vatRate": 20,
        "tags": ["Donuk Pasta", "Kutu Tatlısı", "Mono Box", "Supangle", "Profiterol", "Çikolata Sos"],
        "specs": {
            "Porsiyon": "Tek Kişilik Mono Box",
            "Ambalaj": "Koli (-18°C Donuk)",
            "Çözünme Süresi": "+4°C dolapta 1-2 saat",
            "Raf Ömrü": "-18°C'de 12 Ay",
            "Saklama Koşulu": "-18°C",
            "Servis Tavsiyesi": "Kendi kutusunda kaşıkla servise hazır."
        }
    }
]

# Read existing products_json.json
with open("products_json.json", "r", encoding="utf-8") as f:
    existing_products = json.load(f)

# Filter out any existing pt13 / pt14 items if previously added
existing_ids = {p["id"] for p in existing_products}
new_added = 0
for p in PT13_PT14_PRODUCTS:
    if p["id"] not in existing_ids:
        existing_products.append(p)
        new_added += 1

print(f"Total products now: {len(existing_products)} (Added {new_added} new pt13 & pt14 products)")

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
        "productCount": cat_counts.get("donuk-pasta", 52),
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

with open(r"lib\mock-data.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Updated lib/mock-data.ts successfully!")
