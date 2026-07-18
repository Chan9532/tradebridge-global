import "server-only";
import { redirect } from "next/navigation";
import { createServerSupabase, serverConfigured } from "./supabase/server";
export async function requireRole(allowed:("buyer"|"supplier"|"admin")[]){if(!serverConfigured())return {id:"demo-user",role:allowed[0],demo:true};const sb=await createServerSupabase();const{data:{user}}=await sb!.auth.getUser();if(!user)redirect(`/auth/login?next=${allowed.includes("admin")?"/admin":"/dashboard"}`);const{data:profile}=await sb!.from("profiles").select("role").eq("id",user.id).single();if(!profile||!allowed.includes(profile.role))redirect("/auth/login?error=unauthorized");return{id:user.id,role:profile.role,demo:false}}
