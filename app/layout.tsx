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
  title: "INFA | 輕珠寶",
  description: "INFA 輕珠寶 - 以優雅設計點綴日常，每件珠寶都訴說著獨特的故事",
  keywords: "輕珠寶, 項鏈, 手鏈, 戒指, 耳環, 優雅, 時尚",
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
