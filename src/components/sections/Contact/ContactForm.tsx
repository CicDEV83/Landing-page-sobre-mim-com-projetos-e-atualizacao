import { useState, type FormEvent } from "react";

import {
  contactConfig,
  getProjectEmailLink,
  getWhatsAppLink,
  type ProjectRequest,
} from "./contact";

import styles from "../../../styles/sections/Contact.module.css";

const initialForm: ProjectRequest = {
  name: "",
  email: "",
  company: "",
  country: "",
  description: "",
};

export function Contact() {
  const [form, setForm] = useState<ProjectRequest>(initialForm);

  const [emailReady, setEmailReady] = useState(false);

  const whatsappMessage =
    "Olá, equipe EonLabs! Visitei o site e gostaria " +
    "de conversar sobre uma solução digital para meu negócio.";

  function updateField(field: keyof ProjectRequest, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setEmailReady(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const project: ProjectRequest = {
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      country: form.country.trim(),
      description: form.description.trim(),
    };

    if (
      !project.name ||
      !project.email ||
      !project.country ||
      !project.description
    ) {
      return;
    }

    const emailLink = getProjectEmailLink(project);

    setEmailReady(true);

    // Abre o aplicativo de e-mail do visitante.
    // O e-mail ainda precisará ser enviado por ele.
    window.location.href = emailLink;
  }

  return (
    <section
      id="contato"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.formColumn}>
            <header className={styles.header}>
              <p className={styles.eyebrow}>VAMOS CONVERSAR?</p>

              <h2 id="contact-title" className={styles.title}>
                Solicite um projeto
              </h2>

              <p className={styles.description}>
                Conte um pouco sobre sua ideia ou os desafios do seu negócio.
                Vamos avaliar suas necessidades e conversar sobre os próximos
                passos.
              </p>
            </header>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fieldsGrid}>
                <div className={styles.field}>
                  <label htmlFor="contact-name" className={styles.label}>
                    Nome completo
                    <span aria-hidden="true"> *</span>
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Seu nome completo"
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    required
                    minLength={2}
                    maxLength={100}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-email" className={styles.label}>
                    E-mail
                    <span aria-hidden="true"> *</span>
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="voce@empresa.com"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    required
                    maxLength={254}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-company" className={styles.label}>
                    Empresa
                    <span className={styles.optional}> — opcional</span>
                  </label>

                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Nome da empresa"
                    value={form.company}
                    onChange={(event) =>
                      updateField("company", event.target.value)
                    }
                    maxLength={120}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-country" className={styles.label}>
                    País
                    <span aria-hidden="true"> *</span>
                  </label>

                  <input
                    id="contact-country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    placeholder="Seu país"
                    value={form.country}
                    onChange={(event) =>
                      updateField("country", event.target.value)
                    }
                    required
                    maxLength={80}
                    className={styles.input}
                  />
                </div>

                <div className={styles.fullWidth}>
                  <label htmlFor="contact-description" className={styles.label}>
                    Descreva seu projeto
                    <span aria-hidden="true"> *</span>
                  </label>

                  <textarea
                    id="contact-description"
                    name="description"
                    rows={6}
                    placeholder={
                      "Conte o que deseja desenvolver, " +
                      "qual problema precisa resolver " +
                      "e quais funcionalidades imagina."
                    }
                    value={form.description}
                    onChange={(event) =>
                      updateField("description", event.target.value)
                    }
                    required
                    minLength={10}
                    maxLength={3000}
                    className={styles.textarea}
                  />

                  <span className={styles.characterCount}>
                    {form.description.length}/3000
                  </span>
                </div>
              </div>

              <button type="submit" className={styles.submitButton}>
                Preparar solicitação por e-mail
                <span aria-hidden="true">↗</span>
              </button>

              <p className={styles.formNotice}>
                Ao continuar, seu aplicativo de e-mail será aberto com os dados
                preenchidos. Confira a mensagem e confirme o envio.
              </p>

              {emailReady && (
                <div className={styles.emailFeedback} role="status">
                  A mensagem foi preparada para seu aplicativo de e-mail. Caso
                  ele não tenha aberto, utilize o link abaixo. Nenhuma
                  solicitação foi enviada automaticamente.
                  <a
                    href={getProjectEmailLink(form)}
                    className={styles.emailFallback}
                  >
                    Abrir e-mail novamente
                  </a>
                </div>
              )}
            </form>
          </div>

          <aside
            className={styles.channels}
            aria-label="Canais de atendimento EonLabs"
          >
            <div className={styles.channelsHeader}>
              <p className={styles.channelsEyebrow}>ATENDIMENTO EONLABS</p>

              <h3 className={styles.channelsTitle}>
                Escolha como prefere conversar.
              </h3>

              <p className={styles.channelsDescription}>
                Estamos disponíveis para receber suas ideias e avaliar novas
                oportunidades de desenvolvimento.
              </p>
            </div>

            {/* CARD WHATSAPP */}
            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.channelCard}
              aria-label="Conversar com a EonLabs pelo WhatsApp"
            >
              <span
                className={`${styles.channelIcon} ${styles.whatsappIcon}`}
                aria-hidden="true"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z" />
                  <path d="M9 9c.5 3 3 5.5 6 6l1.5-1.5" />
                </svg>
              </span>

              <span className={styles.channelText}>
                <strong>WhatsApp</strong>
                <span>Fale conosco diretamente</span>
              </span>

              <span className={styles.channelArrow} aria-hidden="true">
                ↗
              </span>
            </a>

            {/* CARD E-MAIL */}
            <a
              href={`mailto:${contactConfig.email}`}
              className={styles.channelCard}
              aria-label="Enviar um e-mail para a EonLabs"
            >
              <span
                className={`${styles.channelIcon} ${styles.emailIcon}`}
                aria-hidden="true"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>

              <span className={styles.channelText}>
                <strong>E-mail</strong>
                <span>Envie uma mensagem</span>
              </span>

              <span className={styles.channelArrow} aria-hidden="true">
                ↗
              </span>
            </a>

            {/* CARD INSTITUCIONAL */}
            <div className={styles.informationCard}>
              <span className={styles.informationIcon} aria-hidden="true">
                ✓
              </span>

              <div>
                <strong>Atendimento personalizado</strong>

                <p>
                  Cada solicitação é avaliada de acordo com suas necessidades,
                  objetivos e viabilidade técnica.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
