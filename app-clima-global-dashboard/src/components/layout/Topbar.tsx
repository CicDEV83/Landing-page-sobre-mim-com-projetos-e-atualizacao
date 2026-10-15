import { useState, type FormEvent } from "react";

interface TopbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onSearch: (city: string) => void;
  onUseLocation: () => void;
}

/**
 * URL da página principal do portfólio.
 *
 * Em produção, o Vite utiliza:
 * /Landing-page-sobre-mim-com-projetos-e-atualizacao/app-clima-global/
 *
 * O caminho "../" retorna à raiz do portfólio.
 *
 * Em desenvolvimento local, BASE_URL normalmente é "/",
 * então utilizamos diretamente o endereço público do portfólio.
 */
const PORTFOLIO_URL = import.meta.env.DEV
  ? "https://cicdev83.github.io/Landing-page-sobre-mim-com-projetos-e-atualizacao/"
  : new URL("../", new URL(import.meta.env.BASE_URL, window.location.origin))
      .href;

export function Topbar({
  theme,
  onToggleTheme,
  onSearch,
  onUseLocation,
}: TopbarProps) {
  // Estado controlado do campo de busca.
  const [search, setSearch] = useState("");

  /**
   * Processa a pesquisa da cidade.
   * Mantém o comportamento original do formulário.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const city = search.trim();

    if (!city) return;

    onSearch(city);
  }

  return (
    <header className="topbar">
      {/* ============================================
          PESQUISA METEOROLÓGICA
         ============================================ */}

      <form className="topbar__search" onSubmit={handleSubmit} role="search">
        <label htmlFor="weather-search" className="sr-only">
          Buscar cidade
        </label>

        <span className="topbar__search-icon" aria-hidden="true">
          ⌕
        </span>

        <input
          id="weather-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar cidade (ex: São Paulo, Rio de Janeiro, Londres...)"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          enterKeyHint="search"
        />

        <button type="submit" className="topbar__search-button">
          Buscar
        </button>
      </form>

      {/* ============================================
          AÇÕES DO CABEÇALHO
         ============================================ */}

      <div className="topbar__actions">
        {/* ==========================================
            BOTÃO CIRCULAR — VOLTAR AO PORTFÓLIO

            O efeito visual Cyberpunk Neon é aplicado
            pela classe .topbar__back no layout.css.
           ========================================== */}

        <a
          href={PORTFOLIO_URL}
          className="topbar__back"
          aria-label="Voltar ao portfólio principal"
          title="Voltar ao portfólio principal"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </a>

        {/* BOTÃO DE GEOLOCALIZAÇÃO */}

        <button
          type="button"
          className="topbar__location"
          onClick={onUseLocation}
        >
          <span aria-hidden="true">◎</span>
          <span>Usar minha localização</span>
        </button>

        {/* ALTERNÂNCIA ENTRE TEMA CLARO E ESCURO */}

        <button
          type="button"
          className="topbar__theme"
          onClick={onToggleTheme}
          aria-label={
            theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
          }
          aria-pressed={theme === "light"}
          title={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
        >
          <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>

          <span className="topbar__theme-knob" aria-hidden="true" />
        </button>

        {/* PERFIL DO USUÁRIO */}

        <div className="topbar__profile" aria-label="Perfil do usuário">
          <span className="topbar__avatar" aria-hidden="true">
            CW
          </span>
        </div>
      </div>
    </header>
  );
}
