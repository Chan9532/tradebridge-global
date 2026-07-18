import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tradebridge-global.example.com"),
  title: { default: "TradeBridge Global | International Sourcing & Trade Matching", template: "%s | TradeBridge Global" },
  description: "International sourcing and commission-based trade matching connecting buyers with verified suppliers in Japan, India and global markets.",
  openGraph: { title: "TradeBridge Global", description: "Global sourcing made simple.", type: "website", siteName: "TradeBridge Global", images: [{ url: "/og.png", width: 1728, height: 911, alt: "TradeBridge Global — Global Sourcing Made Simple" }] },
  twitter: { card: "summary_large_image", title: "TradeBridge Global", description: "Global sourcing made simple.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${manrope.variable}`}><Header /><main>{children}</main><Footer /><Toaster richColors position="top-right" /></body></html>;
}
