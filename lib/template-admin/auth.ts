import "server-only";

import { redirect } from "next/navigation";
import { getChatGPTUser, requireChatGPTUser } from "@/app/chatgpt-auth";

function adminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map(value => value.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isTemplateAdminEmail(email: string) {
  return adminEmails().has(email.trim().toLowerCase());
}

export async function requireTemplateAdmin(returnTo = "/admin/templates") {
  const user = await requireChatGPTUser(returnTo);
  if (!isTemplateAdminEmail(user.email)) redirect("/admin/access-denied");
  return user;
}

export async function getTemplateAdmin() {
  const user = await getChatGPTUser();
  return user && isTemplateAdminEmail(user.email) ? user : null;
}

export function adminRequestOriginAllowed(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const configured = (process.env.ADMIN_ALLOWED_ORIGINS || "")
    .split(",")
    .map(value => value.trim())
    .filter(Boolean);

  try {
    const allowed = new Set([new URL(request.url).origin, ...configured.map(value => new URL(value).origin)]);
    return allowed.has(new URL(origin).origin);
  } catch {
    return false;
  }
}
