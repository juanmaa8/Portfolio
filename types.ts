export interface Project {
  id: number;
  category: string;
  title: string;
  client: string;
  metrics: string;
  impactBadges: string[];
  tags: string[];
  gallery: string[];
  shortDesc: string;
  challenge: string;
  solution: string;
  results: string[];
  stack: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  desc: string;
}
