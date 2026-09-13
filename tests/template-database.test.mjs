import assert from "node:assert/strict";
import test from "node:test";
import { templateColumns, templateFromRow } from "../lib/templates/database.ts";

const row = {
  id: "65d1feb5-b1ee-4ca4-aafd-334d55292b52",
  name: "Studio Launch",
  slug: "studio-launch",
  industry: "Agency",
  style: "Expressive",
  short_description: "A clear starting point.",
  thumbnail_url: "/template-previews/studio-launch",
  demo_url: "/templates/studio-launch/demo",
  screenshots: ["/template-previews/studio-launch?view=home"],
  pages: ["Home", "Contact"],
  features: ["Project showcase"],
  starting_price: 399,
  mobile_responsive: true,
  featured: true,
  status: "published",
  created_at: "2026-08-20T09:00:00.000Z",
};

test("maps database publication states into the existing template component model", () => {
  const published = templateFromRow({ ...row, admin_notes: "must remain private" });
  assert.equal(published.status, "available");
  assert.equal(published.demo_url, row.demo_url);
  assert.equal(published.thumbnail, row.thumbnail_url);
  assert.ok(!("admin_notes" in published));

  const comingSoon = templateFromRow({ ...row, status: "coming_soon", demo_url: null });
  assert.equal(comingSoon.status, "coming-soon");
  assert.equal(comingSoon.demo_url, null);
});

test("rejects draft rows and malformed published rows at the server boundary", () => {
  assert.throws(() => templateFromRow({ ...row, status: "draft" }));
  assert.throws(() => templateFromRow({ ...row, demo_url: null }), /require a demo URL/i);
});

test("public Supabase reads use an explicit field allowlist", () => {
  const columns = templateColumns.split(",");
  assert.ok(columns.includes("status"));
  assert.ok(columns.includes("featured"));
  assert.ok(!columns.includes("admin_notes"));
  assert.ok(!columns.includes("updated_at"));
});
