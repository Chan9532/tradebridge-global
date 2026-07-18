"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
const schema=z.object({name:z.string().trim().min(2).max(80),email:z.string().email(),company:z.string().trim().min(2).max(120),type:z.string().min(1),message:z.string().trim().min(20).max(3000)});type V=z.infer<typeof schema>;
export function ContactForm({defaultType="General inquiry",compact=false}:{defaultType?:string;compact?:boolean}){const{register,handleSubmit,reset,formState:{errors,isSubmitting}}=useForm<V>({resolver:zodResolver(schema),defaultValues:{type:defaultType}});async function submit(v:V){const sb=createClient();if(sb){const{data:{user}}=await sb.auth.getUser();const{error}=await sb.from("inquiries").insert({user_id:user?.id||null,inquiry_type:v.type,message:`Name: ${v.name}\nCompany: ${v.company}\nEmail: ${v.email}\n\n${v.message}`,status:"new"});if(error)throw new Error(error.message)}else await new Promise(r=>setTimeout(r,500));reset();toast.success("Message received. We will reply within one business day.")}return <form onSubmit={handleSubmit(submit)} className="grid gap-4"><div className={`grid gap-4 ${compact?"":"sm:grid-cols-2"}`}><Field label="Name" error={errors.name?.message}><Input {...register("name")}/></Field><Field label="Business email" error={errors.email?.message}><Input type="email" {...register("email")}/></Field><Field label="Company" error={errors.company?.message}><Input {...register("company")}/></Field><Field label="Inquiry type" error={errors.type?.message}><Select {...register("type")}><option>General inquiry</option><option>Sourcing request</option><option>Supplier introduction</option><option>Product inquiry</option><option>Partnership</option></Select></Field></div><Field label="Message" error={errors.message?.message}><Textarea rows={6} {...register("message")}/></Field><Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">{isSubmitting?"Sending…":"Send message"}</Button></form>}
