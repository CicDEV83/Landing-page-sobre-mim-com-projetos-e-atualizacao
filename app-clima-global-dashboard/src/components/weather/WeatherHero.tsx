import type { WeatherData } from "../../services/weatherService";

// ======================================================
// TIPOS DO COMPONENTE
// ======================================================

type WeatherHeroProps = {
  weather: WeatherData | null;
  isLoading: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

// ======================================================
// FORMATAÇÃO DE DADOS
// ======================================================

function formatTemperature(value: number): string {
  return `${Math.round(value)}°C`;
}

function getLocalDate(timezone: number): string {
  const localTime = new Date(Date.now() + timezone * 1000);

  return localTime.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

// ======================================================
// SAUDAÇÃO CLIMÁTICA
// ======================================================

function getGreeting(weather: WeatherData): {
  icon: string;
  title: string;
  description: string;
} {
  if (!weather.isDay) {
    return {
      icon: "☾",
      title: "Boa noite!",
      description: `Confira o clima noturno em ${weather.city}.`,
    };
  }

  switch (weather.scene) {
    case "clear":
      return {
        icon: "☀",
        title: "Um lindo dia!",
        description: `Céu limpo em ${weather.city}.`,
      };

    case "rain":
      return {
        icon: "☂",
        title: "Prepare o guarda-chuva!",
        description: `Há condições de chuva em ${weather.city}.`,
      };

    case "storm":
      return {
        icon: "⚡",
        title: "Atenção ao tempo!",
        description: `Há condições de tempestade em ${weather.city}.`,
      };

    case "snow":
      return {
        icon: "❄",
        title: "Dia de frio!",
        description: `Há condições de neve em ${weather.city}.`,
      };

    case "mist":
      return {
        icon: "☁",
        title: "Visibilidade reduzida",
        description: `Há névoa ou condições semelhantes em ${weather.city}.`,
      };

    case "clouds":
    default:
      return {
        icon: "☁",
        title: "Dia de nuvens!",
        description: `Confira as condições em ${weather.city}.`,
      };
  }
}

// ======================================================
// PAINEL CLIMÁTICO PRINCIPAL
// ======================================================

export function WeatherHero({
  weather,
  isLoading,
  isFavorite,
  onToggleFavorite,
}: WeatherHeroProps) {
  const scene = weather?.scene ?? "default";

  const period = weather ? (weather.isDay ? "day" : "night") : "default";

  const greeting = weather
    ? getGreeting(weather)
    : {
        icon: "☀",
        title: "Bem-vindo ao App Clima Global!",
        description: "Consulte as condições da sua cidade.",
      };

  return (
    <section
      className="weather-hero"
      data-scene={scene}
      data-period={period}
      aria-labelledby="weather-city"
      aria-busy={isLoading}
    >
      <div className="weather-hero__content">
        <p className="weather-hero__location">
          <span aria-hidden="true">♧</span> Clima atual
        </p>

        <h2 id="weather-city">
          {weather
            ? `${weather.city}, ${weather.country}`
            : "Pesquise uma cidade"}
        </h2>

        {weather && (
          <button
            className="weather-hero__favorite-button"
            type="button"
            onClick={onToggleFavorite}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite
                ? `Remover ${weather.city} dos favoritos`
                : `Salvar ${weather.city} nos favoritos`
            }
            title={
              isFavorite
                ? "Remover dos favoritos"
                : "Salvar cidade nos favoritos"
            }
          >
            <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>

            {isFavorite ? "Salva" : "Salvar cidade"}
          </button>
        )}

        <p className="weather-hero__date">
          {weather
            ? getLocalDate(weather.timezone)
            : "Informações meteorológicas em tempo real"}
        </p>

        <div className="weather-hero__temperature">
          {weather ? Math.round(weather.temperature) : "--"}
          <span>°C</span>
        </div>

        <p className="weather-hero__condition">
          {weather?.description ?? "Aguardando consulta meteorológica"}
        </p>

        <p className="weather-hero__feels">
          Sensação térmica:{" "}
          {weather ? formatTemperature(weather.feelsLike) : "--"}
        </p>
      </div>

      {/* CENÁRIO VISUAL */}

      <div className="weather-hero__decoration" aria-hidden="true">
        <div className="weather-hero__sun" />
        <div className="weather-hero__cloud">☁</div>
      </div>

      {/* SAUDAÇÃO */}

      <div className="weather-hero__greeting">
        <span aria-hidden="true">{greeting.icon}</span>

        <div>
          <strong>{greeting.title}</strong>
          <small>{greeting.description}</small>
        </div>
      </div>

      {/* INDICADORES FLUTUANTES */}

      <div className="weather-hero__floating-cards">
        <div>
          <small>Qualidade do ar</small>

          <strong
            title={
              weather?.airQuality
                ? `AQI ${weather.airQuality.value}`
                : "Dados indisponíveis"
            }
          >
            {weather?.airQuality?.label ?? "--"}
          </strong>
        </div>

        <div>
          <small>Índice UV</small>

          <strong>
            {weather?.uvIndex != null ? weather.uvIndex.toFixed(1) : "--"}
          </strong>
        </div>
      </div>
    </section>
  );
}
