const BASE_URL = "https://api.openweathermap.org/data/2.5";
const AIR_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export type WeatherScene =
  | "clear"
  | "clouds"
  | "rain"
  | "storm"
  | "snow"
  | "mist";

export interface AirQuality {
  value: number;
  label: string;
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  isDay: boolean;
  scene: WeatherScene;
  icon: string;
  timezone: number;
  airQuality: AirQuality | null;
  uvIndex: number | null;
}

export interface ForecastDay {
  date: string;
  weekday: string;
  min: number;
  max: number;
  description: string;
  icon: string;
  rainProbability: number;
}

export interface WeatherResult {
  current: WeatherData;
  forecast: ForecastDay[];
}

export type WeatherQuery =
  | { city: string }
  | { latitude: number; longitude: number };

interface WeatherResponse {
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  timezone: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg?: number;
  };
  weather: Array<{
    id: number;
    description: string;
    icon: string;
  }>;
}

interface ForecastResponse {
  city: {
    timezone: number;
  };
  list: Array<{
    dt: number;
    main: {
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    pop?: number;
  }>;
}

interface AirQualityResponse {
  current?: {
    us_aqi?: number | null;
    uv_index?: number | null;
  };
}

interface EnvironmentalData {
  airQuality: AirQuality | null;
  uvIndex: number | null;
}

// ======================================================
// CONFIGURAÇÃO DA API
// ======================================================

function ensureApiKey(): string {
  if (!API_KEY || !API_KEY.trim()) {
    throw new Error(
      "Chave da OpenWeatherMap não configurada. " +
        "Verifique o arquivo .env.local.",
    );
  }

  return API_KEY.trim();
}

// ======================================================
// REQUISIÇÕES OPENWEATHERMAP
// ======================================================

async function requestApi<T>(
  endpoint: string,
  parameters: URLSearchParams,
): Promise<T> {
  const apiKey = ensureApiKey();

  parameters.set("appid", apiKey);
  parameters.set("units", "metric");
  parameters.set("lang", "pt_br");

  let response: Response;

  try {
    response = await fetch(`${BASE_URL}/${endpoint}?${parameters.toString()}`);
  } catch {
    throw new Error(
      "Não foi possível conectar à OpenWeatherMap. " +
        "Verifique sua conexão com a internet.",
    );
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Chave da OpenWeatherMap inválida ou ainda não ativada.");
    }

    if (response.status === 404) {
      throw new Error("Cidade não encontrada. Verifique o nome digitado.");
    }

    if (response.status === 429) {
      throw new Error("Limite de consultas da OpenWeatherMap atingido.");
    }

    if (response.status >= 500) {
      throw new Error(
        "O serviço meteorológico está temporariamente indisponível.",
      );
    }

    throw new Error(
      `Não foi possível consultar o clima. Erro HTTP ${response.status}.`,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new Error("A OpenWeatherMap retornou uma resposta inválida.");
  }
}

// ======================================================
// CLASSIFICAÇÃO DA QUALIDADE DO AR — US AQI
// ======================================================

function getAirQualityLabel(value: number): string {
  if (value <= 50) return "Boa";
  if (value <= 100) return "Moderada";
  if (value <= 150) return "Ruim para sensíveis";
  if (value <= 200) return "Ruim";
  if (value <= 300) return "Muito ruim";
  return "Perigosa";
}

// ======================================================
// CONSULTA DE QUALIDADE DO AR E UV
// ======================================================

async function getEnvironmentalData(
  latitude: number,
  longitude: number,
): Promise<EnvironmentalData> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "us_aqi,uv_index",
  });

  const response = await fetch(`${AIR_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(
      `Falha ao consultar indicadores ambientais: HTTP ${response.status}.`,
    );
  }

  const data = (await response.json()) as AirQualityResponse;

  const rawAqi = data.current?.us_aqi;
  const rawUv = data.current?.uv_index;

  const validAqi =
    typeof rawAqi === "number" && Number.isFinite(rawAqi) && rawAqi >= 0;

  const validUv =
    typeof rawUv === "number" && Number.isFinite(rawUv) && rawUv >= 0;

  const airQuality: AirQuality | null = validAqi
    ? {
        value: Math.round(rawAqi as number),
        label: getAirQualityLabel(rawAqi as number),
      }
    : null;

  return {
    airQuality,
    uvIndex: validUv ? (rawUv as number) : null,
  };
}

// ======================================================
// CONDIÇÕES CLIMÁTICAS
// ======================================================

function getScene(conditionId: number): WeatherScene {
  if (conditionId >= 200 && conditionId < 300) {
    return "storm";
  }

  if (conditionId >= 300 && conditionId < 600) {
    return "rain";
  }

  if (conditionId >= 600 && conditionId < 700) {
    return "snow";
  }

  if (conditionId >= 700 && conditionId < 800) {
    return "mist";
  }

  if (conditionId === 800) {
    return "clear";
  }

  return "clouds";
}

// ======================================================
// FORMATAÇÃO DE HORÁRIOS
// ======================================================

function formatLocalTime(timestamp: number, timezone: number): string {
  return new Date((timestamp + timezone) * 1000).toLocaleTimeString("pt-BR", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function getLocalDateKey(timestamp: number, timezone: number): string {
  return new Date((timestamp + timezone) * 1000).toISOString().slice(0, 10);
}

// ======================================================
// NORMALIZAÇÃO DO CLIMA ATUAL
// ======================================================

function normalizeWeather(
  data: WeatherResponse,
  environmental: EnvironmentalData,
): WeatherData {
  const condition = data.weather?.[0];

  if (!condition) {
    throw new Error("A API não retornou uma condição meteorológica válida.");
  }

  return {
    city: data.name,
    country: data.sys.country,
    latitude: data.coord.lat,
    longitude: data.coord.lon,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    description: condition.description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed * 3.6,
    windDirection: data.wind.deg ?? 0,
    pressure: data.main.pressure,

    sunrise: formatLocalTime(data.sys.sunrise, data.timezone),

    sunset: formatLocalTime(data.sys.sunset, data.timezone),

    isDay: data.dt >= data.sys.sunrise && data.dt < data.sys.sunset,

    scene: getScene(condition.id),
    icon: condition.icon,
    timezone: data.timezone,

    airQuality: environmental.airQuality,
    uvIndex: environmental.uvIndex,
  };
}

// ======================================================
// PREVISÃO DE CINCO DIAS
// ======================================================

function normalizeForecast(data: ForecastResponse): ForecastDay[] {
  const entries = new Map<string, ForecastResponse["list"]>();

  const today = getLocalDateKey(Date.now() / 1000, data.city.timezone);

  for (const item of data.list) {
    const dayKey = getLocalDateKey(item.dt, data.city.timezone);

    if (dayKey <= today) continue;

    const items = entries.get(dayKey) ?? [];
    items.push(item);
    entries.set(dayKey, items);
  }

  return Array.from(entries.entries())
    .slice(0, 5)
    .map(([date, items]) => {
      const representative = items.reduce((selected, current) => {
        const selectedHour = new Date(
          (selected.dt + data.city.timezone) * 1000,
        ).getUTCHours();

        const currentHour = new Date(
          (current.dt + data.city.timezone) * 1000,
        ).getUTCHours();

        return Math.abs(currentHour - 12) < Math.abs(selectedHour - 12)
          ? current
          : selected;
      });

      const condition = representative.weather[0];

      return {
        date,

        weekday: new Date(`${date}T12:00:00Z`).toLocaleDateString("pt-BR", {
          weekday: "short",
          timeZone: "UTC",
        }),

        min: Math.min(...items.map((item) => item.main.temp_min)),

        max: Math.max(...items.map((item) => item.main.temp_max)),

        description: condition?.description ?? "Sem descrição",

        icon: condition?.icon ?? "01d",

        rainProbability: Math.round(
          Math.max(...items.map((item) => item.pop ?? 0)) * 100,
        ),
      };
    });
}

// ======================================================
// VALIDAÇÃO DA BUSCA
// ======================================================

function createQueryParams(query: WeatherQuery): URLSearchParams {
  const params = new URLSearchParams();

  if ("city" in query) {
    const city = query.city.trim();

    if (!city) {
      throw new Error("Digite o nome de uma cidade para pesquisar.");
    }

    params.set("q", city);
    return params;
  }

  const { latitude, longitude } = query;

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error("As coordenadas de localização são inválidas.");
  }

  params.set("lat", String(latitude));
  params.set("lon", String(longitude));

  return params;
}

// ======================================================
// CONSULTA METEOROLÓGICA COMPLETA
// ======================================================

export async function getWeather(query: WeatherQuery): Promise<WeatherResult> {
  const params = createQueryParams(query);

  const [currentResponse, forecastResponse] = await Promise.all([
    requestApi<WeatherResponse>("weather", new URLSearchParams(params)),

    requestApi<ForecastResponse>("forecast", new URLSearchParams(params)),
  ]);

  // A consulta ambiental usa as coordenadas reais
  // retornadas pela OpenWeatherMap.
  //
  // Se o serviço ambiental falhar, a temperatura
  // e a previsão continuam funcionando normalmente.

  let environmental: EnvironmentalData = {
    airQuality: null,
    uvIndex: null,
  };

  try {
    environmental = await getEnvironmentalData(
      currentResponse.coord.lat,
      currentResponse.coord.lon,
    );
  } catch (error) {
    console.warn("Indicadores ambientais indisponíveis:", error);
  }

  return {
    current: normalizeWeather(currentResponse, environmental),

    forecast: normalizeForecast(forecastResponse),
  };
}
