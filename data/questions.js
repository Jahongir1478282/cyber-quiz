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
  // --- Risk management ---
  {
    topic: "Risk management",
    q: "Inherent risk va residual risk o'rtasidagi to'g'ri farq qaysi?",
    options: [
      "Inherent risk — nazoratlarsiz risk; residual risk — amaldagi nazoratlardan keyin qoladigan risk",
      "Inherent risk faqat moliyaviy risk, residual risk faqat texnik risk",
      "Inherent risk hodisadan keyin, residual risk hodisadan oldin baholanadi",
      "Ular bir xil tushuncha, faqat auditda nomi boshqacha",
    ],
    a: 0,
  },
  {
    topic: "Risk management",
    q: "Risk appetite eng to'g'ri qaysi fikr bilan ifodalanadi?",
    options: [
      "Tashkilot maqsadlariga erishish yo'lida qabul qilishga tayyor bo'lgan umumiy risk darajasi",
      "Har bir zaiflikka CVSS bo'yicha berilgan texnik ball",
      "Faqat CISO tomonidan texnik darajada beriladigan buyruq",
      "Yillik auditda topilgan muammolar soni",
    ],
    a: 0,
  },
  {
    topic: "Risk management",
    q: "BCP/DRP rejalashda RTO ko'rsatkichi nimani bildiradi?",
    options: [
      "Xizmat to'xtaganidan keyin biznesga qabul qilinadigan maksimal tiklash vaqti",
      "Tiklashdan keyin yo'qotilishi mumkin bo'lgan maksimal ma'lumot hajmi",
      "Bitta aktivning balans qiymati",
      "Yillik ehtimol koeffitsienti",
    ],
    a: 0,
  },
  {
    topic: "Risk management",
    q: "RPO (Recovery Point Objective) amaliy ma'noda nimani belgilaydi?",
    options: [
      "Qanchagacha bo'lgan ma'lumot yo'qotilishi biznes uchun qabul qilinishi mumkinligini",
      "Sistemani tiklash uchun kerak bo'lgan xodimlar sonini",
      "Favqulodda holatdagi minimal internet tezligini",
      "Yangi xavfsizlik vositasining litsenziya muddatini",
    ],
    a: 0,
  },
  {
    topic: "Risk management",
    q: "ALE (Annual Loss Expectancy) formulasi qaysi javobda to'g'ri?",
    options: ["ALE = SLE x ARO", "ALE = AV x EF", "ALE = CVSS x Asset Count", "ALE = RTO / RPO"],
    a: 0,
  },
  {
    topic: "Risk management",
    q: "“Risk transfer” strategiyasiga eng mos misol qaysi?",
    options: [
      "Kiberxavflar bo'yicha sug'urta shartnomasini rasmiylashtirish",
      "Zaif servisni butunlay o'chirib qo'yish",
      "WAF va EDR ni qo'shib riskni kamaytirish",
      "Qolgan riskni hujjatlashtirib qabul qilish",
    ],
    a: 0,
  },
  {
    topic: "Risk management",
    q: "Risk acceptance qarorini qabul qilishdan oldin eng muhim talab qaysi?",
    options: [
      "Riskning biznes ta'siri va asoslari rahbariyat darajasida rasman tasdiqlanishi",
      "Faqat texnik jamoa og'zaki kelishuvi bo'lishi",
      "Riskni yashirish uchun jurnal yozuvlarini kamaytirish",
      "CVSS 7 dan past bo'lsa avtomatik qabul qilish",
    ],
    a: 0,
  },
  {
    topic: "Risk management",
    q: "KRI (Key Risk Indicator) nimaga xizmat qiladi?",
    options: [
      "Risk oshib borayotganini oldindan ko'rsatadigan monitoring ko'rsatkichini berishga",
      "Faqat hodisa sodir bo'lgandan keyin forensika hisobotini yozishga",
      "Faqat auditorlar uchun hujjat sonini oshirishga",
      "Pen-test natijalarini avtomatik yopishga",
    ],
    a: 0,
  },
  {
    topic: "Risk management",
    q: "Uchinchi tomon (vendor) riskini baholashda eng to'g'ri yondashuv qaysi?",
    options: [
      "Vendorning ma'lumotlarga kirish darajasi, nazoratlari va shartnoma majburiyatlarini birga baholash",
      "Faqat vendor brendining mashhurligiga qarab qaror qilish",
      "Faqat narxi arzon bo'lsa, qo'shimcha tekshiruvsiz ulash",
      "Faqat SLA da javob vaqti ko'rsatilganini tekshirish",
    ],
    a: 0,
  },
  {
    topic: "Risk management",
    q: "BIA (Business Impact Analysis)ning asosiy natijasi odatda qaysi?",
    options: [
      "Kritik biznes jarayonlari va to'xtash oqibatlarini ustuvorlik bo'yicha aniqlash",
      "Tarmoqdagi barcha ochiq portlar ro'yxatini chiqarish",
      "Parol siyosatidagi minimal uzunlikni belgilash",
      "Phishing trening testidan o'tganlar ro'yxatini olish",
    ],
    a: 0,
  },
  {
    topic: "Risk management",
    q: "Risk register uchun eng kerakli maydonlar to'plami qaysi?",
    options: [
      "Risk tavsifi, ehtimol, ta'sir, mavjud nazoratlar, egasi, choralar rejasi va muddat",
      "Faqat risk nomi va uni topgan xodim familiyasi",
      "Faqat CVE raqami va patch versiyasi",
      "Faqat IT bo'limining ichki chat xabarlari",
    ],
    a: 0,
  },
  {
    topic: "Risk management",
    q: "NIST SP 800-30 yoki ISO/IEC 27005 ruhiga ko'ra to'g'ri ketma-ketlik qaysi?",
    options: [
      "Aktiv va kontekstni aniqlash -> riskni baholash -> riskni davolash -> monitoring va qayta ko'rib chiqish",
      "Riskni yopish -> aktivni topish -> ehtimolni hisoblash -> logni o'chirish",
      "Audit xulosasi -> firewall o'chirish -> riskni qabul qilish -> trening",
      "Avval hodisa javobi -> keyin BIA -> so'ngra aktiv inventari",
    ],
    a: 0,
  },

  // --- Tahdid razvedkasi ---
  {
    topic: "Tahdid razvedkasi",
    q: "IOC va TTP o'rtasidagi eng muhim farq qaysi?",
    options: [
      "IOC tez eskiradi, TTP esa hujumchi xulq-atvorini ifodalab nisbatan barqarorroq bo'ladi",
      "IOC faqat davlat sektorida ishlatiladi, TTP faqat xususiy sektorda",
      "IOC shifrlash kaliti, TTP esa xesh-funksiya turi",
      "Ular bir xil ma'lumotning ikki xil yozilishi",
    ],
    a: 0,
  },
  {
    topic: "Tahdid razvedkasi",
    q: "Pyramid of Pain modelida hujumchiga eng ko'p zarar yetkazuvchi indikator qaysi?",
    options: ["TTP lar", "IP manzillar", "Fayl xeshlari", "Domen nomlari"],
    a: 0,
  },
  {
    topic: "Tahdid razvedkasi",
    q: "STIX va TAXII birgalikda asosan nimani ta'minlaydi?",
    options: [
      "Tahdid razvedkasi obyektlarini standart formatda ifodalash va almashishni avtomatlashtirishni",
      "SIEM dagi loglarni real vaqtda shifrlashni",
      "Endpointdagi fayllarni zaxiralashni",
      "DDoS trafikni tarmoq perimetrida to'liq to'xtatishni",
    ],
    a: 0,
  },
  {
    topic: "Tahdid razvedkasi",
    q: "MITRE ATT&CK dan amaliy foydalanishning eng to'g'ri usuli qaysi?",
    options: [
      "Kuzatilgan hujum faoliyatini ATT&CK texnikalariga xaritalab, detection gaplarni topish",
      "Faqat compliance hisobotiga rasm qo'shish",
      "Firewall qoidalarini ATT&CK ID ga almashtirish",
      "Antivirus signaturasini ATT&CK bilan shifrlash",
    ],
    a: 0,
  },
  {
    topic: "Tahdid razvedkasi",
    q: "Intelligence lifecycle ketma-ketligi qaysi javobda to'g'ri?",
    options: [
      "Requirements -> Collection -> Processing -> Analysis -> Dissemination -> Feedback",
      "Collection -> Dissemination -> Requirements -> Analysis -> Deletion",
      "Analysis -> Collection -> Requirements -> Publishing -> Recovery",
      "Feedback -> Detection -> Collection -> Patch -> Closure",
    ],
    a: 0,
  },
  {
    topic: "Tahdid razvedkasi",
    q: "Strategik threat intelligence odatda kimlar uchun va qaysi ko'rinishda tayyorlanadi?",
    options: [
      "Rahbariyat uchun biznesga ta'sir, trendlar va risk qarorlariga yo'naltirilgan yuqori darajali hisobot",
      "Faqat SOC analistlari uchun xesh va IP ro'yxati",
      "Faqat reverserlar uchun assembler listing",
      "Faqat pentesterlar uchun exploit kodlari",
    ],
    a: 0,
  },
  {
    topic: "Tahdid razvedkasi",
    q: "CTI sifati past bo'lsa, SOC dagi eng odatiy salbiy natija nima bo'ladi?",
    options: [
      "False positive lar ko'payib, analist charchashi va ustuvor signalni o'tkazib yuborish xavfi ortadi",
      "Barcha endpointlar avtomatik shifrlanadi",
      "SIEM ga log kelishi to'liq to'xtaydi",
      "RPO va RTO avtomatik yaxshilanadi",
    ],
    a: 0,
  },
  {
    topic: "Tahdid razvedkasi",
    q: "Yangi domen bo'yicha passive DNS pivot qilishdan asosiy maqsad nima?",
    options: [
      "Domen bilan bog'liq tarixiy IP/infratuzilma aloqalarini topib, kampaniya ko'lamini kengaytirish",
      "Domen egasining bank hisobini aniqlash",
      "TLS sertifikatini avtomatik bekor qilish",
      "Endpointga patch o'rnatish",
    ],
    a: 0,
  },
  {
    topic: "Tahdid razvedkasi",
    q: "Kill chain modelida phishing email yuborish odatda qaysi bosqichga to'g'ri keladi?",
    options: ["Delivery", "Actions on Objectives", "Installation", "Command and Control"],
    a: 0,
  },
  {
    topic: "Tahdid razvedkasi",
    q: "YARA va Sigma qoidalari o'rtasidagi amaliy farq qaysi?",
    options: [
      "YARA ko'proq fayl/xotira artefaktlari uchun, Sigma esa logga asoslangan aniqlash qoidalari uchun ishlatiladi",
      "YARA faqat tarmoq routerlarida, Sigma faqat printerlarda ishlaydi",
      "Sigma binar faylni disassembel qiladi, YARA esa SIEM dashboard chizadi",
      "Ikkalasi faqat malware yozish uchun vosita",
    ],
    a: 0,
  },
  {
    topic: "Tahdid razvedkasi",
    q: "Diamond Model'ning to'rtta asosiy elementi qaysi?",
    options: [
      "Adversary, Capability, Infrastructure, Victim",
      "Asset, Vulnerability, Patch, Backup",
      "User, Password, Token, Session",
      "Hash, Salt, Nonce, Key",
    ],
    a: 0,
  },
  {
    topic: "Tahdid razvedkasi",
    q: "Threat hunting uchun CTI asosida eng to'g'ri gipoteza yozilishi qaysi?",
    options: [
      "Agar APT guruhi T1059 va T1071 ni ishlatsa, shu TTP ga mos host va proxy loglarida anomaliyalar bo'lishi kerak",
      "Barcha alertlar noto'g'ri, shuning uchun ularni o'chirish kerak",
      "Yangi IOC bo'lsa, barcha serverlarni formatlash kerak",
      "Hujum bo'lishi uchun albatta DDoS bo'lishi shart",
    ],
    a: 0,
  },

  // --- Kriptografik protokollar ---
  {
    topic: "Kriptografik protokollar",
    q: "TLS 1.3 da Perfect Forward Secrecy odatda qaysi mexanizm orqali ta'minlanadi?",
    options: [
      "Ephemeral (EC)DHE kalit almashinuvi orqali",
      "Bir xil statik RSA kalitini yillar davomida ishlatish orqali",
      "Faqat server sertifikatini Base64 da uzatish orqali",
      "Faqat HTTP headerlarni gzip qilish orqali",
    ],
    a: 0,
  },
  {
    topic: "Kriptografik protokollar",
    q: "TLS ulanishida sertifikat tekshiruvining asosiy maqsadi nima?",
    options: [
      "Mijoz haqiqiy server bilan gaplashayotganini isbotlash va MITM xavfini kamaytirish",
      "TCP paketlarini tezroq yetkazish",
      "Diskdagi fayllarni avtomatik zaxiralash",
      "HTTP so'rovlarini cache ga majburan yozish",
    ],
    a: 0,
  },
  {
    topic: "Kriptografik protokollar",
    q: "mTLS (mutual TLS) odatiy TLS dan qaysi jihati bilan farq qiladi?",
    options: [
      "Serverdan tashqari mijoz ham sertifikat bilan autentifikatsiya qilinadi",
      "mTLS da simmetrik shifrlash umuman ishlatilmaydi",
      "mTLS faqat UDP transportida ishlaydi",
      "mTLS sertifikat talab qilmaydi",
    ],
    a: 0,
  },
  {
    topic: "Kriptografik protokollar",
    q: "HSTS ni yoqishning asosiy xavfsizlik foydasi qaysi?",
    options: [
      "Brauzerni HTTPS ni majburan ishlatishga o'tkazib, SSL stripping xavfini kamaytiradi",
      "SQL-injection hujumlarini to'liq yo'q qiladi",
      "DDoS trafigini tarmoqdan filtrlab tashlaydi",
      "JWT tokenning muddatini uzaytiradi",
    ],
    a: 0,
  },
  {
    topic: "Kriptografik protokollar",
    q: "AEAD (masalan, AES-GCM yoki ChaCha20-Poly1305) nimani birgalikda beradi?",
    options: [
      "Maxfiylik va butunlik/autentiklikni bitta primitivda",
      "Faqat xeshlashni",
      "Faqat siqishni",
      "Faqat raqamli imzo tekshiruvini",
    ],
    a: 0,
  },
  {
    topic: "Kriptografik protokollar",
    q: "AES-GCM da nonce qayta ishlatilsa, eng xavfli oqibat qaysi?",
    options: [
      "Maxfiylik va autentiklik kafolatlari jiddiy buzilishi mumkin",
      "Faqat paket hajmi oshadi, xavfsizlikka ta'siri yo'q",
      "Faqat sertifikat muddati qisqaradi",
      "Faqat DNS javoblari sekinlashadi",
    ],
    a: 0,
  },
  {
    topic: "Kriptografik protokollar",
    q: "Mobil ilova yoki SPA uchun OAuth 2.0 da tavsiya etiladigan oqim qaysi?",
    options: [
      "Authorization Code flow + PKCE",
      "Implicit flow da access tokenni URL fragmentda doimiy saqlash",
      "Resource Owner Password Credentials ni barcha holatlarda ishlatish",
      "Client secretni frontend JavaScript ichiga qo'yish",
    ],
    a: 0,
  },
  {
    topic: "Kriptografik protokollar",
    q: "JWT bilan ishlashda “alg=none” muammosi nimani anglatadi?",
    options: [
      "Imzosiz tokenni xato qabul qilish ehtimoli bo'lib, bu autentifikatsiyani chetlab o'tishga olib keladi",
      "Tokenni faqat HTTPS da yuborishni anglatadi",
      "Tokenning muddati tugaganini bildiradi",
      "Foydalanuvchi roli avtomatik admin bo'lishini anglatadi",
    ],
    a: 0,
  },
  {
    topic: "Kriptografik protokollar",
    q: "Kerberos protokolida replay hujumlariga qarshi asosiy himoya elementlari qaysi?",
    options: [
      "Vaqt belgisi (timestamp), autentifikator va qisqa umrli ticketlar",
      "Faqat IP manzilni oq ro'yxatga kiritish",
      "Faqat CAPTCHA qo'yish",
      "Faqat parolni 8 belgidan uzun qilish",
    ],
    a: 0,
  },
  {
    topic: "Kriptografik protokollar",
    q: "IPsec'da ESP va AH farqi bo'yicha to'g'ri bayon qaysi?",
    options: [
      "ESP odatda maxfiylik (+ixtiyoriy butunlik), AH esa asosan butunlik va autentifikatsiyani beradi",
      "AH trafikni shifrlaydi, ESP esa faqat marshrutlaydi",
      "ESP faqat IPv4 da, AH faqat IPv6 da ishlaydi",
      "Ular bir xil protokolning ikki nomi",
    ],
    a: 0,
  },
  {
    topic: "Kriptografik protokollar",
    q: "DNSSEC ning asosiy vazifasi qaysi?",
    options: [
      "DNS yozuvlarining kelib chiqishi va butunligini tekshirish (autentifikatsiya + integrity)",
      "DNS trafikni to'liq shifrlash va maxfiy qilish",
      "HTTP cookie larni himoyalash",
      "SMTP uchun spam filtrlash",
    ],
    a: 0,
  },
  {
    topic: "Kriptografik protokollar",
    q: "Signal'dagi Double Ratchet mexanizmining asosiy xavfsizlik foydasi qaysi?",
    options: [
      "Forward secrecy va post-compromise security ni ta'minlaydi",
      "Bir marta olingan kalitni cheksiz muddat ishlatadi",
      "Kalit almashinuvisiz ham E2E xavfsizlik beradi",
      "Faqat transport qatlamida checksum hisoblaydi",
    ],
    a: 0,
  },

  // --- Reverse engineering ---
  {
    topic: "Reverse engineering",
    q: "Static analysis va dynamic analysis o'rtasidagi to'g'ri ta'rif qaysi?",
    options: [
      "Static — kodni ishga tushirmasdan tahlil, Dynamic — bajarilish vaqtida xulq-atvorni kuzatish",
      "Static faqat Linuxda, Dynamic faqat Windowsda ishlaydi",
      "Static faqat tarmoq paketlarini, Dynamic faqat parollarni tahlil qiladi",
      "Ular bir xil metodning ikki nomi",
    ],
    a: 0,
  },
  {
    topic: "Reverse engineering",
    q: "PE fayldagi Import Address Table (IAT) odatda nima uchun foydali?",
    options: [
      "Dastur qaysi API funksiyalariga tayanishini ko'rib, xulq-atvorni taxmin qilish uchun",
      "Diskdagi bad sektorlarni tiklash uchun",
      "TLS sertifikat zanjirini tekshirish uchun",
      "CPU chastotasini aniqlash uchun",
    ],
    a: 0,
  },
  {
    topic: "Reverse engineering",
    q: "Ijro fayli entropiyasi juda yuqori bo'lsa, eng ehtimolli taxmin qaysi?",
    options: [
      "Fayl packer/kriptor bilan siqilgan yoki shifrlangan bo'lishi mumkin",
      "Fayl manba kodi to'liq ochiq va hujjatlashtirilgan",
      "Faylda hech qanday zararli xatti-harakat bo'lmaydi",
      "Fayl faqat matnli loglardan iborat",
    ],
    a: 0,
  },
  {
    topic: "Reverse engineering",
    q: "IsDebuggerPresent, ptrace check yoki timing check kabi usullar nimaga xizmat qiladi?",
    options: [
      "Anti-debug/anti-analysis orqali tahlilchini chalg'itish yoki sekinlatishga",
      "Kodning avtomatik formatlanishini yaxshilashga",
      "Raqamli imzo yaratishga",
      "SQL so'rovlarini optimallashtirishga",
    ],
    a: 0,
  },
  {
    topic: "Reverse engineering",
    q: "Malware'da API hashing qo'llashdan asosiy maqsad nima bo'lishi mumkin?",
    options: [
      "Import nomlarini yashirib, statik signatura asosida aniqlanishni qiyinlashtirish",
      "RAM hajmini avtomatik oshirish",
      "Faylni legal litsenziya bilan himoyalash",
      "Kernel patchini xavfsiz o'rnatish",
    ],
    a: 0,
  },
  {
    topic: "Reverse engineering",
    q: "Obfuscationdagi opaque predicate eng to'g'ri qaysi ta'rifga mos?",
    options: [
      "Har doim bir xil natija beradigan, lekin murakkab ko'rinishda yozilgan shart operatori",
      "Faqat parolni hash qilish funksiyasi",
      "TLS handshake dagi ServerHello maydoni",
      "CPU keshini tozalash buyrug'i",
    ],
    a: 0,
  },
  {
    topic: "Reverse engineering",
    q: "x86-64 System V ABI (Linux/macOS) bo'yicha birinchi argument qaysi registrda uzatiladi?",
    options: ["RDI", "RAX", "RBP", "RSP"],
    a: 0,
  },
  {
    topic: "Reverse engineering",
    q: "Binar faylda strings natijasida C2 URL chiqmayapti, lekin trafik mavjud. Eng mantiqli sabab qaysi?",
    options: [
      "Stringlar runtime'da deshifrlanadi yoki dinamik yig'iladi",
      "Dastur internetga umuman chiqmaydi",
      "Fayl tizimi NTFS emasligi sababli URL yashiringan",
      "URL faqat BIOS da saqlanadi",
    ],
    a: 0,
  },
  {
    topic: "Reverse engineering",
    q: "Litsenziya tekshiruvini chetlab o'tishda “JNE -> JE” kabi branch patching nimani anglatadi?",
    options: [
      "Shartli o'tishni o'zgartirib dastur mantiqini teskari yo'naltirish",
      "TCP portni almashtirish",
      "Diskni formatlash",
      "Sertifikatni qayta chiqarish",
    ],
    a: 0,
  },
  {
    topic: "Reverse engineering",
    q: "Packed malware tahlilida memory dump olishning eng asosiy sababi qaysi?",
    options: [
      "Runtime'da unpack bo'lgan haqiqiy kod/payload nusxasini olish uchun",
      "Tarmoq tezligini oshirish uchun",
      "Faylga raqamli imzo qo'shish uchun",
      "OS yangilanishini bekor qilish uchun",
    ],
    a: 0,
  },
  {
    topic: "Reverse engineering",
    q: "Sandbox evasion'da juda uzun sleep yoki user-interaction tekshiruvlari odatda nimaga qaratilgan?",
    options: [
      "Avtomatlashtirilgan tahlil muhitini vaqt bo'yicha aldash yoki undan yashirinishga",
      "CPU ni overclock qilishga",
      "Kernelni patchlashga",
      "JWT tokenni rotatsiya qilishga",
    ],
    a: 0,
  },
  {
    topic: "Reverse engineering",
    q: "Reverse engineering bo'yicha huquqiy/etik jihatdan eng to'g'ri yondashuv qaysi?",
    options: [
      "Faqat ruxsat etilgan muhit va qonuniy mandat doirasida tahlil qilish",
      "Har qanday tijoriy dasturga cheksiz patch kiritish",
      "Topilgan exploitlarni tekshirmasdan ommaga ulashish",
      "Mijoz ma'lumotlarini laboratoriyadan tashqariga olib chiqish",
    ],
    a: 0,
  },
];
