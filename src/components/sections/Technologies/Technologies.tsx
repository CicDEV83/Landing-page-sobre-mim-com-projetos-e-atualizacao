import type { ReactNode } from "react";

import styles from "../../../styles/sections/Technologies.module.css";

type TechnologyIcon =
  | "react"
  | "typescript"
  | "node"
  | "database"
  | "api"
  | "dashboard"
  | "design"
  | "security"
  | "automation";

interface Technology {
  id: string;
  label: string;
  icon: TechnologyIcon;
  category: string;
}

const technologies: Technology[] = [
  {
    id: "react",
    label: "React",
    icon: "react",
    category: "Frontend",
  },
  {
    id: "typescript",
    label: "TypeScript",
    icon: "typescript",
    category: "Desenvolvimento",
  },
  {
    id: "node",
    label: "Node.js",
    icon: "node",
    category: "Backend",
  },
  {
    id: "database",
    label: "SQL & SQLite",
    icon: "database",
    category: "Dados",
  },
  {
    id: "api",
    label: "APIs",
    icon: "api",
    category: "Integrações",
  },
  {
    id: "dashboard",
    label: "Dashboards",
    icon: "dashboard",
    category: "Visualização",
  },
  {
    id: "design",
    label: "UX/UI",
    icon: "design",
    category: "Prototipagem",
  },
  {
    id: "security",
    label: "Segurança",
    icon: "security",
    category: "Boas práticas",
  },
  {
    id: "automation",
    label: "Automação",
    icon: "automation",
    category: "Eficiência",
  },
];

function TechnologySymbol({ icon }: { icon: TechnologyIcon }): ReactNode {
  const symbols: Record<TechnologyIcon, ReactNode> = {
    react: (
      <>
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      </>
    ),

    typescript: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M6 10h7M9.5 10v8" />
        <path d="M18 11.5c-1-1-3-1-3.8.3-1 2 3.8 1.5 3.8 3.8 0 2-3.3 2.5-4.3 1.3" />
      </>
    ),

    node: (
      <>
        <path d="m12 2 9 5.2v9.6L12 22l-9-5.2V7.2L12 2Z" />
        <path d="M8 15V9l8 6V9" />
      </>
    ),

    database: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </>
    ),

    api: (
      <>
        <path d="M10 14a5 5 0 0 0 7.1 0l2.5-2.5a5 5 0 0 0-7.1-7.1L10.8 6" />
        <path d="M14 10a5 5 0 0 0-7.1 0l-2.5 2.5a5 5 0 0 0 7.1 7.1l1.7-1.6" />
      </>
    ),

    dashboard: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 16v-4M12 16V8M17 16v-6" />
      </>
    ),

    design: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="m8 16 8-8M8 11l5 5" />
      </>
    ),

    security: (
      <>
        <path d="M12 2 4.5 5v6.2c0 4.7 3 8.5 7.5 10.8 4.5-2.3 7.5-6.1 7.5-10.8V5L12 2Z" />
        <path d="m8.5 12 2.5 2.5 4.5-5" />
      </>
    ),

    automation: (
      <>
        <rect x="2" y="9" width="5" height="6" rx="1" />
        <rect x="17" y="2" width="5" height="6" rx="1" />
        <rect x="17" y="16" width="5" height="6" rx="1" />
        <path d="M7 12h5a4 4 0 0 0 4-4" />
        <path d="M12 12a4 4 0 0 1 4 4" />
      </>
    ),
  };

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {symbols[icon]}
    </svg>
  );
}

export function Technologies() {
  return (
    <section
      id="tecnologias"
      className={styles.section}
      aria-labelledby="technologies-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>TECNOLOGIAS E COMPETÊNCIAS</p>

            <h2 id="technologies-title" className={styles.title}>
              Nosso ecossistema tecnológico
            </h2>
          </div>

          <p className={styles.description}>
            Combinamos ferramentas modernas, engenharia de software e boas
            práticas para desenvolver soluções digitais alinhadas às
            necessidades de cada negócio.
          </p>
        </header>

        <ul className={styles.technologyList}>
          {technologies.map((technology) => (
            <li key={technology.id} className={styles.technologyItem}>
              <span
                className={`${styles.iconBox} ${styles[technology.id]}`}
                aria-hidden="true"
              >
                <TechnologySymbol icon={technology.icon} />
              </span>

              <span className={styles.technologyName}>{technology.label}</span>

              <span className={styles.srOnly}>{technology.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
