import "server-only";

export function leadAllowedOrigins() {
  const values = (process.env.LEAD_ALLOWED_ORIGINS || process.env.NEXT_PUBLIC_SITE_URL || "").split(",").map(value => value.trim()).filter(Boolean);
  try {
    return values.map(value => {
      const url = new URL(value);
      if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) throw new Error("Invalid origin");
      return url.origin;
    });
  } catch { return []; }
}

export function getLeadFormConfig() {
  const enabled = process.env.LEAD_SUBMISSIONS_ENABLED === "true"
    && Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY)
    && Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY)
    && leadAllowedOrigins().length > 0;
  // This is the only delivery configuration passed into browser components.
  return { enabled, siteKey: enabled ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY! : "" };
}
