import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "INFA | 轻珠宝",
  description: "INFA 轻珠宝 - 以优雅设计點綴日常，每件珠宝都诉说著独特的故事",
  keywords: "轻珠宝, 项链, 手链, 戒指, 耳环, 优雅, 时尚",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${playfairDisplay.variable} ${inter.variable} ${notoSansTC.variable} ${notoSerifTC.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-cream-white text-dark-gray">
        {children}
      </body>
    </html>
  );
}
