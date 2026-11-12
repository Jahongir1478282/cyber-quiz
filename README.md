# Kiber Quiz - Kiberxavfsizlik testi

Talaba saytga kirib familiya va ismini yozadi, testni ishlaydi. Savollar faqat [questions.js](./data/questions.js) dan olinadi.

Loyiha ikki rejimda ishlaydi:

- **Stateless (Upstash'siz):** test oqimi ishlaydi, natija talabaning o'zida ko'rinadi.
- **Redis bilan (Upstash):** umumiy jadval, CSV export va o'qituvchi paneli to'liq ishlaydi.

## Imkoniyatlar

- 83 ta savol banki (Kriptografiya usullari).
- Har bir talabaga tasodifiy savollar va aralashtirilgan variantlar.
- Taymer (standart 20 daqiqa), vaqt tugasa avtomatik submit.
- Brauzer yangilansa belgilangan javoblar saqlanib qoladi.
- Redis rejimida jonli umumiy natijalar jadvali.

---

## 1) Vercel'ga joylash

### 1-qadam. Kodni GitHub'ga yuklash

1. `kiber-quiz` repository yarating.
2. Loyihadagi fayllarni yuklang (`node_modules` va `.next` kerak emas).

### 2-qadam. Vercel'da deploy

1. Vercel'da `Add New -> Project` orqali repository'ni import qiling.
2. Framework `Next.js` avtomatik aniqlanadi, `Deploy` bosing.

### 3-qadam. Storage (live rejim uchun majburiy)

Umumiy live jadval uchun Upstash Redis ulang:

- **Ulangan bo'lsa:** umumiy reyting, CSV va o'qituvchi paneli ishlaydi.
- **Ulanmagan bo'lsa:** `QUIZ_FORCE_REDIS=1` bo'lganda test boshlanmaydi (xatolik 503).

### 4-qadam. Environment Variables

`Settings -> Environment Variables` bo'limida:

| Nomi | Vazifasi | Majburiymi |
|---|---|---|
| `ATTEMPT_SECRET` | Stateless urinish tokenini imzolash uchun maxfiy kalit | Ha (tavsiya) |
| `ADMIN_PASSWORD` | O'qituvchi paneli paroli (Redis rejimi uchun) | Ixtiyoriy |
| `QUIZ_FORCE_REDIS` | `1` bo'lsa Redis ulanmaguncha live testni bloklaydi | Live uchun ha |
| `QUIZ_QUESTION_COUNT` | Har talabaga savollar soni (standart 80) | Yo'q |
| `QUIZ_TIME_MINUTES` | Test vaqti daqiqada (standart 20) | Yo'q |

### 5-qadam. Qayta deploy

Oxirgi deploy'ni `Redeploy` qiling.

---

## 2) Darsda foydalanish

1. Asosiy sahifani proyektorda oching.
2. Havolani talabalarga bering.
3. Redis rejimida o'qituvchi panelidan testni yopish/ochish, CSV yuklash va reset qilish mumkin.

**Eslatma:**

- Live uchun Vercel'da Upstash Redis ulang va `QUIZ_FORCE_REDIS=1` qo'ying.
- Redis rejimida bitta familiya-ism bilan bitta natija saqlanadi.

---

## 3) Savollarni o'zgartirish

Savollar [questions.js](./data/questions.js) faylida:

```js
{
  topic: "Tarmoq xavfsizligi",
  q: "SSH xizmatining standart porti qaysi?",
  options: ["22", "21", "23", "25"],
  a: 0,
}
```

`a` - to'g'ri javob indeksi (`0` birinchi variant).

---

## 4) Lokal ishga tushirish

1. Node.js 20.9+ o'rnating.
2. Terminalda:

```bash
npm install
copy .env.example .env.local
npm run dev
```

3. [questions.js](./data/questions.js) va `.env.local` ni sozlang.
4. Brauzerda `http://localhost:3000` ni oching.

---

## 5) Rejimlar haqida qisqa

- `storage = redis`: to'liq funksional rejim.
- `storage = redis-required`: `QUIZ_FORCE_REDIS=1` yoqilgan, lekin Redis ulanmagan.
- `storage = stateless`: test oqimi bor, lekin serverda umumiy natija saqlanmaydi.
- `storage = memory`: faqat lokal diagnostika (`QUIZ_STORAGE_MODE=memory`).
