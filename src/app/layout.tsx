import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "בית הכנסת בני תורה - פלטפורמה דיגיטלית",
  description: "פלטפורמה דיגיטלית לבית הכנסת בני תורה - שיעורים, אירועים, ומקומות ישיבה",
  keywords: ["בית כנסת", "בני תורה", "שיעורים", "אירועים", "תפילה", "יהדות"],
  authors: [{ name: "בית הכנסת בני תורה" }],
  robots: "index, follow"
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
        style={{ fontFamily: '"Heebo", "Geist", sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
