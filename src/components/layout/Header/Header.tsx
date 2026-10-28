import { useEffect, useRef, useState } from "react";
import { navigation } from "../../../data/navigation";
import styles from "../../../styles/layout/Header.module.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 961px)");

    function handleViewportChange() {
      if (media.matches) setMenuOpen(false);
    }

    media.addEventListener("change", handleViewportChange);

    return () => {
      media.removeEventListener("change", handleViewportChange);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a
          className={styles.brand}
          href="#inicio"
          aria-label="EonLabs — voltar ao início"
          onClick={closeMenu}
        >
          <span className={styles.symbol} aria-hidden="true">
            E
          </span>
          <span>
            Eon<span className={styles.brandAccent}>Labs</span>
          </span>
        </a>

        <nav
          id="eonlabs-navigation"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a className={styles.cta} href="#contato">
            Solicitar projeto
            <span aria-hidden="true">↗</span>
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="eonlabs-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span aria-hidden="true">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}