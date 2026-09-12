import { useEffect, useState } from "react";

interface ProjectMediaRotatorProps {
  images: string[];
  projectTitle: string;
}

const ROTATION_INTERVAL = 4000;

export function ProjectMediaRotator({
  images,
  projectTitle,
}: ProjectMediaRotatorProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentImageIndex(
        (currentIndex) => (currentIndex + 1) % images.length,
      );
    }, ROTATION_INTERVAL);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [images.length, isPaused]);

  if (images.length === 0) {
    return null;
  }

  return (
    <figure
      className="project-media"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="project-media__viewport">
        {images.map((image, index) => {
          const isActive = index === currentImageIndex;

          return (
            <img
              key={image}
              className={`project-media__image ${
                isActive ? "project-media__image--active" : ""
              }`}
              src={image}
              alt={isActive ? `Prévia do projeto ${projectTitle}` : ""}
              aria-hidden={!isActive}
            />
          );
        })}
      </div>

      {images.length > 1 && (
        <div className="project-media__indicators" aria-hidden="true">
          {images.map((image, index) => (
            <span
              key={image}
              className={`project-media__indicator ${
                index === currentImageIndex
                  ? "project-media__indicator--active"
                  : ""
              }`}
            />
          ))}
        </div>
      )}
    </figure>
  );
}
