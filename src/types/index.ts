export type ProjectStatus =
  | "Concluído"
  | "Em desenvolvimento"
  | "Planejado";

export interface Project {
  id: string;

  title: string;

  subtitle: string;

  description: string;

  status: ProjectStatus;

  technologies: string[];

  projectUrl?: string;

  repositoryUrl?: string;

  images?: string[];

  featured?: boolean;
}