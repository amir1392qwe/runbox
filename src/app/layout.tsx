import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import "./globals.css";
import Providers from "@/components/providers/Providers";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: {
    default: "رانباکس",
    template: "%s | رانباکس",
  },
  description: "تجربه‌ی بازی در سطح حرفه‌ای",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${vazirmatn.variable} antialiased bg-[#050505] text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
