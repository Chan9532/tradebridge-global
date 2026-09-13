import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/services/service-detail-page";
import { getServiceDetail, serviceDetails } from "@/lib/service-details-data";
import { getDigitalService } from "@/lib/services-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetails.map(service => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getDigitalService(slug);
  const detail = getServiceDetail(slug);

  return service && detail
    ? { title: service.name, description: detail.introduction, alternates: { canonical: `/services/${detail.slug}` } }
    : { title: "Service not found" };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getDigitalService(slug);
  const detail = getServiceDetail(slug);

  if (!service || !detail) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tradebridge-global.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: detail.introduction,
    url: `${baseUrl}/services/${detail.slug}`,
    provider: { "@type": "Organization", name: "TradeBridge Digital", url: baseUrl },
    areaServed: "Worldwide",
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><ServiceDetailPage service={service} detail={detail} /></>;
}
