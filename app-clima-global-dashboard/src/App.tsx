import { useEffect, useRef, useState } from "react";

import {
  getWeather,
  type ForecastDay,
  type WeatherData,
  type WeatherQuery,
} from "./services/weatherService";

import { Sidebar, type NavigationId } from "./components/layout/Sidebar";

import { Topbar } from "./components/layout/Topbar";
import { ClimateMap } from "./components/dashboard/ClimateMap";

import "./styles/variables.css";
import "./styles/layout.css";
import "./styles/light-mode.css";
import "./styles/mobile-dashboard.css";
import { getHighlights } from "./utils/weatherHighlights";
import { WeatherHero } from "./components/weather/WeatherHero";

// ======================================================
// TIPOS
// ======================================================

type Theme = "dark" | "light";

type FavoriteCity = {
  id: string;
  city: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
};

const FAVORITES_STORAGE_KEY = "app-clima-favorite-cities";

// ======================================================
// CIDADES FAVORITAS
// ======================================================

function favoriteId(city: string, country: string): string {
  return `${city.trim().toLocaleLowerCase("pt-BR")}|${country.trim().toLowerCase()}`;
}

function toFavorite(weather: WeatherData): FavoriteCity {
  return {
    id: favoriteId(weather.city, weather.country),
    city: weather.city,
    country: weather.country,
    temperature: weather.temperature,
    description: weather.description,
    icon: weather.icon,
  };
}

function getInitialFavorites(): FavoriteCity[] {
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    const valid: FavoriteCity[] = [];
    const seen = new Set<string>();

    for (const item of parsed) {
      if (
        typeof item !== "object" ||
        item === null ||
        typeof item.city !== "string" ||
        typeof item.country !== "string" ||
        typeof item.temperature !== "number" ||
        !Number.isFinite(item.temperature) ||
        typeof item.description !== "string" ||
        typeof item.icon !== "string" ||
        !item.city.trim() ||
        !item.country.trim()
      ) {
        continue;
      }

      const city = item.city.trim();
      const country = item.country.trim();
      const id = favoriteId(city, country);

      if (seen.has(id)) continue;

      seen.add(id);

      valid.push({
        id,
        city,
        country,
        temperature: item.temperature,
        description: item.description,
        icon: item.icon,
      });
    }

    return valid;
  } catch {
    return [];
  }
}

// ======================================================
// TEMA
// ======================================================

function getInitialTheme(): Theme {
  try {
    return localStorage.getItem("app-clima-theme") === "light"
      ? "light"
      : "dark";
  } catch {
    return "dark";
  }
}

// ======================================================
// FORMATAÇÃO DO RELÓGIO
// ======================================================

function formatClock(
  timestamp: number,
  timezone?: number,
): {
  time: string;
  date: string;
} {
  const date =
    timezone === undefined
      ? new Date(timestamp)
      : new Date(timestamp + timezone * 1000);

  const timeZone = timezone === undefined ? undefined : "UTC";

  return {
    time: date.toLocaleTimeString("pt-BR", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),

    date: date.toLocaleDateString("pt-BR", {
      timeZone,
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

function App() {
  // ====================================================
  // ESTADOS
  // ====================================================

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const [message, setMessage] = useState(
    "Busque uma cidade ou utilize sua localização para consultar o clima.",
  );

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [favorites, setFavorites] =
    useState<FavoriteCity[]>(getInitialFavorites);

  const [currentTime, setCurrentTime] = useState(() => Date.now());

  const requestId = useRef(0);

  // ====================================================
  // RELÓGIO EM TEMPO REAL
  // ====================================================

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const clock = formatClock(currentTime, weather?.timezone);

  // ====================================================
  // ARMAZENAMENTO DOS FAVORITOS
  // ====================================================

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Mantém os favoritos durante a sessão.
    }
  }, [favorites]);

  // ====================================================
  // FAVORITOS
  // ====================================================

  const currentFavoriteId = weather
    ? favoriteId(weather.city, weather.country)
    : null;

  const isFavorite =
    currentFavoriteId !== null &&
    favorites.some((item) => item.id === currentFavoriteId);

  function toggleFavorite() {
    if (!weather) return;

    const favorite = toFavorite(weather);

    const alreadySaved = favorites.some((item) => item.id === favorite.id);

    setFavorites((current) =>
      current.some((item) => item.id === favorite.id)
        ? current.filter((item) => item.id !== favorite.id)
        : [...current, favorite],
    );

    setMessage(
      alreadySaved
        ? `${weather.city} removida das cidades favoritas.`
        : `${weather.city} adicionada às cidades favoritas.`,
    );
  }

  function removeFavorite(id: string) {
    setFavorites((current) => current.filter((item) => item.id !== id));

    setMessage("Cidade removida dos favoritos.");
  }

  function handleFavoriteSearch(favorite: FavoriteCity) {
    void loadWeather({
      city: `${favorite.city},${favorite.country}`,
    });
  }

  // ====================================================
  // TEMA
  // ====================================================

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);

    try {
      localStorage.setItem("app-clima-theme", nextTheme);
    } catch {
      // O tema continua funcionando nesta sessão.
    }
  }

  // ====================================================
  // CONSULTA METEOROLÓGICA
  // ====================================================

  async function loadWeather(query: WeatherQuery, activeRequestId?: number) {
    const currentRequest = activeRequestId ?? ++requestId.current;

    setIsLoading(true);

    setMessage("Consultando informações meteorológicas...");

    try {
      const result = await getWeather(query);

      if (currentRequest !== requestId.current) {
        return;
      }

      const updatedFavorite = toFavorite(result.current);

      setFavorites((current) => {
        if (!current.some((item) => item.id === updatedFavorite.id)) {
          return current;
        }

        return current.map((item) =>
          item.id === updatedFavorite.id ? updatedFavorite : item,
        );
      });

      setWeather(result.current);
      setForecast(result.forecast);

      setMessage(
        `Dados meteorológicos de ${result.current.city}, ` +
          `${result.current.country}, atualizados com sucesso.`,
      );
    } catch (error) {
      if (currentRequest !== requestId.current) {
        return;
      }

      setMessage(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado ao consultar o clima.",
      );
    } finally {
      if (currentRequest === requestId.current) {
        setIsLoading(false);
      }
    }
  }

  // ====================================================
  // BUSCA POR CIDADE
  // ====================================================

  function handleSearch(city: string) {
    void loadWeather({ city });
  }

  // ====================================================
  // GEOLOCALIZAÇÃO
  // ====================================================

  function handleUseLocation() {
    const currentRequest = ++requestId.current;

    if (!navigator.geolocation) {
      setIsLoading(false);

      setMessage("Seu navegador não oferece suporte à geolocalização.");

      return;
    }

    setIsLoading(true);
    setMessage("Solicitando permissão de localização...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (currentRequest !== requestId.current) {
          return;
        }

        void loadWeather(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          currentRequest,
        );
      },
      (error) => {
        if (currentRequest !== requestId.current) {
          return;
        }

        setIsLoading(false);

        if (error.code === 1) {
          setMessage(
            "Permissão de localização não concedida. " +
              "Você também pode pesquisar pelo nome da cidade.",
          );
        } else if (error.code === 3) {
          setMessage("O tempo para obter sua localização foi esgotado.");
        } else {
          setMessage("Não foi possível obter sua localização.");
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }

  // ====================================================
  // NAVEGAÇÃO LATERAL
  // ====================================================

  function handleNavigation(item: NavigationId) {
    switch (item) {
      case "inicio":
        document.getElementById("inicio")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;

      case "buscar": {
        const searchInput = document.getElementById("weather-search");

        if (searchInput instanceof HTMLInputElement) {
          searchInput.focus();
        } else {
          setMessage("Campo de pesquisa não encontrado.");
        }

        break;
      }

      case "localizacao":
        handleUseLocation();
        break;

      case "salvas":
      case "mapas":
        document.getElementById(item)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;

      case "alertas":
        setMessage(
          "O painel de alertas meteorológicos ainda está em desenvolvimento.",
        );

        document.querySelector(".dashboard-status")?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
        break;

      case "configuracoes":
        setMessage("O painel de configurações ainda está em desenvolvimento.");

        document.querySelector(".dashboard-status")?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
        break;
    }
  }

  // ====================================================
  // INDICADORES METEOROLÓGICOS
  // ====================================================

  const metrics = [
    {
      label: "Umidade",
      icon: "💧",
      value: weather ? `${weather.humidity}%` : "--",
    },
    {
      label: "Vento",
      icon: "≋",
      value: weather ? `${Math.round(weather.windSpeed)} km/h` : "--",
    },
    {
      label: "Pressão atmosférica",
      icon: "♧",
      value: weather ? `${weather.pressure} hPa` : "--",
    },
    {
      label: "Índice UV",
      icon: "☀",
      value: weather?.uvIndex != null ? weather.uvIndex.toFixed(1) : "--",
    },
    {
      label: "Nascer do sol",
      icon: "◒",
      value: weather?.sunrise ?? "--:--",
    },
    {
      label: "Pôr do sol",
      icon: "◓",
      value: weather?.sunset ?? "--:--",
    },
  ];

  const highlights = getHighlights(weather, forecast);

  // ====================================================
  // RENDERIZAÇÃO
  // ====================================================

  return (
    <div className="clima-page" data-theme={theme}>
      <div className="clima-page__ambient" aria-hidden="true" />

      {/* CABEÇALHO EXTERNO */}

      <div className="dashboard-heading">
        <div>
          <h1>
            App Clima <span>Global</span>
          </h1>

          <p>Uma experiência climática moderna e responsiva.</p>
        </div>

        <div className="dashboard-heading__tags">
          <span>Moderno</span>
          <span>Responsivo</span>
          <span>React + TS</span>
        </div>
      </div>

      <div className="dashboard-shell">
        <Sidebar
          favoritesCount={favorites.length}
          onNavigate={handleNavigation}
        />

        <main className="dashboard-main" id="inicio">
          <Topbar
            theme={theme}
            onToggleTheme={toggleTheme}
            onSearch={handleSearch}
            onUseLocation={handleUseLocation}
          />

          <div className="dashboard-content">
            {/* COLUNA PRINCIPAL */}

            <div className="dashboard-primary">
              {/* PAINEL CLIMÁTICO */}

              <WeatherHero
                weather={weather}
                isLoading={isLoading}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />

              {/* INDICADORES METEOROLÓGICOS */}

              <section
                className="weather-metrics"
                aria-label="Indicadores meteorológicos"
              >
                {metrics.map((metric) => (
                  <article className="metric-card" key={metric.label}>
                    <span className="metric-card__icon" aria-hidden="true">
                      {metric.icon}
                    </span>

                    <div>
                      <h3>{metric.label}</h3>
                      <strong>{metric.value}</strong>
                    </div>
                  </article>
                ))}
              </section>

              {/* LOCALIZAÇÃO — VERSÃO MOBILE */}

              <button
                type="button"
                className="mobile-location-button"
                onClick={handleUseLocation}
              >
                <span aria-hidden="true">◎</span>
                Usar minha localização
              </button>

              {/* PREVISÃO DE CINCO DIAS */}

              <section
                className="forecast-panel"
                id="previsao"
                aria-labelledby="forecast-title"
              >
                <div className="panel-heading">
                  <div>
                    <h2 id="forecast-title">
                      <span aria-hidden="true">♧</span> Previsão de 5 dias
                    </h2>

                    <p>Confira a previsão para os próximos dias.</p>
                  </div>

                  <span className="panel-heading__pending">
                    {isLoading
                      ? "Atualizando..."
                      : forecast.length > 0
                        ? "Previsão atualizada"
                        : "Aguardando dados"}
                  </span>
                </div>

                <div className="forecast-grid">
                  {forecast.length === 0 ? (
                    <p className="forecast-empty">
                      {isLoading
                        ? "Carregando previsão..."
                        : "Busque uma cidade para visualizar a previsão."}
                    </p>
                  ) : (
                    forecast.map((day) => (
                      <article className="forecast-card" key={day.date}>
                        <h3>{day.weekday}</h3>

                        <img
                          className="forecast-card__weather-icon"
                          src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                          alt={day.description}
                          width="52"
                          height="52"
                          loading="lazy"
                        />

                        <strong>
                          {Math.round(day.max)}°
                          <span className="forecast-card__minimum">
                            {" "}
                            {Math.round(day.min)}°
                          </span>
                        </strong>

                        <small>{day.description}</small>

                        <span className="forecast-card__rain">
                          💧 {day.rainProbability}%
                        </span>
                      </article>
                    ))
                  )}
                </div>
              </section>
            </div>

            {/* COLUNA DIREITA */}

            <aside className="dashboard-secondary">
              {/* CIDADES SALVAS */}

              <section
                className="saved-cities"
                id="salvas"
                aria-labelledby="saved-cities-title"
              >
                <div className="panel-heading">
                  <h2 id="saved-cities-title">Cidades salvas</h2>

                  <span className="panel-heading__pending">
                    {favorites.length}{" "}
                    {favorites.length === 1 ? "cidade" : "cidades"}
                  </span>
                </div>

                {favorites.length === 0 ? (
                  <div className="saved-cities__empty">
                    <span aria-hidden="true">♡</span>

                    <p>Suas cidades favoritas aparecerão aqui.</p>
                  </div>
                ) : (
                  <div className="saved-cities__list">
                    {favorites.map((favorite) => (
                      <article className="saved-cities__item" key={favorite.id}>
                        <button
                          className="saved-cities__city-button"
                          type="button"
                          onClick={() => handleFavoriteSearch(favorite)}
                          title={`Consultar novamente o clima em ${favorite.city}`}
                          disabled={isLoading}
                        >
                          <img
                            src={`https://openweathermap.org/img/wn/${favorite.icon}@2x.png`}
                            alt=""
                            width="38"
                            height="38"
                            loading="lazy"
                          />

                          <span className="saved-cities__city-info">
                            <strong>
                              {favorite.city}, {favorite.country}
                            </strong>

                            <small>{favorite.description}</small>
                          </span>

                          <strong className="saved-cities__temperature">
                            {Math.round(favorite.temperature)}°
                          </strong>
                        </button>

                        <button
                          className="saved-cities__remove"
                          type="button"
                          aria-label={`Remover ${favorite.city} dos favoritos`}
                          title="Remover dos favoritos"
                          onClick={() => removeFavorite(favorite.id)}
                        >
                          ×
                        </button>
                      </article>
                    ))}

                    <p className="saved-cities__notice">
                      Temperatura da última consulta. Clique para atualizar.
                    </p>
                  </div>
                )}
              </section>

              {/* MAPA CLIMÁTICO */}

              <section
                className="weather-map"
                id="mapas"
                aria-labelledby="weather-map-title"
              >
                <div className="weather-map__visual">
                  <ClimateMap
                    latitude={weather?.latitude}
                    longitude={weather?.longitude}
                    city={weather?.city}
                  />
                </div>

                <div className="weather-map__information">
                  <span className="weather-map__icon" aria-hidden="true">
                    ◉
                  </span>

                  <div>
                    <h2 id="weather-map-title">Mapa climático</h2>

                    <p>
                      Explore as condições meteorológicas de diferentes regiões.
                    </p>
                  </div>
                </div>

                <span className="weather-map__pending">
                  Mapa interativo • Zoom e localização
                </span>
              </section>
            </aside>
          </div>

          {/* ============================================
              NOVO RODAPÉ PREMIUM
              ============================================ */}

          <footer className="dashboard-footer">
            {/* RELÓGIO */}

            <div className="dashboard-clock">
              <span className="dashboard-clock__icon" aria-hidden="true">
                ◷
              </span>

              <div className="dashboard-clock__details">
                <strong className="dashboard-clock__time">{clock.time}</strong>

                <small className="dashboard-clock__date">{clock.date}</small>

                <span className="dashboard-clock__city">
                  <span aria-hidden="true">⌖ </span>

                  {weather
                    ? `${weather.city}, ${weather.country}`
                    : "Horário do dispositivo"}
                </span>
              </div>
            </div>

            {/* DESTAQUES DO CLIMA */}

            <div className="dashboard-highlights">
              <h2>Destaques do clima hoje</h2>

              <div className="dashboard-highlights__grid">
                {highlights.map((highlight) => (
                  <article className="dashboard-highlight" key={highlight.id}>
                    <span
                      className="dashboard-highlight__icon"
                      aria-hidden="true"
                    >
                      {highlight.icon}
                    </span>

                    <div>
                      <strong>{highlight.title}</strong>

                      <small>{highlight.description}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </footer>

          {/* MENSAGENS DE STATUS */}

          <p className="dashboard-status" role="status" aria-live="polite">
            {message}
          </p>
        </main>
      </div>
    </div>
  );
}

export default App;
