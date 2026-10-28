export const services = [
  {
    id: "software",
    icon: "code",
    title: "Software sob medida",
    short: "Soluções para seu negócio",
    description:
      "Sistemas personalizados para os processos, desafios e objetivos da sua empresa.",
    accent: "blue",
  },
  {
    id: "web-mobile",
    icon: "mobile",
    title: "Web & Mobile",
    short: "Aplicações modernas",
    description:
      "Aplicações web e mobile planejadas para entregar experiências acessíveis e responsivas.",
    accent: "violet",
  },
  {
    id: "saas",
    icon: "cloud",
    title: "Plataformas SaaS",
    short: "Produtos escaláveis",
    description:
      "Desenvolvimento de plataformas digitais preparadas para evoluir com o negócio.",
    accent: "teal",
  },
  {
    id: "ux-ui",
    icon: "design",
    title: "UX/UI",
    short: "Experiências que convertem",
    description:
      "Design de interfaces, jornadas e protótipos focados em clareza e usabilidade.",
    accent: "blue",
  },
  {
    id: "automacao",
    icon: "automation",
    title: "Automação",
    short: "Mais eficiência, menos custo",
    description:
      "Automatização de processos e fluxos operacionais para reduzir tarefas repetitivas.",
    accent: "green",
  },
  {
    id: "integracoes",
    icon: "integration",
    title: "Integrações",
    short: "Conecte seus sistemas",
    description:
      "Integrações entre sistemas, APIs e ferramentas para conectar operações e informações.",
    accent: "violet",
  },
] as const;

export type ServiceIcon = (typeof services)[number]["icon"];
