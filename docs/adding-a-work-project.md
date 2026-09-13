# Adding a work project

Work contains actual projects, internal builds and case studies. Reusable designs belong in Templates.

Add a record to `lib/work/data.ts` using the `WorkProject` type in `lib/work/types.ts`. The reusable card is `components/work/project-card.tsx`.

Every record includes name, unique slug, category, summary, problem, solution, stack, features, screenshots, demo_url, github_url, case_study and status.

Categories: Websites, Business Systems, Automation, AI Projects.

Use Internal Build for implemented internal work, Demo Project for a working demo, and Concept Project for a proposal. Describe concept stacks and features as planned. Never invent clients, testimonials or results.

Screenshots is an array of local image paths or approved image URLs. All images are displayed. Existing /work-previews/ images are illustrative concepts, not captured screenshots. Use an empty array when no preview exists. Leave absent demo_url, github_url and case_study values null. Case study content is a structured WorkCaseStudy object, or null when not yet documented.

The Build Something Similar CTA resolves the project by slug and carries its name into the quote request. Header and footer link directly to /work.

## Case studies at /work/[slug]

Every project has a detail URL resolved through the work repository. Unknown slugs return not found. Cards and the sitemap link to the detail routes.

Set project_type to Internal Build, Demo Project, Concept Project or Client Project. Set status independently; In Progress and Completed are available for client delivery. No client identity is required: use an approved project name or an anonymous description. Never publish confidential names, screenshots or evidence without authorization.

Shared fields supply Project Name, Project Type, Problem, Solution, Main Features, Technology Stack, Screenshots and Demo. Set case_study with these additional fields:

- requirements: list of requirements.
- architecture: list of name/description blocks.
- challenges: documented constraints or clearly identified design considerations.
- testing: status (Planned, Verified or Not documented) and details. Verified requires actual test records, including scope and date.
- result: summary and evidence references (label and url). Revenue, conversion and other quantitative claims require actual evidence, the measurement period and method. Use approved public references; omit sensitive data. A reference does not itself validate a claim: review the underlying evidence before publishing.
- lessons: the author's actual retrospective. Leave empty until supplied.

All sections render with honest missing-content states. Concept projects describe proposals, planned testing and unmeasured outcomes. Existing /work-previews/ images are explicitly labeled illustrations. Use actual image paths for captured screenshots. Missing demo links are shown as unavailable, never replaced with a fictitious demo. CTA links preserve the project slug in /get-quote.

See lib/work/case-studies.ts for the existing structured records. Keep project data and evidence separate from reusable page layout.
