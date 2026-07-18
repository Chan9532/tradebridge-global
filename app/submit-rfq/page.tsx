import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { RfqForm } from "@/components/forms/rfq-form";
export const metadata: Metadata={title:"Submit a Buyer RFQ",description:"Submit a private product requirement for sourcing from verified international suppliers."};
export default function SubmitRfqPage(){return <><PageHero eyebrow="Buyer requirement" title="Tell us exactly what you need" description="Our sourcing team will review your requirement, identify suitable supply channels and coordinate approved matches."/><section className="bg-slate-50 py-14"><div className="container-site max-w-5xl"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft md:p-10"><RfqForm/></div></div></section></>}
