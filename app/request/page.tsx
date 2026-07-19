import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { CombinedRequestForm } from "@/components/forms/combined-request-form";
export const metadata:Metadata={title:"Send a Combined Product Request",description:"Send one sourcing, quotation, discussion or business opportunity request covering multiple product categories."};
export default function RequestPage(){return <><PageHero eyebrow="Combined product request" title="Request a discussion or quotation" description="Confirm your selected products, add commercial details and send one coordinated requirement to our international sourcing team."/><section className="bg-slate-50 py-14"><div className="container-site max-w-5xl"><CombinedRequestForm/></div></section></>}
