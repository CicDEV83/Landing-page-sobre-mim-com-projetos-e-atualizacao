import { useEffect, useRef, useState } from "react";
import {
  ecosystemPartners,
  ecosystemProjects,
  getProjectStatusLabel,
} from "../data/ecosystem";

import "../styles/ecosystem.css";

type EcosystemView = "projects" | "partners";

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
          <article className="ecosystem__card ecosystem__card--projects">
            <div className="ecosystem__icon">
              <EcosystemIcon type="projects" />
            </div>

            <h3>Projetos EonLabs</h3>

            <p>Produtos e plataformas do nosso ecossistema.</p>

            <span className="ecosystem__badge">Projetos próprios</span>

            <button
              type="button"
              className="ecosystem__button"
              onClick={() => openView("projects")}
              aria-haspopup="dialog"
            >
              Explorar projetos
              <span aria-hidden="true">→</span>
            </button>
          </article>

          <article className="ecosystem__card ecosystem__card--partners">
            <div className="ecosystem__icon">
              <EcosystemIcon type="partners" />
            </div>

            <h3>Empresas Parceiras</h3>

            <p>Organizações e profissionais com parcerias confirmadas.</p>

            <span className="ecosystem__badge">Parcerias verificadas</span>

            <button
              type="button"
              className="ecosystem__button"
              onClick={() => openView("partners")}
              aria-haspopup="dialog"
            >
              Conhecer parceiros
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
            className="ecosystem__dialog"
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
                  ? "Projetos EonLabs"
                  : "Empresas Parceiras"}
              </h3>

              <p>
                {activeView === "projects"
                  ? "Conheça os produtos e iniciativas em desenvolvimento ou planejamento."
                  : "Conheça as organizações que integram nossas parcerias confirmadas."}
              </p>
            </div>

            {activeView === "projects" && (
              <div className="ecosystem__items">
                {ecosystemProjects.length > 0 ? (
                  ecosystemProjects.map((project) => (
                    <article className="ecosystem__item" key={project.id}>
                      <div className="ecosystem__item-top">
                        <h4>{project.name}</h4>

                        <span className="ecosystem__status">
                          {getProjectStatusLabel(project.status)}
                        </span>
                      </div>

                      <span className="ecosystem__item-category">
                        {project.category}
                      </span>

                      <p>{project.description}</p>

                      <p className="ecosystem__item-detail">
                        {project.details}
                      </p>

                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ecosystem__item-link"
                        >
                          Visitar projeto
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </article>
                  ))
                ) : (
                  <p className="ecosystem__empty">
                    Novos projetos serão apresentados aqui.
                  </p>
                )}
              </div>
            )}

            {activeView === "partners" && (
              <div className="ecosystem__items">
                {ecosystemPartners.length > 0 ? (
                  ecosystemPartners.map((partner) => (
                    <article className="ecosystem__item" key={partner.id}>
                      <h4>{partner.name}</h4>

                      <span className="ecosystem__item-category">
                        {partner.segment}
                      </span>

                      <p>{partner.description}</p>

                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ecosystem__item-link"
                        >
                          Visitar parceiro
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </article>
                  ))
                ) : (
                  <div className="ecosystem__empty">
                    <strong>Novas conexões em breve</strong>

                    <p>
                      Estamos preparando este espaço para apresentar empresas e
                      profissionais com parcerias confirmadas junto à EonLabs.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
