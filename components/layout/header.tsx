"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, UserRound, ChevronDown, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";

const nav = [["Home", "/"], ["Services", "/#services"], ["Templates", "/#templates"], ["Work", "/#work"], ["Pricing", "/#pricing"], ["About", "/about"]];
const quoteHref = "mailto:info@tradebridge-global.com?subject=TradeBridge%20Digital%20Project%20Quote";

export function Header() {
  const [open, setOpen] = useState(false); const pathname = usePathname();
  return <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_4px_20px_rgba(10,26,47,.04)] backdrop-blur-xl">
    <div className="container-site flex h-[4.5rem] items-center justify-between gap-6"><Logo />
      <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">{nav.map(([label, href]) => <Link key={href} href={href} className={`relative py-3 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-blue-700 after:transition-transform hover:text-blue-700 hover:after:scale-x-100 ${pathname === href ? "text-blue-700 after:scale-x-100" : "text-slate-700"}`}>{label}</Link>)}</nav>
      <div className="hidden items-center gap-3 lg:flex"><Link href="/auth/login" className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-700"><UserRound size={16} /> Login</Link><a href={quoteHref} className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0a1a2f] px-4 text-sm font-bold text-white transition hover:bg-blue-700">Get a Quote <ArrowUpRight size={15}/></a></div>
      <button onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-xl border border-slate-200 bg-white text-[#0a1a2f] transition hover:border-blue-300 hover:text-blue-700 lg:hidden" aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div className="absolute inset-x-0 top-full border-t border-slate-200 bg-white px-4 pb-5 shadow-[0_24px_50px_rgba(10,26,47,.14)] lg:hidden"><nav aria-label="Mobile navigation" className="container-site grid py-3">{nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-slate-100 py-3.5 text-sm font-semibold text-slate-800 transition hover:text-blue-700">{label}<ChevronDown className="-rotate-90" size={15} /></Link>)}</nav><div className="container-site flex gap-3"><Link href="/auth/login" onClick={() => setOpen(false)} className="flex h-11 flex-1 items-center justify-center rounded-lg border border-slate-300 text-sm font-bold transition hover:border-blue-500 hover:text-blue-700">Login</Link><a href={quoteHref} onClick={() => setOpen(false)} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#0a1a2f] text-sm font-bold text-white transition hover:bg-blue-700">Get a Quote <ArrowUpRight size={15}/></a></div></div>}
  </header>;
}
