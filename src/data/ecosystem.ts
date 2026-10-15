/* ==========================================================
   EONLABS — ECOSSISTEMA
   Sprint 04 | Dados institucionais
   ========================================================== */

export type EcosystemStatus = "em-desenvolvimento" | "planejado" | "ativo";

export interface EcosystemProject {
  id: string;
  name: string;
  category: string;
  description: string;
  details: string;
  status: EcosystemStatus;
  website: string | null;
}

export interface EcosystemPartner {
  id: string;
  name: string;
  segment: string;
  description: string;
  website: string | null;
  logo: string | null;
}

/* ==========================================================
   PROJETOS PRÓPRIOS DA EONLABS
   ========================================================== */

export const ecosystemProjects: EcosystemProject[] = [
  {
    id: "eoncommerce",
    name: "EonCommerce",
    category: "Marketplace & SaaS",
    description:
      "Ecossistema digital voltado para comércio, serviços e gestão de negócios.",
    details:
      "Projeto de plataforma modular que contempla marketplace, gestão empresarial, logística, delivery e automação, com evolução planejada por etapas.",
    status: "em-desenvolvimento",
    website: null,
  },

  {
    id: "eonmusic",
    name: "EonMusic",
    category: "Aplicativos & Entretenimento",
    description:
      "Projeto de aplicativo para reprodução e organização de músicas.",
    details:
      "Proposta de reprodutor musical com biblioteca, favoritos, equalização e recursos premium, desenvolvido progressivamente dentro do ecossistema EonLabs.",
    status: "planejado",
    website: null,
  },
];

/* ==========================================================
   EMPRESAS PARCEIRAS
   ========================================================== */

/*
   Adicione aqui somente empresas com parceria confirmada.

   Exemplo de estrutura:

   {
     id: "empresa-exemplo",
     name: "Empresa Exemplo",
     segment: "Tecnologia",
     description: "Descrição da parceria.",
     website: "https://exemplo.com",
     logo: null,
   }

   A lista vazia não interfere na exibição da seção.
*/

export const ecosystemPartners: EcosystemPartner[] = [];

/* ==========================================================
   FUNÇÕES AUXILIARES
   ========================================================== */

export function getProjectStatusLabel(status: EcosystemStatus): string {
  switch (status) {
    case "em-desenvolvimento":
      return "Em desenvolvimento";

    case "planejado":
      return "Planejado";

    case "ativo":
      return "Ativo";

    default:
      return "Status não informado";
  }
}
