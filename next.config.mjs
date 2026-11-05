import os from "node:os";

/** @type {import('next').NextConfig} */

// Xavfsizlik sarlavhalari: sayt boshqa saytga iframe ichida joylanmaydi,
// brauzer fayl turini taxmin qilmaydi, kamera/mikrofon so'ralmaydi.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// "npm run dev" rejimida saytni localhost emas, tarmoq manzili (masalan, 172.16.4.7:3000) orqali
// ochish uchun shu kompyuterning IP manzillariga ruxsat beriladi. Next.js ularni standart bo'yicha bloklaydi,
// shunda sahifa ochiladi-yu, tugmalar ishlamaydi. Vercel'dagi (production) saytga bu sozlama ta'sir qilmaydi.
function localNetworkAddresses() {
  return Object.values(os.networkInterfaces())
    .flat()
    .filter((i) => i && !i.internal && (i.family === "IPv4" || i.family === 4))
    .map((i) => i.address);
}

const nextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: localNetworkAddresses(),
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
