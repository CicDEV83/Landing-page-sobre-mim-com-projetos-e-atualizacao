const COUNTER_NAMESPACE = "portfolio_solinftec_2026";
const COUNTER_KEY = "visitantes_unicos";

const COUNTER_API_URL = `https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;

/**
 * Compartilha uma requisição de incremento que já esteja em andamento.
 *
 * Evita que duas chamadas simultâneas na mesma instância
 * da aplicação incrementem o contador duas vezes.
 */
let pendingIncrement: Promise<number> | null = null;

async function requestVisitorCount(shouldIncrement: boolean): Promise<number> {
  const endpoint = shouldIncrement ? `${COUNTER_API_URL}/up` : COUNTER_API_URL;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(
      `Não foi possível obter o contador. Status: ${response.status}`,
    );
  }

  const data: unknown = await response.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("count" in data) ||
    typeof data.count !== "number" ||
    !Number.isSafeInteger(data.count) ||
    data.count < 0
  ) {
    throw new Error("A API retornou um contador de visitantes inválido.");
  }

  return data.count;
}

export function getVisitorCount(): Promise<number> {
  return requestVisitorCount(false);
}

export function incrementVisitorCount(): Promise<number> {
  if (pendingIncrement !== null) {
    return pendingIncrement;
  }

  pendingIncrement = requestVisitorCount(true).finally(() => {
    pendingIncrement = null;
  });

  return pendingIncrement;
}
