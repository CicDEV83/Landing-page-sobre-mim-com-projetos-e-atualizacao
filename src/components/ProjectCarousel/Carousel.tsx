import { useState } from "react";

import { projects } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalProjects = projects.length;

  const currentProject = projects[currentIndex];

  const goToPreviousProject = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0
        ? totalProjects - 1
        : currentIndex - 1,
    );
  };

  const goToNextProject = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === totalProjects - 1
        ? 0
        : currentIndex + 1,
    );
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
  };

  if (!currentProject) {
    return null;
  }

  return (
    <section
      className="projects"
      id="projetos"
      aria-labelledby="projects-title"
    >
      <div className="container projects__container">
        <header className="projects__header">
          <div>
            <p className="projects__eyebrow">
              Projetos selecionados
            </p>

            <h2 id="projects-title">
              Construindo soluções que vão além da interface.
            </h2>
          </div>

          <p className="projects__introduction">
            Uma seleção de projetos desenvolvidos para explorar
            experiência do usuário, arquitetura, integração com APIs
            e construção de aplicações modernas.
          </p>
        </header>

        <div
          className="projects__carousel"
          aria-live="polite"
        >
          <div className="projects__stage">
            <ProjectCard project={currentProject} />
          </div>

          <div className="projects__controls">
            <div className="projects__navigation">
              <button
                className="projects__arrow"
                type="button"
                onClick={goToPreviousProject}
                aria-label="Mostrar projeto anterior"
              >
                <span aria-hidden="true">←</span>
              </button>

              <span className="projects__counter">
                {String(currentIndex + 1).padStart(2, "0")}
                <span aria-hidden="true"> / </span>
                {String(totalProjects).padStart(2, "0")}
              </span>

              <button
                className="projects__arrow"
                type="button"
                onClick={goToNextProject}
                aria-label="Mostrar próximo projeto"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <div
              className="projects__pagination"
              aria-label="Selecionar projeto"
            >
              {projects.map((project, index) => {
                const isActive = index === currentIndex;

                return (
                  <button
                    key={project.id}
                    className={`projects__pagination-button ${
                      isActive
                        ? "projects__pagination-button--active"
                        : ""
                    }`}
                    type="button"
                    onClick={() => goToProject(index)}
                    aria-label={`Mostrar projeto ${index + 1}: ${project.title}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="sr-only">
                      {project.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}