import { workProjects } from "@/lib/work/data";
import type { WorkProjectCategory } from "@/lib/work/types";

const palettes: Record<WorkProjectCategory, { background: string; surface: string; accent: string; accentSoft: string; text: string; muted: string }> = {
  Websites: { background: "#07152b", surface: "#ffffff", accent: "#2f74ff", accentSoft: "#dbe8ff", text: "#0a1a2f", muted: "#718096" },
  "Business Systems": { background: "#10243c", surface: "#f8fafc", accent: "#0f9f8f", accentSoft: "#d7f5ef", text: "#10243c", muted: "#718096" },
  Automation: { background: "#17152d", surface: "#ffffff", accent: "#7657e8", accentSoft: "#e8e1ff", text: "#201a3a", muted: "#746f86" },
  "AI Projects": { background: "#091f29", surface: "#f8fcfd", accent: "#1685a5", accentSoft: "#d7f2f7", text: "#0d2a34", muted: "#6a7f86" },
};

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, character => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;", "'": "&apos;" })[character] ?? character);
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = workProjects.find(item => item.slug === slug);
  if (!project) return new Response("Work preview not found", { status: 404 });

  const palette = palettes[project.category];
  const name = escapeXml(project.name);
  const category = escapeXml(project.category);
  const status = escapeXml(project.status);
  const firstFeature = escapeXml(project.features[0] ?? "Project overview");
  const secondFeature = escapeXml(project.features[1] ?? "Clear workflow");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-labelledby="title description">
      <title id="title">${name} internal project preview</title>
      <description id="description">A TradeBridge Digital ${status} interface preview for ${category}.</description>
      <rect width="1200" height="675" fill="#e8edf4"/>
      <rect x="40" y="34" width="1120" height="607" rx="24" fill="${palette.surface}"/>
      <rect x="40" y="34" width="1120" height="62" rx="24" fill="#ffffff"/>
      <rect x="40" y="72" width="1120" height="24" fill="#ffffff"/>
      <circle cx="75" cy="65" r="7" fill="#d7dde7"/><circle cx="99" cy="65" r="7" fill="#d7dde7"/><circle cx="123" cy="65" r="7" fill="#d7dde7"/>
      <rect x="434" y="53" width="332" height="23" rx="12" fill="#eff2f6"/>
      <rect x="40" y="96" width="244" height="545" fill="${palette.background}"/>
      <text x="76" y="146" fill="#ffffff" font-family="Arial, sans-serif" font-size="20" font-weight="800">TRADEBRIDGE</text>
      <text x="76" y="169" fill="${palette.accentSoft}" font-family="Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="2">DIGITAL · INTERNAL</text>
      <rect x="76" y="213" width="150" height="34" rx="9" fill="${palette.accent}"/>
      <rect x="76" y="272" width="112" height="9" rx="5" fill="#ffffff" opacity=".45"/>
      <rect x="76" y="310" width="136" height="9" rx="5" fill="#ffffff" opacity=".28"/>
      <rect x="76" y="348" width="96" height="9" rx="5" fill="#ffffff" opacity=".28"/>
      <rect x="76" y="386" width="124" height="9" rx="5" fill="#ffffff" opacity=".28"/>
      <rect x="320" y="132" width="770" height="42" rx="21" fill="${palette.accentSoft}"/>
      <text x="344" y="158" fill="${palette.text}" font-family="Arial, sans-serif" font-size="13" font-weight="800" letter-spacing="1">${status.toUpperCase()} · ${category.toUpperCase()}</text>
      <text x="320" y="229" fill="${palette.text}" font-family="Arial, sans-serif" font-size="38" font-weight="800">${name}</text>
      <rect x="320" y="257" width="455" height="11" rx="6" fill="${palette.muted}" opacity=".38"/>
      <rect x="320" y="282" width="372" height="11" rx="6" fill="${palette.muted}" opacity=".25"/>
      <rect x="320" y="334" width="225" height="194" rx="18" fill="${palette.accentSoft}"/>
      <circle cx="360" cy="374" r="16" fill="${palette.accent}" opacity=".85"/>
      <text x="344" y="425" fill="${palette.text}" font-family="Arial, sans-serif" font-size="16" font-weight="800">${firstFeature}</text>
      <rect x="344" y="450" width="160" height="9" rx="5" fill="${palette.text}" opacity=".25"/>
      <rect x="344" y="475" width="124" height="9" rx="5" fill="${palette.text}" opacity=".16"/>
      <rect x="567" y="334" width="225" height="194" rx="18" fill="#f5f7fa" stroke="#dfe4eb"/>
      <circle cx="607" cy="374" r="16" fill="${palette.accent}" opacity=".65"/>
      <text x="591" y="425" fill="${palette.text}" font-family="Arial, sans-serif" font-size="16" font-weight="800">${secondFeature}</text>
      <rect x="591" y="450" width="160" height="9" rx="5" fill="${palette.text}" opacity=".25"/>
      <rect x="591" y="475" width="124" height="9" rx="5" fill="${palette.text}" opacity=".16"/>
      <rect x="814" y="334" width="276" height="194" rx="18" fill="${palette.background}"/>
      <rect x="842" y="372" width="100" height="12" rx="6" fill="#ffffff" opacity=".8"/>
      <rect x="842" y="407" width="196" height="14" rx="7" fill="${palette.accent}"/>
      <rect x="842" y="443" width="152" height="14" rx="7" fill="${palette.accent}" opacity=".65"/>
      <rect x="842" y="479" width="112" height="14" rx="7" fill="${palette.accent}" opacity=".4"/>
      <text x="320" y="585" fill="${palette.muted}" font-family="Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="1">ORIGINAL INTERNAL PREVIEW · NO CLIENT CLAIMS</text>
    </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
