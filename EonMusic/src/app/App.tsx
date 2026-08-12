import "../styles/theme.css";

export function App() {
  return (
    <div className="app-shell">
      {/* =========================
          NAVEGAÇÃO LATERAL
      ========================== */}
      <aside className="sidebar" aria-label="Navegação principal">
        <header className="sidebar__brand">
          <a className="brand" href="#inicio" aria-label="EON MUSIC - Início">
            <span className="brand__symbol" aria-hidden="true">
              E
            </span>

            <span className="brand__name">
              EON <strong>MUSIC</strong>
            </span>
          </a>
        </header>

        <nav className="sidebar__navigation" aria-label="Menu principal">
          <section
            className="navigation-group"
            aria-labelledby="explore-navigation-title"
          >
            <h2
              className="navigation-group__title"
              id="explore-navigation-title"
            >
              Explorar
            </h2>

            <ul className="navigation-list">
              <li>
                <a
                  className="navigation-link navigation-link--active"
                  href="#inicio"
                  aria-current="page"
                >
                  <span aria-hidden="true">⌂</span>
                  <span>Início</span>
                </a>
              </li>

              <li>
                <a className="navigation-link" href="#buscar">
                  <span aria-hidden="true">⌕</span>
                  <span>Buscar</span>
                </a>
              </li>

              <li>
                <a className="navigation-link" href="#radio">
                  <span aria-hidden="true">◉</span>
                  <span>Rádio</span>
                </a>
              </li>
            </ul>
          </section>

          <section
            className="navigation-group"
            aria-labelledby="library-navigation-title"
          >
            <h2
              className="navigation-group__title"
              id="library-navigation-title"
            >
              Sua música
            </h2>

            <ul className="navigation-list">
              <li>
                <a className="navigation-link" href="#biblioteca">
                  <span aria-hidden="true">♫</span>
                  <span>Biblioteca</span>
                </a>
              </li>

              <li>
                <a className="navigation-link" href="#curtidas">
                  <span aria-hidden="true">♡</span>
                  <span>Curtidas</span>
                </a>
              </li>

              <li>
                <a className="navigation-link" href="#playlists">
                  <span aria-hidden="true">≡</span>
                  <span>Playlists</span>
                </a>
              </li>

              <li>
                <a className="navigation-link" href="#dispositivo">
                  <span aria-hidden="true">▣</span>
                  <span>No dispositivo</span>
                </a>
              </li>
            </ul>
          </section>
        </nav>

        <footer className="sidebar__footer">
          <button className="publish-button" type="button">
            <span aria-hidden="true">＋</span>
            <span>Publicar música</span>
          </button>

          <div className="current-plan">
            <span className="current-plan__indicator" aria-hidden="true" />
            <span>EON FREE</span>
          </div>
        </footer>
      </aside>

      {/* =========================
          CONTEÚDO PRINCIPAL
      ========================== */}
      <main className="main-content" id="inicio">
        {/* =========================
            TOP BAR
        ========================== */}
        <header className="topbar">
          <form className="search" id="buscar" role="search">
            <label className="sr-only" htmlFor="global-search">
              Buscar músicas, artistas, álbuns e rádios
            </label>

            <span className="search__icon" aria-hidden="true">
              ⌕
            </span>

            <input
              id="global-search"
              name="search"
              type="search"
              placeholder="O que você quer ouvir?"
              autoComplete="off"
            />
          </form>

          <div className="topbar__actions">
            <button className="premium-button" type="button">
              Ver Premium
            </button>

            <button
              className="profile-button"
              type="button"
              aria-label="Abrir perfil"
            >
              <span aria-hidden="true">C</span>
            </button>
          </div>
        </header>

        {/* =========================
            HERO
        ========================== */}
        <section className="hero" aria-labelledby="home-title">
          <div className="hero__content">
            <p className="hero__eyebrow">EON MUSIC</p>

            <h1 id="home-title">
              Sua música.
              <br />
              <span>Do seu jeito.</span>
            </h1>

            <p className="hero__description">
              Músicas, rádios, descobertas e sua biblioteca em uma experiência
              única.
            </p>

            <div className="hero__actions">
              <button className="button button--primary" type="button">
                <span aria-hidden="true">▶</span>
                <span>Ouvir agora</span>
              </button>

              <a className="button button--secondary" href="#descobrir">
                Explorar
              </a>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="hero-orb hero-orb--primary" />
            <div className="hero-orb hero-orb--secondary" />

            <div className="hero-disc">
              <span>EON</span>
            </div>
          </div>
        </section>

        {/* =========================
            ACESSO RÁPIDO
        ========================== */}
        <section className="quick-access" aria-labelledby="quick-access-title">
          <header className="section-heading">
            <div>
              <p className="section-heading__eyebrow">Continue de onde parou</p>

              <h2 id="quick-access-title">Acesso rápido</h2>
            </div>
          </header>

          <div className="quick-access__grid">
            <button className="quick-card" type="button">
              <span
                className="quick-card__art quick-card__art--purple"
                aria-hidden="true"
              >
                ♫
              </span>

              <span className="quick-card__content">
                <strong>Suas curtidas</strong>
                <small>Favoritos em um só lugar</small>
              </span>

              <span className="quick-card__play" aria-hidden="true">
                ▶
              </span>
            </button>

            <button className="quick-card" type="button">
              <span
                className="quick-card__art quick-card__art--blue"
                aria-hidden="true"
              >
                ◉
              </span>

              <span className="quick-card__content">
                <strong>Rádio EON</strong>
                <small>Descubra novos sons</small>
              </span>

              <span className="quick-card__play" aria-hidden="true">
                ▶
              </span>
            </button>
          </div>
        </section>

        {/* =========================
            MÚSICAS DO DISPOSITIVO
        ========================== */}
        <section
          className="local-library"
          id="dispositivo"
          aria-labelledby="local-library-title"
        >
          <header className="section-heading">
            <div>
              <p className="section-heading__eyebrow">Sua biblioteca</p>

              <h2 id="local-library-title">Músicas deste dispositivo</h2>
            </div>
          </header>

          <article className="device-card">
            <div className="device-card__content">
              <span className="device-card__icon" aria-hidden="true">
                ♪
              </span>

              <div>
                <h3>Suas músicas. Um toque.</h3>

                <p>
                  Escolha músicas armazenadas no seu dispositivo e reproduza
                  tudo diretamente no EON MUSIC.
                </p>

                <small>Seus arquivos permanecem no seu dispositivo.</small>
              </div>
            </div>

            <button className="button button--primary" type="button">
              <span aria-hidden="true">＋</span>
              <span>Escolher músicas</span>
            </button>
          </article>
        </section>

        {/* =========================
            RECOMENDAÇÕES
        ========================== */}
        <section
          className="recommendations"
          id="descobrir"
          aria-labelledby="for-you-title"
        >
          <header className="section-heading">
            <div>
              <p className="section-heading__eyebrow">Descobrir</p>

              <h2 id="for-you-title">Feito para você</h2>
            </div>

            <button className="text-button" type="button">
              Ver tudo
            </button>
          </header>

          <div className="music-grid">
            <article className="music-card">
              <div className="music-card__art music-card__art--purple">
                <span aria-hidden="true">01</span>

                <button
                  className="music-card__play"
                  type="button"
                  aria-label="Reproduzir EON Mix"
                >
                  ▶
                </button>
              </div>

              <div className="music-card__information">
                <h3>EON Mix</h3>
                <p>Uma seleção criada para o seu momento.</p>
              </div>
            </article>

            <article className="music-card">
              <div className="music-card__art music-card__art--blue">
                <span aria-hidden="true">02</span>

                <button
                  className="music-card__play"
                  type="button"
                  aria-label="Reproduzir Night Drive"
                >
                  ▶
                </button>
              </div>

              <div className="music-card__information">
                <h3>Night Drive</h3>
                <p>Sons para transformar a sua noite.</p>
              </div>
            </article>

            <article className="music-card">
              <div className="music-card__art music-card__art--green">
                <span aria-hidden="true">03</span>

                <button
                  className="music-card__play"
                  type="button"
                  aria-label="Reproduzir Energy"
                >
                  ▶
                </button>
              </div>

              <div className="music-card__information">
                <h3>Energy</h3>
                <p>Para manter você em movimento.</p>
              </div>
            </article>

            <article className="music-card">
              <div className="music-card__art music-card__art--dark">
                <span aria-hidden="true">04</span>

                <button
                  className="music-card__play"
                  type="button"
                  aria-label="Reproduzir Focus"
                >
                  ▶
                </button>
              </div>

              <div className="music-card__information">
                <h3>Focus</h3>
                <p>Concentração para fazer acontecer.</p>
              </div>
            </article>
          </div>
        </section>

        {/* =========================
            RÁDIOS
        ========================== */}
        <section
          className="radio-section"
          id="radio"
          aria-labelledby="radio-title"
        >
          <header className="section-heading">
            <div>
              <p className="section-heading__eyebrow">Ao vivo</p>

              <h2 id="radio-title">Rádios</h2>
            </div>

            <button className="text-button" type="button">
              Ver todas
            </button>
          </header>

          <div className="radio-grid">
            <article className="radio-card">
              <span className="radio-card__live">AO VIVO</span>

              <div
                className="radio-card__visual radio-card__visual--purple"
                aria-hidden="true"
              >
                ◉
              </div>

              <div>
                <h3>EON Hits</h3>
                <p>Pop • Hits • Global</p>
              </div>

              <button type="button" aria-label="Ouvir EON Hits">
                ▶
              </button>
            </article>

            <article className="radio-card">
              <span className="radio-card__live">AO VIVO</span>

              <div
                className="radio-card__visual radio-card__visual--blue"
                aria-hidden="true"
              >
                ◉
              </div>

              <div>
                <h3>EON Electronic</h3>
                <p>Electronic • Dance</p>
              </div>

              <button type="button" aria-label="Ouvir EON Electronic">
                ▶
              </button>
            </article>

            <article className="radio-card">
              <span className="radio-card__live">AO VIVO</span>

              <div
                className="radio-card__visual radio-card__visual--green"
                aria-hidden="true"
              >
                ◉
              </div>

              <div>
                <h3>EON Brasil</h3>
                <p>Brasil • Nacional</p>
              </div>

              <button type="button" aria-label="Ouvir EON Brasil">
                ▶
              </button>
            </article>
          </div>
        </section>
      </main>

      {/* =========================
          PLAYER GLOBAL
      ========================== */}
      <footer className="player" aria-label="Controles do player">
        <section className="player__track" aria-label="Música atual">
          <div className="player__cover" aria-hidden="true">
            ♪
          </div>

          <div className="player__metadata">
            <strong>Nenhuma música tocando</strong>
            <span>Escolha algo para começar</span>
          </div>

          <button
            className="player__favorite"
            type="button"
            aria-label="Adicionar música atual aos favoritos"
            disabled
          >
            ♡
          </button>
        </section>

        <section className="player__center" aria-label="Reprodução">
          <div className="player__controls">
            <button
              type="button"
              aria-label="Ativar reprodução aleatória"
              disabled
            >
              ⤨
            </button>

            <button type="button" aria-label="Música anterior" disabled>
              ◀
            </button>

            <button
              className="player__play"
              type="button"
              aria-label="Reproduzir"
              disabled
            >
              ▶
            </button>

            <button type="button" aria-label="Próxima música" disabled>
              ▶
            </button>

            <button type="button" aria-label="Ativar repetição" disabled>
              ↻
            </button>
          </div>

          <div className="player__progress">
            <span>0:00</span>

            <input
              type="range"
              min="0"
              max="100"
              defaultValue="0"
              aria-label="Progresso da música"
              disabled
            />

            <span>0:00</span>
          </div>
        </section>

        <section className="player__volume" aria-label="Volume">
          <button type="button" aria-label="Silenciar" disabled>
            ♪
          </button>

          <input
            type="range"
            min="0"
            max="100"
            defaultValue="70"
            aria-label="Volume"
            disabled
          />
        </section>
      </footer>

      {/* =========================
          NAVEGAÇÃO MOBILE
      ========================== */}
      <nav className="mobile-navigation" aria-label="Navegação mobile">
        <a href="#inicio" aria-current="page">
          <span aria-hidden="true">⌂</span>
          <span>Início</span>
        </a>

        <a href="#buscar">
          <span aria-hidden="true">⌕</span>
          <span>Buscar</span>
        </a>

        <a href="#biblioteca">
          <span aria-hidden="true">♫</span>
          <span>Biblioteca</span>
        </a>
      </nav>
    </div>
  );
}
