import { useCallback, useEffect, useRef, useState } from "react";
import { casesData } from "../../../data/cases";
import styles from "../../../styles/sections/Cases.module.css";

export function Cases() {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [canGoPrevious, setCanGoPrevious] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  const updateCarouselState = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const cards = Array.from(
      viewport.querySelectorAll<HTMLElement>("[data-case-card]"),
    );

    if (cards.length === 0) {
      setActiveIndex(0);
      setCanGoPrevious(false);
      setCanGoNext(false);
      return;
    }

    const viewportLeft = viewport.getBoundingClientRect().left;

    let nearestIndex = 0;
    let smallestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardLeft = card.getBoundingClientRect().left;
      const distance = Math.abs(cardLeft - viewportLeft);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        nearestIndex = index;
      }
    });

    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

    setActiveIndex(nearestIndex);
    setCanGoPrevious(viewport.scrollLeft > 2);
    setCanGoNext(viewport.scrollLeft < maxScroll - 2);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const cards = Array.from(
      viewport.querySelectorAll<HTMLElement>("[data-case-card]"),
    );

    const targetIndex = Math.max(0, Math.min(index, cards.length - 1));

    const target = cards[targetIndex];

    if (!target) return;

    const viewportRect = viewport.getBoundingClientRect();
    const cardRect = target.getBoundingClientRect();

    const targetScroll =
      viewport.scrollLeft + cardRect.left - viewportRect.left;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    viewport.scrollTo({
      left: targetScroll,
      behavior: reducedMotion ? "instant" : "smooth",
    });

    setActiveIndex(targetIndex);
  }, []);

  function handlePrevious() {
    scrollToIndex(activeIndex - 1);
  }

  function handleNext() {
    scrollToIndex(activeIndex + 1);
  }

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    let animationFrame = 0;

    function handleScroll() {
      if (animationFrame !== 0) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateCarouselState();
      });
    }

    updateCarouselState();

    viewport.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [updateCarouselState]);

  return (
    <section
      id="cases"
      className={styles.casesSection}
      aria-labelledby="cases-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headingBlock}>
            <p className={styles.eyebrow}>PORTFÓLIO E SOLUÇÕES</p>

            <h2 id="cases-title" className={styles.title}>
              Cases e soluções empresariais
            </h2>

            <p className={styles.description}>
              Explore soluções conceituais para diferentes segmentos e descubra
              como tecnologia, estratégia e engenharia podem transformar
              desafios empresariais em experiências digitais.
            </p>
          </div>
        </header>

        <div className={styles.carouselWrapper}>
          <button
            type="button"
            className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            aria-label="Ver case anterior"
            aria-controls="eonlabs-cases-carousel"
          >
            <span aria-hidden="true">←</span>
          </button>

          <div
            id="eonlabs-cases-carousel"
            ref={viewportRef}
            className={styles.viewport}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Cases e soluções empresariais"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.target !== event.currentTarget) return;

              if (event.key === "ArrowRight") {
                event.preventDefault();
                handleNext();
              }

              if (event.key === "ArrowLeft") {
                event.preventDefault();
                handlePrevious();
              }
            }}
          >
            <div className={styles.track}>
              {casesData.map((item) => (
                <article
                  key={item.id}
                  className={styles.card}
                  data-case-card
                  aria-label={`Solução conceitual ${item.brandName}`}
                >
                  <header className={styles.cardHeader}>
                    <div className={styles.brandIdentity}>
                      <span className={styles.brandLetter} aria-hidden="true">
                        {item.brandLetter}
                      </span>

                      <div className={styles.brandText}>
                        <h3 className={styles.brandName}>{item.brandName}</h3>

                        <p className={styles.brandSegment}>{item.segment}</p>
                      </div>
                    </div>
                  </header>

                  <div className={styles.cardContent}>
                    <h4 className={styles.caseTitle}>{item.title}</h4>

                    <div className={styles.infoBlock}>
                      <span className={styles.infoLabel}>Problema</span>

                      <p className={styles.infoText}>{item.problem}</p>
                    </div>

                    <div className={styles.infoBlock}>
                      <span className={styles.infoLabel}>
                        Caminho técnico proposto
                      </span>

                      <p className={styles.infoText}>{item.path}</p>
                    </div>

                    <div className={styles.infoBlock}>
                      <span className={styles.infoLabel}>Solução proposta</span>

                      <p className={styles.infoText}>{item.solution}</p>
                    </div>

                    <div className={styles.previewBox}>
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className={styles.previewImage}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className={styles.metrics}>
                      {item.results.map((metric) => (
                        <div key={metric.label} className={styles.metricItem}>
                          <strong className={styles.metricValue}>
                            {metric.value}
                          </strong>

                          <span className={styles.metricLabel}>
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <blockquote className={styles.testimonial}>
                      <p className={styles.testimonialQuote}>
                        “{item.testimonial.quote}”
                      </p>

                      <footer className={styles.testimonialFooter}>
                        <strong>{item.testimonial.author}</strong>

                        <span>{item.testimonial.role}</span>
                      </footer>
                    </blockquote>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Ver próximo case"
            aria-controls="eonlabs-cases-carousel"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <p className={styles.description}>
          Os exemplos apresentados são cenários conceituais de portfólio. Não
          representam projetos entregues ou resultados comprovados de clientes.
        </p>
      </div>
    </section>
  );
}
