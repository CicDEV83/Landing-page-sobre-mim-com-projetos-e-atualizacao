import styles from "../../../styles/sections/Problems.module.css";

const problems = [
  {
    id: "manual",
    number: "01",
    icon: "⚙",
    title: "Processos manuais e repetitivos",
    description:
      "Atividades operacionais consomem tempo, elevam custos e dificultam a produtividade das equipes.",
    solution: "Automação de fluxos, integrações e sistemas personalizados.",
  },
  {
    id: "integration",
    number: "02",
    icon: "⌘",
    title: "Sistemas que não se comunicam",
    description:
      "Informações fragmentadas e ferramentas desconectadas prejudicam a eficiência da operação.",
    solution: "Integração de APIs, plataformas e centralização de processos.",
  },
  {
    id: "security",
    number: "03",
    icon: "◇",
    title: "Riscos de segurança digital",
    description:
      "Aplicações e processos sem proteção adequada podem expor informações e comprometer a continuidade do negócio.",
    solution:
      "Arquitetura segura, boas práticas de desenvolvimento e controles de acesso.",
  },
  {
    id: "performance",
    number: "04",
    icon: "↗",
    title: "Baixa performance operacional",
    description:
      "Sistemas lentos e fluxos pouco eficientes dificultam o atendimento e a experiência do usuário.",
    solution: "Otimização de aplicações, interfaces e processos digitais.",
  },
  {
    id: "data",
    number: "05",
    icon: "▦",
    title: "Dados sem organização estratégica",
    description:
      "A falta de visibilidade sobre informações importantes limita o acompanhamento de indicadores e a tomada de decisões.",
    solution: "Dashboards, estruturação de dados e relatórios gerenciais.",
  },
  {
    id: "growth",
    number: "06",
    icon: "✦",
    title: "Tecnologia que não acompanha o crescimento",
    description:
      "Estruturas rígidas dificultam a evolução dos produtos e a adaptação às necessidades do mercado.",
    solution: "Arquiteturas escaláveis e desenvolvimento orientado à evolução.",
  },
];

export function Problems() {
  return (
    <section
      id="problemas"
      className={styles.section}
      aria-labelledby="problems-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>DESAFIOS QUE TRANSFORMAMOS</p>

          <h2 id="problems-title" className={styles.title}>
            Sua empresa enfrenta algum desses desafios?
          </h2>

          <p className={styles.description}>
            Identificamos obstáculos que limitam o crescimento e desenvolvemos
            soluções tecnológicas para tornar operações mais eficientes, seguras
            e escaláveis.
          </p>
        </header>

        <div className={styles.grid}>
          {problems.map((problem) => (
            <article key={problem.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.iconBox} aria-hidden="true">
                  {problem.icon}
                </span>

                <span className={styles.number}>{problem.number}</span>
              </div>

              <h3 className={styles.cardTitle}>{problem.title}</h3>

              <p className={styles.cardDescription}>{problem.description}</p>

              <div className={styles.solution}>
                <span className={styles.solutionLabel}>
                  COMO PODEMOS AJUDAR
                </span>

                <p className={styles.solutionText}>{problem.solution}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            O desafio é do seu negócio.
            <strong> A solução pode começar aqui.</strong>
          </p>

          <a className={styles.cta} href="#contato">
            Conversar sobre meu projeto
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
