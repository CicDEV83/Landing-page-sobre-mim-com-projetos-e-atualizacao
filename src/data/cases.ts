import zenitPayPreview from "../assets/images/cases/zenitpay-preview.png";
import agroLinkPreview from "../assets/images/cases/agrolink-preview.png";
import vitaCarePreview from "../assets/images/cases/vitacare-preview.png";
import flowOpsPreview from "../assets/images/cases/flowops-preview.png";

export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CaseItem {
  id: string;
  brandLetter: string;
  brandName: string;
  segment: string;
  title: string;
  problem: string;
  path: string;
  solution: string;
  image: string;
  imageAlt: string;
  results: CaseMetric[];
  testimonial: CaseTestimonial;
}

export const casesData: CaseItem[] = [
  {
    id: "zenitpay",
    brandLetter: "Z",
    brandName: "ZenitPay",
    segment: "Soluções de pagamento para empresas",
    title: "Onboarding digital e aumento de conversão",
    problem:
      "Processos manuais, baixa conversão na entrada de novos clientes e excesso de etapas no cadastro comercial.",
    path: "Mapeamos a jornada de aquisição, identificamos gargalos no cadastro e reorganizamos o fluxo comercial com foco em clareza, automação e redução de atrito.",
    solution:
      "Criamos uma plataforma com onboarding automatizado, painel comercial, integrações financeiras e visão em tempo real do funil de conversão.",
    image: zenitPayPreview,
    imageAlt: "Preview do case ZenitPay com dashboard e aplicativo mobile",
    results: [
      { value: "+70%", label: "conversão" },
      { value: "-60%", label: "tempo de análise" },
      { value: "+3x", label: "base de clientes" },
    ],
    testimonial: {
      quote:
        "A nova solução transformou nosso processo comercial e nos deu velocidade para escalar com segurança.",
      author: "Mariana Costa",
      role: "Diretora comercial da ZenitPay",
    },
  },
  {
    id: "agrolink",
    brandLetter: "A",
    brandName: "AgroLink",
    segment: "Gestão agrícola inteligente",
    title: "Visibilidade operacional para o campo",
    problem:
      "Baixa visibilidade dos dados de produção, dificuldade de acompanhamento das áreas e lentidão na tomada de decisão.",
    path: "Estruturamos o fluxo operacional, centralizamos dados críticos e desenhamos uma experiência integrada entre web, mobile e campo.",
    solution:
      "Desenvolvemos uma plataforma com dashboards operacionais, monitoramento de áreas, alertas inteligentes e integração com dispositivos IoT.",
    image: agroLinkPreview,
    imageAlt: "Preview do case AgroLink com dashboard agrícola e app mobile",
    results: [
      { value: "+40%", label: "produtividade" },
      { value: "-35%", label: "custos operacionais" },
      { value: "+50%", label: "área monitorada" },
    ],
    testimonial: {
      quote:
        "Passamos a operar com mais previsibilidade e controle. Hoje temos informação útil no momento certo.",
      author: "Carlos Menezes",
      role: "Gestor de operações da AgroLink",
    },
  },
  {
    id: "vitacare",
    brandLetter: "V",
    brandName: "VitaCare",
    segment: "Saúde digital para clínicas",
    title: "Experiência digital para atendimento e retenção",
    problem:
      "Atendimento desorganizado, falhas no agendamento e baixa retenção de pacientes ao longo da jornada.",
    path: "Mapeamos o atendimento ponta a ponta, redesenhamos os pontos de contato com os pacientes e priorizamos usabilidade e acompanhamento.",
    solution:
      "Criamos uma solução com agendamento online, prontuário digital, teleatendimento e painel administrativo para gestão da clínica.",
    image: vitaCarePreview,
    imageAlt: "Preview do case VitaCare com sistema de saúde e aplicativo",
    results: [
      { value: "+65%", label: "pacientes ativos" },
      { value: "-50%", label: "falhas em consultas" },
      { value: "+4,8", label: "avaliação média" },
    ],
    testimonial: {
      quote:
        "Conseguimos organizar o atendimento e elevar a percepção de valor dos pacientes em poucas semanas.",
      author: "Juliana Rocha",
      role: "Coordenadora da VitaCare",
    },
  },
  {
    id: "flowops",
    brandLetter: "F",
    brandName: "FlowOps",
    segment: "Automação e integração empresarial",
    title: "Integração de processos e eficiência operacional",
    problem:
      "Equipes trabalhando com ferramentas isoladas, retrabalho recorrente e ausência de visão consolidada da operação.",
    path: "Diagnosticamos os fluxos internos, mapeamos integrações prioritárias e desenhamos um plano de automação orientado a resultado.",
    solution:
      "Entregamos um hub operacional com integrações entre sistemas, automações, alertas e indicadores para acompanhamento gerencial.",
    image: flowOpsPreview,
    imageAlt: "Preview do case FlowOps com painel operacional e aplicativo",
    results: [
      { value: "-55%", label: "retrabalho" },
      { value: "+48%", label: "eficiência" },
      { value: "+100%", label: "visibilidade" },
    ],
    testimonial: {
      quote:
        "A operação ficou mais fluida, com menos dependência manual e muito mais clareza para tomada de decisão.",
      author: "Fernando Lima",
      role: "Gerente de operações da FlowOps",
    },
  },
];
