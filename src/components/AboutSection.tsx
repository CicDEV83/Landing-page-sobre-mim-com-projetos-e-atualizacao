import { useScrollReveal } from "../hooks/useScrollReveal";

const developmentPrinciples = [
  {
    title: "Arquitetura",
    description:
      "Estruturas organizadas, componentizadas e preparadas para evolução.",
  },
  {
    title: "Experiência",
    description:
      "Interfaces responsivas, acessíveis e pensadas para diferentes dispositivos.",
  },
  {
    title: "Engenharia",
    description:
      "Código limpo, semântico e construído com atenção à manutenção e escalabilidade.",
  },
] as const;

const technologies = [
  "React",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Node.js",
  "Git",
] as const;

export function AboutSection() {
  const {
    elementRef: sectionRef,
    isVisible,
  } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className={`about reveal ${
        isVisible ? "reveal--visible" : ""
      }`}
      id="sobre"
      aria-labelledby="about-title"
    >
      <div className="container about__container">
        <header className="about__header">
          <p className="about__eyebrow">
            Sobre mim
          </p>

          <h2 id="about-title">
            Desenvolvimento com propósito, estrutura e evolução constante.
          </h2>
        </header>

        <div className="about__content">
          <div className="about__presentation">
            <p className="about__lead">
              Sou Cicero W. Silva, Full Stack Developer em evolução contínua,
              construindo aplicações modernas com foco em qualidade,
              experiência do usuário e boas práticas de desenvolvimento.
            </p>

            <p>
              Meu trabalho combina desenvolvimento frontend, integração com
              APIs e evolução para arquiteturas full stack, transformando cada
              projeto em uma oportunidade de aprofundar conhecimentos e
              construir soluções cada vez mais completas.
            </p>

            <ul
              className="about__technologies"
              aria-label="Principais tecnologias"
            >
              {technologies.map((technology) => (
                <li key={technology}>
                  {technology}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="about__principles"
            aria-label="Princípios de desenvolvimento"
          >
            {developmentPrinciples.map(
              ({ title, description }, index) => (
                <article
                  className="about__principle"
                  key={title}
                >
                  <span
                    className="about__principle-number"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3>{title}</h3>

                    <p>{description}</p>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}