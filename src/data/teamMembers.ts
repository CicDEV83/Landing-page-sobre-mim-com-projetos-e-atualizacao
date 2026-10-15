export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  technologies: string[];
  description: string;
  image: string | null;
  imageAlt: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "cicghost",
    name: "CicGhost",
    role: "Fundador da EonLabs",
    specialties: [
      "Engenharia de Software",
      "Desenvolvimento Full Stack",
      "Automação",
      "Inteligência Artificial",
      "Cibersegurança",
    ],
    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Git",
      "SQL",
    ],
    description:
      "Idealizador da EonLabs, dedicado ao desenvolvimento de soluções digitais, à pesquisa tecnológica e à evolução contínua de suas competências.",
    image: "founder",
    imageAlt: "CicGhost, fundador da EonLabs",
  },
  {
    id: "leonardo",
    name: "Leonardo",
    role: "Integrante da EonLabs",
    specialties: [],
    technologies: [],
    description:
      "Integrante da equipe EonLabs. Informações profissionais e especialidades serão adicionadas futuramente.",
    image: null,
    imageAlt: "",
  },
  {
    id: "luis",
    name: "Luis",
    role: "Integrante da EonLabs",
    specialties: [],
    technologies: [],
    description:
      "Integrante da equipe EonLabs. Informações sobre sua atuação em automação e tráfego digital estão aguardando confirmação.",
    image: "luis",
    imageAlt: "Luis, integrante da EonLabs",
  },
];
