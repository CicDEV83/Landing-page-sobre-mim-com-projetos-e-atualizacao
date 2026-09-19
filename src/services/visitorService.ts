interface CounterApiResponse {
  count: number;
}

const COUNTER_NAMESPACE = "portfolio_solinftec_2026";
const COUNTER_KEY = "visitantes_unicos";

const COUNTER_API_URL = `https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;

async function requestVisitorCount(shouldIncrement: boolean): Promise<number> {
  const endpoint = shouldIncrement ? `${COUNTER_API_URL}/up` : COUNTER_API_URL;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(
      `Não foi possível obter o contador de visitantes. Status: ${response.status}`,
    );
  }

  const data = (await response.json()) as CounterApiResponse;

  if (typeof data.count !== "number" || !Number.isFinite(data.count)) {
    throw new Error("A API retornou um contador de visitantes inválido.");
  }

  return data.count;
}

export async function getVisitorCount(): Promise<number> {
  return requestVisitorCount(false);
}

export async function incrementVisitorCount(): Promise<number> {
  return requestVisitorCount(true);
}
