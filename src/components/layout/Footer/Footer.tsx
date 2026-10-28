import styles from "../../../styles/layout/Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <a
            href="#inicio"
            className={styles.logo}
            aria-label="EonLabs — Voltar ao início"
          >
            <span className={styles.logoEon}>Eon</span>
            <span className={styles.logoLabs}>Labs</span>
            <span className={styles.logoDot}>.</span>
          </a>

          <p className={styles.tagline}>
            Engenharia de software &amp; soluções digitais.
          </p>
        </div>

        <div className={styles.copyright}>
          <p>
            © {currentYear} EonLabs.
            <span> Todos os direitos reservados.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}