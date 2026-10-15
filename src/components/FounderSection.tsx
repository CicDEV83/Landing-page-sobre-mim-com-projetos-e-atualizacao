import { useState } from "react";
import profileImage from "../assets/images/profile.png";
import "../styles/founder.css";

const specialties = [
  "Engenharia de Software",
  "Desenvolvimento Full Stack",
  "Automação",
  "Inteligência Artificial",
  "Cibersegurança",
] as const;

const technologies = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Git",
  "SQL",
] as const;

export function FounderSection() {
  const [showTrajectory, setShowTrajectory] = useState(false);

  return (
    <section
      id="fundador"
      className="founder-section"
      aria-labelledby="founder-title"
    >
      <div className="container founder-section__container">
        <div className="founder-section__heading">
          <span className="founder-section__eyebrow">
            ✧ LIDERANÇA & INOVAÇÃO
          </span>

          <h2 id="founder-title">
            A mente por trás da <span>EonLabs</span>
          </h2>

          <p>
            Tecnologia, visão e inovação na construção de soluções para o
            futuro.
          </p>
        </div>

        <div className="founder-section__card">
          {/* FOTOGRAFIA ORIGINAL */}
          <div className="founder-section__photo">
            <img
              src={profileImage}
              alt="CicGhost, fundador da EonLabs"
              loading="lazy"
            />

            <span className="founder-section__photo-label">
              EONLABS • FOUNDER
            </span>
          </div>

          {/* APRESENTAÇÃO INSTITUCIONAL */}
          <div className="founder-section__content">
            <span className="founder-section__role">FUNDADOR • EONLABS</span>

            <h3>CicGhost</h3>

            <p className="founder-section__profession">
              Desenvolvimento de Software • Tecnologia • Inovação
            </p>

            <p className="founder-section__description">
              Idealizador da EonLabs, um laboratório de tecnologia e inovação
              dedicado à criação de soluções digitais, engenharia de sistemas e
              desenvolvimento de projetos tecnológicos. Uma trajetória orientada
              pelo aprendizado contínuo, pela criatividade e pela busca de
              soluções para desafios reais.
            </p>

            <div className="founder-section__group">
              <h4>Especialidades e áreas de interesse</h4>

              <ul className="founder-section__tags">
                {specialties.map((specialty) => (
                  <li key={specialty}>{specialty}</li>
                ))}
              </ul>
            </div>

            <div className="founder-section__group">
              <h4>Tecnologias</h4>

              <ul className="founder-section__tags founder-section__tags--technology">
                {technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="founder-section__button"
              aria-expanded={showTrajectory}
              aria-controls="founder-trajectory"
              onClick={() => setShowTrajectory((current) => !current)}
            >
              {showTrajectory ? "Ocultar trajetória" : "Conhecer trajetória"}
              <span aria-hidden="true">{showTrajectory ? "↑" : "→"}</span>
            </button>

            {showTrajectory && (
              <div
                className="founder-section__trajectory"
                id="founder-trajectory"
              >
                <h4>Uma visão construída com tecnologia</h4>

                <p>
                  A EonLabs nasce da iniciativa de transformar conhecimento
                  tecnológico em soluções úteis. Seu fundador desenvolve
                  projetos práticos, explora novas ferramentas e aprimora
                  continuamente suas competências em engenharia de software,
                  arquitetura de sistemas, automação e segurança digital.
                </p>

                <h4>Missão</h4>

                <p>
                  Desenvolver soluções tecnológicas que contribuam para tornar
                  processos mais eficientes, acessíveis e seguros, respeitando
                  as necessidades específicas de cada projeto.
                </p>

                <h4>Visão de futuro</h4>

                <p>
                  Consolidar a EonLabs como um laboratório de inovação,
                  conectando desenvolvimento de sistemas, inteligência
                  artificial, cibersegurança e novas tecnologias em um
                  ecossistema de soluções digitais.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
