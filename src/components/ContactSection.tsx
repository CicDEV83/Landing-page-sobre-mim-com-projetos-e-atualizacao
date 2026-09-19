import { useScrollReveal } from "../hooks/useScrollReveal";

interface ContactChannel {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

const contactChannels: ContactChannel[] = [
  {
    label: "E-mail",
    value: "csilvaw9.3@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=csilvaw9.3@gmail.com",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "Cicero Silva",
    href: "https://www.linkedin.com/in/cicero-silva-056253362/",
    external: true,
  },
  {
    label: "GitHub",
    value: "CicDEV83",
    href: "https://github.com/CicDEV83",
    external: true,
  },
  {
    label: "WhatsApp",
    value: "(65) 99802-4631",
    href: "https://wa.me/5565998024631",
    external: true,
  },
];

export function ContactSection() {
  const { elementRef: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className={`contact reveal ${isVisible ? "reveal--visible" : ""}`}
      id="contato"
      aria-labelledby="contact-title"
    >
      <div className="container contact__container">
        <header className="contact__header">
          <p className="contact__eyebrow">Vamos conversar</p>

          <h2 id="contact-title">Tem uma oportunidade ou projeto em mente?</h2>

          <p className="contact__introduction">
            Estou disponível para conversar sobre oportunidades, desenvolvimento
            de software, projetos e novas conexões profissionais.
          </p>
        </header>

        <address className="contact__channels">
          {contactChannels.map(({ label, value, href, external }) => (
            <a
              className="contact__channel"
              href={href}
              key={label}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
            >
              <span className="contact__channel-label">{label}</span>

              <span className="contact__channel-content">
                <span className="contact__channel-value">{value}</span>

                <span className="contact__channel-arrow" aria-hidden="true">
                  {external ? "↗" : "→"}
                </span>
              </span>
            </a>
          ))}
        </address>
      </div>
    </section>
  );
}
