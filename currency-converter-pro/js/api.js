/**
 * SERVIÇOS DE INTEGRAÇÃO COM APIS EXTERNAS
 * Arquivo: api.js
 */

// API pública de geolocalização por IP (Gratuita e sem Key)
const GEOLOCATION_API_URL = "https://ipapi.co/json/";

// CORREÇÃO: URL correta da AwesomeAPI
const EXCHANGE_API_URL = "https://economia.awesomeapi.com.br/last/";

/**
 * Detecta a localização atual do usuário com base no endereço de IP.
 * @returns {Promise<{country: string, currency: string}>}
 */
export async function detectUserLocation() {
  try {
    const response = await fetch(GEOLOCATION_API_URL);
    if (!response.ok) throw new Error("Erro ao buscar IP");

    const data = await response.json();

    return {
      country: data.country_name || "Brasil",
      currency: data.currency || "BRL",
    };
  } catch (error) {
    console.error("Não foi possível detectar a localização por IP:", error);
    // Fallback padrão seguro (Brasil / Real)
    return { country: "Brasil", currency: "BRL" };
  }
}

/**
 * Busca taxas de câmbio em tempo real com base em uma moeda de origem (Base).
 * @param {string} baseCurrency Ex: "BRL", "USD", "EUR"
 * @param {string[]} targetCurrencies Lista de moedas a cotar
 * @returns {Promise<Object>} Objeto com as taxas de conversão diretas
 */
export async function fetchExchangeRates(baseCurrency, targetCurrencies) {
  const pairs = targetCurrencies
    .filter((currency) => currency !== baseCurrency)
    .map((currency) => `${currency}-${baseCurrency}`)
    .join(",");

  try {
    const response = await fetch(`${EXCHANGE_API_URL}${pairs}`);
    if (!response.ok) throw new Error("Erro ao obter dados de câmbio");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição das cotações:", error);
    throw error;
  }
}
