import profileImage from "../assets/images/profile.png";

export function HeroSection() {
  return (
    <section
      className="hero"
      id="inicio"
      aria-labelledby="hero-title"
    >
      <div className="container hero__container">
        <div className="hero__content">
          <p className="hero__eyebrow animate-fade-up">
            <span
              className="hero__status-dot"
              aria-hidden="true"
            />

            Disponível para novas oportunidades
          </p>

          <h1
            className="hero__title animate-fade-up animation-delay-1"
            id="hero-title"
          >
            Transformando ideias em{" "}
            <span className="hero__title-highlight">
              experiências digitais.
            </span>
          </h1>

          <p className="hero__description animate-fade-up animation-delay-2">
            Full Stack Developer focado na construção de aplicações modernas,
            responsivas e escaláveis, unindo engenharia, experiência do usuário
            e código bem estruturado.
          </p>

          <div className="hero__actions animate-fade-up animation-delay-3">
            <a
              className="button button--primary"
              href="#projetos"
            >
              Explorar projetos
              <span aria-hidden="true">→</span>
            </a>

            <a
              className="button button--secondary"
              href="https://www.linkedin.com/in/cicero-silva-056253362/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div
            className="hero__orb hero__orb--primary"
            aria-hidden="true"
          />

          <div
            className="hero__orb hero__orb--secondary"
            aria-hidden="true"
          />

          <figure className="hero__profile animate-scale-in animation-delay-1">
            <div className="hero__profile-frame">
              <img
                className="hero__profile-image"
                src={profileImage}
                alt="Cicero W. Silva, Full Stack Developer"
              />
            </div>
          </figure>

          <div className="hero__code-card animate-scale-in animation-delay-2">
            <span className="hero__code-label">
              developer.profile
            </span>

            <div className="hero__code">
              <span>
                <strong>role</strong>
                {" : "}
                "Full Stack Developer"
              </span>

              <span>
                <strong>focus</strong>
                {" : "}
                "Modern Web Apps"
              </span>

              <span>
                <strong>stack</strong>
                {" : "}
                ["React", "TypeScript"]
              </span>

              <span>
                <strong>status</strong>
                {" : "}
                "Building"
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}