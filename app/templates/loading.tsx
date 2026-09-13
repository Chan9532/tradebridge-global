export default function TemplatesLoading() {
  return (
    <div aria-busy="true" aria-label="Loading templates">
      <div className="h-80 animate-pulse bg-[#07152b]" />
      <div className="container-site py-16">
        <div className="h-24 animate-pulse rounded-2xl bg-slate-100" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(item => <div key={item} className="h-[430px] animate-pulse rounded-2xl bg-slate-100" />)}
        </div>
      </div>
    </div>
  );
}
