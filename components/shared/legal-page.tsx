import { PageHero } from "./page-hero";
export function LegalPage({title,description,children}:{title:string;description:string;children:React.ReactNode}){return <><PageHero eyebrow="Legal" title={title} description={description}/><article className="container-site max-w-4xl py-14"><div className="space-y-7 text-sm leading-7 text-slate-700">{children}</div></article></>}
