import type { Metadata } from "next";
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
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
        style={{ fontFamily: '"Noto Sans Hebrew", "Geist", sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
