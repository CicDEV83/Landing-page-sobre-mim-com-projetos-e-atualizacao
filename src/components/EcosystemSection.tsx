import { useEffect, useRef, useState } from "react";
import { Carousel } from "./ProjectCarousel/Carousel";
import "../styles/ecosystem.css";

type EcosystemView = "projects";

function EcosystemIcon({ type }: { type: EcosystemView }) {
  if (type === "projects") {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M32 7 55 19 32 31 9 19 32 7Z" />
        <path d="m9 30 23 12 23-12" />
        <path d="m9 41 23 12 23-12" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m7 24 12-10 10 5-12 15-10-5V24Z" />
      <path d="m57 24-12-10-10 5 12 15 10-5V24Z" />
      <path d="m23 25 7-5 8 5" />
      <path d="m21 32 13 12a5 5 0 0 0 7-1l11-12" />
      <path d="m17 37 12 12a5 5 0 0 0 7-1" />
      <path d="m27 28 9 8a5 5 0 0 0 7-1" />
    </svg>
  );
}

export function EcosystemSection() {
  const [activeView, setActiveView] = useState<EcosystemView | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  function openView(view: EcosystemView) {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setActiveView(view);
  }

  function closeView() {
    setActiveView(null);
  }

  useEffect(() => {
    if (!activeView) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveView(null);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        (document.activeElement === first ||
          !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [activeView]);

  return (
    <section
      id="ecossistema"
      className="ecosystem"
      aria-labelledby="ecosystem-title"
    >
      <div className="container ecosystem__container">
        <header className="ecosystem__heading">
          <span className="ecosystem__eyebrow">✧ CONEXÕES &amp; INOVAÇÃO</span>

          <h2 id="ecosystem-title">
            Nosso <span>Ecossistema</span>
          </h2>

          <p>
            Soluções próprias, conexões estratégicas e empresas que compartilham
            nossa visão de futuro.
          </p>
        </header>

        <div className="ecosystem__grid">
          <article id="projetos" className="ecosystem__card ecosystem__card--projects">
            <div className="ecosystem__icon">
              <EcosystemIcon type="projects" />
            </div>

            <h3>Nossos Produtos</h3>

            <p>Produtos e plataformas do nosso ecossistema.</p>

            <span className="ecosystem__badge">Produtos EonLabs</span>

            <button
              type="button"
              className="ecosystem__button"
              onClick={() => openView("projects")}
              aria-haspopup="dialog"
            >
              Explorar produtos
              <span aria-hidden="true">→</span>
            </button>
          </article>


        </div>

        <p className="ecosystem__footer-note">
          <span aria-hidden="true">✧</span>
          Um ecossistema preparado para novas soluções e conexões.
        </p>
      </div>

      {activeView && (
        <div
          className="ecosystem__overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeView();
            }
          }}
        >
          <div
            ref={dialogRef}
            className={`ecosystem__dialog${
              activeView === "projects" ? " ecosystem__dialog--products" : " ecosystem__dialog--partners"
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ecosystem-dialog-title"
            tabIndex={-1}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="ecosystem__dialog-close"
              onClick={closeView}
              aria-label="Fechar janela"
            >
              ×
            </button>

            <div className="ecosystem__dialog-heading">
              <span className="ecosystem__dialog-eyebrow">
                EONLABS • ECOSSISTEMA
              </span>

              <h3 id="ecosystem-dialog-title">
                {activeView === "projects"
                  ? "Nossos Produtos"
                  : "Empresas Parceiras"}
              </h3>

              <p>
                {activeView === "projects"
                  ? "Explore nossos produtos digitais, aplicações e demonstrações disponíveis."
                  : "Conheça as organizações que integram nossas parcerias confirmadas."}
              </p>
            </div>

            {activeView === "projects" && <Carousel />}


          </div>
        </div>
      )}
    </section>
  );
}
