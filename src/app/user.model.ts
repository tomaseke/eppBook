type Roles = 'developer' | 'product owner' | 'smart' | 'analytic' | 'product manager';
interface Skill {
  technology: string;
  seniority: number;
  years: number;
}

interface Language{
  language: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

interface Experience{
  from: string;
  to: string;
  role: Roles;
  client: string;
  description: string;
  technologies: string[];
}

export type UserModel = {
  id: number;
  photo: string;
  name: string;
  skills: Skill[];
  languages: Language[];
  role: Roles;
  experiences: Experience[];
  skillCount: number;
}


