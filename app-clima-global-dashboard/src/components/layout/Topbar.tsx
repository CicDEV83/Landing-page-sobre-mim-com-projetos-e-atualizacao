import { useState, type FormEvent } from "react";

interface TopbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onSearch: (city: string) => void;
  onUseLocation: () => void;
}

export function Topbar({
  theme,
  onToggleTheme,
  onSearch,
  onUseLocation,
}: TopbarProps) {
  const [search, setSearch] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const city = search.trim();

    if (!city) return;

    onSearch(city);
  }

  return (
    <header className="topbar">
      {/* PESQUISA DE CIDADE */}

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

      {/* AÇÕES DO CABEÇALHO */}

      <div className="topbar__actions">
        <button
          type="button"
          className="topbar__location"
          onClick={onUseLocation}
        >
          <span aria-hidden="true">◎</span>
          <span>Usar minha localização</span>
        </button>

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

        <div className="topbar__profile" aria-label="Perfil do usuário">
          <span className="topbar__avatar" aria-hidden="true">
            CW
          </span>
        </div>
      </div>
    </header>
  );
}
