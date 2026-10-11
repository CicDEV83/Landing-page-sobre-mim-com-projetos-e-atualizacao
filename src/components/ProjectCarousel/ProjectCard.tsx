import type { Project } from "../../types";
import { ProjectMediaRotator } from "./ProjectMediaRotator";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const {
    title,
    subtitle,
    description,
    status,
    technologies,
    projectUrl,
    repositoryUrl,
    images,
  } = project;

  const isInDevelopment = status === "Em desenvolvimento";
  const hasImages = Boolean(images?.length);

  return (
    <article className="project-card project-card--neon">
      <div className="project-card__media-shell">
        {hasImages && images ? (
          <ProjectMediaRotator images={images} projectTitle={title} />
        ) : (
          <div className="project-card__media-placeholder" aria-label={`${title}: imagem em preparação`}>
            <span className="project-card__placeholder-symbol" aria-hidden="true">
              &lt;/&gt;
            </span>
            <span>PROJETO EM EVOLUÇÃO</span>
          </div>
        )}
        <span
          className={`project-card__status ${
            isInDevelopment
              ? "project-card__status--development"
              : "project-card__status--completed"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="project-card__content">
        <header className="project-card__header">
          <div className="project-card__heading">
            <h3>{title}</h3>
            <p className="project-card__subtitle">{subtitle}</p>
          </div>
        </header>

        <p className="project-card__description">{description}</p>

        <ul
          className="project-card__technologies"
          aria-label={`Tecnologias utilizadas em ${title}`}
        >
          {technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <footer className="project-card__footer">
          {projectUrl ? (
            <a className="project-card__link" href={projectUrl}>
              Ver projeto <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="project-card__coming-soon">Em construção</span>
          )}

          {repositoryUrl && (
            <a
              className="project-card__repository"
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Código <span aria-hidden="true">↗</span>
            </a>
          )}
        </footer>
      </div>
    </article>
  );
}
