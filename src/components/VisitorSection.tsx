import { useVisitorCounter } from "../hooks/useVisitorCounter";

export function VisitorSection() {
  const {
    count,
    isLoading,
    error,
  } = useVisitorCounter();

  return (
    <aside
      className="visitor"
      aria-label="Contador de visitantes"
    >
      <div className="container visitor__container">
        <div className="visitor__content">
          <div
            className="visitor__indicator"
            aria-hidden="true"
          >
            <span className="visitor__indicator-dot" />
          </div>

          <div className="visitor__information">
            <span className="visitor__label">
              Visitantes do portfólio
            </span>

            <strong
              className="visitor__count"
              aria-live="polite"
            >
              {isLoading && "Carregando..."}

              {!isLoading && error && "--"}

              {!isLoading &&
                !error &&
                count !== null &&
                count.toLocaleString("pt-BR")}
            </strong>
          </div>
        </div>

        <p className="visitor__message">
          Obrigado pela visita.
        </p>
      </div>
    </aside>
  );
}