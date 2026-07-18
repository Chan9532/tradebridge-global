"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
const schema=z.object({name:z.string().trim().min(2,"Enter your name").max(80),email:z.string().email("Enter a valid email"),company:z.string().trim().min(2,"Enter your company"),country:z.string().trim().min(2,"Enter your country"),message:z.string().trim().min(20,"Please add at least 20 characters").max(2000)});
type Values=z.infer<typeof schema>;
export function InquiryForm({ productName }: { productName: string }) { const [sent,setSent]=useState(false); const {register,handleSubmit,formState:{errors,isSubmitting},reset}=useForm<Values>({resolver:zodResolver(schema),defaultValues:{message:`I would like a quotation and additional details for ${productName}.`}}); async function submit(data:Values){await new Promise(r=>setTimeout(r,600)); console.info("Inquiry prepared",{...data,productName}); setSent(true);reset();toast.success("Inquiry received. Our sourcing team will respond shortly.")}
if(sent)return <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6"><h3 className="font-bold text-emerald-900">Your inquiry has been received.</h3><p className="mt-2 text-sm leading-6 text-emerald-800">We will verify the request and reply from an official TradeBridge Global address.</p><button onClick={()=>setSent(false)} className="mt-4 text-sm font-bold text-emerald-900">Send another inquiry</button></div>;
return <form onSubmit={handleSubmit(submit)} className="grid gap-4"><div className="grid gap-4 sm:grid-cols-2"><Field label="Your name" error={errors.name?.message}><Input {...register("name")} /></Field><Field label="Business email" error={errors.email?.message}><Input type="email" {...register("email")} /></Field><Field label="Company" error={errors.company?.message}><Input {...register("company")} /></Field><Field label="Country" error={errors.country?.message}><Input {...register("country")} /></Field></div><Field label="Requirement" error={errors.message?.message}><Textarea {...register("message")} /></Field><Button disabled={isSubmitting} className="w-full sm:w-auto">{isSubmitting?"Sending…":"Send inquiry"}<Send size={16}/></Button></form>; }
