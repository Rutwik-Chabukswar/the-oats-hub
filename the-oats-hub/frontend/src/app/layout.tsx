import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "The Oats Hub — Premium Nutrition, Delivered",
    template: "%s | The Oats Hub",
  },
  description:
    "Shop premium oats, peanut butter, and healthy food products. The Oats Hub delivers nutrition you can trust, right to your door.",
  keywords: [
    "oats",
    "peanut butter",
    "healthy food",
    "premium nutrition",
    "D2C",
    "The Oats Hub",
  ],
  authors: [{ name: "The Oats Hub" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "The Oats Hub",
    title: "The Oats Hub — Premium Nutrition, Delivered",
    description:
      "Shop premium oats, peanut butter, and healthy food products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Oats Hub — Premium Nutrition, Delivered",
    description:
      "Shop premium oats, peanut butter, and healthy food products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Header } from "@/components/shared/layout/header";
import { AmbientCursor } from "@/components/ui/ambient-cursor";
import { FlyToCart } from "@/components/ui/fly-to-cart";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans relative" suppressHydrationWarning>
        <AmbientCursor />
        <FlyToCart />
        <Providers>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
