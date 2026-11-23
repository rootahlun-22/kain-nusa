import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "@/components/Toaster";
import { SessionProvider } from "@/components/SessionProvider";
import "./globals.css";

export const dynamic = "force-dynamic";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "KainNusa — Katalog Kain Indonesia",
    template: "%s | KainNusa",
  },
  description:
    "Platform katalog online untuk bisnis penjualan kain Indonesia. Lihat variasi warna, model, dan ukuran secara interaktif. Hubungi via WhatsApp.",
  openGraph: {
    siteName: "KainNusa",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
