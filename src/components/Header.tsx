import { useTheme } from "../hooks/useTheme";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  const isDarkTheme = theme === "dark";

  return (
    <header className="header">
      <div className="container header__container">
        <a
          className="header__brand"
          href="#inicio"
          aria-label="Ir para o início"
        >
          <span className="header__brand-name">Cicero W. Silva</span>

          <span className="header__brand-role">Full Stack Developer</span>
        </a>

        <nav className="header__navigation" aria-label="Navegação principal">
          <a href="#inicio">Início</a>
          <a href="#projetos">Projetos</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>

        <button
          className="header__theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={isDarkTheme ? "Ativar tema claro" : "Ativar tema escuro"}
          title={isDarkTheme ? "Ativar tema claro" : "Ativar tema escuro"}
        >
          <span aria-hidden="true">{isDarkTheme ? "☀" : "☾"}</span>
        </button>
      </div>
    </header>
  );
}
