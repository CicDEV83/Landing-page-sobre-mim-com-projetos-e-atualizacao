import { useMemo, useState } from "react";
import { ecosystemPartners } from "../data/ecosystem";
import "../styles/partner-showcase.css";

const segments = ["Todos", "Tecnologia", "Comércio", "Serviços", "Saúde", "Educação", "Indústria"] as const;

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

export function PartnerShowcase() {
  const [segment, setSegment] = useState<string>("Todos");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = normalize(search.trim());
    return ecosystemPartners.filter((partner) => {
      const matchesSegment = segment === "Todos" || normalize(partner.segment) === normalize(segment);
      const matchesQuery = !query || normalize(`${partner.name} ${partner.segment} ${partner.description}`).includes(query);
      return matchesSegment && matchesQuery;
    });
  }, [segment, search]);

  return (
    <div className="eon-partners">
      <div className="eon-partners__hero">
        <div className="eon-partners__intro">
          <span className="eon-partners__eyebrow">EONLABS / CONEXÕES ESTRATÉGICAS</span>
          <h4>Empresas <span>Parceiras</span></h4>
          <p>Colaboração que aproxima competências, integra oportunidades e cria condições para desenvolver soluções com impacto real.</p>
          <div className="eon-partners__principles" aria-label="Princípios das parcerias">
            <span>Confiança</span><span>Colaboração</span><span>Qualidade</span>
          </div>
        </div>
        <div className="eon-partners__strategy">
          <span className="eon-partners__eyebrow">DA CONEXÃO AO RESULTADO</span>
          <h5>Parcerias construídas com propósito.</h5>
          <p>Uma abordagem orientada à compatibilidade de objetivos, responsabilidade técnica e evolução sustentável.</p>
          <div className="eon-partners__values">
            <div><strong>01</strong><span>Inovação conjunta</span></div>
            <div><strong>02</strong><span>Integrações responsáveis</span></div>
            <div><strong>03</strong><span>Qualidade e segurança</span></div>
            <div><strong>04</strong><span>Crescimento sustentável</span></div>
          </div>
        </div>
      </div>

      <section className="eon-partners__directory" aria-labelledby="eon-partners-directory-title">
        <div className="eon-partners__directory-head">
          <div>
            <span className="eon-partners__eyebrow">REDE EONLABS</span>
            <h5 id="eon-partners-directory-title">Nossos Parceiros</h5>
            <p>Organizações com parcerias confirmadas, quando disponíveis.</p>
          </div>
          <label className="eon-partners__search">
            <span className="eon-partners__sr-only">Buscar parceiros</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar parceiros..." type="search" />
          </label>
        </div>
        <div className="eon-partners__filters" role="group" aria-label="Filtrar parceiros por segmento">
          {segments.map((item) => (
            <button type="button" key={item} aria-pressed={segment === item} className={segment === item ? "eon-partners__filter eon-partners__filter--active" : "eon-partners__filter"} onClick={() => setSegment(item)}>{item}</button>
          ))}
        </div>
        {filtered.length > 0 ? (
          <div className="eon-partners__grid">
            {filtered.map((partner) => (
              <article className="eon-partners__partner" key={partner.id}>
                <span className="eon-partners__partner-icon" aria-hidden="true">◇</span>
                <div>
                  <h6>{partner.name}</h6>
                  <span className="eon-partners__partner-segment">{partner.segment}</span>
                  <p>{partner.description}</p>
                  {partner.website && <a href={partner.website} target="_blank" rel="noopener noreferrer">Visitar parceiro ↗</a>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="eon-partners__empty" role="status">
            <span aria-hidden="true">✧</span>
            <strong>{ecosystemPartners.length === 0 ? "Nossa rede de parcerias está em construção" : "Nenhum parceiro corresponde à busca"}</strong>
            <p>{ecosystemPartners.length === 0 ? "As empresas serão apresentadas aqui após a confirmação das respectivas parcerias." : "Experimente outro termo ou selecione a categoria Todos."}</p>
          </div>
        )}
      </section>

      <div className="eon-partners__trust">
        <div><strong>Parcerias de confiança</strong><span>Compromisso com colaboração transparente, qualidade e objetivos compartilhados.</span></div>
        <span>Critérios claros</span><span>Relações responsáveis</span><span>Proteção de dados</span>
      </div>
    </div>
  );
}
