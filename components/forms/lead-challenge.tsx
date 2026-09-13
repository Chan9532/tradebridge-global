"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (element: HTMLElement, options: { sitekey: string; action: string; size: string; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void }) => string;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: TurnstileApi } }

export function LeadChallenge({ siteKey, onToken }: { siteKey: string; onToken: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!loaded || !window.turnstile || !container.current) return;
    const api = window.turnstile;
    const id = api.render(container.current, {
      sitekey: siteKey, action: "lead", size: "flexible",
      callback: token => { setError(false); onToken(token); },
      "expired-callback": () => onToken(""),
      "error-callback": () => { setError(true); onToken(""); },
    });
    return () => { api.remove(id); };
  }, [loaded, siteKey, onToken]);
  return <div>
    <Script id="lead-turnstile" src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={() => setLoaded(true)} onError={() => { setError(true); onToken(""); }} />
    <div ref={container} aria-label="Security check" />
    {error && <p role="alert" className="mt-2 text-sm text-red-700">The security check could not load. Please reload the page or contact us by email.</p>}
  </div>;
}
