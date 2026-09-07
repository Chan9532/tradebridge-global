const accents = {
  violet: "from-violet-500 to-indigo-700",
  blue: "from-blue-500 to-blue-800",
  cyan: "from-cyan-400 to-blue-700",
  amber: "from-amber-300 to-orange-600",
  rose: "from-rose-400 to-fuchsia-700",
  emerald: "from-emerald-400 to-teal-700",
} as const;

export function TemplatePreview({ accent, index }: { accent: keyof typeof accents; index: number }) {
  return <div aria-hidden="true" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="flex h-7 items-center gap-1 border-b border-slate-100 px-2.5"><span className="size-1.5 rounded-full bg-slate-200"/><span className="size-1.5 rounded-full bg-slate-200"/><span className="size-1.5 rounded-full bg-slate-200"/><span className="ml-auto h-1.5 w-12 rounded bg-slate-100"/></div>
    <div className="grid h-44 grid-cols-[1.15fr_.85fr] gap-3 p-3">
      <div className={`flex flex-col justify-end rounded-lg bg-gradient-to-br ${accents[accent]} p-3 text-white`}><span className="h-1.5 w-10 rounded-full bg-white/55"/><span className="mt-2 h-3 w-4/5 rounded bg-white/90"/><span className="mt-1.5 h-3 w-3/5 rounded bg-white/90"/><span className="mt-4 h-5 w-14 rounded bg-white/90"/></div>
      <div className="grid gap-2"><div className="rounded-lg bg-slate-100 p-2"><span className="block h-1.5 w-8 rounded bg-slate-300"/><span className="mt-2 block h-2 w-full rounded bg-slate-300"/><span className="mt-1 block h-2 w-2/3 rounded bg-slate-200"/></div><div className="grid grid-cols-2 gap-2">{[0,1].map(item=><div key={item} className="rounded-lg border border-slate-100 bg-white p-2"><span className={`block size-5 rounded-full bg-gradient-to-br ${accents[accent]} ${index % 2 ? "opacity-80" : "opacity-60"}`}/><span className="mt-2 block h-1.5 rounded bg-slate-200"/><span className="mt-1 block h-1.5 w-2/3 rounded bg-slate-100"/></div>)}</div></div>
    </div>
  </div>;
}
