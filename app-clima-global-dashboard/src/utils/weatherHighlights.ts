import type { ForecastDay, WeatherData } from "../services/weatherService";

export type HighlightItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

// ======================================================
// RECOMENDAÇÕES CLIMÁTICAS
// ======================================================

export function getHighlights(
  weather: WeatherData | null,
  forecast: ForecastDay[],
): HighlightItem[] {
  if (!weather) {
    return [
      {
        id: "temperature",
        icon: "☀",
        title: "Condições do tempo",
        description: "Pesquise uma cidade",
      },
      {
        id: "rain",
        icon: "💧",
        title: "Precipitação",
        description: "Aguardando informações",
      },
      {
        id: "air",
        icon: "🍃",
        title: "Qualidade do ar",
        description: "Aguardando informações",
      },
      {
        id: "activity",
        icon: "♧",
        title: "Atividades ao ar livre",
        description: "Aguardando informações",
      },
    ];
  }

  const feelsLike = weather.feelsLike;
  const wind = weather.windSpeed;
  const uv = weather.uvIndex;
  const aqi = weather.airQuality?.value ?? null;
  const scene = weather.scene;
  const rainTomorrow = forecast[0]?.rainProbability;

  // ======================================================
  // DESTAQUE 1 — CONDIÇÃO CLIMÁTICA ATUAL
  // ======================================================

  let conditionIcon = "☀";
  let conditionTitle = "Tempo agradável";
  let conditionDescription = "Aproveite o dia";

  if (scene === "storm") {
    conditionIcon = "⚡";
    conditionTitle = "Tempestade";
    conditionDescription = "Procure abrigo seguro";
  } else if (scene === "rain") {
    conditionIcon = "☂";
    conditionTitle = "Tempo chuvoso";
    conditionDescription = "Leve um guarda-chuva";
  } else if (scene === "snow") {
    conditionIcon = "❄";
    conditionTitle = "Tempo com neve";
    conditionDescription = "Use roupas adequadas";
  } else if (scene === "mist") {
    conditionIcon = "☁";
    conditionTitle = "Neblina";
    conditionDescription = "Atenção à visibilidade";
  } else if (feelsLike >= 35) {
    conditionIcon = "🌡";
    conditionTitle = "Calor intenso";
    conditionDescription = "Hidrate-se e evite o sol";
  } else if (feelsLike >= 29) {
    conditionIcon = "☀";
    conditionTitle = "Dia quente";
    conditionDescription = "Use roupas leves";
  } else if (feelsLike <= 10) {
    conditionIcon = "❄";
    conditionTitle = "Dia muito frio";
    conditionDescription = "Agasalhe-se bem";
  } else if (feelsLike <= 17) {
    conditionIcon = "☁";
    conditionTitle = "Dia frio";
    conditionDescription = "Leve um agasalho";
  } else if (scene === "clouds") {
    conditionIcon = "☁";
    conditionTitle = "Céu com nuvens";
    conditionDescription = "Tempo parcialmente nublado";
  } else if (!weather.isDay) {
    conditionIcon = "☾";
    conditionTitle = "Noite tranquila";
    conditionDescription = "Confira a temperatura";
  }

  // ======================================================
  // DESTAQUE 2 — CHUVA E PREVISÃO
  // ======================================================

  let rainIcon = "💧";
  let rainTitle = "Sem chuva no momento";
  let rainDescription = "Confira a previsão";

  if (scene === "storm") {
    rainIcon = "⚡";
    rainTitle = "Risco de tempestade";
    rainDescription = "Evite áreas expostas";
  } else if (scene === "rain") {
    rainIcon = "☂";
    rainTitle = "Chuva na região";
    rainDescription = "Leve um guarda-chuva";
  } else if (scene === "snow") {
    rainIcon = "❄";
    rainTitle = "Neve na região";
    rainDescription = "Cuidado com superfícies";
  } else if (rainTomorrow != null) {
    if (rainTomorrow >= 70) {
      rainTitle = "Possível chuva amanhã";
      rainDescription = `${rainTomorrow}% na previsão de amanhã`;
    } else if (rainTomorrow >= 40) {
      rainTitle = "Chuva possível amanhã";
      rainDescription = `${rainTomorrow}% na previsão de amanhã`;
    } else {
      rainTitle = "Baixa chance amanhã";
      rainDescription = `${rainTomorrow}% na previsão de amanhã`;
    }
  }

  // ======================================================
  // DESTAQUE 3 — QUALIDADE DO AR
  // ======================================================

  let airIcon = "🍃";
  let airTitle = "Qualidade indisponível";
  let airDescription = "Sem dados ambientais";

  if (aqi !== null) {
    if (aqi <= 50) {
      airIcon = "🍃";
      airTitle = "Qualidade do ar boa";
      airDescription = "Ar favorável em geral";
    } else if (aqi <= 100) {
      airIcon = "🍃";
      airTitle = "Qualidade moderada";
      airDescription = "Sensíveis devem observar sintomas";
    } else if (aqi <= 150) {
      airIcon = "⚠";
      airTitle = "Ar ruim para sensíveis";
      airDescription = "Reduza esforço se for sensível";
    } else if (aqi <= 200) {
      airIcon = "⚠";
      airTitle = "Qualidade do ar ruim";
      airDescription = "Evite esforço intenso externo";
    } else {
      airIcon = "⚠";
      airTitle = "Poluição elevada";
      airDescription = "Evite atividades ao ar livre";
    }
  }

  // ======================================================
  // DESTAQUE 4 — ATIVIDADES AO AR LIVRE
  // ======================================================

  let activityIcon: string;
  let activityTitle: string;
  let activityDescription: string;

  if (scene === "storm") {
    activityIcon = "⚡";
    activityTitle = "Evite atividades externas";
    activityDescription = "Risco de tempestade";
  } else if (aqi !== null && aqi > 150) {
    activityIcon = "⚠";
    activityTitle = "Evite exercícios externos";
    activityDescription = "Qualidade do ar ruim";
  } else if (scene === "rain" || scene === "snow") {
    activityIcon = "☂";
    activityTitle = "Prefira locais cobertos";
    activityDescription = "Precipitação na região";
  } else if (scene === "mist") {
    activityIcon = "☁";
    activityTitle = "Atenção ao ar livre";
    activityDescription = "Visibilidade reduzida";
  } else if (feelsLike >= 35) {
    activityIcon = "🌡";
    activityTitle = "Evite esforço intenso";
    activityDescription = "Calor excessivo";
  } else if (wind >= 40) {
    activityIcon = "≋";
    activityTitle = "Ventos fortes";
    activityDescription = "Cuidado em áreas abertas";
  } else if (uv !== null && uv >= 8 && weather.isDay) {
    activityIcon = "☀";
    activityTitle = "Radiação UV elevada";
    activityDescription = "Evite exposição prolongada";
  } else if (aqi !== null && aqi > 100) {
    activityIcon = "⚠";
    activityTitle = "Exercite-se com cautela";
    activityDescription = "Atenção à qualidade do ar";
  } else if (
    weather.isDay &&
    feelsLike >= 18 &&
    feelsLike <= 28 &&
    wind < 30 &&
    aqi !== null &&
    aqi <= 50 &&
    uv !== null &&
    uv < 6
  ) {
    activityIcon = "♧";
    activityTitle = "Bom para exercícios";
    activityDescription = "Condições geralmente favoráveis";
  } else if (!weather.isDay) {
    activityIcon = "☾";
    activityTitle = "Atividades à noite";
    activityDescription = "Confira segurança e temperatura";
  } else {
    activityIcon = "♧";
    activityTitle = "Atividades ao ar livre";
    activityDescription = "Considere o clima antes de sair";
  }

  return [
    {
      id: "temperature",
      icon: conditionIcon,
      title: conditionTitle,
      description: conditionDescription,
    },
    {
      id: "rain",
      icon: rainIcon,
      title: rainTitle,
      description: rainDescription,
    },
    {
      id: "air",
      icon: airIcon,
      title: airTitle,
      description: airDescription,
    },
    {
      id: "activity",
      icon: activityIcon,
      title: activityTitle,
      description: activityDescription,
    },
  ];
}
