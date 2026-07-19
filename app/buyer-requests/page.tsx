import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { RfqMarketplace } from "@/components/buyer-requests/rfq-marketplace";
export const metadata:Metadata={title:"Buyer Requests",description:"Approved international buyer requirements open to verified suppliers."};
export default function BuyerRequestsPage(){return <><PageHero eyebrow="RFQ marketplace" title="Approved buyer requirements" description="Qualified counterparties can respond to relevant opportunities. Buyer company names and contact details remain private."/><RfqMarketplace/><section className="bg-blue-700 py-14 text-white"><div className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><h2 className="text-2xl font-extrabold">Have a requirement of your own?</h2><p className="mt-2 text-blue-100">Select one or more products and send a private combined request.</p></div><Link href="/products" className="rounded-lg bg-amber-400 px-6 py-3 text-sm font-extrabold text-slate-950">Explore Products</Link></div></section></>}
