export type SolutionStatus = "planned" | "demo" | "available";

export interface Solution {
  id: string;
  name: string;
  segment: string;
  description: string;
  features: string[];
  status: SolutionStatus;
  demoUrl?: string;
}

export const solutions: Solution[] = [
  {
    id: "food",
    name: "EonFood",
    segment: "Restaurantes e panificadoras",
    description:
      "Soluções digitais para cardápios, pedidos, atendimento e gestão de estabelecimentos alimentícios.",
    features: [
      "Cardápio digital",
      "Pedidos online",
      "Integração com WhatsApp",
      "Gestão de atendimento",
    ],
    status: "planned",
  },
  {
    id: "store",
    name: "EonStore",
    segment: "Lojas e supermercados",
    description:
      "Vitrines e sistemas comerciais para apresentar produtos, organizar pedidos e facilitar vendas.",
    features: [
      "Catálogo digital",
      "Busca de produtos",
      "Carrinho de compras",
      "Gestão de pedidos",
    ],
    status: "planned",
  },
  {
    id: "pet",
    name: "EonPet",
    segment: "Pet shops",
    description:
      "Plataformas para organizar serviços, agendamentos e relacionamento com clientes.",
    features: [
      "Agendamentos",
      "Cadastro de pets",
      "Catálogo de serviços",
      "Histórico de atendimentos",
    ],
    status: "planned",
  },
  {
    id: "garage",
    name: "EonGarage",
    segment: "Oficinas mecânicas",
    description:
      "Sistemas para organizar serviços automotivos, orçamentos e acompanhamento de veículos.",
    features: [
      "Ordens de serviço",
      "Cadastro de veículos",
      "Orçamentos digitais",
      "Histórico de manutenção",
    ],
    status: "planned",
  },
  {
    id: "detail",
    name: "EonDetail",
    segment: "Lava-rápidos e estética automotiva",
    description:
      "Soluções para reservas, atendimento e organização de serviços de cuidados automotivos.",
    features: [
      "Agendamento online",
      "Pacotes de serviços",
      "Controle de atendimento",
      "Histórico de clientes",
    ],
    status: "planned",
  },
  {
    id: "custom",
    name: "EonCustom",
    segment: "Reformas e personalização de veículos",
    description:
      "Plataformas para acompanhar projetos automotivos, orçamentos e etapas de execução.",
    features: [
      "Projetos de reforma",
      "Etapas de execução",
      "Registro de evolução",
      "Aprovação de orçamentos",
    ],
    status: "planned",
  },
  {
    id: "booking",
    name: "EonBooking",
    segment: "Agendamentos e prestadores de serviços",
    description:
      "Sistemas de agendamento adaptáveis a negócios que trabalham com horários e reservas.",
    features: [
      "Agenda de serviços",
      "Disponibilidade de horários",
      "Reservas online",
      "Gestão de atendimentos",
    ],
    status: "planned",
  },
  {
    id: "motors",
    name: "EonMotors",
    segment: "Revendas de carros e motos",
    description:
      "Vitrines digitais para veículos, apresentação de informações e captação de interessados.",
    features: [
      "Catálogo de veículos",
      "Filtros de busca",
      "Detalhes e fotografias",
      "Contato comercial",
    ],
    status: "planned",
  },
];
