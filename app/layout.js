import "./globals.css";
import { QUIZ_TITLE, QUIZ_SUBTITLE } from "@/lib/config";

export const metadata = {
  title: QUIZ_TITLE,
  description: QUIZ_SUBTITLE,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
