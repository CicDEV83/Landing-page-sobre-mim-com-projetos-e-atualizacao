import { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";

const navigation = [
  { label: "Início", id: "inicio" },
  { label: "Sobre / Habilidades", id: "sobre" },
  { label: "Projetos", id: "projetos" },
  { label: "Contato", id: "contato" },
] as const;

type SectionId = (typeof navigation)[number]["id"];

const MOBILE_MENU_QUERY = "(max-width: 68rem)";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("inicio");

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const isDarkTheme = theme === "dark";

  // Identifica a seção ativa durante a rolagem.
  useEffect(() => {
    let frame = 0;

    function updateActiveSection() {
      const headerHeight =
        document.querySelector(".header")?.getBoundingClientRect().height ?? 0;

      const referenceLine = headerHeight + window.innerHeight * 0.22;

      let currentSection: SectionId = "inicio";

      /*
       * Sobre e Habilidades compartilham
       * o mesmo item de navegação: #sobre.
       *
       * Preservamos a lógica já aprovada
       * para identificar a seção ativa.
       */
      for (const item of navigation) {
        const element = document.getElementById(item.id);

        if (!element) continue;

        const sectionTop = element.getBoundingClientRect().top;

        if (sectionTop <= referenceLine) {
          currentSection = item.id;
        }
      }

      setActiveSection((previous) =>
        previous === currentSection ? previous : currentSection,
      );
    }

    function onScroll() {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveSection();
      });
    }

    updateActiveSection();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  // Fecha o menu com Escape e devolve o foco ao botão.
  useEffect(() => {
    if (!isMenuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  // Reinicia o menu ao mudar do layout mobile para desktop.
  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MENU_QUERY);

    function handleBreakpointChange(event: MediaQueryListEvent) {
      if (!event.matches) {
        setIsMenuOpen(false);
      }
    }

    mediaQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      mediaQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleNavigation(id: SectionId) {
    setActiveSection(id);
    closeMenu();
  }

  return (
    <header className="header">
      <div className="container header__container">
        <a
          className="header__brand"
          href="#inicio"
          aria-label="Cicero Walison — voltar ao início"
          onClick={() => handleNavigation("inicio")}
        >
          <span className="header__brand-symbol" aria-hidden="true">
            CW
          </span>

          <span className="header__brand-information">
            <strong className="header__brand-name">CICERO WALISON</strong>

            <span className="header__brand-role">FULL STACK DEVELOPER</span>
          </span>
        </a>

        <nav
          id="header-navigation"
          className={`header__navigation${
            isMenuOpen ? " header__navigation--open" : ""
          }`}
          aria-label="Navegação principal"
        >
          {navigation.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? "location" : undefined}
              onClick={() => handleNavigation(id)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          {/*
           * O currículo ainda está em preparação.
           * Mantemos o elemento não interativo.
           */}
          <span
            className="header__cv"
            title="Currículo em preparação"
            aria-label="Currículo em preparação"
          >
            <svg
              className="header__cv-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12m-4-4 4 4 4-4M5 17v3h14v-3" />
            </svg>
            Baixar CV
          </span>

          <button
            className="header__theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDarkTheme ? "Ativar tema claro" : "Ativar tema escuro"
            }
            title={isDarkTheme ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            <span aria-hidden="true">{isDarkTheme ? "☀" : "☾"}</span>
          </button>

          <button
            ref={menuButtonRef}
            className="header__menu-toggle"
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="header-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span aria-hidden="true">{isMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
