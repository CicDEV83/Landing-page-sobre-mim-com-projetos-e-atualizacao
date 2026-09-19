export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__panel">
          <div className="footer__identity">
            <a
              className="footer__brand"
              href="#inicio"
              aria-label="Voltar ao início"
            >
              Cicero W. Silva
            </a>

            <p className="footer__role">Full Stack Developer</p>
          </div>

          <div className="footer__meta">
            <p>
              © {currentYear} Cicero W. Silva. Todos os direitos reservados.
            </p>

            <p className="footer__technology">
              Desenvolvido com
              <span> React + TypeScript</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
