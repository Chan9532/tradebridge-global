export default function TemplateDetailLoading() {
  return (
    <div aria-busy="true" aria-label="Loading template details">
      <div className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="container-site">
          <div className="h-5 w-36 animate-pulse rounded bg-slate-100" />
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <div className="h-7 w-56 animate-pulse rounded-full bg-slate-100" />
              <div className="mt-5 h-16 max-w-lg animate-pulse rounded-xl bg-slate-100" />
              <div className="mt-6 h-24 max-w-xl animate-pulse rounded-xl bg-slate-100" />
              <div className="mt-8 h-12 w-72 max-w-full animate-pulse rounded-xl bg-slate-100" />
            </div>
            <div className="aspect-[16/10] animate-pulse rounded-2xl bg-slate-100" />
          </div>
        </div>
      </div>
      <div className="container-site py-16">
        <div className="h-40 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    </div>
  );
}
