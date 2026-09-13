import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the TradeBridge Digital site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Websites &amp; Business Systems That Help You Grow \| TradeBridge Digital<\/title>/i);
  assert.match(html, /TradeBridge/);
  assert.match(html, /Digital/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/i);
});

test("server-renders the template catalog and a public template detail", async () => {
  const [catalogResponse, detailResponse] = await Promise.all([
    render("/templates"),
    render("/templates/studio-launch"),
  ]);
  assert.equal(catalogResponse.status, 200);
  assert.equal(detailResponse.status, 200);

  const [catalog, detail] = await Promise.all([catalogResponse.text(), detailResponse.text()]);
  assert.match(catalog, /Choose a strong starting point/);
  assert.match(catalog, /Studio Launch/);
  assert.match(catalog, /Coming Soon/);
  assert.match(detail, /Studio Launch/);
  assert.match(detail, /Use This Design/);
});
