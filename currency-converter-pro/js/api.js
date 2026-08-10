/**
 * SERVIÇOS DE INTEGRAÇÃO COM APIS EXTERNAS
 * Arquivo: api.js
 */

const GEOLOCATION_API_URL = "https://ipapi.co/json/";
const EXCHANGE_API_URL = "https://economia.awesomeapi.com.br/last/";

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
    return { country: "Brasil", currency: "BRL" };
  }
}

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
