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
    role: "Especialista em Automação e Tráfego Digital",

    specialties: [
      "Automação de Processos",
      "Gestão de Tráfego Pago",
      "Marketing Digital",
      "Campanhas Digitais",
    ],

    technologies: [
      "Meta Ads",
      "Google Ads",
      "Google Analytics",
      "Ferramentas de Automação",
    ],

    description:
      "Integrante da EonLabs com atuação em automação de processos, gestão de tráfego pago e marketing digital. Trabalha com planejamento e acompanhamento de campanhas digitais, utilizando plataformas de anúncios, análise de resultados e ferramentas de automação.",

    image: "luis",
    imageAlt: "Luis, especialista em automação e tráfego digital da EonLabs",
  },
];
