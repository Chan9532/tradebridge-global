import "server-only";
import { createClient } from "@supabase/supabase-js";

// Reuse the existing Supabase URL and server-key variable. Never use the
// cookie-based client for elevated writes or export this client to a component.
export function createLeadAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Lead delivery is not configured");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(10000) }) },
  });
}
