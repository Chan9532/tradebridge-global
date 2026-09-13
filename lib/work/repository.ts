import { workProjects } from "./data";
import type { WorkProject } from "./types";

export interface WorkRepository {
  list(): Promise<readonly WorkProject[]>;
  findBySlug(slug: string): Promise<WorkProject | null>;
}

class StaticWorkRepository implements WorkRepository {
  constructor(private readonly projects: readonly WorkProject[]) {}

  async list() {
    return [...this.projects];
  }

  async findBySlug(slug: string) {
    return this.projects.find(project => project.slug === slug) ?? null;
  }
}

// Replace only this composition point when project records move to Supabase.
export const workRepository: WorkRepository = new StaticWorkRepository(workProjects);

export function listWorkProjects() {
  return workRepository.list();
}

export function getWorkProjectBySlug(slug: string) {
  return workRepository.findBySlug(slug);
}
