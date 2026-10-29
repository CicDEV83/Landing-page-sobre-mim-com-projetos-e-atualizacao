import { useEffect, useRef, useState } from "react";

import { casesData } from "../../../data/cases";
import { CaseBrandIcon } from "./CaseBrandIcon";

import styles from "../../../styles/sections/Cases.module.css";

const MOBILE_BREAKPOINT = "(max-width: 767px)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const MOBILE_SLIDE_INTERVAL = 20000;

export function Cases() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  function scrollToIndex(index: number) {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const cards = Array.from(
      viewport.querySelectorAll<HTMLElement>("[data-case-card]"),
    );
    const target = cards[index];
    if (!target || !cards[0]) return;

    // Desloca somente o carrossel na horizontal, sem mover a página na vertical.
    viewport.scrollTo({
      left: target.offsetLeft - cards[0].offsetLeft,
      behavior: window.matchMedia(REDUCED_MOTION).matches
        ? "instant"
        : "smooth",
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
    const mobileQuery = window.matchMedia(MOBILE_BREAKPOINT);
    const motionQuery = window.matchMedia(REDUCED_MOTION);

    function updatePreferences() {
      setIsMobile(mobileQuery.matches);
      setPrefersReducedMotion(motionQuery.matches);
    }

    updatePreferences();
    mobileQuery.addEventListener("change", updatePreferences);
    motionQuery.addEventListener("change", updatePreferences);

    return () => {
      mobileQuery.removeEventListener("change", updatePreferences);
      motionQuery.removeEventListener("change", updatePreferences);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const cards = Array.from(
      viewport.querySelectorAll<HTMLElement>("[data-case-card]"),
    );

    function updateActiveCard() {
      let nearestIndex = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;
      const viewportLeft = viewport!.getBoundingClientRect().left;

      cards.forEach((card, index) => {
        const distance = Math.abs(
          card.getBoundingClientRect().left - viewportLeft,
        );
        if (distance < smallestDistance) {
          smallestDistance = distance;
          nearestIndex = index;
        }
      });
      setActiveIndex(nearestIndex);
    }

    updateActiveCard();
    viewport.addEventListener("scroll", updateActiveCard, { passive: true });
    return () => viewport.removeEventListener("scroll", updateActiveCard);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    function resumeOutside(event: PointerEvent | FocusEvent) {
      if (
        event.target instanceof Node &&
        sectionRef.current?.contains(event.target)
      ) {
        return;
      }
      setIsPaused(false);
    }

    document.addEventListener("pointerdown", resumeOutside, true);
    document.addEventListener("focusin", resumeOutside, true);
    return () => {
      document.removeEventListener("pointerdown", resumeOutside, true);
      document.removeEventListener("focusin", resumeOutside, true);
    };
  }, [isMobile]);

  useEffect(() => {
    if (
      !isMobile ||
      !isVisible ||
      isPaused ||
      prefersReducedMotion ||
      document.hidden ||
      casesData.length <= 1
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      scrollToIndex((activeIndex + 1) % casesData.length);
    }, MOBILE_SLIDE_INTERVAL);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isMobile, isVisible, isPaused, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="cases"
      className={styles.casesSection}
      aria-labelledby="cases-title"
      onPointerDownCapture={() => {
        if (isMobile) setIsPaused(true);
      }}
      onFocusCapture={() => {
        if (isMobile) setIsPaused(true);
      }}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headingBlock}>
            <p className={styles.eyebrow}>RESULTADOS ESTRATÉGICOS</p>
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
                      <span className={styles.brandLetter} aria-hidden="true">
                        <CaseBrandIcon brandName={item.brandName} />
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
                      <span className={styles.infoLabel}>Caminho aplicado</span>
                      <p className={styles.infoText}>{item.path}</p>
                    </div>
                    <div className={styles.infoBlock}>
                      <span className={styles.infoLabel}>Solução</span>
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
