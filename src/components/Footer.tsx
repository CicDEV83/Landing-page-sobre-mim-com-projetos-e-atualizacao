
import { socialLinks } from "../data/socialLinks";
import { SocialIcon } from "./SocialIcon";

/* ==========================================================
   EONLABS — FOOTER
   Sprint 05 | Navegação institucional completa
   ========================================================== */

const footerNavigation = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre / Habilidades", href: "#sobre" },
  { label: "Fundador", href: "#fundador" },
  { label: "Equipe", href: "#equipe" },
  { label: "Ecossistema", href: "#ecossistema" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];

const gmailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=csilvaw9.3@gmail.com";

/* ==========================================================
   ASTRONAUTA CÓSMICO — IDENTIDADE EONLABS
   Ilustração original preservada
   ========================================================== */

function CosmicAstronaut() {
  return (
    <svg
      className="footer__astronaut-art"
      viewBox="0 0 400 330"
      role="img"
      aria-label="Ilustração futurista de astronauta iluminado em azul e violeta"
    >
      <defs>
        <radialGradient id="astro-aura">
          <stop stopColor="#00e5ff" stopOpacity=".52" />
          <stop offset=".55" stopColor="#923dff" stopOpacity=".22" />
          <stop offset="1" stopColor="#923dff" stopOpacity="0" />
        </radialGradient>

        <linearGradient
          id="astro-suit"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop stopColor="#3f62ac" />
          <stop offset=".48" stopColor="#182449" />
          <stop offset="1" stopColor="#0b0c27" />
        </linearGradient>

        <linearGradient
          id="astro-visor"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop stopColor="#093e66" />
          <stop offset=".45" stopColor="#070b2c" />
          <stop offset="1" stopColor="#311452" />
        </linearGradient>

        <linearGradient
          id="astro-rim"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop stopColor="#00e5ff" />
          <stop offset=".55" stopColor="#b35dff" />
          <stop offset="1" stopColor="#ff5fe7" />
        </linearGradient>

        <filter id="astro-glow">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <ellipse
        cx="200"
        cy="172"
        rx="185"
        ry="160"
        fill="url(#astro-aura)"
      />

      <g opacity=".75" fill="#7df9ff">
        <circle cx="54" cy="80" r="2" />
        <circle cx="330" cy="54" r="2.5" />
        <circle cx="365" cy="185" r="2" />
        <circle cx="72" cy="245" r="1.5" />
        <circle cx="310" cy="283" r="2" />
      </g>

      <path
        d="M75 332c-7-67 17-118 64-139l37-14 73 9 47 29c33 20 48 63 49 115"
        fill="url(#astro-suit)"
        stroke="#5579cb"
        strokeWidth="7"
      />

      <path
        d="M96 327c-9-46 8-88 37-108l34 20-17 91M322 327c3-46-9-79-36-102l-31 21 16 84"
        fill="none"
        stroke="#31d8ff"
        strokeOpacity=".65"
        strokeWidth="8"
      />

      <path
        d="M140 240c-15 29-17 62-14 89M271 246c13 26 16 53 15 84"
        stroke="#ff64ee"
        strokeOpacity=".75"
        strokeWidth="4"
        fill="none"
      />

      <path
        d="M173 213c13 15 54 22 74 2l14 39c-29 24-70 23-100 0Z"
        fill="#1e2858"
        stroke="#658aff"
        strokeWidth="6"
      />

      <ellipse
        cx="205"
        cy="132"
        rx="99"
        ry="109"
        fill="#26356b"
        stroke="url(#astro-rim)"
        strokeWidth="12"
      />

      <ellipse
        cx="205"
        cy="135"
        rx="78"
        ry="85"
        fill="url(#astro-visor)"
        stroke="#87b6ff"
        strokeWidth="5"
      />

      <path
        d="M145 105c20-39 52-53 88-47"
        stroke="#7afaff"
        strokeOpacity=".78"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      <path
        d="M263 97c15 24 17 46 11 69"
        stroke="#fa68ff"
        strokeOpacity=".72"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      <circle
        cx="110"
        cy="144"
        r="24"
        fill="#19264d"
        stroke="#00e5ff"
        strokeWidth="7"
      />

      <circle
        cx="110"
        cy="144"
        r="11"
        fill="#205a82"
        stroke="#b4fbff"
        strokeWidth="3"
      />

      <circle
        cx="299"
        cy="144"
        r="24"
        fill="#1c224f"
        stroke="#f05cff"
        strokeWidth="7"
      />

      <circle
        cx="299"
        cy="144"
        r="11"
        fill="#502d80"
        stroke="#eab0ff"
        strokeWidth="3"
      />

      <path
        d="M175 270h61l13 59h-88Z"
        fill="#0a1838"
        stroke="#5883ca"
        strokeWidth="4"
      />

      <text
        x="205"
        y="308"
        textAnchor="middle"
        fill="#c1f9ff"
        fontSize="24"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
      >
        EL
      </text>

      <ellipse
        cx="205"
        cy="132"
        rx="100"
        ry="110"
        stroke="#5fdbff"
        strokeOpacity=".42"
        strokeWidth="14"
        fill="none"
        filter="url(#astro-glow)"
      />
    </svg>
  );
}

/* ==========================================================
   FOOTER PRINCIPAL
   ========================================================== */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer--cosmic">
      {/* ==============================================
          APRESENTAÇÃO CÓSMICA
          ============================================== */}

      <div className="footer__showcase">
        <div className="container footer__showcase-inner">
          <div className="footer__showcase-copy">
            <p className="footer__showcase-eyebrow">
              O FUTURO É CONSTRUÍDO COM CÓDIGO
            </p>

            <h2>
              <span>IDEIAS</span>
              <span>CÓDIGO</span>
              <span>SOLUÇÕES</span>
              <span>RESULTADOS</span>
            </h2>

            <span
              className="footer__showcase-streak"
              aria-hidden="true"
            />
          </div>

          <div className="footer__astronaut">
            <CosmicAstronaut />
          </div>
        </div>
      </div>

      {/* ==============================================
          IDENTIDADE, NAVEGAÇÃO E REDES SOCIAIS
          ============================================== */}

      <div className="container footer__container">
        <div className="footer__panel">
          {/* IDENTIDADE EONLABS */}

          <div className="footer__identity">
            <a
              className="footer__brand"
              href="#inicio"
              aria-label="EonLabs, voltar ao início"
            >
              <span
                className="footer__brand-symbol"
                aria-hidden="true"
              >
                EL
              </span>

              <span className="footer__brand-text">
                <strong>EONLABS</strong>
                <span>BY CICGHOST</span>
              </span>
            </a>
          </div>

          {/* NAVEGAÇÃO COMPLETA */}

          <nav
            className="footer__navigation"
            aria-label="Navegação do rodapé"
          >
            {footerNavigation.map(({ label, href }) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>

          {/* REDES SOCIAIS — PRESERVADAS */}

          <div
            className="footer__socials"
            aria-label="Redes sociais"
          >
            {socialLinks.map(({ label, href, icon }) => {
              const destination =
                icon === "email"
                  ? gmailComposeUrl
                  : href;

              return (
                <a
                  key={label}
                  className={`footer__social footer__social--${icon}`}
                  href={destination}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${label}`}
                  title={label}
                >
                  <SocialIcon name={icon} />
                </a>
              );
            })}
          </div>

          {/* VOLTAR AO TOPO */}

          <a
            className="footer__back-to-top"
            href="#inicio"
            aria-label="Voltar ao topo"
            title="Voltar ao topo"
          >
            ↑
          </a>
        </div>

        {/* ==============================================
            COPYRIGHT E TECNOLOGIAS
            ============================================== */}

        <div className="footer__meta">
          <p>
            © {currentYear} EonLabs.
            Todos os direitos reservados.
          </p>

          <p className="footer__technology">
            Desenvolvido com{" "}
            <span>React + TypeScript</span>{" "}
            <span aria-hidden="true">✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
