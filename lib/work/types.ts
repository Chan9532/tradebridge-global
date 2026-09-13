export type WorkProjectCategory = "Websites" | "Business Systems" | "Automation" | "AI Projects";
export type WorkProjectStatus = "Internal Build" | "Demo Project" | "Concept Project" | "In Progress" | "Completed";
export type WorkProjectType = "Internal Build" | "Demo Project" | "Concept Project" | "Client Project";

export type WorkCaseStudy = {
  requirements: readonly string[];
  architecture: readonly { name: string; description: string }[];
  challenges: readonly string[];
  testing: { status: "Planned" | "Verified" | "Not documented"; details: readonly string[] };
  result: {
    summary: string;
    // Publish only approved evidence. Quantitative or commercial claims must
    // cite the actual report, measurement period and method here.
    evidence: readonly { label: string; url: string }[];
  };
  lessons: readonly string[];
};

export type WorkProject = {
  name: string;
  slug: string;
  category: WorkProjectCategory;
  project_type: WorkProjectType;
  summary: string;
  problem: string;
  solution: string;
  stack: readonly string[];
  features: readonly string[];
  screenshots: readonly string[];
  demo_url: string | null;
  github_url: string | null;
  case_study: WorkCaseStudy | null;
  status: WorkProjectStatus;
};
