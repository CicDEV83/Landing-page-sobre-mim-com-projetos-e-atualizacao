import { useState } from "react";
import "../styles/engineering-network.css";

type SystemArea = {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  className: string;
};

const areas: SystemArea[] = [
  {
    id: "products", title: "Produtos", subtitle: "Experiências digitais",
    detail: "Plataformas e aplicações desenhadas para necessidades concretas.",
    className: "products",
  },
  {
    id: "data", title: "Dados", subtitle: "Decisões informadas",
    detail: "Informação organizada para apoiar processos e decisões.",
    className: "data",
  },
  {
    id: "operations", title: "Operações", subtitle: "Fluxos mais eficientes",
    detail: "Processos planejados para reduzir fricções e facilitar o trabalho.",
    className: "operations",
  },
  {
    id: "integrations", title: "Integrações", subtitle: "Sistemas conectados",
    detail: "Conexões entre serviços e ferramentas para apoiar a operação.",
    className: "integrations",
  },
];

export function FounderSection() {
  const [selected, setSelected] = useState<SystemArea | null>(null);

  return (
    <section
      id="fundador"
      className="eon-engineering"
      aria-labelledby="eon-engineering-title"
    >
      <div className="container eon-engineering__container">
        <div className="eon-engineering__heading">
          <span className="eon-engineering__eyebrow">✦ EONLABS / ENGENHARIA DIGITAL</span>
          <h2 id="eon-engineering-title">
            Engenharia que <span>conecta o futuro.</span>
          </h2>
          <p>
            Produtos, dados e operações trabalhando em conjunto. Transformamos
            desafios de negócio em soluções digitais integradas, com arquitetura
            pensada para evoluir.
          </p>
        </div>

        <div className="eon-engineering__composition">
          <div className="eon-engineering__stage" aria-label="Diagrama interativo de áreas conectadas à EonLabs">
            <div className="eon-engineering__grid" aria-hidden="true" />
            <div className="eon-engineering__halo" aria-hidden="true" />
            <svg
              className="eon-engineering__links"
              viewBox="0 0 1000 610"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <linearGradient id="eon-engineering-link" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1ce9f6" />
                  <stop offset="100%" stopColor="#ba52ff" />
                </linearGradient>
              </defs>
              <path d="M500 305 L195 150 M500 305 L805 150 M500 305 L195 470 M500 305 L805 470" />
              <circle className="eon-engineering__signal s1" r="6"><animateMotion dur="4s" repeatCount="indefinite" path="M500 305 L195 150" /></circle>
              <circle className="eon-engineering__signal s2" r="6"><animateMotion dur="5s" repeatCount="indefinite" path="M500 305 L805 150" /></circle>
              <circle className="eon-engineering__signal s3" r="6"><animateMotion dur="4.5s" repeatCount="indefinite" path="M500 305 L195 470" /></circle>
              <circle className="eon-engineering__signal s4" r="6"><animateMotion dur="5.5s" repeatCount="indefinite" path="M500 305 L805 470" /></circle>
            </svg>

            <div className="eon-engineering__center" aria-label="EonLabs, engenharia digital">
              <div className="eon-engineering__center-ring" aria-hidden="true" />
              <span className="eon-engineering__center-name">EONLABS</span>
              <span className="eon-engineering__center-role">ENGENHARIA DIGITAL</span>
              <span className="eon-engineering__center-status"><span /> SISTEMAS CONECTADOS</span>
            </div>

            {areas.map((area) => (
              <button
                key={area.id}
                className={`eon-engineering__node eon-engineering__node--${area.className}${selected?.id === area.id ? " is-selected" : ""}`}
                type="button"
                aria-pressed={selected?.id === area.id}
                onClick={() => setSelected((previous) => previous?.id === area.id ? null : area)}
              >
                <span className="eon-engineering__node-index" aria-hidden="true">0{areas.indexOf(area) + 1}</span>
                <strong>{area.title}</strong>
                <small>{area.subtitle}</small>
              </button>
            ))}
          </div>

          <div className="eon-engineering__info" aria-live="polite">
            <span className="eon-engineering__info-label">{selected ? "ÁREA SELECIONADA" : "NOSSA VISÃO"}</span>
            <h3>{selected?.title ?? "Soluções conectadas. Resultados consistentes."}</h3>
            <p>{selected?.detail ?? "Selecione uma área do diagrama para descobrir como a engenharia digital conecta necessidades, sistemas e oportunidades."}</p>
            <a href="#solutions">Explorar soluções <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="eon-engineering__footer" aria-label="Princípios da engenharia EonLabs">
          <span>ESTRUTURAR</span><i aria-hidden="true" /><span>INTEGRAR</span><i aria-hidden="true" /><span>EVOLUIR</span>
        </div>
      </div>
    </section>
  );
}
