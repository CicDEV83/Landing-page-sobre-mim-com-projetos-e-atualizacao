import { useMemo, useState } from "react";

import { projects } from "../../data/projects";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { ProjectCard } from "./ProjectCard";

type ProjectFilter = "Todos" | "Frontend" | "Fullstack" | "Apps" | "Em breve";

const filters: ProjectFilter[] = [
  "Todos",
  "Frontend",
  "Fullstack",
  "Apps",
  "Em breve",
];

/**
 * Categorias conservadoras, baseadas no cadastro atual dos projetos.
 * Não classificamos um projeto como Fullstack sem evidência de backend.
 */
function matchesFilter(project: (typeof projects)[number], filter: ProjectFilter) {
  if (filter === "Todos") return true;
  if (filter === "Em breve") return project.status === "Em desenvolvimento";
  if (filter === "Fullstack") return false;
  if (filter === "Frontend") {
    return project.status !== "Em desenvolvimento";
  }
  return ["app-clima-global", "task-manager-pro", "conversor-global-pro"].includes(
    project.id,
  );
}

export function Carousel() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("Todos");
  const [showAll, setShowAll] = useState(false);

  const { elementRef: headerRef, isVisible: isHeaderVisible } =
    useScrollReveal<HTMLElement>();

  const filteredProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project, activeFilter)),
    [activeFilter],
  );

  const visibleProjects =
    activeFilter === "Todos" && !showAll
      ? filteredProjects.slice(0, 3)
      : filteredProjects;

  const hasMoreProjects = activeFilter === "Todos" && filteredProjects.length > 3;

  const changeFilter = (filter: ProjectFilter) => {
    setActiveFilter(filter);
    setShowAll(false);
  };

  return (
    <section
      className="projects projects--neon"
      id="projetos"
      aria-labelledby="projects-title"
    >
      <div className="container projects__container">
        <header
          ref={headerRef}
          className={`projects__header reveal ${
            isHeaderVisible ? "reveal--visible" : ""
          }`}
        >
          <div className="projects__heading">
            <p className="projects__eyebrow">✦ MEUS PROJETOS</p>
            <h2 id="projects-title">
              Projetos que transformam <span>ideias em realidade.</span>
            </h2>
          </div>

          <p className="projects__introduction">
            Aplicações reais, interfaces modernas e experiências construídas
            com atenção aos detalhes.
          </p>
        </header>

        <div className="projects__toolbar">
          <div className="projects__filters" role="group" aria-label="Filtrar projetos">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`projects__filter ${
                  activeFilter === filter ? "projects__filter--active" : ""
                }`}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => changeFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {hasMoreProjects && (
            <button
              className="projects__view-all"
              type="button"
              onClick={() => {
                setActiveFilter("Todos");
                setShowAll((current) => !current);
              }}
              aria-expanded={showAll}
            >
              {showAll ? "Mostrar destaques" : "Ver todos os projetos"}
              <span aria-hidden="true">{showAll ? "↑" : "→"}</span>
            </button>
          )}
        </div>

        {visibleProjects.length > 0 ? (
          <div className="projects__grid" aria-live="polite">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="projects__empty" role="status">
            <span aria-hidden="true">⌘</span>
            <h3>Nenhum projeto nesta categoria por enquanto.</h3>
            <p>
              Os projetos aparecerão aqui quando estiverem cadastrados com
              essa especialidade.
            </p>
            <button type="button" onClick={() => changeFilter("Todos")}>
              Ver todos os projetos →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
