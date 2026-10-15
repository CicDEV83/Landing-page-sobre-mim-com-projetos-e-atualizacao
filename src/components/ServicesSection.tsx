import { useEffect, useRef, useState, type ReactNode } from "react";
import "../styles/services.css";

type ServiceIcon =
  | "code"
  | "mobile"
  | "ai"
  | "security"
  | "cloud"
  | "consulting";

interface Service {
  id: string;
  icon: ServiceIcon;
  title: string;
  preview: string;
  overview: string;
  solutions: string[];
  technologies: string[];
  process: string[];
  deliverables: string[];
}

const services: Service[] = [
  {
    id: "sistemas",
    icon: "code",
    title: "Desenvolvimento de Sistemas",
    preview:
      "Sites, sistemas web, aplicativos e plataformas personalizadas.",
    overview:
      "Desenvolvimento de soluções digitais sob medida para modernizar processos, organizar operações e criar experiências eficientes para empresas e clientes.",
    solutions: [
      "Sites institucionais e landing pages",
      "Sistemas empresariais e administrativos",
      "Dashboards e painéis gerenciais",
      "Marketplaces e plataformas de comércio",
      "Aplicações SaaS e sistemas multitenant",
      "APIs REST e integrações entre plataformas",
      "Sistemas de agendamento, pedidos e atendimento",
      "Modernização e manutenção de aplicações",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "MySQL",
    ],
    process: [
      "Levantamento das necessidades",
      "Planejamento da arquitetura",
      "Prototipação da interface",
      "Desenvolvimento frontend e backend",
      "Testes e validação",
      "Implantação e documentação",
    ],
    deliverables: [
      "Projeto organizado e documentado",
      "Interfaces responsivas",
      "Funcionalidades definidas no escopo",
      "Orientações de implantação e manutenção",
    ],
  },
  {
    id: "mobile",
    icon: "mobile",
    title: "Aplicativos Mobile",
    preview: "Apps Android e iOS com alta performance e design moderno.",
    overview:
      "Planejamento e desenvolvimento de experiências móveis para conectar pessoas, serviços e negócios em interfaces intuitivas e funcionais.",
    solutions: [
      "Aplicativos para atendimento e serviços",
      "Aplicativos de delivery e entregas",
      "Gestão de tarefas e produtividade",
      "Aplicações comerciais e corporativas",
      "Integrações com sistemas web",
      "Autenticação e perfis de usuários",
      "Notificações e geolocalização",
      "Painéis e acompanhamento de operações",
    ],
    technologies: [
      "React",
      "TypeScript",
      "React Native",
      "APIs REST",
      "Geolocalização",
      "Banco de dados",
    ],
    process: [
      "Definição do público e funcionalidades",
      "Planejamento da experiência mobile",
      "Desenho dos fluxos de navegação",
      "Desenvolvimento das funcionalidades",
      "Integração e testes",
      "Preparação para distribuição",
    ],
    deliverables: [
      "Protótipo da experiência",
      "Aplicação conforme escopo",
      "Integração com serviços necessários",
      "Documentação técnica",
    ],
  },
  {
    id: "inteligencia-artificial",
    icon: "ai",
    title: "Inteligência Artificial",
    preview:
      "Automação, chatbots, análise de dados e soluções com IA para o seu negócio.",
    overview:
      "Integração de tecnologias inteligentes para apoiar atendimento, produtividade, automação e análise de informações.",
    solutions: [
      "Assistentes virtuais personalizados",
      "Chatbots para atendimento",
      "Automação de fluxos de trabalho",
      "Integração de modelos de linguagem",
      "Organização e análise de documentos",
      "Classificação e processamento de dados",
      "Ferramentas de suporte à decisão",
      "Recursos inteligentes em aplicações web",
    ],
    technologies: [
      "APIs de IA",
      "Modelos de linguagem",
      "Python",
      "TypeScript",
      "Node.js",
      "Integrações REST",
    ],
    process: [
      "Identificação do problema",
      "Estudo de viabilidade",
      "Seleção da abordagem de IA",
      "Construção do protótipo",
      "Integração e avaliação",
      "Monitoramento da qualidade",
    ],
    deliverables: [
      "Protótipo funcional quando viável",
      "Fluxos e integrações documentados",
      "Orientações sobre segurança e privacidade",
      "Recomendações de operação e evolução",
    ],
  },
  {
    id: "ciberseguranca",
    icon: "security",
    title: "Cibersegurança",
    preview:
      "Testes de invasão, análise de vulnerabilidades, proteção de redes e consultoria em segurança.",
    overview:
      "Avaliação preventiva de riscos digitais, proteção de aplicações e recomendações para fortalecer a segurança dos ambientes tecnológicos.",
    solutions: [
      "Avaliações de segurança autorizadas",
      "Análise de vulnerabilidades",
      "Testes de segurança de aplicações web",
      "Avaliação de autenticação e permissões",
      "Segurança de APIs",
      "Revisão de configurações de servidores",
      "Boas práticas para redes e infraestrutura",
      "Recomendações de correção e prevenção",
    ],
    technologies: [
      "Linux",
      "Segurança Web",
      "OWASP",
      "Redes TCP/IP",
      "Ferramentas de diagnóstico",
      "Logs e monitoramento",
    ],
    process: [
      "Definição formal do escopo e autorização",
      "Levantamento de ativos e riscos",
      "Avaliação técnica controlada",
      "Documentação das evidências",
      "Recomendações de correção",
      "Reavaliação quando contratada",
    ],
    deliverables: [
      "Resumo dos riscos identificados",
      "Relatório técnico",
      "Recomendações de mitigação",
      "Orientações preventivas",
    ],
  },
  {
    id: "cloud",
    icon: "cloud",
    title: "Cloud & DevOps",
    preview:
      "Infraestrutura, servidores, automação e escalabilidade na nuvem.",
    overview:
      "Planejamento de ambientes e processos de implantação para apoiar a disponibilidade, organização e evolução de aplicações.",
    solutions: [
      "Planejamento de hospedagem em nuvem",
      "Configuração de ambientes de desenvolvimento",
      "Automação de builds e deploys",
      "Pipelines de integração contínua",
      "Implantação de aplicações web",
      "Configuração de domínios e serviços",
      "Estratégias de backup e recuperação",
      "Monitoramento e documentação operacional",
    ],
    technologies: [
      "Git",
      "GitHub Actions",
      "Linux",
      "Docker",
      "Vite",
      "Node.js",
      "PostgreSQL",
      "Serviços Cloud",
    ],
    process: [
      "Análise das necessidades de infraestrutura",
      "Definição do ambiente",
      "Configuração dos serviços",
      "Automação dos processos",
      "Testes de implantação",
      "Documentação e acompanhamento",
    ],
    deliverables: [
      "Ambiente configurado conforme escopo",
      "Processo de deploy documentado",
      "Configurações e orientações operacionais",
      "Recomendações de manutenção",
    ],
  },
  {
    id: "consultoria",
    icon: "consulting",
    title: "Consultoria Tecnológica",
    preview:
      "Planejamento, arquitetura e orientação estratégica para seu projeto.",
    overview:
      "Análise de necessidades e planejamento técnico para ajudar negócios a escolher soluções digitais adequadas aos seus objetivos.",
    solutions: [
      "Análise de processos empresariais",
      "Levantamento de requisitos",
      "Planejamento de sistemas personalizados",
      "Definição de arquitetura de software",
      "Avaliação de tecnologias",
      "Orientação para integrações",
      "Modernização de processos",
      "Planejamento de evolução tecnológica",
    ],
    technologies: [
      "Engenharia de Software",
      "Arquitetura de Sistemas",
      "Análise de Requisitos",
      "Integrações",
      "Modelagem de Dados",
    ],
    process: [
      "Reunião de diagnóstico",
      "Identificação de problemas e oportunidades",
      "Análise das alternativas",
      "Definição das prioridades",
      "Proposta de solução",
      "Planejamento das próximas etapas",
    ],
    deliverables: [
      "Diagnóstico e recomendações",
      "Escopo preliminar do projeto",
      "Plano de implementação",
      "Documentação das decisões",
    ],
  },
];

const mobileCarouselServices = [...services, ...services];

function ServiceIconGraphic({ type }: { type: ServiceIcon }) {
  const paths: Record<ServiceIcon, ReactNode> = {
    code: (
      <>
        <rect x="2.5" y="3" width="19" height="18" rx="2.5" />
        <path d="m9 9-3 3 3 3M15 9l3 3-3 3M13 7l-2 10" />
      </>
    ),
    mobile: (
      <>
        <rect x="6.5" y="2" width="11" height="20" rx="2" />
        <path d="M10 5h4M11 19h2" />
      </>
    ),
    ai: (
      <>
        <path d="M12 6a4 4 0 0 0-7 1 4 4 0 0 0-1 7 4 4 0 0 0 5 5l3-2" />
        <path d="M12 6a4 4 0 0 1 7 1 4 4 0 0 1 1 7 4 4 0 0 1-5 5l-3-2" />
        <path d="M12 6v12M7 9l5 3 5-3M7 15l5-3 5 3" />
        <path d="M9 5v14M15 5v14" />
      </>
    ),
    security: (
      <>
        <path d="M12 2 21 6v6c0 5-3.5 8-9 10-5.5-2-9-5-9-10V6Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    cloud: (
      <>
        <path d="M7 19h11a4 4 0 0 0 .2-8A7 7 0 0 0 5 10 4.5 4.5 0 0 0 7 19Z" />
        <path d="m10 14 2 2 3-4" />
      </>
    ),
    consulting: (
      <>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
        <circle cx="12" cy="12" r="9" strokeDasharray="2 3" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[type]}
    </svg>
  );
}

interface ServiceCardProps {
  service: Service;
  onOpen: (id: string, trigger: HTMLButtonElement) => void;
}

function ServiceCard({ service, onOpen }: ServiceCardProps) {
  return (
    <article
      className={`eon-services__card eon-services__card--${service.id}`}
    >
      <div className="eon-services__icon">
        <ServiceIconGraphic type={service.icon} />
      </div>

      <h3>{service.title}</h3>

      <p className="eon-services__preview">{service.preview}</p>

      <button
        type="button"
        className="eon-services__button"
        aria-haspopup="dialog"
        onClick={(event) => onOpen(service.id, event.currentTarget)}
      >
        Saiba mais
        <span aria-hidden="true">→</span>
      </button>
    </article>
  );
}

export function ServicesSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const selectedService =
    services.find((service) => service.id === selectedId) ?? null;

  function openService(id: string, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelectedId(id);
  }

  function closeService() {
    setSelectedId(null);
  }

  useEffect(() => {
    if (!selectedId) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedId(null);
      }

      if (event.key !== "Tab") return;

      const modal = document.querySelector<HTMLElement>(".eon-services__modal");

      if (!modal) return;

      const elements = Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (!elements.length) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [selectedId]);

  return (
    <section
      id="servicos"
      className="eon-services"
      aria-labelledby="eon-services-title"
    >
      <div className="eon-services__cosmic-stars" aria-hidden="true" />
      <div className="eon-services__cosmic-glow eon-services__cosmic-glow--left" aria-hidden="true" />
      <div className="eon-services__cosmic-glow eon-services__cosmic-glow--right" aria-hidden="true" />

      <div className="container eon-services__container">
        <div className="eon-services__heading">
          <span className="eon-services__eyebrow">✧ SOLUÇÕES E SERVIÇOS</span>

          <h2 id="eon-services-title">
            Soluções completas para o seu negócio
          </h2>

          <p>
            Do planejamento à entrega, unimos tecnologia, inovação e segurança
            para transformar suas ideias em resultados.
          </p>
        </div>

        {/* DESKTOP / TABLET */}
        <div className="eon-services__grid">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onOpen={openService}
            />
          ))}
        </div>

        {/* MOBILE CAROUSEL */}
        <div
          className="eon-services__carousel"
          aria-label="Carrossel de soluções e serviços"
        >
          <div className="eon-services__track">
            {mobileCarouselServices.map((service, index) => (
              <div className="eon-services__carousel-item" key={`${service.id}-${index}`}>
                <ServiceCard service={service} onOpen={openService} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedService && (
        <div
          className="eon-services__overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeService();
            }
          }}
        >
          <div
            className={`eon-services__modal eon-services__card--${selectedService.id}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="eon-modal-title"
            aria-describedby="eon-modal-description"
            tabIndex={-1}
          >
            <div className="eon-services__modal-top">
              <div className="eon-services__icon">
                <ServiceIconGraphic type={selectedService.icon} />
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                className="eon-services__close"
                onClick={closeService}
                aria-label="Fechar detalhes do serviço"
                title="Fechar"
              >
                ×
              </button>
            </div>

            <span className="eon-services__modal-eyebrow">
              EONLABS / SOLUÇÕES TECNOLÓGICAS
            </span>

            <h2 id="eon-modal-title">{selectedService.title}</h2>

            <p
              id="eon-modal-description"
              className="eon-services__modal-intro"
            >
              {selectedService.overview}
            </p>

            <div className="eon-services__modal-grid">
              <div className="eon-services__modal-panel">
                <h3>O que podemos desenvolver</h3>
                <ul>
                  {selectedService.solutions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="eon-services__modal-panel">
                <h3>Etapas de um projeto</h3>
                <ol>
                  {selectedService.process.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>

              <div className="eon-services__modal-panel">
                <h3>Tecnologias e competências relacionadas</h3>
                <div className="eon-services__tags">
                  {selectedService.technologies.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="eon-services__modal-panel">
                <h3>Entregáveis possíveis</h3>
                <ul>
                  {selectedService.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="eon-services__disclaimer">
              As soluções e tecnologias apresentadas são possibilidades de
              atuação. O escopo, a disponibilidade e as condições de execução
              são definidos após avaliação de cada projeto.
            </p>

            <div className="eon-services__modal-actions">
              <a
                href="#contato"
                className="eon-services__contact"
                onClick={closeService}
              >
                Conversar sobre esta solução
                <span aria-hidden="true">↗</span>
              </a>

              <button
                type="button"
                className="eon-services__secondary"
                onClick={closeService}
              >
                Voltar aos serviços
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}