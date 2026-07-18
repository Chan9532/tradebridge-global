import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { SupplierForm } from "@/components/forms/supplier-form";
export const metadata:Metadata={title:"Supplier Registration",description:"Register as a supplier for verified international buyer opportunities."};
export default function SupplierRegistrationPage(){return <><PageHero eyebrow="Supplier network" title="Reach relevant international buyers" description="Submit your company profile for review. Approved suppliers receive buyer requirements matched to their products and export capabilities."/><section className="bg-slate-50 py-14"><div className="container-site max-w-5xl"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft md:p-10"><SupplierForm/></div></div></section></>}
