import { useEffect, useRef, useState } from "react";

import "../../styles/mobile-navigation.css";

// ======================================================
// TIPOS
// ======================================================

export type NavigationId =
  | "inicio"
  | "buscar"
  | "localizacao"
  | "salvas"
  | "mapas"
  | "alertas"
  | "configuracoes";

type NavigationItem = {
  id: NavigationId;
  label: string;
  icon: string;
};

interface SidebarProps {
  favoritesCount: number;
  onNavigate: (item: NavigationId) => void;
}

// ======================================================
// CONFIGURAÇÃO DA NAVEGAÇÃO
// ======================================================

const navigationItems: NavigationItem[] = [
  { id: "inicio", label: "Início", icon: "⌂" },
  { id: "buscar", label: "Buscar cidade", icon: "⌕" },
  { id: "localizacao", label: "Minha localização", icon: "◎" },
  { id: "salvas", label: "Cidades salvas", icon: "♡" },
  { id: "mapas", label: "Mapas climáticos", icon: "▧" },
  { id: "alertas", label: "Alertas", icon: "♧" },
  { id: "configuracoes", label: "Configurações", icon: "⚙" },
];

const mobileItems: NavigationId[] = ["inicio", "buscar", "salvas", "mapas"];

const extraItems: NavigationId[] = ["localizacao", "alertas", "configuracoes"];

// ======================================================
// COMPONENTE SIDEBAR
// ======================================================

export function Sidebar({ favoritesCount, onNavigate }: SidebarProps) {
  // ====================================================
  // ESTADOS E REFERÊNCIAS
  // ====================================================

  const [activeItem, setActiveItem] = useState<NavigationId>("inicio");

  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const topMenuButtonRef = useRef<HTMLButtonElement>(null);

  const bottomMenuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenuButtonRef = useRef<HTMLButtonElement>(null);

  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);

  const isExtraActive = extraItems.includes(activeItem);

  // ====================================================
  // CONTROLE DE ABERTURA E FECHAMENTO
  // ====================================================

  function openMobileMenu(trigger: HTMLButtonElement) {
    menuTriggerRef.current = trigger;
    setMobileMoreOpen(true);
  }

  function closeMobileMenu(restoreFocus = true) {
    setMobileMoreOpen(false);

    if (restoreFocus) {
      // Após o React remover o menu, devolve o foco
      // ao botão que realizou sua abertura.
      requestAnimationFrame(() => {
        menuTriggerRef.current?.focus();
      });
    }
  }

  function toggleMobileMenu(trigger: HTMLButtonElement) {
    if (mobileMoreOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu(trigger);
    }
  }

  // ====================================================
  // FOCO E ACESSIBILIDADE DO MENU
  // ====================================================

  useEffect(() => {
    if (!mobileMoreOpen) return;

    // Direciona o foco para o botão de fechar
    // quando o menu expandido é apresentado.
    closeMenuButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMoreOpen]);

  // ====================================================
  // NAVEGAÇÃO
  // ====================================================

  function handleNavigation(item: NavigationId) {
    setActiveItem(item);

    // Fecha o menu sem devolver foco ao botão de
    // abertura, permitindo que o App execute a ação.
    setMobileMoreOpen(false);

    onNavigate(item);
  }

  function getItem(id: NavigationId): NavigationItem {
    const item = navigationItems.find(
      (navigationItem) => navigationItem.id === id,
    );

    if (!item) {
      throw new Error(`Item de navegação inválido: ${id}`);
    }

    return item;
  }

  function getBadge(id: NavigationId): number | undefined {
    return id === "salvas" ? favoritesCount : undefined;
  }

  // Apenas destinos que representam seções do
  // dashboard recebem aria-current.
  function getAriaCurrent(id: NavigationId): "location" | undefined {
    const sectionIds: NavigationId[] = ["inicio", "salvas", "mapas"];

    return activeItem === id && sectionIds.includes(id)
      ? "location"
      : undefined;
  }

  return (
    <>
      {/* ==========================================
          SIDEBAR DESKTOP + MARCA MOBILE
         ========================================== */}

      <aside className="sidebar" aria-label="Menu do App Clima Global">
        <div className="sidebar__brand">
          <span className="sidebar__brand-icon" aria-hidden="true">
            ☁
          </span>

          <div className="sidebar__brand-copy">
            <strong>
              App Clima <span>Global</span>
            </strong>

            <small>Tempo real. Em qualquer lugar.</small>
          </div>

          {/* BOTÃO SUPERIOR EXCLUSIVO DO MOBILE */}

          <button
            ref={topMenuButtonRef}
            type="button"
            className="sidebar__mobile-menu-button"
            onClick={() => {
              const trigger = topMenuButtonRef.current;

              if (trigger) {
                toggleMobileMenu(trigger);
              }
            }}
            aria-label={mobileMoreOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMoreOpen}
            aria-controls="mobile-extra-menu"
          >
            <span aria-hidden="true">{mobileMoreOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {/* NAVEGAÇÃO DESKTOP */}

        <nav className="sidebar__navigation" aria-label="Navegação principal">
          {navigationItems.map((item) => {
            const badge = getBadge(item.id);
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar__link ${
                  isActive ? "sidebar__link--active" : ""
                }`}
                aria-current={getAriaCurrent(item.id)}
                onClick={() => handleNavigation(item.id)}
              >
                <span className="sidebar__link-icon" aria-hidden="true">
                  {item.icon}
                </span>

                <span className="sidebar__link-label">{item.label}</span>

                {badge !== undefined && (
                  <span className="sidebar__badge">{badge}</span>
                )}

                {isActive && (
                  <span className="sidebar__link-arrow" aria-hidden="true">
                    ›
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* CARTÃO PREMIUM */}

        <div className="sidebar__premium">
          <div className="sidebar__premium-heading">
            <span aria-hidden="true">♛</span>

            <strong>
              App Clima Global <span>Premium</span>
            </strong>
          </div>

          <p>Mais recursos, sem limites.</p>

          <button
            type="button"
            disabled
            title="Funcionalidade em desenvolvimento"
          >
            Saiba mais →
          </button>
        </div>
      </aside>

      {/* ==========================================
          MENU EXPANDIDO MOBILE
         ========================================== */}

      {mobileMoreOpen && (
        <>
          {/* FUNDO ESCURECIDO */}

          <button
            type="button"
            className="mobile-menu-backdrop"
            aria-label="Fechar menu"
            tabIndex={-1}
            onClick={() => closeMobileMenu()}
          />

          {/* CONTEÚDO DO MENU */}

          <div
            id="mobile-extra-menu"
            className="mobile-menu-panel"
            role="group"
            aria-label="Mais opções"
          >
            <div className="mobile-menu-panel__heading">
              <strong>Mais opções</strong>

              <button
                ref={closeMenuButtonRef}
                type="button"
                className="mobile-menu-panel__close"
                aria-label="Fechar menu"
                onClick={() => closeMobileMenu()}
              >
                ×
              </button>
            </div>

            {extraItems.map((id) => {
              const item = getItem(id);
              const isActive = activeItem === id;

              return (
                <button
                  key={id}
                  type="button"
                  className={`mobile-menu-panel__item ${
                    isActive ? "mobile-menu-panel__item--active" : ""
                  }`}
                  onClick={() => handleNavigation(id)}
                >
                  <span aria-hidden="true">{item.icon}</span>

                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* ==========================================
          BARRA INFERIOR FIXA MOBILE
         ========================================== */}

      <nav className="mobile-bottom-nav" aria-label="Navegação mobile">
        {mobileItems.map((id) => {
          const item = getItem(id);
          const isActive = activeItem === id;
          const badge = getBadge(id);

          const shortLabel =
            id === "buscar"
              ? "Buscar"
              : id === "salvas"
                ? "Salvos"
                : id === "mapas"
                  ? "Mapas"
                  : item.label;

          return (
            <button
              key={id}
              type="button"
              className={`mobile-bottom-nav__item ${
                isActive ? "mobile-bottom-nav__item--active" : ""
              }`}
              aria-current={getAriaCurrent(id)}
              onClick={() => handleNavigation(id)}
            >
              <span className="mobile-bottom-nav__icon" aria-hidden="true">
                {item.icon}
              </span>

              <span className="mobile-bottom-nav__label">{shortLabel}</span>

              {badge !== undefined && badge > 0 && (
                <span className="mobile-bottom-nav__badge">
                  {badge > 99 ? "99+" : badge}
                </span>
              )}
            </button>
          );
        })}

        {/* BOTÃO MAIS */}

        <button
          ref={bottomMenuButtonRef}
          type="button"
          className={`mobile-bottom-nav__item ${
            mobileMoreOpen || isExtraActive
              ? "mobile-bottom-nav__item--active"
              : ""
          }`}
          onClick={() => {
            const trigger = bottomMenuButtonRef.current;

            if (trigger) {
              toggleMobileMenu(trigger);
            }
          }}
          aria-expanded={mobileMoreOpen}
          aria-controls="mobile-extra-menu"
          aria-label="Mais opções"
        >
          <span className="mobile-bottom-nav__icon" aria-hidden="true">
            ☷
          </span>

          <span className="mobile-bottom-nav__label">Mais</span>
        </button>
      </nav>
    </>
  );
}
