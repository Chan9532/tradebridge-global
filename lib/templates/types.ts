export type TemplateAvailability = "available" | "coming-soon";

type WebsiteTemplateBase = {
  id: string;
  name: string;
  slug: string;
  industry: string;
  style: string;
  short_description: string;
  thumbnail: string;
  screenshots: readonly string[];
  pages: readonly string[];
  features: readonly string[];
  starting_price: number | null;
  mobile_responsive: boolean;
  featured: boolean;
  created_at: string;
};

// The discriminated union prevents a Coming Soon entry from accidentally
// receiving a working demo URL in the catalog data.
export type WebsiteTemplate = WebsiteTemplateBase & (
  | { status: "available"; demo_url: string }
  | { status: "coming-soon"; demo_url: null }
);

export type TemplatePageCountFilter = "all" | "single" | "two-to-five" | "six-plus";

export function matchesPageCount(pageCount: number, filter: TemplatePageCountFilter) {
  if (filter === "single") return pageCount === 1;
  if (filter === "two-to-five") return pageCount >= 2 && pageCount <= 5;
  if (filter === "six-plus") return pageCount >= 6;
  return true;
}
