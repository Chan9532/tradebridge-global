import { NextResponse } from "next/server";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { adminRequestOriginAllowed, isTemplateAdminEmail } from "@/lib/template-admin/auth";
import { templateInputSchema, templateUpdateSchema } from "@/lib/template-admin/schema";

const adminTemplateColumns = "id,name,slug,industry,style,short_description,thumbnail_url,screenshots,demo_url,pages,features,starting_price,featured,status,created_at,updated_at";

async function authorize(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (!isTemplateAdminEmail(user.email)) return NextResponse.json({ error: "You do not have access to template management." }, { status: 403 });
  if (!adminRequestOriginAllowed(request)) return NextResponse.json({ error: "This request could not be verified." }, { status: 403 });
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "JSON content is required." }, { status: 415 });
  }
  return null;
}

function validationError(error: { flatten(): { fieldErrors: Record<string, string[]>; formErrors: string[] } }) {
  const flattened = error.flatten();
  return NextResponse.json({
    error: flattened.formErrors[0] || "Please correct the highlighted template fields.",
    fieldErrors: flattened.fieldErrors,
  }, { status: 400 });
}

function databaseError(operation: "create" | "update", error: { code?: string | null }) {
  console.error("admin_template_write_failed", { operation, code: error.code || "UNKNOWN" });
  if (error.code === "23505") return NextResponse.json({ error: "That slug is already in use." }, { status: 409 });
  return NextResponse.json({ error: "The template could not be saved. Please try again." }, { status: 503 });
}

export async function POST(request: Request) {
  const denied = await authorize(request);
  if (denied) return denied;

  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "The request body is not valid JSON." }, { status: 400 }); }

  const parsed = templateInputSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  try {
    const { data, error } = await createSupabaseAdmin().from("templates").insert(parsed.data).select(adminTemplateColumns).single();
    if (error) return databaseError("create", error);
    return NextResponse.json({ template: data }, { status: 201 });
  } catch {
    return databaseError("create", { code: "UNAVAILABLE" });
  }
}

export async function PATCH(request: Request) {
  const denied = await authorize(request);
  if (denied) return denied;

  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "The request body is not valid JSON." }, { status: 400 }); }

  const parsed = templateUpdateSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  try {
    const { data, error } = await createSupabaseAdmin().from("templates").update(parsed.data.template).eq("id", parsed.data.id).select(adminTemplateColumns).maybeSingle();
    if (error) return databaseError("update", error);
    if (!data) return NextResponse.json({ error: "The template no longer exists." }, { status: 404 });
    return NextResponse.json({ template: data });
  } catch {
    return databaseError("update", { code: "UNAVAILABLE" });
  }
}
