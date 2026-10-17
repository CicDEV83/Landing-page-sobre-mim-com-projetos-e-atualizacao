import { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";

/* ==========================================================
   EONLABS — NAVEGAÇÃO PRINCIPAL
   Header institucional | Cyberpunk Neon
   ========================================================== */

const navigation = [
  { label: "Início", id: "inicio" },
  { label: "Serviços", id: "servicos" },
  { label: "Sobre / Habilidades", id: "sobre" },
  { label: "Fundador", id: "fundador" },
  { label: "Equipe", id: "equipe" },
  { label: "Soluções", id: "solutions" },
  { label: "Projetos", id: "projetos" },
  { label: "Ecossistema", id: "ecossistema" },
  { label: "Contato", id: "contato" },
] as const;

type SectionId = (typeof navigation)[number]["id"];

const MOBILE_MENU_QUERY = "(max-width: 68rem)";

function getInitialSection(): SectionId {
  if (typeof window === "undefined") {
    return "inicio";
  }

  const hash = window.location.hash.slice(1);

  const section = navigation.find((item) => item.id === hash);

  return section?.id ?? "inicio";
}

export function Header() {
  const { theme, toggleTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] =
    useState<SectionId>(getInitialSection);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const isDarkTheme = theme === "dark";

  /* ========================================================
     DETECÇÃO DA SEÇÃO ATIVA
     Acompanha a rolagem para cima e para baixo.
     ======================================================== */

  useEffect(() => {
    let frame = 0;

    function updateActiveSection() {
      const headerHeight =
        document.querySelector(".header")?.getBoundingClientRect().height ?? 0;

      const referenceLine = headerHeight + window.innerHeight * 0.25;

      let currentSection: SectionId = "inicio";
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const item of navigation) {
        const element = document.getElementById(item.id);

        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= referenceLine && rect.bottom > referenceLine) {
          currentSection = item.id;
          break;
        }

        const distance =
          rect.top > referenceLine
            ? rect.top - referenceLine
            : referenceLine - rect.bottom;

        if (distance < nearestDistance) {
          nearestDistance = distance;
          currentSection = item.id;
        }
      }

      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (reachedBottom && document.getElementById("contato")) {
        currentSection = "contato";
      }

      setActiveSection((previous) =>
        previous === currentSection ? previous : currentSection,
      );
    }

    function handleScroll() {
      if (frame !== 0) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveSection();
      });
    }

    updateActiveSection();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("resize", handleScroll);

      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  /* ========================================================
     FECHAMENTO DO MENU COM ESCAPE
     ======================================================== */

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

  /* ========================================================
     ALTERAÇÃO ENTRE MOBILE E DESKTOP
     ======================================================== */

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

  /* ========================================================
     NAVEGAÇÃO IMEDIATA AO CLICAR
     ======================================================== */

  function handleNavigation(id: SectionId) {
    setActiveSection(id);
    setIsMenuOpen(false);
  }

  /* ========================================================
     RENDERIZAÇÃO DO HEADER
     ======================================================== */

  return (
    <header className="header">
      <div className="container header__container">
        {/* IDENTIDADE EONLABS */}

        <a
          className="header__brand"
          href="#inicio"
          aria-label="EonLabs — voltar ao início"
          onClick={() => handleNavigation("inicio")}
        >
          <span className="header__brand-symbol" aria-hidden="true">
            EL
          </span>

          <span className="header__brand-information">
            <strong className="header__brand-name">EONLABS</strong>

            <span className="header__brand-role">BY CICGHOST</span>
          </span>
        </a>

        {/* NAVEGAÇÃO PRINCIPAL */}

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

        {/* AÇÕES DO HEADER */}

        <div className="header__actions">
          {/* CURRÍCULO EM PREPARAÇÃO */}

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

          {/* BOTÃO DE TEMA */}

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

          {/* MENU MOBILE */}

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
