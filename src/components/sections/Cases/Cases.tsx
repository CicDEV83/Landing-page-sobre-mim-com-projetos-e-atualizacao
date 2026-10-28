import { useEffect, useRef, useState } from "react";

import { casesData } from "../../../data/cases";
import { CaseBrandIcon } from "./CaseBrandIcon";

import styles from "../../../styles/sections/Cases.module.css";

export function Cases() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToIndex(index: number) {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const cards = Array.from(
      viewport.querySelectorAll<HTMLElement>("[data-case-card]"),
    );

    const target = cards[index];

    if (!target) return;

    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "nearest",
      inline: "start",
    });

    setActiveIndex(index);
  }

  function handlePrev() {
    scrollToIndex(Math.max(activeIndex - 1, 0));
  }

  function handleNext() {
    scrollToIndex(Math.min(activeIndex + 1, casesData.length - 1));
  }

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const cards = Array.from(
      viewport.querySelectorAll<HTMLElement>("[data-case-card]"),
    );

    function updateActiveCard() {
      let nearestIndex = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const distance = Math.abs(
          card.getBoundingClientRect().left -
            (viewportRef.current?.getBoundingClientRect().left ?? 0),
        );

        if (distance < smallestDistance) {
          smallestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveIndex(nearestIndex);
    }

    updateActiveCard();

    viewport.addEventListener("scroll", updateActiveCard, {
      passive: true,
    });

    return () => {
      viewport.removeEventListener("scroll", updateActiveCard);
    };
  }, []);

  return (
    <section
      id="cases"
      className={styles.casesSection}
      aria-labelledby="cases-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headingBlock}>
            <p className={styles.eyebrow}>
              RESULTADOS ESTRATÉGICOS
            </p>

            <h2 id="cases-title" className={styles.title}>
              Cases de sucesso
            </h2>

            <p className={styles.description}>
              Transformamos desafios complexos em soluções digitais
              inteligentes. Explore como nossa visão estratégica, engenharia de
              software e inovação podem impulsionar negócios, otimizar processos
              e criar novas oportunidades de crescimento.
            </p>
          </div>
        </header>

        <div className={styles.carouselWrapper}>
          <button
            type="button"
            className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
            onClick={handlePrev}
            aria-label="Ver case anterior"
            disabled={activeIndex === 0}
          >
            ←
          </button>

          <div
            ref={viewportRef}
            className={styles.viewport}
            aria-label="Carrossel de cases"
          >
            <div className={styles.track}>
              {casesData.map((item) => (
                <article
                  key={item.id}
                  className={styles.card}
                  data-case-card
                  aria-label={`Case ${item.brandName}`}
                >
                  <header className={styles.cardHeader}>
                    <div className={styles.brandIdentity}>
                      <span
                        className={styles.brandLetter}
                        aria-hidden="true"
                      >
                        <CaseBrandIcon brandName={item.brandName} />
                      </span>

                      <div className={styles.brandText}>
                        <h3 className={styles.brandName}>
                          {item.brandName}
                        </h3>

                        <p className={styles.brandSegment}>
                          {item.segment}
                        </p>
                      </div>
                    </div>
                  </header>

                  <div className={styles.cardContent}>
                    <h4 className={styles.caseTitle}>
                      {item.title}
                    </h4>

                    <div className={styles.infoBlock}>
                      <span className={styles.infoLabel}>
                        Problema
                      </span>

                      <p className={styles.infoText}>
                        {item.problem}
                      </p>
                    </div>

                    <div className={styles.infoBlock}>
                      <span className={styles.infoLabel}>
                        Caminho aplicado
                      </span>

                      <p className={styles.infoText}>
                        {item.path}
                      </p>
                    </div>

                    <div className={styles.infoBlock}>
                      <span className={styles.infoLabel}>
                        Solução
                      </span>

                      <p className={styles.infoText}>
                        {item.solution}
                      </p>
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
                        <div
                          key={metric.label}
                          className={styles.metricItem}
                        >
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
                        <strong>
                          {item.testimonial.author}
                        </strong>

                        <span>
                          {item.testimonial.role}
                        </span>
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
            aria-label="Ver próximo case"
            disabled={activeIndex >= casesData.length - 1}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}