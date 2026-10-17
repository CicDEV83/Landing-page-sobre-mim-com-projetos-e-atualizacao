import { solutions } from "../data/solutions";
import "../styles/solutions.css";

export function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="solutions"
      aria-labelledby="solutions-title"
    >
      <div className="solutions__container">
        <header className="solutions__header">
          <span className="solutions__eyebrow">EONLABS SOLUTIONS</span>

          <h2 id="solutions-title" className="solutions__title">
            Tecnologia para transformar negócios
          </h2>

          <p className="solutions__description">
            Desenvolvemos soluções digitais para diferentes segmentos
            empresariais, combinando tecnologia, identidade visual e
            funcionalidades adaptadas às necessidades de cada negócio.
          </p>
        </header>

        <div className="solutions__grid">
          {solutions.map((solution, index) => (
            <article key={solution.id} className="solutions__card">
              <div className="solutions__card-top">
                <span className="solutions__number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="solutions__status">
                  {solution.status === "available"
                    ? "Disponível"
                    : solution.status === "demo"
                      ? "Demonstração"
                      : "Em preparação"}
                </span>
              </div>

              <div className="solutions__card-content">
                <span className="solutions__segment">{solution.segment}</span>

                <h3 className="solutions__card-title">{solution.name}</h3>

                <p className="solutions__card-description">
                  {solution.description}
                </p>
              </div>

              <div className="solutions__features">
                <h4 className="solutions__features-title">
                  Funcionalidades previstas
                </h4>

                <ul className="solutions__features-list">
                  {solution.features.map((feature) => (
                    <li key={feature}>
                      <span
                        className="solutions__feature-marker"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="solutions__actions">
                {solution.demoUrl && solution.status !== "planned" ? (
                  <a
                    href={solution.demoUrl}
                    className="solutions__button solutions__button--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Experimentar demonstração
                  </a>
                ) : (
                  <span className="solutions__coming-soon">
                    Demonstração em preparação
                  </span>
                )}

                <a
                  href="#contato"
                  className="solutions__button solutions__button--secondary"
                  aria-label={`Solicitar orçamento para ${solution.segment}`}
                >
                  Solicitar orçamento
                </a>
              </div>
            </article>
          ))}
        </div>

        <footer className="solutions__footer">
          <h3>Seu negócio merece uma solução exclusiva.</h3>

          <p>
            Sua marca, sua identidade e suas necessidades. A EonLabs desenvolve
            a tecnologia para transformar suas ideias em soluções digitais.
          </p>

          <a href="#contato" className="solutions__footer-cta">
            Conversar sobre meu projeto
          </a>
        </footer>
      </div>
    </section>
  );
}
