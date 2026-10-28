import { useState } from "react";

import styles from "../../../styles/sections/FAQ.module.css";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "projects",
    question: "Que tipos de projetos a EonLabs desenvolve?",
    answer:
      "Trabalhamos com propostas de sites, sistemas web, plataformas de gestão, dashboards, integrações e soluções digitais personalizadas, conforme o escopo e a viabilidade técnica de cada projeto.",
  },
  {
    id: "custom",
    question: "É possível criar uma solução sob medida?",
    answer:
      "Sim. O planejamento pode começar pela análise das necessidades do negócio, seguida da definição do escopo, prototipagem e implementação.",
  },
  {
    id: "budget",
    question: "Como funciona o orçamento?",
    answer:
      "A proposta comercial é elaborada após compreender os requisitos, a complexidade, os prazos desejados e as entregas esperadas.",
  },
  {
    id: "prototype",
    question: "A EonLabs trabalha com protótipos antes do desenvolvimento?",
    answer:
      "A prototipagem pode fazer parte do processo para validar ideias, jornadas e interfaces antes do investimento em implementação.",
  },
  {
    id: "timeline",
    question: "Quanto tempo leva para desenvolver um projeto?",
    answer:
      "O prazo depende do escopo e da complexidade. O cronograma é definido durante o planejamento, considerando requisitos e etapas de validação.",
  },
  {
    id: "start",
    question: "Como iniciar um projeto?",
    answer:
      "Entre em contato apresentando sua ideia ou desafio. Com essas informações, podemos avaliar os próximos passos e a elaboração de uma proposta.",
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0].id);

  function toggleQuestion(id: string) {
    setOpenId((currentId) => (currentId === id ? null : id));
  }

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>DÚVIDAS FREQUENTES</p>

          <h2 id="faq-title" className={styles.title}>
            Perguntas frequentes
          </h2>

          <p className={styles.description}>
            Esclareça suas principais dúvidas sobre projetos, desenvolvimento e
            soluções digitais antes de iniciar sua jornada com a EonLabs.
          </p>
        </header>

        <div className={styles.content}>
          <div className={styles.faqColumn}>
            <div className={styles.columnHeading}>
              <h3 className={styles.columnTitle}>Como podemos ajudar?</h3>

              <p className={styles.columnDescription}>
                Reunimos respostas para algumas das perguntas mais comuns sobre
                nosso processo de desenvolvimento.
              </p>
            </div>

            <div className={styles.accordion}>
              {faqItems.map((item) => {
                const isOpen = openId === item.id;

                return (
                  <article
                    key={item.id}
                    className={`${styles.faqItem} ${
                      isOpen ? styles.faqItemOpen : ""
                    }`}
                  >
                    <h4 className={styles.questionHeading}>
                      <button
                        id={`faq-question-${item.id}`}
                        type="button"
                        className={styles.questionButton}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${item.id}`}
                        onClick={() => toggleQuestion(item.id)}
                      >
                        <span className={styles.questionText}>
                          {item.question}
                        </span>

                        <span
                          className={styles.questionIcon}
                          aria-hidden="true"
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                    </h4>

                    <div
                      id={`faq-answer-${item.id}`}
                      className={styles.answer}
                      role="region"
                      aria-labelledby={`faq-question-${item.id}`}
                      hidden={!isOpen}
                    >
                      <p className={styles.answerText}>{item.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className={styles.helpCard}>
            <div className={styles.helpIcon} aria-hidden="true">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z" />
                <path d="M9.5 9a3 3 0 0 1 5.5 1.5c0 1.5-2.5 2-2.5 3" />
                <path d="M12.5 16.5h.01" />
              </svg>
            </div>

            <p className={styles.helpEyebrow}>VAMOS CONVERSAR</p>

            <h3 className={styles.helpTitle}>
              Não encontrou a resposta que procurava?
            </h3>

            <p className={styles.helpDescription}>
              Conte-nos sobre sua ideia, suas necessidades ou os desafios do seu
              negócio. Podemos avaliar juntos os próximos passos.
            </p>

            <a href="#contato" className={styles.helpButton}>
              Falar sobre meu projeto
              <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
