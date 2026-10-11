import type { FormEvent } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { socialLinks } from "../data/socialLinks";
import { SocialIcon } from "./SocialIcon";

export function ContactSection() {
  const { elementRef: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Contato pelo portfólio — ${name}`);

    const body = encodeURIComponent(
      `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    );

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=csilvaw9.3@gmail.com` +
      `&su=${subject}` +
      `&body=${body}`;

    window.location.assign(gmailUrl);
  }

  return (
    <section
      ref={sectionRef}
      className={`contact contact--cosmic reveal ${
        isVisible ? "reveal--visible" : ""
      }`}
      id="contato"
      aria-labelledby="contact-title"
    >
      <div className="contact__cosmic-stars" aria-hidden="true" />

      <div className="container contact__container">
        <div className="contact__header">
          <span className="contact__eyebrow">
            <span aria-hidden="true">✦</span> VAMOS CONVERSAR
          </span>

          <h2 id="contact-title">
            Tem um projeto <span>em mente?</span>
          </h2>

          <p className="contact__introduction">
            Vamos transformar sua ideia em uma solução digital incrível. Entre
            em contato e vamos conversar!
          </p>

          <nav className="contact__socials" aria-label="Minhas redes sociais">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                className={`contact__social contact__social--${icon}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${label}`}
                title={label}
              >
                <SocialIcon name={icon} />
              </a>
            ))}
          </nav>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__form-heading">
            <span className="contact__form-signal" aria-hidden="true" />
            INICIAR CONEXÃO
          </div>

          <div className="contact__form-row">
            <label className="contact__field">
              <span className="sr-only">Seu nome</span>

              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Seu nome"
                maxLength={100}
                required
              />
            </label>

            <label className="contact__field">
              <span className="sr-only">Seu e-mail</span>

              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Seu e-mail"
                maxLength={180}
                required
              />
            </label>
          </div>

          <label className="contact__field contact__field--message">
            <span className="sr-only">Sua mensagem</span>

            <textarea
              name="message"
              placeholder="Sua mensagem..."
              rows={5}
              maxLength={4000}
              required
            />
          </label>

          <button className="contact__submit" type="submit">
            Enviar mensagem
            <span aria-hidden="true">→</span>
          </button>

          <p className="contact__form-note">
            Ao clicar, o Gmail será aberto com a mensagem preparada. Confira e
            confirme o envio por lá.
          </p>
        </form>
      </div>

      <div className="contact__energy-line" aria-hidden="true" />
    </section>
  );
}
