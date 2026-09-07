import { ArrowUpRight, Check, CircleUserRound, Clock3, Search } from "lucide-react";

export function BrowserVisual() {
  return <div role="img" aria-label="Preview of a business website and lead management dashboard" className="relative mx-auto w-full max-w-[620px]">
    <div className="absolute -inset-6 rounded-[2.5rem] bg-blue-500/20 blur-3xl" />
    <div className="relative overflow-hidden rounded-[1.35rem] border border-white/15 bg-[#0b1730] p-2.5 shadow-[0_32px_90px_rgba(2,12,32,.42)] sm:p-3">
      <div className="overflow-hidden rounded-xl bg-[#f8faff]">
        <div className="flex h-10 items-center gap-2 border-b border-slate-200 bg-white px-3 sm:px-4">
          <span className="size-2 rounded-full bg-red-400" /><span className="size-2 rounded-full bg-amber-400" /><span className="size-2 rounded-full bg-emerald-400" />
          <div className="mx-auto flex h-5 w-1/2 items-center justify-center rounded-md bg-slate-100 text-[7px] font-semibold text-slate-400">yourbusiness.com</div>
        </div>
        <div className="grid min-h-[370px] grid-cols-[58px_1fr] sm:grid-cols-[76px_1fr]">
          <div className="border-r border-slate-200 bg-white px-2 py-4 sm:px-3">
            <div className="mx-auto grid size-7 place-items-center rounded-lg bg-blue-700 text-[9px] font-black text-white">TB</div>
            <div className="mt-7 space-y-3"><span className="block h-7 rounded-lg bg-blue-50" /><span className="mx-auto block h-2 w-7 rounded bg-slate-100" /><span className="mx-auto block h-2 w-7 rounded bg-slate-100" /><span className="mx-auto block h-2 w-7 rounded bg-slate-100" /></div>
          </div>
          <div className="min-w-0 p-3 sm:p-5">
            <div className="flex items-center justify-between gap-3"><div><div className="h-2 w-20 rounded bg-blue-200"/><div className="mt-2 h-4 w-32 rounded bg-slate-800 sm:w-40"/></div><div className="flex items-center gap-2"><span className="hidden h-8 w-24 items-center gap-2 rounded-lg border border-slate-200 px-2 text-[8px] text-slate-400 sm:flex"><Search size={9}/> Search</span><span className="grid size-8 place-items-center rounded-full bg-slate-200"><CircleUserRound size={13} className="text-slate-500"/></span></div></div>
            <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">{[["New leads","18","+6"],["In progress","09","Today"],["Won","05","This month"]].map(([label,value,meta],index)=><div key={label} className="rounded-lg border border-slate-200 bg-white p-2.5 sm:p-3"><span className="block truncate text-[7px] font-bold uppercase tracking-wide text-slate-400 sm:text-[9px]">{label}</span><strong className="mt-2 block text-base text-slate-900 sm:text-xl">{value}</strong><span className={index===0?"text-[7px] font-bold text-emerald-600 sm:text-[8px]":"text-[7px] text-slate-400 sm:text-[8px]"}>{meta}</span></div>)}</div>
            <div className="mt-3 grid gap-3 lg:grid-cols-[1.2fr_.8fr]">
              <div className="rounded-lg border border-slate-200 bg-white p-3"><div className="flex items-center justify-between"><span className="text-[9px] font-bold text-slate-700">Lead activity</span><span className="text-[7px] text-slate-400">Last 30 days</span></div><div className="mt-5 flex h-24 items-end gap-2">{[42,68,50,82,62,94,76,88].map((height,index)=><span key={index} className="flex-1 rounded-t bg-blue-100" style={{height:`${height}%`}}><span className="block h-1/3 rounded-t bg-blue-600"/></span>)}</div></div>
              <div className="rounded-lg bg-[#0a1a2f] p-3 text-white"><div className="flex items-center justify-between"><span className="text-[9px] font-bold">Today</span><Clock3 size={11} className="text-blue-300"/></div><div className="mt-3 space-y-2">{["Reply to inquiry","Review proposal","Client call"].map((item,index)=><div key={item} className="flex items-center gap-2 rounded-md bg-white/7 p-2"><span className={`grid size-4 shrink-0 place-items-center rounded-full ${index===0?"bg-emerald-400 text-slate-950":"border border-white/20"}`}>{index===0&&<Check size={9}/>}</span><span className="truncate text-[7px] text-slate-200 sm:text-[8px]">{item}</span></div>)}</div></div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 px-3 py-2"><div><span className="block text-[8px] font-bold text-blue-900">Automation running</span><span className="text-[7px] text-blue-500">New leads are routed automatically</span></div><span className="grid size-6 place-items-center rounded-full bg-blue-700 text-white"><ArrowUpRight size={11}/></span></div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
