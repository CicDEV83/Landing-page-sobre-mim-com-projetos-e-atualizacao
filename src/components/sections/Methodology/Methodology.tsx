import type { ReactNode } from "react";

import styles from "../../../styles/sections/Methodology.module.css";

type StepIcon =
  | "discovery"
  | "planning"
  | "design"
  | "development"
  | "delivery";

interface MethodologyStep {
  id: string;
  number: string;
  icon: StepIcon;
  title: string;
  description: string;
  activities: string[];
}

const methodologySteps: MethodologyStep[] = [
  {
    id: "discovery",
    number: "01",
    icon: "discovery",
    title: "Diagnóstico e descoberta",
    description:
      "Compreendemos o contexto do negócio, identificamos desafios e alinhamos os objetivos que irão orientar a solução.",
    activities: [
      "Levantamento de necessidades",
      "Análise do cenário atual",
      "Definição de objetivos",
    ],
  },
  {
    id: "planning",
    number: "02",
    icon: "planning",
    title: "Planejamento estratégico",
    description:
      "Organizamos prioridades, requisitos e decisões técnicas para construir um caminho de execução claro.",
    activities: [
      "Definição do escopo",
      "Planejamento das entregas",
      "Estratégia de arquitetura",
    ],
  },
  {
    id: "design",
    number: "03",
    icon: "design",
    title: "Design e prototipagem",
    description:
      "Transformamos requisitos em experiências visuais, permitindo avaliar fluxos e interfaces antes da implementação.",
    activities: [
      "Estruturação de jornadas",
      "Design de interfaces",
      "Protótipos para validação",
    ],
  },
  {
    id: "development",
    number: "04",
    icon: "development",
    title: "Engenharia e desenvolvimento",
    description:
      "Desenvolvemos a solução com atenção à organização do código, à experiência do usuário e aos requisitos técnicos.",
    activities: [
      "Desenvolvimento de funcionalidades",
      "Integração de sistemas",
      "Boas práticas de segurança",
    ],
  },
  {
    id: "delivery",
    number: "05",
    icon: "delivery",
    title: "Validação, entrega e evolução",
    description:
      "Verificamos o funcionamento da solução, preparamos sua entrega e identificamos oportunidades de evolução.",
    activities: [
      "Testes e validação",
      "Preparação para implantação",
      "Planejamento de melhorias",
    ],
  },
];

function MethodologyIcon({ name }: { name: StepIcon }): ReactNode {
  const paths: Record<StepIcon, ReactNode> = {
    discovery: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.5 4.5" />
        <path d="m8.5 11 1.8 1.8 3.4-3.6" />
      </>
    ),
    planning: (
      <>
        <rect x="3" y="3" width="6" height="6" rx="1.5" />
        <rect x="15" y="3" width="6" height="6" rx="1.5" />
        <rect x="9" y="15" width="6" height="6" rx="1.5" />
        <path d="M6 9v3h12V9" />
        <path d="M12 12v3" />
      </>
    ),
    design: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 9v11" />
        <path d="m13 14 2 2 4-4" />
      </>
    ),
    development: (
      <>
        <path d="m8 8-4 4 4 4" />
        <path d="m16 8 4 4-4 4" />
        <path d="m14 4-4 16" />
      </>
    ),
    delivery: (
      <>
        <path d="M12 2 4.5 5v6.2c0 4.7 3 8.5 7.5 10.8 4.5-2.3 7.5-6.1 7.5-10.8V5L12 2Z" />
        <path d="m8.5 12 2.5 2.5 4.5-5" />
      </>
    ),
  };

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

export function Methodology() {
  return (
    <section
      id="metodologia"
      className={styles.section}
      aria-labelledby="methodology-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>NOSSO PROCESSO</p>

          <h2 id="methodology-title" className={styles.title}>
            Da ideia à solução, com método e precisão.
          </h2>

          <p className={styles.description}>
            Cada projeto começa com uma necessidade e evolui por meio de
            decisões estratégicas, design inteligente e engenharia de software.
            Conheça nossa metodologia de desenvolvimento.
          </p>
        </header>

        <ol className={styles.timeline}>
          {methodologySteps.map((step) => (
            <li key={step.id} className={styles.timelineItem}>
              <article className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.iconBox} aria-hidden="true">
                    <MethodologyIcon name={step.icon} />
                  </span>

                  <span className={styles.stepNumber}>ETAPA {step.number}</span>
                </div>

                <h3 className={styles.cardTitle}>{step.title}</h3>

                <p className={styles.cardDescription}>{step.description}</p>

                <div className={styles.activities}>
                  <p className={styles.activitiesLabel}>
                    PRINCIPAIS ATIVIDADES
                  </p>

                  <ul className={styles.activitiesList}>
                    {step.activities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className={styles.footer}>
          <div className={styles.footerContent}>
            <p className={styles.footerEyebrow}>PRÓXIMO PASSO</p>

            <h3 className={styles.footerTitle}>
              Seu próximo projeto começa com uma boa conversa.
            </h3>

            <p className={styles.footerDescription}>
              Conte-nos sobre seu desafio e vamos avaliar juntos as
              possibilidades para transformar sua ideia em uma solução digital.
            </p>
          </div>

          <a href="#contato" className={styles.cta}>
            Iniciar uma conversa
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
