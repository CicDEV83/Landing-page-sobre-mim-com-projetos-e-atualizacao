import eonlabsLogo from "../../../assets/images/branding/eonlabs-logo.png";

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
            <img
              src={eonlabsLogo}
              alt="EonLabs — Tecnologia que impulsiona"
              className={styles.logoImage}
              width={300}
              height={108}
              loading="lazy"
              decoding="async"
            />
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