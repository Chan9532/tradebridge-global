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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tradebridge-global-jp-in.chandey.chatgpt.site"),
  title: { default: "TradeBridge Global | International Sourcing & Trade Matching", template: "%s | TradeBridge Global" },
  description: "Select products across major industries and send one combined sourcing request to TradeBridge Global.",
  openGraph: { title: "TradeBridge Global", description: "Select products. Send one combined sourcing request.", type: "website", siteName: "TradeBridge Global", images: [{ url: "/og.png", width: 1728, height: 911, alt: "TradeBridge Global product sourcing and combined requests" }] },
  twitter: { card: "summary_large_image", title: "TradeBridge Global", description: "Select products. Send one combined sourcing request.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${manrope.variable}`}><InterestProvider><Header /><main>{children}</main><Footer /></InterestProvider><Toaster richColors position="top-right" /></body></html>;
}
