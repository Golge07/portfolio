export type ProjectCategory = "Full Stack" | "Frontend" | "Backend";

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  year: string;
  desc: string;
  tags: string[];
  featured: boolean;
  accentColor: string;
  link: string;
  github?: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  githubUrl: string;
  linkedinUrl: string;
  cvPdfUrl: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
  tags: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  desc: string;
}

export interface Skill {
  label: string;
  level: number;
}

export interface Language {
  lang: string;
  level: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  projectFilters: Array<"Tümü" | ProjectCategory>;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
}
