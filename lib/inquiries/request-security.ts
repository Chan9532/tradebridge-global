export class LeadRequestError extends Error {
  status: number;
  constructor(message: string, status: number) { super(message); this.status = status; }
}

export async function readLeadRequest(request: Request, allowedOrigins: readonly string[]) {
  const origin = request.headers.get("origin");
  if (!origin || !allowedOrigins.includes(origin)) throw new LeadRequestError("This request origin is not allowed.", 403);
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") throw new LeadRequestError("Send a JSON request.", 415);
  const limit = 16384;
  const size = Number(request.headers.get("content-length") || 0);
  if (size > limit) throw new LeadRequestError("Your request is too large.", 413);
  if (!request.body) throw new LeadRequestError("Provide your request details.", 400);
  const reader = request.body.getReader();
  let total = 0;
  let text = "";
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > limit) { await reader.cancel(); throw new LeadRequestError("Your request is too large.", 413); }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } finally { reader.releaseLock(); }
  try { return JSON.parse(text) as unknown; } catch { throw new LeadRequestError("Your request contains invalid JSON.", 400); }
}

export async function verifyLeadChallenge(token: string, secret: string, origin: string, fetcher: typeof fetch = fetch) {
  const response = await fetcher("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", body: new URLSearchParams({ secret, response: token }), signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new LeadRequestError("Verification is unavailable. Please try again.", 503);
  const result = await response.json() as { success?: boolean; hostname?: string; action?: string };
  if (result.success !== true || result.hostname !== new URL(origin).hostname || result.action !== "lead") {
    throw new LeadRequestError("Complete the security check again, then retry.", 400);
  }
}
