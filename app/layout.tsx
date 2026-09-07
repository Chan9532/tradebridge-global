import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { InterestProvider } from "@/components/interests/interest-provider";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tradebridge-global.com"),
  title: { default: "TradeBridge Digital | Websites, Systems & Automation", template: "%s | TradeBridge Digital" },
  description: "TradeBridge Digital builds modern websites, business systems, automations and AI-powered solutions for growing businesses.",
  openGraph: { title: "TradeBridge Digital", description: "Websites, business systems, automation and AI for growing businesses.", type: "website", siteName: "TradeBridge Digital", images: [{ url: "/og.png", width: 1733, height: 907, alt: "TradeBridge Digital" }] },
  twitter: { card: "summary_large_image", title: "TradeBridge Digital", description: "Websites, business systems, automation and AI for growing businesses.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${manrope.variable}`}><InterestProvider><Header /><main id="main-content">{children}</main><Footer /></InterestProvider><Toaster richColors position="top-right" /></body></html>;
}
