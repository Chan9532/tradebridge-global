import { templateCatalogData } from "@/lib/templates/data";
import { getTemplateVisualTheme } from "@/lib/templates/themes";

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, character => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;", "'": "&apos;" })[character] ?? character);
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = templateCatalogData.find(item => item.slug === slug);
  if (!template) return new Response("Template preview not found", { status: 404 });

  const theme = getTemplateVisualTheme(template.style);
  const name = escapeXml(template.name);
  const industry = escapeXml(template.industry);
  const style = escapeXml(template.style);
  const view = new URL(request.url).searchParams.get("view") === "inner" ? "inner" : "home";
  const headline = view === "inner" ? "Services built around you." : "A clearer website.";
  const subheadline = view === "inner" ? "Simple paths. Useful details." : "A stronger start.";
  const viewLabel = view === "inner" ? "INNER PAGE" : "HOMEPAGE";
  const availabilityLabel = template.status === "available" ? "INTERNAL DEMO" : "COMING SOON";
  const totalPages: number = template.pages.length;
  const pageCount = `${totalPages} ${totalPages === 1 ? "page" : "pages"}`;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750" role="img" aria-labelledby="title description">
      <title id="title">${name} website template preview</title>
      <description id="description">A ${style} ${industry} website concept.</description>
      <rect width="1200" height="750" fill="#e8edf4"/>
      <rect x="44" y="36" width="1112" height="678" rx="24" fill="${theme.surface}"/>
      <rect x="44" y="36" width="1112" height="58" rx="24" fill="#ffffff"/>
      <rect x="44" y="70" width="1112" height="24" fill="#ffffff"/>
      <circle cx="78" cy="65" r="7" fill="#d7dde7"/><circle cx="102" cy="65" r="7" fill="#d7dde7"/><circle cx="126" cy="65" r="7" fill="#d7dde7"/>
      <rect x="442" y="54" width="316" height="22" rx="11" fill="#f0f3f7"/>
      <rect x="44" y="94" width="1112" height="620" fill="${theme.background}"/>
      <text x="92" y="151" fill="${theme.text}" font-family="Arial, sans-serif" font-size="23" font-weight="700">${name}</text>
      <rect x="892" y="128" width="88" height="9" rx="5" fill="${theme.muted}" opacity=".55"/>
      <rect x="1002" y="118" width="104" height="30" rx="15" fill="${theme.accent}"/>
      <rect x="92" y="205" width="180" height="30" rx="15" fill="${theme.accentSoft}"/>
      <text x="111" y="225" fill="#1b2635" font-family="Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="1">${industry.toUpperCase()}</text>
      <text x="92" y="305" fill="${theme.text}" font-family="Arial, sans-serif" font-size="54" font-weight="800">${headline}</text>
      <text x="92" y="373" fill="${theme.text}" font-family="Arial, sans-serif" font-size="54" font-weight="800">${subheadline}</text>
      <rect x="92" y="412" width="380" height="12" rx="6" fill="${theme.muted}" opacity=".58"/>
      <rect x="92" y="438" width="310" height="12" rx="6" fill="${theme.muted}" opacity=".38"/>
      <rect x="92" y="488" width="148" height="48" rx="12" fill="${theme.accent}"/>
      <rect x="258" y="488" width="148" height="48" rx="12" fill="none" stroke="${theme.muted}" opacity=".5"/>
      <rect x="664" y="198" width="442" height="374" rx="28" fill="${theme.surface}"/>
      <rect x="692" y="226" width="386" height="154" rx="18" fill="${theme.accentSoft}"/>
      <circle cx="728" cy="261" r="16" fill="${theme.accent}" opacity=".8"/>
      <rect x="756" y="249" width="164" height="12" rx="6" fill="${theme.text}" opacity=".72"/>
      <rect x="756" y="273" width="118" height="9" rx="5" fill="${theme.muted}" opacity=".5"/>
      <rect x="692" y="402" width="181" height="142" rx="18" fill="none" stroke="${theme.muted}" opacity=".25"/>
      <rect x="897" y="402" width="181" height="142" rx="18" fill="none" stroke="${theme.muted}" opacity=".25"/>
      <circle cx="725" cy="439" r="14" fill="${theme.accent}" opacity=".55"/><circle cx="930" cy="439" r="14" fill="${theme.accent}" opacity=".75"/>
      <rect x="713" y="476" width="120" height="10" rx="5" fill="${theme.text}" opacity=".55"/><rect x="918" y="476" width="120" height="10" rx="5" fill="${theme.text}" opacity=".55"/>
      <rect x="713" y="498" width="86" height="8" rx="4" fill="${theme.muted}" opacity=".4"/><rect x="918" y="498" width="86" height="8" rx="4" fill="${theme.muted}" opacity=".4"/>
      <rect x="92" y="638" width="176" height="30" rx="15" fill="${theme.surface}"/>
      <text x="111" y="658" fill="${theme.muted}" font-family="Arial, sans-serif" font-size="12" font-weight="700">${availabilityLabel} · ${viewLabel} · ${style} · ${pageCount}</text>
    </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
