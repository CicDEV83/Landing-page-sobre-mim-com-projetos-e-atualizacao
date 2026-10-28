import { services } from "../../../data/services";
import { ServiceIconGraphic } from "../Services/ServiceIconGraphic";
import styles from "../../../styles/sections/Specialties.module.css";

export function Specialties() {
  return (
    <div className={styles.strip} aria-label="Especialidades da EonLabs">
      <div className={styles.container}>
        {services.map((service) => (
          <a key={service.id} href={`#${service.id}`} className={styles.item}>
            <span
              className={`${styles.icon} ${styles[service.accent]}`}
              aria-hidden="true"
            >
              <ServiceIconGraphic name={service.icon} />
            </span>

            <span className={styles.content}>
              <strong>{service.title}</strong>
              <small>{service.short}</small>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
