import { useState } from "react";
import { DeveloperWorkspace } from "./DeveloperWorkspace";
import { useScrollReveal } from "../hooks/useScrollReveal";

const statistics = [
  { value: "3+", label: "Projetos concluídos", className: "projects" },
  { value: "6+", label: "Tecnologias", className: "technologies" },
  { value: "∞", label: "Ideias para o futuro", className: "ideas" },
] as const;

const technologies = [
  { name: "HTML5", id: "html", symbol: "5" },
  { name: "CSS3", id: "css", symbol: "3" },
  { name: "JavaScript", id: "javascript", symbol: "JS" },
  { name: "React", id: "react", symbol: "⚛" },
  { name: "Node.js", id: "node", symbol: "⬡" },
  { name: "TypeScript", id: "typescript", symbol: "TS" },
  { name: "Git", id: "git", symbol: "◆" },
  { name: "MySQL", id: "mysql", symbol: "⌁" },
] as const;

export function AboutSection() {
  const { elementRef: sectionRef, isVisible } = useScrollReveal<HTMLElement>();
  const [showSkillDetails, setShowSkillDetails] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className={`about about--neon reveal ${isVisible ? "reveal--visible" : ""}`}
      aria-labelledby="about-title"
    >
      <div className="container about__container about__container--neon">
        <div className="about__story">
          <span className="about__tag">✦ SOBRE MIM</span>
          <h2 id="about-title" className="about__headline">
            Muito mais que código, <span>soluções para o futuro.</span>
          </h2>
          <p className="about__biography">
            Sou Cicero Walison, desenvolvedor Fullstack em formação, apaixonado
            por tecnologia, inovação e por transformar ideias em projetos reais.
            Busco sempre aprender, evoluir e criar soluções que geram valor para
            pessoas e negócios.
          </p>
          <ul className="about__stats" aria-label="Estatísticas profissionais">
            {statistics.map(({ value, label, className }) => (
              <li
                className={`about__stat about__stat--${className}`}
                key={label}
              >
                <strong>{value}</strong>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="about__scene">
          <DeveloperWorkspace />
          <figcaption className="about__quote">
            <blockquote>
              “Disciplina hoje,
              <br /> liberdade amanhã.”
            </blockquote>
            <span>Cicero Walison</span>
          </figcaption>
        </figure>

        <aside
          className="about__skills"
          id="habilidades"
          aria-labelledby="about-skills-title"
        >
          <h3 className="about__tag" id="about-skills-title">
            ✦ TECNOLOGIAS
          </h3>
          <ul
            className="about__skills-grid"
            aria-label="Tecnologias e ferramentas"
          >
            {technologies.map(({ name, id, symbol }) => (
              <li key={name} className={`about__skill about__skill--${id}`}>
                <span className="about__skill-symbol" aria-hidden="true">
                  {symbol}
                </span>
                <span className="about__skill-label">{name}</span>
              </li>
            ))}
          </ul>
          <button
            className="about__skills-link"
            type="button"
            aria-expanded={showSkillDetails}
            aria-controls="about-skills-details"
            onClick={() => setShowSkillDetails((current) => !current)}
          >
            {showSkillDetails
              ? "Ocultar habilidades"
              : "Ver todas as habilidades"}
            <span aria-hidden="true">→</span>
          </button>
          {showSkillDetails && (
            <p className="about__skills-details" id="about-skills-details">
              Frontend: HTML5, CSS3, JavaScript, TypeScript e React. Ferramentas
              e backend em aprendizado: Node.js, Git e MySQL.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
