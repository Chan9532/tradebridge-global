export type LeadFormConfig = { enabled: boolean; siteKey: string };

// An in-flight request is shared across rapid clicks. The caller also reuses its
// request_id after ambiguous failures so a retry cannot create a second lead.
export function createLeadSender(fetcher: typeof fetch = fetch) {
  let pending: Promise<void> | null = null;
  return (payload: object): Promise<void> => {
    if (pending) return pending;
    pending = (async () => {
      let response: Response;
      try {
        response = await fetcher("/api/leads", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload), signal: AbortSignal.timeout(30000),
        });
      } catch {
        throw new Error("We could not confirm your submission because the connection failed. Your details are still here; please try again.");
      }
      let result: { success?: boolean; error?: string };
      try { result = await response.json(); } catch { throw new Error("We could not confirm your submission. Please try again."); }
      if (!response.ok || result.success !== true) throw new Error(result.error || "We could not confirm your submission. Please try again.");
    })().finally(() => { pending = null; });
    return pending;
  };
}
