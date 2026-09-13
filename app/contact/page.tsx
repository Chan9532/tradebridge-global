import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { getLeadFormConfig } from "@/lib/inquiries/config";
import { PageHero } from "@/components/shared/page-hero";
import { ContactInquiryForm } from "@/components/forms/contact-inquiry-form";
import { buttonStyles } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact TradeBridge Digital about a website, business system, automation or AI project.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact TradeBridge Digital", description: "Discuss a practical digital solution for your business.", url: "/contact" },
};

export default function ContactPage() {
  return <>
    <PageHero eyebrow="Contact TradeBridge Digital" title="Let's discuss what you need." description="Have a question or a business problem to solve? Tell us about your website, system, automation or AI project." />
    <section className="container-site grid gap-10 py-14 sm:py-20 lg:grid-cols-[.8fr_1.2fr]">
      <div>
        <h2 className="text-2xl font-extrabold text-[#0a1a2f]">Get in touch</h2>
        <a href="mailto:info@tradebridge-global.com" className="mt-5 flex items-start gap-3 text-base font-semibold text-blue-700 underline underline-offset-4"><Mail size={20} aria-hidden="true" className="mt-1 shrink-0" /><span className="break-all">info@tradebridge-global.com</span></a>
        <div className="mt-8 rounded-2xl bg-slate-50 p-6">
          <h3 className="text-xl font-extrabold text-[#0a1a2f]">Have a project in mind?</h3>
          <p className="mt-3 text-base leading-7 text-slate-600">Prepare a quote request with your requirements, budget and timeline. You can include a design from our template library.</p>
          <Link href="/get-quote" className={buttonStyles({ className: "mt-5" })}>Get a Quote <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"><ContactInquiryForm delivery={getLeadFormConfig()} /></div>
    </section>
  </>;
}
