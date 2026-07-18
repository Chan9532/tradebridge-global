"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, UserRound, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";

const nav = [["Home", "/"], ["Products", "/products"], ["Buyer Requests", "/buyer-requests"], ["Sourcing Service", "/sourcing-service"], ["Suppliers", "/suppliers"], ["Market Insights", "/market-insights"], ["About", "/about"], ["Contact", "/contact"]];

export function Header() {
  const [open, setOpen] = useState(false); const pathname = usePathname();
  return <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
    <div className="hidden bg-[#071a33] py-2 text-xs text-slate-300 lg:block"><div className="container-site flex justify-between"><span>Connecting trusted supply with global demand</span><div className="flex gap-5"><span>Japan · India · Global Markets</span><Link href="/commission-disclosure" className="hover:text-white">Transparent commission model</Link></div></div></div>
    <div className="container-site flex h-18 items-center justify-between gap-6"><Logo />
      <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">{nav.map(([label, href]) => <Link key={href} href={href} className={`text-[13px] font-semibold transition hover:text-blue-700 ${pathname === href ? "text-blue-700" : "text-slate-700"}`}>{label}</Link>)}</nav>
      <div className="hidden items-center gap-2 xl:flex"><Link href="/auth/login" className="inline-flex h-10 items-center gap-2 px-3 text-sm font-semibold text-slate-700"><UserRound size={17} /> Login</Link><Link href="/submit-rfq" className="inline-flex h-10 items-center rounded-lg bg-blue-700 px-4 text-sm font-bold text-white transition hover:bg-blue-800">Post an RFQ</Link></div>
      <button onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-lg border border-slate-200 xl:hidden" aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div className="border-t border-slate-200 bg-white px-4 pb-5 xl:hidden"><nav className="container-site grid py-3">{nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-slate-100 py-3.5 text-sm font-semibold text-slate-800">{label}<ChevronDown className="-rotate-90" size={15} /></Link>)}</nav><div className="container-site flex gap-3"><Link href="/auth/login" className="flex h-11 flex-1 items-center justify-center rounded-lg border border-slate-300 text-sm font-bold">Login</Link><Link href="/submit-rfq" className="flex h-11 flex-1 items-center justify-center rounded-lg bg-blue-700 text-sm font-bold text-white">Post an RFQ</Link></div></div>}
  </header>;
}
