import type { Metadata } from "next";
import { ArrowRight, Bot, Braces, CalendarCheck2, ContactRound, LayoutDashboard, MonitorSmartphone, PanelsTopLeft, Workflow } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceCard } from "@/components/services/service-card";
import { buttonStyles } from "@/components/ui/button";
import { getServiceDetail } from "@/lib/service-details-data";
import { digitalServices, serviceDetailPath, type DigitalServiceId } from "@/lib/services-data";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Digital Services", socialTitle: "Website, CRM, Automation & AI Services | TradeBridge Digital", description: "Practical website development, CRM, business application, automation and AI integration services from TradeBridge Digital.", path: "/services" });

const serviceIcons = {
  "business-websites": MonitorSmartphone,
  "landing-page-development": PanelsTopLeft,
  "crm-lead-management": ContactRound,
  "dashboard-business-applications": LayoutDashboard,
  "booking-client-portals": CalendarCheck2,
  "api-integration": Braces,
  "business-automation": Workflow,
  "ai-integration": Bot,
} satisfies Record<DigitalServiceId, typeof MonitorSmartphone>;

const discoveryHref = "mailto:info@tradebridge-global.com?subject=Tell%20Us%20About%20Your%20Business";

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "TradeBridge Digital Services",
    itemListElement: digitalServices.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.name, url: `${SITE_URL}${serviceDetailPath(service)}` })),
  };

  return <>
    <JsonLd data={schema} />
    <PageHero eyebrow="What we build" title="Digital services designed to solve useful business problems" description="Choose a focused website, an internal business system or a connected solution that brings both together." />

    <section className="section-pad bg-[#f7f9fc]" aria-label="TradeBridge Digital services">
      <div className="container-site grid gap-6 lg:grid-cols-2">
        {digitalServices.map(service => <ServiceCard key={service.id} service={service} icon={serviceIcons[service.id]} href={getServiceDetail(service.id) ? serviceDetailPath(service) : undefined} />)}
      </div>
    </section>

    <section className="bg-white pb-16 sm:pb-20 lg:pb-28">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[2rem] bg-blue-700 px-6 py-14 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-16">
          <div aria-hidden="true" className="absolute -right-24 -top-28 size-72 rounded-full border-[44px] border-white/10" />
          <div className="relative max-w-2xl"><span className="text-xs font-extrabold uppercase tracking-[.16em] text-blue-100">A clear first conversation</span><h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">Not sure what you need?</h2><p className="mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">Tell us how your business works today and what you want to improve. We’ll help identify a practical starting point.</p></div>
          <a href={discoveryHref} className={buttonStyles({ variant: "secondary", size: "lg", className: "relative mt-8 shrink-0 lg:mt-0" })}>Tell Us About Your Business <ArrowRight size={17} /></a>
        </div>
      </div>
    </section>
  </>;
}
