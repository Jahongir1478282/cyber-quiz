// Savollar banki. Har bir talabaga shu ro'yxatdan tasodifiy savollar beriladi,
// variantlar tartibi ham har safar aralashtiriladi.
//
// Yangi savol qo'shish uchun quyidagi shakldagi obyektni ro'yxatga qo'shing:
//   {
//     topic: "Mavzu nomi",
//     q: "Savol matni?",
//     options: ["1-variant", "2-variant", "3-variant", "4-variant"],
//     a: 0, // to'g'ri javobning tartib raqami: 0 = 1-variant, 1 = 2-variant, ...
//   },
//
// Muhim: bu fayl faqat serverda ishlatiladi, to'g'ri javoblar talaba brauzeriga yuborilmaydi.

export const QUESTIONS = [
  // --- Asosiy tushunchalar ---
  {
    topic: "Asosiy tushunchalar",
    q: "Axborot xavfsizligining uchta asosiy xususiyati (CIA triadasi) qaysi javobda to'g'ri ko'rsatilgan?",
    options: [
      "Konfidensiallik, butunlik, foydalanish imkoniyati",
      "Autentifikatsiya, avtorizatsiya, audit",
      "Shifrlash, xeshlash, raqamli imzo",
      "Tarmoq, server, foydalanuvchi",
    ],
    a: 0,
  },
  {
    topic: "Asosiy tushunchalar",
    q: "Hujumchi to'lov hujjatidagi hisob raqamini ruxsatsiz o'zgartirdi. Qaysi xususiyat buzildi?",
    options: ["Butunlik", "Konfidensiallik", "Foydalanish imkoniyati", "Anonimlik"],
    a: 0,
  },
  {
    topic: "Asosiy tushunchalar",
    q: "DDoS hujumi birinchi navbatda axborotning qaysi xususiyatiga zarar yetkazadi?",
    options: ["Foydalanish imkoniyati", "Konfidensiallik", "Butunlik", "Haqiqiylik"],
    a: 0,
  },
  {
    topic: "Asosiy tushunchalar",
    q: "Ishdan ketgan xodim mijozlar bazasini nusxalab olib ketdi. Qaysi xususiyat buzildi?",
    options: ["Konfidensiallik", "Butunlik", "Foydalanish imkoniyati", "Kuzatuvchanlik"],
    a: 0,
  },
  {
    topic: "Asosiy tushunchalar",
    q: "“Eng kam imtiyoz” (least privilege) tamoyili nimani anglatadi?",
    options: [
      "Foydalanuvchiga faqat ishi uchun zarur bo'lgan huquqlar beriladi",
      "Barcha xodimlarga bir xil huquqlar beriladi",
      "Administrator huquqlari faqat tunda beriladi",
      "Foydalanuvchi parolini kamroq almashtiradi",
    ],
    a: 0,
  },

  // --- Zararli dasturlar ---
  {
    topic: "Zararli dasturlar",
    q: "Ransomware qanday zararli dastur?",
    options: [
      "Fayllarni shifrlab, ularni ochish uchun to'lov talab qiladi",
      "Klaviaturada bosilgan tugmalarni yozib oladi",
      "Ekranda ko'p reklama oynalarini chiqaradi",
      "Kompyuterni yashirincha botnetga qo'shadi",
    ],
    a: 0,
  },
  {
    topic: "Zararli dasturlar",
    q: "Troyan (troyan oti) dasturining asosiy belgisi nima?",
    options: [
      "Foydali dastur niqobi ostida yashirin zararli vazifa bajaradi",
      "Foydalanuvchi ishtirokisiz tarmoq orqali o'zi tarqaladi",
      "Faqat qattiq diskning yuklovchi sektorini zararlaydi",
      "Faqat mobil telefonlarda ishlaydi",
    ],
    a: 0,
  },
  {
    topic: "Zararli dasturlar",
    q: "Tarmoq qurti (worm) oddiy virusdan nimasi bilan farq qiladi?",
    options: [
      "Boshqa faylga yopishmasdan, tarmoq orqali o'zi mustaqil tarqaladi",
      "Faqat matnli hujjatlarni zararlaydi",
      "Antivirus uni hech qachon aniqlay olmaydi",
      "Faqat foydalanuvchi ruxsati bilan o'rnatiladi",
    ],
    a: 0,
  },
  {
    topic: "Zararli dasturlar",
    q: "Keylogger nima qiladi?",
    options: [
      "Klaviaturada bosilgan tugmalarni yozib oladi",
      "Tarmoq kartasini ishdan chiqaradi",
      "Fayllarni siqib arxivlaydi",
      "Parollarni avtomatik murakkablashtiradi",
    ],
    a: 0,
  },
  {
    topic: "Zararli dasturlar",
    q: "Xodimning kompyuterida ransomware aniqlandi. Birinchi navbatdagi to'g'ri harakat qaysi?",
    options: [
      "Kompyuterni darhol tarmoqdan uzib, xavfsizlik xizmatiga xabar berish",
      "Hujumchilar talab qilgan to'lovni darhol to'lash",
      "Hech kimga aytmasdan kompyuterni qayta o'rnatish",
      "Antivirusni o'chirib, kompyuterni qayta yuklash",
    ],
    a: 0,
  },

  // --- Ijtimoiy injineriya ---
  {
    topic: "Ijtimoiy injineriya",
    q: "Fishing (phishing) hujumi nima?",
    options: [
      "Soxta xat yoki sayt orqali foydalanuvchini aldab, maxfiy ma'lumotlarini olish",
      "Tarmoqdagi trafikni yashirincha tinglash",
      "Parolni lug'atdagi so'zlar bo'yicha tanlash",
      "Serverni ko'p so'rovlar bilan to'ldirib qo'yish",
    ],
    a: 0,
  },
  {
    topic: "Ijtimoiy injineriya",
    q: "Telegram'da tanishingiz nomidan “ovoz bering” degan havola keldi va u SMS kodni so'ramoqda. Bu qanday hujum?",
    options: [
      "Ijtimoiy injineriya (fishing) orqali hisobni o'g'irlash",
      "DDoS hujumi",
      "SQL-injection hujumi",
      "Brute-force hujumi",
    ],
    a: 0,
  },
  {
    topic: "Ijtimoiy injineriya",
    q: "Ijtimoiy injineriya hujumlari asosan nimaga tayanadi?",
    options: [
      "Odamlarning ishonchi, shoshqaloqligi va psixologiyasiga",
      "Protsessorning apparat zaifliklariga",
      "Shifrlash algoritmlarining kamchiliklariga",
      "Wi-Fi signalining kuchsizligiga",
    ],
    a: 0,
  },
  {
    topic: "Ijtimoiy injineriya",
    q: "“Bank xodimi” qo'ng'iroq qilib, kartangizga kelgan SMS kodni so'rayapti. To'g'ri javob qaysi?",
    options: [
      "Kodni aytmaslik, qo'ng'iroqni tugatib, bankning rasmiy raqamiga o'zim qo'ng'iroq qilish",
      "Kodni aytish, chunki u bank xodimi ekanini aytdi",
      "Kodning faqat yarmini aytish",
      "Kodni SMS orqali yuborish",
    ],
    a: 0,
  },

  // --- Autentifikatsiya va parollar ---
  {
    topic: "Autentifikatsiya",
    q: "Quyidagi parollardan qaysi biri eng ishonchli?",
    options: [
      "Ko'k-choynak_uchadi_7_marta!",
      "P@ssw0rd",
      "Jahongir1999",
      "12345678Aa",
    ],
    a: 0,
  },
  {
    topic: "Autentifikatsiya",
    q: "Ko'p bosqichli autentifikatsiya (MFA) nimani anglatadi?",
    options: [
      "Kamida ikki xil turdagi omildan foydalanish: bilgan narsa, egalik qilgan narsa yoki biometriya",
      "Bir xil parolni ikki marta kiritish",
      "Ikki xil parolni ketma-ket kiritish",
      "Login va parolni alohida sahifalarda kiritish",
    ],
    a: 0,
  },
  {
    topic: "Autentifikatsiya",
    q: "Autentifikatsiya va avtorizatsiyaning farqi nimada?",
    options: [
      "Autentifikatsiya — kimligini tekshirish, avtorizatsiya — nimaga ruxsat borligini aniqlash",
      "Autentifikatsiya — ruxsatlarni berish, avtorizatsiya — parolni tekshirish",
      "Ikkalasi bir xil jarayonning ikki nomi",
      "Avtorizatsiya faqat bank tizimlarida ishlatiladi",
    ],
    a: 0,
  },
  {
    topic: "Autentifikatsiya",
    q: "Brute-force hujumi qanday amalga oshiriladi?",
    options: [
      "Barcha mumkin bo'lgan parol kombinatsiyalarini ketma-ket sinab ko'rish orqali",
      "Foydalanuvchiga soxta xat yuborish orqali",
      "Serverga ko'p so'rov yuborib, uni to'xtatish orqali",
      "Dastur yangilanishiga zararli kod qo'shish orqali",
    ],
    a: 0,
  },
  {
    topic: "Autentifikatsiya",
    q: "Bir necha marta noto'g'ri parol kiritilganda hisobni vaqtincha bloklash qaysi hujumga qarshi samarali?",
    options: ["Parolni tanlash (brute-force)", "XSS", "DDoS", "Ransomware"],
    a: 0,
  },

  // --- Kriptografiya ---
  {
    topic: "Kriptografiya",
    q: "Simmetrik shifrlashning asosiy belgisi qaysi?",
    options: [
      "Shifrlash va deshifrlash uchun bitta kalit ishlatiladi",
      "Ochiq va yopiq kalitdan iborat juftlik ishlatiladi",
      "Shifrlangan matnni hech qachon ochib bo'lmaydi",
      "Kalit umuman ishlatilmaydi",
    ],
    a: 0,
  },
  {
    topic: "Kriptografiya",
    q: "Quyidagi algoritmlardan qaysi biri asimmetrik (ochiq kalitli)?",
    options: ["RSA", "AES", "DES", "SHA-256"],
    a: 0,
  },
  {
    topic: "Kriptografiya",
    q: "Xesh-funksiyaning asosiy xususiyati qaysi?",
    options: [
      "Bir tomonlama: xesh qiymatdan dastlabki ma'lumotni tiklab bo'lmaydi",
      "Kalit yordamida dastlabki ma'lumotga qaytariladi",
      "Natija uzunligi kiruvchi ma'lumot uzunligiga teng",
      "Bir xil ma'lumot uchun har safar har xil natija beradi",
    ],
    a: 0,
  },
  {
    topic: "Kriptografiya",
    q: "Elektron raqamli imzo nimani ta'minlaydi?",
    options: [
      "Hujjat muallifining haqiqiyligi va hujjat butunligini",
      "Hujjatni boshqalar o'qiy olmasligini",
      "Hujjat hajmini kichraytirishni",
      "Hujjatni tezroq yuborishni",
    ],
    a: 0,
  },
  {
    topic: "Kriptografiya",
    q: "Parollarni ma'lumotlar bazasida qanday saqlash to'g'ri?",
    options: [
      "Tuz (salt) qo'shilgan holda maxsus xesh-funksiya (masalan, bcrypt yoki Argon2) bilan",
      "Ochiq matn ko'rinishida, faqat administrator ko'radi",
      "Base64 formatiga o'girib",
      "Bitta umumiy kalit bilan AES orqali shifrlab",
    ],
    a: 0,
  },

  // --- Tarmoq xavfsizligi ---
  {
    topic: "Tarmoq xavfsizligi",
    q: "HTTPS protokoli standart bo'yicha qaysi portda ishlaydi?",
    options: ["443", "80", "22", "3389"],
    a: 0,
  },
  {
    topic: "Tarmoq xavfsizligi",
    q: "SSH xizmatining standart porti qaysi?",
    options: ["22", "21", "23", "25"],
    a: 0,
  },
  {
    topic: "Tarmoq xavfsizligi",
    q: "Tarmoqlararo ekran (firewall)ning asosiy vazifasi nima?",
    options: [
      "Belgilangan qoidalar asosida tarmoq trafigini o'tkazish yoki bloklash",
      "Kompyuterdagi viruslarni davolash",
      "Fayllarning zaxira nusxasini olish",
      "Parollarni xeshlash",
    ],
    a: 0,
  },
  {
    topic: "Tarmoq xavfsizligi",
    q: "IDS va IPS tizimlarining farqi nimada?",
    options: [
      "IDS hujumni aniqlab ogohlantiradi, IPS esa uni bloklashi ham mumkin",
      "IDS faqat simsiz tarmoqda, IPS faqat simli tarmoqda ishlaydi",
      "IDS shifrlaydi, IPS esa deshifrlaydi",
      "Ular orasida hech qanday farq yo'q",
    ],
    a: 0,
  },
  {
    topic: "Tarmoq xavfsizligi",
    q: "VPN nima uchun ishlatiladi?",
    options: [
      "Ochiq tarmoq ustidan shifrlangan xavfsiz kanal yaratish uchun",
      "Internet tezligini oshirish uchun",
      "Viruslarni avtomatik o'chirish uchun",
      "Elektron pochtani spamdan tozalash uchun",
    ],
    a: 0,
  },
  {
    topic: "Tarmoq xavfsizligi",
    q: "“O'rtadagi odam” (Man-in-the-Middle) hujumining mohiyati nima?",
    options: [
      "Ikki tomon orasidagi aloqani yashirincha tutib olish va o'zgartirish",
      "Serverni ko'p so'rovlar bilan to'xtatib qo'yish",
      "Parolni barcha kombinatsiyalar bo'yicha tanlash",
      "Foydalanuvchiga zararli fleshka berish",
    ],
    a: 0,
  },
  {
    topic: "Tarmoq xavfsizligi",
    q: "Jamoat joyida tashkilot Wi-Fi nomi bilan bir xil nomdagi soxta kirish nuqtasi yaratildi. Bu hujum qanday ataladi?",
    options: ["Evil Twin (soxta egizak)", "SQL-injection", "Ransomware", "Zero-day"],
    a: 0,
  },

  // --- Veb xavfsizlik ---
  {
    topic: "Veb xavfsizlik",
    q: "SQL-injection hujumi nimaga asoslanadi?",
    options: [
      "Foydalanuvchi kiritgan ma'lumot tekshirilmasdan SQL so'roviga qo'shilishiga",
      "Serverdagi protsessor haddan tashqari qizishiga",
      "Foydalanuvchi parolining qisqaligiga",
      "Brauzer keshining tozalanmaganiga",
    ],
    a: 0,
  },
  {
    topic: "Veb xavfsizlik",
    q: "SQL-injection'dan eng samarali himoya usuli qaysi?",
    options: [
      "Parametrlangan so'rovlar (prepared statements) dan foydalanish",
      "Saytni HTTPS orqali ochish",
      "Administrator parolini uzaytirish",
      "Serverga antivirus o'rnatish",
    ],
    a: 0,
  },
  {
    topic: "Veb xavfsizlik",
    q: "XSS (Cross-Site Scripting) hujumida nima sodir bo'ladi?",
    options: [
      "Sahifaga zararli skript joylanadi va u boshqa foydalanuvchilar brauzerida bajariladi",
      "Ma'lumotlar bazasidagi jadvallar o'chirib yuboriladi",
      "Server diskidagi fayllar shifrlanadi",
      "Tarmoq kabeli orqali signal tutib olinadi",
    ],
    a: 0,
  },
  {
    topic: "Veb xavfsizlik",
    q: "“Kun nolinchi” (zero-day) zaiflik nima?",
    options: [
      "Ishlab chiqaruvchiga hali ma'lum bo'lmagan yoki yamog'i chiqmagan zaiflik",
      "Dastur o'rnatilgan kuni topilgan har qanday xato",
      "Faqat yil boshida paydo bo'ladigan zaiflik",
      "Allaqachon tuzatilgan eski zaiflik",
    ],
    a: 0,
  },

  // --- Risklarni boshqarish ---
  {
    topic: "Risklarni boshqarish",
    q: "Axborot xavfsizligi riski qaysi tarkibiy qismlar orqali aniqlanadi?",
    options: [
      "Tahdid, zaiflik va oqibat (ta'sir)",
      "Server, tarmoq va foydalanuvchi",
      "Parol, login va IP manzil",
      "Antivirus, firewall va VPN",
    ],
    a: 0,
  },
  {
    topic: "Risklarni boshqarish",
    q: "Zaiflik (vulnerability) nima?",
    options: [
      "Tahdid amalga oshishi uchun foydalanishi mumkin bo'lgan tizimdagi kamchilik",
      "Hujumni amalga oshiruvchi shaxs yoki guruh",
      "Hujum natijasida ko'rilgan zarar miqdori",
      "Xavfsizlik siyosatining nomi",
    ],
    a: 0,
  },
  {
    topic: "Risklarni boshqarish",
    q: "Tashkilot kiberhujum oqibatlarini sug'urta qildirdi. Bu riskka javobning qaysi usuli?",
    options: ["Riskni o'tkazish", "Riskni kamaytirish", "Riskdan qochish", "Riskni qabul qilish"],
    a: 0,
  },
  {
    topic: "Risklarni boshqarish",
    q: "Kutilayotgan yillik zarar (ALE) qanday hisoblanadi?",
    options: [
      "Bir martalik zarar (SLE) × yillik yuz berish soni (ARO)",
      "Aktiv qiymati + zaiflik darajasi",
      "Tahdidlar soni × xodimlar soni",
      "Himoya xarajati ÷ aktiv qiymati",
    ],
    a: 0,
  },
  {
    topic: "Risklarni boshqarish",
    q: "“3-2-1” zaxira nusxa qoidasi nimani anglatadi?",
    options: [
      "3 ta nusxa, 2 xil tashuvchida, 1 tasi boshqa joyda saqlanadi",
      "3 kunda 2 marta, 1 ta serverga zaxira olinadi",
      "3 ta parol, 2 ta login, 1 ta administrator",
      "3 yil saqlanadi, 2 yilda tekshiriladi, 1 yilda o'chiriladi",
    ],
    a: 0,
  },

  // --- Standartlar ---
  {
    topic: "Standartlar",
    q: "Axborot xavfsizligini boshqarish tizimi (ISMS) talablarini belgilovchi xalqaro standart qaysi?",
    options: ["ISO/IEC 27001", "ISO 9001", "ISO 14001", "IEEE 802.11"],
    a: 0,
  },
  {
    topic: "Standartlar",
    q: "NIST Kiberxavfsizlik freymvorki (CSF 2.0) nechta asosiy funksiyadan iborat?",
    options: ["6 ta", "5 ta", "4 ta", "7 ta"],
    a: 0,
  },
];
