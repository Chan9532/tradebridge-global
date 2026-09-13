import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/services/service-detail-page";
import { JsonLd } from "@/components/seo/json-ld";
import { getServiceDetail, serviceDetails } from "@/lib/service-details-data";
import { getDigitalService } from "@/lib/services-data";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetails.map(service => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getDigitalService(slug);
  const detail = getServiceDetail(slug);

  return service && detail
    ? pageMetadata({ title: service.name, socialTitle: `${service.name} | TradeBridge Digital`, description: detail.introduction, path: `/services/${detail.slug}` })
    : { title: "Service Not Found", robots: { index: false, follow: false } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getDigitalService(slug);
  const detail = getServiceDetail(slug);

  if (!service || !detail) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: detail.introduction,
    url: `${SITE_URL}/services/${detail.slug}`,
    provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "TradeBridge Digital", url: SITE_URL },
  };

  return <><JsonLd data={schema} /><ServiceDetailPage service={service} detail={detail} /></>;
}
