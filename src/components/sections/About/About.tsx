import styles from "../../../styles/sections/About.module.css";

const highlights = [
  {
    number: "01",
    title: "Estratégia",
    description: "Tecnologia alinhada aos objetivos do negócio",
  },
  {
    number: "02",
    title: "Engenharia",
    description: "Soluções digitais com qualidade técnica",
  },
  {
    number: "03",
    title: "Evolução",
    description: "Produtos preparados para novos desafios",
  },
] as const;

export function About() {
  return (
    <section
      id="sobre"
      className={styles.section}
      aria-labelledby="about-title"
    >
      <div className={styles.container}>
        <div className={styles.introduction}>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>SOBRE NÓS</p>

            <h2 id="about-title" className={styles.title}>
              Sobre a EonLabs
            </h2>

            <a href="#contato" className={styles.link}>
              Conheça nossa proposta
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className={styles.descriptionBlock}>
            <p className={styles.description}>
              Na EonLabs, conectamos engenharia de software, design e visão
              estratégica para transformar desafios empresariais em soluções
              digitais inteligentes.
            </p>

            <p className={styles.description}>
              Nossa proposta é desenvolver produtos que unam tecnologia,
              experiência do usuário e possibilidades de evolução para cada
              negócio.
            </p>
          </div>

          <div className={styles.highlights} aria-label="Pilares da EonLabs">
            {highlights.map((item) => (
              <div key={item.number} className={styles.highlight}>
                <span className={styles.highlightNumber}>{item.number}</span>

                <h3 className={styles.highlightTitle}>{item.title}</h3>

                <p className={styles.highlightDescription}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
