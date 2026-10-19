import { useState } from "react";
import "../styles/about-corporate.css";

type Capability = {
  id: string;
  title: string;
  description: string;
  glyph: string;
};

const capabilities: Capability[] = [
  { id: "products", title: "Produtos digitais", description: "Plataformas e sistemas alinhados à operação de cada negócio.", glyph: "◈" },
  { id: "architecture", title: "Arquitetura escalável", description: "Estruturas pensadas para evoluir com segurança e consistência.", glyph: "▱" },
  { id: "automation", title: "Automação inteligente", description: "Fluxos que reduzem fricções e liberam tempo para o essencial.", glyph: "ϟ" },
  { id: "integrations", title: "Integrações estratégicas", description: "Conexão entre plataformas, processos e dados.", glyph: "⌘" },
  { id: "experience", title: "Experiência do usuário", description: "Produtos intuitivos, acessíveis e orientados a objetivos reais.", glyph: "◎" },
];

const principles = [
  { number: "01", title: "Engenharia sob medida", description: "Soluções desenhadas em torno do desafio, não de um modelo pronto." },
  { number: "02", title: "Crescimento sustentável", description: "Decisões técnicas que respeitam o presente e preparam o futuro." },
  { number: "03", title: "Evolução contínua", description: "Melhoria orientada por qualidade, desempenho e experiência." },
];

export function AboutSection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="eon-about" id="sobre" aria-labelledby="eon-about-title">
      <div className="eon-about__ambient" aria-hidden="true" />
      <div className="container eon-about__container">
        <div className="eon-about__intro">
          <span className="eon-about__eyebrow">✦ SOBRE A EONLABS</span>
          <h2 id="eon-about-title" className="eon-about__title">
            Tecnologia estratégica para empresas que <span>querem evoluir.</span>
          </h2>
          <p className="eon-about__description">
            A EonLabs transforma desafios em produtos digitais e soluções sob medida.
            Combinamos engenharia, visão de negócio e inovação aplicada para criar
            experiências confiáveis e preparar organizações para a próxima etapa.
          </p>
          <div className="eon-about__principles" aria-label="Princípios da EonLabs">
            {principles.map((item) => (
              <article className="eon-about__principle" key={item.number}>
                <span className="eon-about__principle-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="eon-about__proof" aria-label="Nossa abordagem">
            <div><strong>Produto</strong><span>Foco em necessidades reais</span></div>
            <div><strong>Escala</strong><span>Estrutura para crescer</span></div>
            <div><strong>Impacto</strong><span>Tecnologia com propósito</span></div>
          </div>
        </div>

        <div className="eon-about__visual" aria-label="Representação abstrata da engenharia digital EonLabs">
          <div className="eon-about__halo" aria-hidden="true" />
          <div className="eon-about__console" aria-hidden="true">
            <div className="eon-about__console-top"><span className="eon-about__online" /> EONLABS / SISTEMAS</div>
            <div className="eon-about__console-heading">IDEIAS QUE SE TORNAM <strong>SOLUÇÕES</strong></div>
            <div className="eon-about__constellation">
              <span className="eon-about__node eon-about__node--a">ESTRATÉGIA</span>
              <span className="eon-about__node eon-about__node--b">ENGENHARIA</span>
              <span className="eon-about__node eon-about__node--c">PRODUTO</span>
              <span className="eon-about__node eon-about__node--d">RESULTADO</span>
              <svg viewBox="0 0 300 300" aria-hidden="true" focusable="false" preserveAspectRatio="none">
                <path d="M150 30 L55 125 L150 255 L245 125 Z M55 125 H245 M150 30 V255" />
                <circle cx="150" cy="30" r="4" /><circle cx="55" cy="125" r="4" />
                <circle cx="245" cy="125" r="4" /><circle cx="150" cy="255" r="4" />
              </svg>
              <span className="eon-about__center-logo">EL</span>
            </div>
            <div className="eon-about__console-bottom"><span>ESTRUTURAR</span><span>CONSTRUIR</span><span>EVOLUIR</span></div>
          </div>
          <div className="eon-about__visual-caption" aria-hidden="true">ENGENHARIA DIGITAL · VISÃO DE FUTURO</div>
        </div>

        <aside className="eon-about__capabilities" aria-label="Capacidades da EonLabs">
          <div className="eon-about__capabilities-heading"><div><span className="eon-about__eyebrow eon-about__eyebrow--small">DA IDEIA AO RESULTADO</span><h3>Capacidades</h3></div><span aria-hidden="true">✧</span></div>
          <div className="eon-about__capabilities-list">
            {capabilities.map((item) => (
              <div className="eon-about__capability" key={item.id}>
                <button
                  type="button"
                  className="eon-about__capability-button"
                  aria-expanded={selected === item.id}
                  onClick={() => setSelected((current) => current === item.id ? null : item.id)}
                >
                  <span className="eon-about__capability-icon" aria-hidden="true">{item.glyph}</span>
                  <span className="eon-about__capability-copy"><strong>{item.title}</strong><small>{item.description}</small></span>
                  <span className="eon-about__capability-arrow" aria-hidden="true">{selected === item.id ? "−" : "+"}</span>
                </button>
                {selected === item.id && <p className="eon-about__capability-detail">Nossa abordagem prioriza entendimento do contexto, planejamento responsável e entregas que podem ser verificadas e aprimoradas.</p>}
              </div>
            ))}
          </div>
          <a className="eon-about__cta" href="#solutions">Conhecer soluções <span aria-hidden="true">↗</span></a>
        </aside>
      </div>
    </section>
  );
}
