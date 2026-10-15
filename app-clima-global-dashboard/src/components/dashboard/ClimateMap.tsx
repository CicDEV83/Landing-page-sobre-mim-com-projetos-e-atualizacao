import { useEffect, useState } from "react";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "../../styles/climate-map.css";

// ======================================================
// CONFIGURAÇÃO OPENWEATHERMAP
// ======================================================

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// ======================================================
// TIPOS
// ======================================================

interface ClimateMapProps {
  latitude?: number;
  longitude?: number;
  city?: string;
}

interface MapLocationProps {
  latitude: number;
  longitude: number;
}

type WeatherLayer =
  | "normal"
  | "temperature"
  | "precipitation"
  | "clouds"
  | "wind";

interface LayerConfig {
  label: string;
  apiLayer: string | null;
  opacity: number;
}

// ======================================================
// CONFIGURAÇÃO DAS CAMADAS
// ======================================================

const WEATHER_LAYERS: Record<WeatherLayer, LayerConfig> = {
  normal: {
    label: "Mapa normal",
    apiLayer: null,
    opacity: 1,
  },

  temperature: {
    label: "Temperatura",
    apiLayer: "temp_new",
    opacity: 0.65,
  },

  precipitation: {
    label: "Chuva",
    apiLayer: "precipitation_new",
    opacity: 0.7,
  },

  clouds: {
    label: "Nuvens",
    apiLayer: "clouds_new",
    opacity: 0.65,
  },

  wind: {
    label: "Vento",
    apiLayer: "wind_new",
    opacity: 0.65,
  },
};

// ======================================================
// CENTRALIZAÇÃO AUTOMÁTICA
// ======================================================

function MapLocation({ latitude, longitude }: MapLocationProps) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], 8, { animate: true });
  }, [map, latitude, longitude]);

  return null;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export function ClimateMap({
  latitude = -15.7801,
  longitude = -47.9292,
  city = "Brasília",
}: ClimateMapProps) {
  const [activeLayer, setActiveLayer] = useState<WeatherLayer>("normal");

  const [layerError, setLayerError] = useState(false);

  const selectedLayer = WEATHER_LAYERS[activeLayer];

  const hasApiKey = typeof API_KEY === "string" && API_KEY.trim().length > 0;

  const showWeatherOverlay = selectedLayer.apiLayer !== null && hasApiKey;

  function handleLayerChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLayer = event.target.value as WeatherLayer;

    setLayerError(false);
    setActiveLayer(nextLayer);
  }

  return (
    <div className="climate-map">
      {/* SELETOR DE CAMADAS */}

      <div className="climate-map__layer-control">
        <label htmlFor="climate-layer-select" className="sr-only">
          Selecionar camada meteorológica
        </label>

        <select
          id="climate-layer-select"
          className="climate-map__select"
          value={activeLayer}
          onChange={handleLayerChange}
          title="Escolher visualização climática"
        >
          {(Object.keys(WEATHER_LAYERS) as WeatherLayer[]).map((layer) => (
            <option key={layer} value={layer}>
              {WEATHER_LAYERS[layer].label}
            </option>
          ))}
        </select>
      </div>

      {/* MAPA LEAFLET */}

      <MapContainer
        center={[latitude, longitude]}
        zoom={8}
        scrollWheelZoom={false}
        className="climate-map__container"
      >
        {/* MAPA GEOGRÁFICO ORIGINAL */}

        <TileLayer
          attribution={
            '&copy; <a href="https://www.openstreetmap.org/copyright">' +
            "OpenStreetMap</a> contributors"
          }
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* CAMADA METEOROLÓGICA */}

        {showWeatherOverlay && (
          <TileLayer
            key={activeLayer}
            url={
              `https://tile.openweathermap.org/map/` +
              `${selectedLayer.apiLayer}/{z}/{x}/{y}.png` +
              `?appid=${API_KEY}`
            }
            attribution="&copy; OpenWeatherMap"
            opacity={selectedLayer.opacity}
            zIndex={250}
            eventHandlers={{
              tileerror: () => setLayerError(true),
            }}
          />
        )}

        {/* ATUALIZA A LOCALIZAÇÃO */}

        <MapLocation latitude={latitude} longitude={longitude} />

        {/* MARCADOR DA CIDADE */}

        <Marker position={[latitude, longitude]}>
          <Popup>
            <strong>{city}</strong>

            <p>Localização da cidade consultada.</p>
          </Popup>
        </Marker>
      </MapContainer>

      {/* AVISOS DE DISPONIBILIDADE */}

      {activeLayer !== "normal" && !hasApiKey && (
        <p className="climate-map__notice" role="status">
          Chave da API não configurada.
        </p>
      )}

      {showWeatherOverlay && layerError && (
        <p className="climate-map__notice" role="status">
          Não foi possível carregar a camada climática.
        </p>
      )}
    </div>
  );
}
