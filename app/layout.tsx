import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { InterestProvider } from "@/components/interests/interest-provider";
import { DEFAULT_DESCRIPTION, DEFAULT_SOCIAL_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "TradeBridge Digital | Websites, Systems & Automation", template: "%s | TradeBridge Digital" },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: { title: "TradeBridge Digital | Websites, Systems & Automation", description: DEFAULT_DESCRIPTION, type: "website", locale: "en_US", siteName: SITE_NAME, url: "/", images: [DEFAULT_SOCIAL_IMAGE] },
  twitter: { card: "summary_large_image", title: "TradeBridge Digital | Websites, Systems & Automation", description: DEFAULT_DESCRIPTION, images: [DEFAULT_SOCIAL_IMAGE.url] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${manrope.variable}`}><InterestProvider><Header /><main id="main-content">{children}</main><Footer /></InterestProvider><Toaster richColors position="top-right" /></body></html>;
}
