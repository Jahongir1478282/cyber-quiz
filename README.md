# Kiber Quiz — Kiberxavfsizlik testi

Talaba saytga kirib familiya va ismini yozadi, testni ishlaydi. Natijasi darhol asosiy oynadagi umumiy jadvalga
qo'shiladi. Jadval har 5 soniyada o'zi yangilanadi, shuning uchun uni darsda proyektorda ochib qo'yish mumkin.

## Imkoniyatlar

- 48 ta kuchaytirilgan savollar banki (4-kurs darajasidagi 4 yo'nalish: Risk management, Tahdid razvedkasi, Kriptografik protokollar, Reverse engineering). Har bir talabaga tasodifiy 20 ta savol tushadi, variantlar tartibi ham har xil.
- Taymer (standart 20 daqiqa). Vaqt tugasa, javoblar avtomatik topshiriladi.
- Sahifa tasodifan yangilansa, belgilangan javoblar saqlanib qoladi.
- Asosiy oynada barcha natijalar: o'rin, foiz, 5 ballik baho, sarflangan vaqt.
- O'qituvchi paneli (parol bilan):
  - testni yopish va ochish;
  - alohida natijani o'chirish;
  - natijalarni Excel uchun CSV faylga yuklab olish;
  - barcha natijalarni tozalash.

---

## 1. Vercel'ga joylash (birinchi marta)

Vercel'da bepul **Hobby** tarifi yetarli.

### 1-qadam. Kodni GitHub'ga yuklash

1. [github.com](https://github.com) saytida yangi repository yarating, masalan `kiber-quiz`.
2. "Kiber Quiz" papkasidagi **barcha fayl va papkalarni** yuklang. Buning ikki yo'li bor:
   - **GitHub Desktop:** papkani repository sifatida qo'shing, keyin *Commit* va *Push* tugmalarini bosing.
   - **Sayt orqali:** *Add file → Upload files* ni tanlab, papka ichidagilarni sudrab tashlang.

   Yuklashda `node_modules` va `.next` papkalari bo'lmasligi kerak. Agar ular paydo bo'lgan bo'lsa ham, `.gitignore` ularni o'zi chetlab o'tadi.

### 2-qadam. Vercel'da loyiha yaratish

1. [vercel.com](https://vercel.com) saytiga GitHub hisobingiz orqali kiring.
2. **Add New… → Project** ni bosing, `kiber-quiz` repositoryni tanlab **Import** qiling.
3. Framework sifatida Next.js o'zi aniqlanadi. Hech narsani o'zgartirmasdan **Deploy** ni bosing.

### 3-qadam. Ma'lumotlar bazasini ulash (majburiy)

Natijalar Vercel serverida saqlanmaydi, ular uchun bepul Upstash Redis bazasi kerak.

1. Vercel'da loyihangizni ochib, **Storage** bo'limiga o'ting.
2. **Create Database** yoki **Browse Marketplace** ni bosing va **Upstash → Upstash for Redis** ni tanlang.
3. Hudud sifatida O'zbekistonga yaqinini (masalan, Frankfurt) va bepul tarifni (**Free**) tanlang, so'ng bazani yarating.
4. Bazani shu loyihaga ulang (**Connect Project**). Ulanish kalitlari loyihaga avtomatik qo'shiladi.

### 4-qadam. O'qituvchi parolini kiritish

**Settings → Environment Variables** bo'limiga quyidagi o'zgaruvchilarni qo'shing:

| Nomi | Qiymati | Majburiymi |
|---|---|---|
| `ADMIN_PASSWORD` | O'qituvchi paneli uchun kuchli parol | Ha |
| `QUIZ_QUESTION_COUNT` | Har bir talabaga beriladigan savollar soni (standart: 20) | Yo'q |
| `QUIZ_TIME_MINUTES` | Test vaqti, daqiqada (standart: 20) | Yo'q |

### 5-qadam. Qayta joylash

**Deployments** bo'limida oxirgi deployni toping, **⋯ → Redeploy** ni bosing. O'zgaruvchilar va baza faqat qayta joylashdan keyin ishlay boshlaydi.

Saytni oching. Tepada sariq **"Lokal sinov rejimi"** yozuvi chiqmasa, baza to'g'ri ulangan.

---

## 2. Darsda foydalanish

1. Asosiy sahifani proyektorda oching: natijalar o'zi yangilanib turadi.
2. Sayt havolasini talabalarga bering. Ular telefon yoki kompyuterdan kirib, familiya va ismini yozadi.
3. Hamma topshirib bo'lgach, **O'qituvchi paneli → Testni yopish** ni bosing.
4. **Natijalarni Excel'ga yuklab olish (CSV)** tugmasi bilan natijalarni saqlab oling.
5. Keyingi guruhdan oldin **Barcha natijalarni o'chirish** ni bosing, keyin testni qayta oching.

Bitta familiya-ism bilan test faqat bir marta topshiriladi. Talaba ismini xato yozgan bo'lsa yoki qayta topshirishi
kerak bo'lsa, panelga kirib, jadvaldagi **✕** tugmasi bilan uning natijasini o'chiring.

---

## 3. Savollarni o'zgartirish

Savollar `data/questions.js` faylida saqlanadi. Har bir savol quyidagi ko'rinishda yoziladi:

```js
{
  topic: "Tarmoq xavfsizligi",
  q: "SSH xizmatining standart porti qaysi?",
  options: ["22", "21", "23", "25"],
  a: 0, // to'g'ri javobning tartib raqami: 0 — birinchi variant, 1 — ikkinchi, ...
},
```

Namunadagi savollarda to'g'ri javob doim birinchi o'rinda yozilgan. Talabaga ko'rsatishda variantlar baribir
aralashtiriladi, shuning uchun bu ishlashga ta'sir qilmaydi.

Faylni o'zgartirib GitHub'ga yuklasangiz, Vercel saytni o'zi qayta joylaydi.

---

## 4. Kompyuterda sinab ko'rish (ixtiyoriy)

1. [Node.js](https://nodejs.org) ning 20.9 yoki undan yangi versiyasini o'rnating.
2. Papkada terminal oching va ketma-ket bajaring:

   ```bash
   npm install
   copy .env.example .env.local
   npm run dev
   ```

   `copy` buyrug'i Windows uchun. macOS yoki Linux'da uning o'rniga `cp` yoziladi.
3. `.env.local` faylida `ADMIN_PASSWORD` qiymatini yozing.
4. Brauzerda `http://localhost:3000` manzilini oching.

Baza kalitlari kiritilmagan bo'lsa, natijalar vaqtincha kompyuter xotirasida saqlanadi va server to'xtatilganda o'chib ketadi.

---

## 5. Xavfsizlik

Bu qism darsda talabalar bilan muhokama qilish uchun ham foydali.

| Tahdid | Himoya |
|---|---|
| Brauzer kodidan (DevTools) to'g'ri javobni topish | To'g'ri javoblar brauzerga umuman yuborilmaydi. Baholash faqat serverda bajariladi |
| Qo'shnisidan ko'chirish | Har bir talabada savollar va variantlar boshqa tartibda (kriptografik tasodifiylik bilan) |
| Vaqtni aldash (kompyuter soatini o'zgartirish) | Vaqt server soati bo'yicha hisoblanadi. Kech topshirilgan natija **"kech"** deb belgilanadi |
| Bir testni ikki marta topshirish | Har bir urinish bir martalik. Bitta familiya-ism bilan bitta natija saqlanadi |
| O'qituvchi parolini tanlab ko'rish | Parol "timing-safe" usulda solishtiriladi, noto'g'ri urinishdan keyin javob kechiktiriladi |
| CSV faylda formula injection | `=`, `+`, `-`, `@` bilan boshlangan qiymatlar matn sifatida saqlanadi |
| Saytni boshqa sahifaga yashirincha joylash (clickjacking) | `X-Frame-Options: DENY` va boshqa xavfsizlik sarlavhalari |

**Ma'lum cheklov:** saytda talabaning shaxsini tasdiqlash (autentifikatsiya) yo'q, shuning uchun kimdir boshqa
talabaning ismini yozib kirishi mumkin. O'qituvchi jadvalni kuzatib, soxta yozuvni o'chiradi. Bu cheklovning
o'zini ham darsda risk sifatida tahlil qilish mumkin.

**Bepul tarif haqida:** Upstash'ning bepul tarifida oylik so'rovlar soni cheklangan. Shuni hisobga olib, asosiy
sahifa faqat ekranda ochiq turganda yangilanadi va boshqa oynaga o'tilganda so'rov yuborishni to'xtatadi.

---

## Fayllar tuzilmasi

```
app/
  page.js, HomeClient.js     asosiy oyna: ism kiritish va natijalar jadvali
  quiz/[id]/                 test sahifasi
  api/start                  testni boshlash
  api/attempt/[id]           savollarni olish (javoblarsiz)
  api/submit                 javoblarni topshirish va baholash
  api/results                natijalar (?format=csv — Excel uchun)
  api/admin                  o'qituvchi amallari
data/questions.js            savollar banki
lib/                         sozlamalar, baholash, ma'lumotlarni saqlash
```
