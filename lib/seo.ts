import type { Metadata } from "next";

export const SITE_NAME = "TradeBridge Digital";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://tradebridge-global.com").replace(/\/$/, "");
export const DEFAULT_DESCRIPTION = "TradeBridge Digital is an independent studio building practical websites, business systems, automations and AI integrations for growing businesses.";
export const DEFAULT_SOCIAL_IMAGE = {
  url: "/social-preview.png",
  width: 1200,
  height: 630,
  alt: "TradeBridge Digital — practical websites, systems and automation",
};

type SocialImage = { url: string; width: number; height: number; alt: string };

export function absoluteUrl(path: string) {
  if (/^https:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  socialTitle,
  description,
  path,
  image = DEFAULT_SOCIAL_IMAGE,
}: {
  title: string;
  socialTitle?: string;
  description: string;
  path: string;
  image?: SocialImage;
}): Metadata {
  const shareTitle = socialTitle || `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title: shareTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image.url],
    },
  };
}
