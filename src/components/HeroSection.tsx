import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import "../styles/hero-corporate.css";

type TechnologyId = "html" | "css" | "javascript" | "react" | "typescript";

const technologies: { id: TechnologyId; label: string }[] = [
  { id: "html", label: "HTML5" },
  { id: "css", label: "CSS3" },
  { id: "javascript", label: "JavaScript" },
  { id: "react", label: "React" },
  { id: "typescript", label: "TypeScript" },
];

function TechnologyIcon({ type }: { type: TechnologyId }) {
  switch (type) {
    case "html":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M3 2h18l-1.7 18L12 22l-7.3-2L3 2Z" fill="#E44D26" />
          <path d="M12 20.1V3.8h7.1l-1.4 14.8L12 20.1Z" fill="#F16529" />
          <path
            d="M7 7h10l-.2 2.2H9.4l.2 2h7l-.6 6-4 1.1-4-1.1-.3-3.1h2.2l.1 1.4 2 .5 2-.5.2-2.1H7.6L7 7Z"
            fill="#FFF"
          />
        </svg>
      );
    case "css":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M3 2h18l-1.7 18L12 22l-7.3-2L3 2Z" fill="#1572B6" />
          <path d="M12 20.1V3.8h7.1l-1.4 14.8L12 20.1Z" fill="#33A9DC" />
          <path
            d="M7 7h10l-.3 2.2H9.4l.2 2h7l-.6 6-4 1.1-4-1.1-.3-3.1h2.2l.1 1.4 2 .5 2-.5.2-2.1H7.6L7 7Z"
            fill="#FFF"
          />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="1.5" y="1.5" width="21" height="21" rx="2" fill="#F7DF1E" />
          <text
            x="12"
            y="17.6"
            fontSize="10.7"
            fontFamily="Arial,sans-serif"
            fontWeight="900"
            textAnchor="middle"
            fill="#1D1D1D"
          >
            JS
          </text>
        </svg>
      );
    case "react":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="1.25"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="1.75" fill="#61DAFB" stroke="none" />
          <ellipse cx="12" cy="12" rx="10" ry="4.25" />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.25"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.25"
            transform="rotate(120 12 12)"
          />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="1.5" y="1.5" width="21" height="21" rx="2" fill="#3178C6" />
          <text
            x="12"
            y="17.6"
            fontSize="10.7"
            fontFamily="Arial,sans-serif"
            fontWeight="900"
            textAnchor="middle"
            fill="#FFF"
          >
            TS
          </text>
        </svg>
      );
  }
}

type HighlightIcon = "code" | "performance" | "design" | "ai";

type Highlight = {
  id: HighlightIcon;
  title: string;
  description: string;
};

const highlights: Highlight[] = [
  {
    id: "code",
    title: "Engenharia sólida",
    description: "Arquiteturas escaláveis",
  },
  {
    id: "performance",
    title: "Alta performance",
    description: "Experiências eficientes",
  },
  {
    id: "design",
    title: "Design estratégico",
    description: "Experiências centradas em pessoas",
  },
  {
    id: "ai",
    title: "Soluções inteligentes",
    description: "Automação e inovação",
  },
];

function HighlightIconGraphic({ type }: { type: HighlightIcon }) {
  const paths: Record<HighlightIcon, ReactNode> = {
    code: (
      <>
        <path d="m8 8-4 4 4 4" />
        <path d="m16 8 4 4-4 4" />
        <path d="m14 4-4 16" />
      </>
    ),
    performance: (
      <>
        <circle cx="12" cy="12" r="2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.5"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.5"
          transform="rotate(120 12 12)"
        />
      </>
    ),
    design: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 8v8M8 12h8" />
      </>
    ),
    ai: (
      <>
        <path d="M9 5a3 3 0 0 0-5 2.3A3.5 3.5 0 0 0 4 14a3 3 0 0 0 5 5" />
        <path d="M15 5a3 3 0 0 1 5 2.3 3.5 3.5 0 0 1 0 6.7 3 3 0 0 1-5 5" />
        <path d="M9 5v14M15 5v14M9 9h6M9 15h6" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[type]}
    </svg>
  );
}

const hologramCode = [
  "const eonlabs = {",
  '  engineering: "software",',
  '  focus: "business innovation"',
  "}",
].join("\n");

function TypingHologram() {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const [characterCount, setCharacterCount] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? hologramCode.length
      : 0,
  );

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    function handleMotionChange() {
      setReducedMotion(motionPreference.matches);

      if (motionPreference.matches) {
        setCharacterCount(hologramCode.length);
      } else {
        setCharacterCount(0);
      }
    }

    handleMotionChange();

    motionPreference.addEventListener("change", handleMotionChange);

    return () => {
      motionPreference.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const completed = characterCount >= hologramCode.length;

    const timeoutId = window.setTimeout(
      () => {
        setCharacterCount((current) =>
          current >= hologramCode.length ? 0 : current + 1,
        );
      },
      completed ? 3200 : hologramCode[characterCount - 1] === "\n" ? 330 : 75,
    );

    return () => window.clearTimeout(timeoutId);
  }, [characterCount, reducedMotion]);

  const visibleCode = hologramCode.slice(0, characterCount);
  const keywordLength = Math.min(5, visibleCode.length);

  return (
    <div className="hero__hologram hero__hologram--code" aria-hidden="true">
      <span className="hero__hologram-label">eonlabs.ts</span>

      <div className="hero__typed-code">
        <span className="hero__typed-keyword">
          {visibleCode.slice(0, keywordLength)}
        </span>

        {visibleCode.slice(keywordLength)}

        {!reducedMotion && <span className="hero__typing-caret" />}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      className="hero hero--cyberpunk hero--corporate"
      id="inicio"
      aria-labelledby="hero-title"
    >
      <div className="hero__atmosphere" aria-hidden="true">
        <div className="hero__stars" />
        <div className="hero__planet-glow" />
        <div className="hero__planet" />
        <div className="hero__horizon" />
      </div>

      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__introduction">
            <p className="hero__welcome">
              <span className="hero__welcome-line" aria-hidden="true" />
              ENGENHARIA • INOVAÇÃO • TECNOLOGIA
            </p>
            <p className="hero__eyebrow">
              <span className="hero__status-dot" aria-hidden="true" />
              TECNOLOGIA PARA NEGÓCIOS REAIS
            </p>
          </div>

          <h1 className="hero__title" id="hero-title">
            <span className="hero__title-line hero__title-line--first">
              Engenharia que
            </span>
            <span className="hero__title-line hero__title-line--second">
              transforma ideias
            </span>
            <span className="hero__title-line hero__title-line--highlight">
              em soluções.
            </span>
          </h1>

          <p className="hero__profession">EONLABS · DIGITAL ENGINEERING</p>
          <p className="hero__description">
            Desenvolvemos experiências digitais, plataformas inteligentes e
            soluções tecnológicas sob medida para impulsionar negócios e
            transformar desafios em inovação.
          </p>

          <ul
            className="hero__technologies"
            aria-label="Tecnologias utilizadas"
          >
            {technologies.map((technology) => (
              <li
                className={`hero__technology hero__technology--${technology.id}`}
                key={technology.id}
              >
                <span className="hero__technology-icon" aria-hidden="true">
                  <TechnologyIcon type={technology.id} />
                </span>
                <span>{technology.label}</span>
              </li>
            ))}
          </ul>

          <div className="hero__actions">
            <a
              className="button button--primary animate-neon-pulse"
              href="#solutions"
            >
              Conhecer soluções <span aria-hidden="true">↗</span>
            </a>
            <a className="button button--secondary" href="#projetos">
              Explorar projetos <span aria-hidden="true">→</span>
            </a>
          </div>

          <a
            className="hero__scroll-indicator"
            href="#solutions"
            aria-label="Rolar para a seção Soluções"
          >
            <span aria-hidden="true">↓</span>
            Descubra o que podemos construir
          </a>
        </div>

        <div
          className="hero__visual"
          aria-label="Tecnologia e soluções EonLabs"
        >
          <div className="hero__visual-aura" aria-hidden="true" />
          <div
            className="hero__hologram hero__hologram--top"
            aria-hidden="true"
          >
            <span className="hero__hologram-indicator" />
            SYSTEM ONLINE
          </div>

          <TypingHologram />

          <div
            className="hero__highlights"
            aria-label="Diferenciais da EonLabs"
          >
            {highlights.map((highlight) => (
              <div
                className={`hero__highlight hero__highlight--${highlight.id}`}
                key={highlight.id}
              >
                <span className="hero__highlight-icon" aria-hidden="true">
                  <HighlightIconGraphic type={highlight.id} />
                </span>
                <div>
                  <strong>{highlight.title}</strong>
                  <span>{highlight.description}</span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="hero__hologram hero__hologram--bottom"
            aria-hidden="true"
          >
            <span className="hero__hologram-indicator" />
            BUILDING DIGITAL FUTURES
          </div>
        </div>
      </div>
    </section>
  );
}
