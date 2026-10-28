import { services } from "../../../data/services";
import { ServiceIconGraphic } from "./ServiceIconGraphic";
import styles from "../../../styles/sections/Services.module.css";

export function Services() {
  return (
    <section
      id="solucoes"
      className={styles.section}
      aria-labelledby="services-title"
    >
      <div className={styles.container}>
        <div className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>O QUE FAZEMOS</span>

            <h2 id="services-title">Soluções e serviços</h2>
          </div>

          <div className={styles.introduction}>
            <p>
              Do planejamento ao crescimento, ajudamos sua empresa a transformar
              ideias em produtos digitais de alto impacto.
            </p>

            <a href="#contato" className={styles.cta}>
              Solicitar projeto
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <article key={service.id} id={service.id} className={styles.card}>
              <span
                className={`${styles.icon} ${styles[service.accent]}`}
                aria-hidden="true"
              >
                <ServiceIconGraphic name={service.icon} />
              </span>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <a href="#contato" className={styles.more}>
                Solicitar solução
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
