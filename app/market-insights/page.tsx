import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { articles } from "@/lib/site-data";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
export const metadata:Metadata={title:"Market Insights",description:"International sourcing insights across machinery, automotive, plastics, packaging, Japan, India and Africa trade."};
const cats=["All","Machinery","Automotive","Plastics","Packaging","Africa Trade","Japan Export","India Export","Market Trends"];
export default function InsightsPage(){return <><PageHero eyebrow="Trade intelligence" title="Market insights for international buyers and suppliers" description="Practical commentary on sourcing conditions, export markets, product trends and transaction readiness."/><section className="container-site section-pad"><div className="scrollbar-none flex gap-2 overflow-x-auto pb-2">{cats.map((c,i)=><Link key={c} href={i?`/market-insights?category=${encodeURIComponent(c)}`:"/market-insights"} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${i?"border border-slate-300 text-slate-600":"bg-blue-700 text-white"}`}>{c}</Link>)}</div><div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">{articles.map(a=><article key={a.slug} className="overflow-hidden rounded-xl border border-slate-200"><div className="relative h-56"><Image src={a.image} alt="" fill className="object-cover"/></div><div className="p-6"><div className="flex items-center justify-between"><Badge>{a.category}</Badge><span className="text-xs text-slate-500">{formatDate(a.date)}</span></div><h2 className="mt-4 text-xl font-extrabold leading-snug text-[#071a33]">{a.title}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{a.excerpt}</p><Link href={`/market-insights/${a.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700">Read article <ArrowRight size={15}/></Link></div></article>)}</div></section></>}
