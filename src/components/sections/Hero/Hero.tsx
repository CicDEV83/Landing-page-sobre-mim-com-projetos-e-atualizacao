import { useEffect, useState } from "react";

import petshopImage from "../../../assets/images/hero/petshop.png";
import saudeImage from "../../../assets/images/hero/saude.png";
import restaurantesImage from "../../../assets/images/hero/restaurantes.png";
import belezaImage from "../../../assets/images/hero/beleza.png";
import imobiliariasImage from "../../../assets/images/hero/imobiliarias.png";
import varejoImage from "../../../assets/images/hero/varejo.png";

import styles from "./Hero.module.css";

interface HeroSlide {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: "petshop",
    category: "PET SHOP",
    title: "Tecnologia para negócios pet",
    description:
      "Gestão de atendimentos, agendamentos, serviços e relacionamento com clientes.",
    image: petshopImage,
    imageAlt:
      "Interface conceitual de sistema para pet shop, com dashboard de gestão e aplicativo para celular.",
  },
  {
    id: "saude",
    category: "SAÚDE",
    title: "Soluções digitais para saúde",
    description:
      "Organização de atendimentos, agendamentos e processos administrativos.",
    image: saudeImage,
    imageAlt:
      "Interface conceitual de plataforma para clínicas, com painel administrativo e aplicativo para celular.",
  },
  {
    id: "restaurantes",
    category: "RESTAURANTES",
    title: "Gestão inteligente para restaurantes",
    description:
      "Soluções para organizar pedidos, operações, atendimento e indicadores de negócio.",
    image: restaurantesImage,
    imageAlt:
      "Interface conceitual de gestão para restaurantes, com dashboard e aplicativo para celular.",
  },
  {
    id: "beleza",
    category: "BELEZA E ESTÉTICA",
    title: "Experiências digitais para beleza",
    description:
      "Agendamentos, gestão de serviços e relacionamento com clientes.",
    image: belezaImage,
    imageAlt:
      "Interface conceitual de sistema para salões de beleza, com painel e aplicativo para celular.",
  },
  {
    id: "imobiliarias",
    category: "IMOBILIÁRIAS",
    title: "Tecnologia para o mercado imobiliário",
    description:
      "Organização de imóveis, oportunidades comerciais e processos de atendimento.",
    image: imobiliariasImage,
    imageAlt:
      "Interface conceitual de plataforma imobiliária, com dashboard e aplicativo para celular.",
  },
  {
    id: "varejo",
    category: "VAREJO E E-COMMERCE",
    title: "Soluções para o comércio moderno",
    description:
      "Gestão de vendas, produtos e informações para operações comerciais.",
    image: varejoImage,
    imageAlt:
      "Interface conceitual de gestão de varejo, com dashboard e aplicativo para celular.",
  },
];

const SLIDE_INTERVAL = 6000;

function HeroShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updateMotionPreference() {
      setPrefersReducedMotion(mediaQuery.matches);
    }

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || heroSlides.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
    }, SLIDE_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused, prefersReducedMotion]);

  function goToSlide(index: number) {
    const nextIndex = (index + heroSlides.length) % heroSlides.length;
    setActiveIndex(nextIndex);
  }

  const activeSlide = heroSlides[activeIndex];

  return (
    <div
      className={styles.visual}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className={styles.showcase}>
        <div className={styles.showcaseHeader}>
          <div className={styles.showcaseHeading}>
            <span className={styles.showcaseEyebrow}>
              SOLUÇÕES PARA DIFERENTES SEGMENTOS
            </span>
            <span className={styles.showcaseCategory}>
              {activeSlide.category}
            </span>
          </div>
        </div>

        <div
          className={styles.showcaseViewport}
          aria-label="Vitrine de soluções digitais por segmento"
        >
          {heroSlides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={slide.id}
                className={`${styles.showcaseSlide} ${
                  isActive ? styles.showcaseSlideActive : ""
                }`}
                aria-hidden={!isActive}
              >
                <img
                  src={slide.image}
                  alt={isActive ? slide.imageAlt : ""}
                  className={styles.showcaseImage}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            );
          })}

          <div className={styles.imageOverlay} aria-hidden="true" />
          <span className={styles.demoBadge}>CONCEITO VISUAL</span>
        </div>

        <div className={styles.showcaseBottom}>
          <div className={styles.slideInformation} aria-live="off">
            <strong className={styles.slideTitle}>{activeSlide.title}</strong>
            <p className={styles.slideDescription}>{activeSlide.description}</p>
          </div>
        </div>

        <div
          className={styles.carouselIndicators}
          aria-label="Selecionar segmento"
        >
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`${styles.carouselIndicator} ${
                index === activeIndex ? styles.carouselIndicatorActive : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Mostrar ${slide.category}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            ENGENHARIA DE SOFTWARE PARA EMPRESAS
          </span>

          <h1 id="hero-title" className={styles.title}>
            Soluções digitais <span>sob medida</span> para acelerar negócios.
          </h1>

          <p className={styles.description}>
            Engenharia de software, design de produto, automação e sistemas
            escaláveis para empresas que querem ir mais longe.
          </p>

          <div className={styles.actions}>
            <a href="#contato" className={styles.primaryButton}>
              Solicitar projeto <span aria-hidden="true">→</span>
            </a>

            <a href="#cases" className={styles.secondaryButton}>
              Ver cases
            </a>
          </div>

          <div className={styles.highlights}>
            <span>✧ Soluções personalizadas</span>
            <span>◇ Engenharia segura</span>
            <span>◎ Foco em resultados</span>
          </div>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
}
