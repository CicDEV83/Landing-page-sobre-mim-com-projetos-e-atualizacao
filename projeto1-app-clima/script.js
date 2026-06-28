const apiKey = "90ec4b2aeaab85b824b4faedb54889cf";
const intervaloAtualizacao = 30 * 60 * 1000;

const form = document.getElementById("formClima");
const formUsuario = document.getElementById("formUsuario");
const cidadeInput = document.getElementById("cidadeInput");
const nomeInput = document.getElementById("nomeInput");
const usarLocalizacao = document.getElementById("usarLocalizacao");

const saudacao = document.getElementById("saudacao");
const relogio = document.getElementById("relogio");
const dispositivo = document.getElementById("dispositivo");

const cidade = document.getElementById("cidade");
const temperatura = document.getElementById("temperatura");
const temperaturaMinima = document.getElementById("temperaturaMinima");
const temperaturaMaxima = document.getElementById("temperaturaMaxima");
const descricao = document.getElementById("descricao");
const umidade = document.getElementById("umidade");
const sensacao = document.getElementById("sensacao");
const vento = document.getElementById("vento");
const atualizacao = document.getElementById("atualizacao");
const icone = document.getElementById("icone");
const loading = document.getElementById("loading");
const erro = document.getElementById("erro");

const siglasEstadosBrasil = {
  Acre: "AC",
  Alagoas: "AL",
  Amapa: "AP",
  Amazonas: "AM",
  Bahia: "BA",
  Ceara: "CE",
  "Distrito Federal": "DF",
  "Espirito Santo": "ES",
  Goias: "GO",
  Maranhao: "MA",
  "Mato Grosso": "MT",
  "Mato Grosso do Sul": "MS",
  "Minas Gerais": "MG",
  Para: "PA",
  Paraiba: "PB",
  Parana: "PR",
  Pernambuco: "PE",
  Piaui: "PI",
  "Rio de Janeiro": "RJ",
  "Rio Grande do Norte": "RN",
  "Rio Grande do Sul": "RS",
  Rondonia: "RO",
  Roraima: "RR",
  "Santa Catarina": "SC",
  "Sao Paulo": "SP",
  Sergipe: "SE",
  Tocantins: "TO",
};

let ultimaBusca = null;
let atualizacaoAutomaticaId = null;

function chaveConfigurada() {
  return apiKey && !apiKey.includes("SUA_CHAVE");
}

function atualizarRelogio() {
  if (!relogio) return;

  const agora = new Date();
  relogio.textContent = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function atualizarSaudacao() {
  if (!saudacao) return;

  const hora = new Date().getHours();
  const nome = obterNomeUsuario();
  let periodo = "Boa noite";

  if (hora < 12) {
    periodo = "Bom dia";
  } else if (hora < 18) {
    periodo = "Boa tarde";
  }

  saudacao.textContent = nome ? `${periodo}, ${nome}` : periodo;
}

function iniciarRelogio() {
  atualizarRelogio();
  atualizarSaudacao();
  setInterval(atualizarRelogio, 1000);
  setInterval(atualizarSaudacao, 60 * 1000);
}

function prepararUsuario() {
  if (!nomeInput) return;

  nomeInput.value = obterNomeUsuario();
  atualizarDispositivo();
}

function obterNomeUsuario() {
  return localStorage.getItem("nomeUsuarioClima") || "";
}

function salvarNomeUsuario(nome) {
  const nomeFormatado = formatarNome(nome);

  if (!nomeFormatado) {
    localStorage.removeItem("nomeUsuarioClima");
  } else {
    localStorage.setItem("nomeUsuarioClima", nomeFormatado);
  }

  atualizarSaudacao();
}

function formatarNome(nome) {
  return nome.trim().replace(/\s+/g, " ");
}

function atualizarDispositivo() {
  if (!dispositivo) return;

  dispositivo.textContent = `Dispositivo: ${detectarDispositivo()}`;
}

function detectarDispositivo() {
  const userAgent = navigator.userAgent.toLowerCase();
  const largura = window.innerWidth;
  const temToque = navigator.maxTouchPoints > 1;

  if (
    /ipad|tablet/.test(userAgent) ||
    (temToque && largura >= 768 && largura <= 1180)
  ) {
    return "Tablet";
  }

  if (/mobi|android|iphone|ipod/.test(userAgent) || largura < 768) {
    return "Celular";
  }

  return "Computador";
}

function montarUrlGeocoding(nomeCidade) {
  const parametros = new URLSearchParams({
    q: nomeCidade,
    limit: 1,
    appid: apiKey,
  });

  return `https://api.openweathermap.org/geo/1.0/direct?${parametros}`;
}

function montarUrlGeocodingReverso(lat, lon) {
  const parametros = new URLSearchParams({
    lat,
    lon,
    limit: 1,
    appid: apiKey,
  });

  return `https://api.openweathermap.org/geo/1.0/reverse?${parametros}`;
}

function montarUrlPorCoordenadas(lat, lon) {
  const parametros = new URLSearchParams({
    lat,
    lon,
    appid: apiKey,
    units: "metric",
    lang: "pt_br",
  });

  return `https://api.openweathermap.org/data/2.5/weather?${parametros}`;
}

async function buscarLocalizacaoPorCidade(nomeCidade) {
  const resposta = await fetch(montarUrlGeocoding(nomeCidade));
  const dados = await resposta.json();

  if (!resposta.ok || dados.length === 0) {
    throw new Error("Cidade n\u00e3o encontrada.");
  }

  return dados[0];
}

async function buscarLocalizacaoPorCoordenadas(lat, lon) {
  const resposta = await fetch(montarUrlGeocodingReverso(lat, lon));
  const dados = await resposta.json();

  if (!resposta.ok || dados.length === 0) {
    return null;
  }

  return dados[0];
}

async function buscarDadosClima(url) {
  const resposta = await fetch(url);
  const dados = await resposta.json();

  if (!resposta.ok || Number(dados.cod) !== 200) {
    throw new Error(
      dados.message || "N\u00e3o foi poss\u00edvel buscar o clima.",
    );
  }

  return dados;
}

async function buscarClima(nomeCidade) {
  if (!chaveConfigurada()) {
    mostrarErro("Configure sua chave da OpenWeather no arquivo script.js.");
    return;
  }

  try {
    mostrarLoading(true);
    limparErro();

    const localizacao = await buscarLocalizacaoPorCidade(nomeCidade);
    const dados = await buscarDadosClima(
      montarUrlPorCoordenadas(localizacao.lat, localizacao.lon),
    );

    registrarUltimaBusca(localizacao.lat, localizacao.lon, localizacao);
    atualizarTela(dados, localizacao);
  } catch (error) {
    mostrarErro("Cidade n\u00e3o encontrada. Tente novamente.");
    console.error(error);
  } finally {
    mostrarLoading(false);
  }
}

function buscarClimaPorLocalizacao() {
  if (!chaveConfigurada()) {
    mostrarErro("Configure sua chave da OpenWeather no arquivo script.js.");
    return;
  }

  if (!navigator.geolocation) {
    mostrarErro("Seu navegador n\u00e3o suporta geolocaliza\u00e7\u00e3o.");
    return;
  }

  mostrarLoading(true);
  limparErro();

  navigator.geolocation.getCurrentPosition(
    async (posicao) => {
      try {
        const { latitude, longitude } = posicao.coords;
        const localizacao = await buscarLocalizacaoPorCoordenadas(
          latitude,
          longitude,
        );
        const dados = await buscarDadosClima(
          montarUrlPorCoordenadas(latitude, longitude),
        );

        registrarUltimaBusca(latitude, longitude, localizacao);
        atualizarTela(dados, localizacao);
      } catch (error) {
        mostrarErro(
          "N\u00e3o foi poss\u00edvel buscar o clima pela sua localiza\u00e7\u00e3o.",
        );
        console.error(error);
      } finally {
        mostrarLoading(false);
      }
    },
    () => {
      mostrarLoading(false);
      mostrarErro("Permiss\u00e3o de localiza\u00e7\u00e3o negada.");
    },
  );
}

function registrarUltimaBusca(lat, lon, localizacao) {
  ultimaBusca = { lat, lon, localizacao };
  iniciarAtualizacaoAutomatica();
}

function iniciarAtualizacaoAutomatica() {
  if (atualizacaoAutomaticaId) {
    clearInterval(atualizacaoAutomaticaId);
  }

  atualizacaoAutomaticaId = setInterval(
    atualizarClimaAutomaticamente,
    intervaloAtualizacao,
  );
}

async function atualizarClimaAutomaticamente() {
  if (!ultimaBusca || !chaveConfigurada()) return;

  try {
    limparErro();

    const dados = await buscarDadosClima(
      montarUrlPorCoordenadas(ultimaBusca.lat, ultimaBusca.lon),
    );

    atualizarTela(dados, ultimaBusca.localizacao);
  } catch (error) {
    mostrarErro(
      "N\u00e3o foi poss\u00edvel atualizar o clima automaticamente.",
    );
    console.error(error);
  }
}

function atualizarTela(dados, localizacao) {
  if (!dados) return;

  const climaAtual = dados.weather[0];

  cidade.textContent = formatarLocalizacao(dados, localizacao);
  descricao.textContent = traduzirCondicaoClimatica(climaAtual);
  temperatura.textContent = `Temperatura: ${Math.round(dados.main.temp)}°C`;
  sensacao.textContent = `Sensa\u00e7\u00e3o: ${Math.round(dados.main.feels_like)}°C`;
  umidade.textContent = `Umidade: ${dados.main.humidity}%`;
  vento.textContent = `Vento: ${dados.wind.speed.toFixed(1)} m/s`;

  if (temperaturaMinima) {
    temperaturaMinima.textContent = `M\u00ednima: ${Math.round(dados.main.temp_min)}°C`;
  }

  if (temperaturaMaxima) {
    temperaturaMaxima.textContent = `M\u00e1xima: ${Math.round(dados.main.temp_max)}°C`;
  }

  if (atualizacao) {
    atualizacao.textContent = `Atualizado: ${formatarHorario(new Date())}`;
  }

  icone.src = `https://openweathermap.org/img/wn/${climaAtual.icon}@2x.png`;
  icone.alt = `\u00cdcone do clima: ${traduzirCondicaoClimatica(climaAtual)}`;
  icone.hidden = false;

  mudarFundo(climaAtual.main);
}

function formatarLocalizacao(dados, localizacao) {
  const nomeCidade =
    localizacao?.local_names?.pt || localizacao?.name || dados.name;
  const pais = localizacao?.country || dados.sys.country;
  const estado = formatarEstado(localizacao?.state, pais);

  if (estado) {
    return `${nomeCidade}, ${estado} - ${pais}`;
  }

  return `${nomeCidade} - ${pais}`;
}

function formatarEstado(estado, pais) {
  if (!estado) return "";

  const estadoNormalizado = removerAcentos(estado);

  if (pais === "BR" && siglasEstadosBrasil[estadoNormalizado]) {
    return siglasEstadosBrasil[estadoNormalizado];
  }

  return estado;
}

function traduzirCondicaoClimatica(clima) {
  const descricaoApi = capitalizar(clima.description);
  const ehDia = clima.icon.endsWith("d");

  const condicoes = {
    Clear: ehDia ? "Ensolarado" : "C\u00e9u limpo",
    Clouds: traduzirNuvens(clima.description),
    Rain: descricaoApi.includes("leve") ? "Chuva leve" : "Chuva",
    Drizzle: "Garoa",
    Thunderstorm: "Tempestade",
    Snow: "Neve",
    Mist: "Neblina",
    Smoke: "Fuma\u00e7a",
    Haze: "Neblina seca",
    Dust: "Poeira",
    Fog: "Nevoeiro",
    Sand: "Areia no ar",
    Ash: "Cinzas no ar",
    Squall: "Rajadas de vento",
    Tornado: "Tornado",
  };

  return condicoes[clima.main] || descricaoApi;
}

function traduzirNuvens(descricao) {
  const descricaoNormalizada = removerAcentos(descricao.toLowerCase());

  if (descricaoNormalizada.includes("poucas")) return "Poucas nuvens";
  if (descricaoNormalizada.includes("dispersas")) return "Parcialmente nublado";
  if (descricaoNormalizada.includes("quebradas")) return "Nublado";

  return "Nublado";
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function formatarHorario(data) {
  return data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function mostrarLoading(status) {
  loading.hidden = !status;
}

function mostrarErro(mensagem) {
  erro.textContent = mensagem;
  erro.hidden = false;
}

function limparErro() {
  erro.textContent = "";
  erro.hidden = true;
}

function mudarFundo(condicao) {
  const fundos = {
    Clear:
      "radial-gradient(circle at top left, rgba(250, 204, 21, 0.36), transparent 34%), linear-gradient(135deg, #f97316, #0f766e 62%, #0f172a)",
    Clouds:
      "radial-gradient(circle at top left, rgba(226, 232, 240, 0.28), transparent 34%), linear-gradient(135deg, #475569, #0f766e 56%, #111827)",
    Rain: "radial-gradient(circle at top left, rgba(56, 189, 248, 0.34), transparent 34%), linear-gradient(135deg, #0369a1, #164e63 55%, #0f172a)",
    Thunderstorm:
      "radial-gradient(circle at top left, rgba(250, 204, 21, 0.24), transparent 34%), linear-gradient(135deg, #312e81, #111827 55%, #020617)",
    Snow: "radial-gradient(circle at top left, rgba(255, 255, 255, 0.46), transparent 34%), linear-gradient(135deg, #94a3b8, #0f766e 58%, #0f172a)",
  };

  document.body.style.background =
    fundos[condicao] ||
    "radial-gradient(circle at top left, rgba(250, 204, 21, 0.26), transparent 34%), linear-gradient(135deg, #0f766e, #0f172a 58%, #111827)";
}

if (formUsuario) {
  formUsuario.addEventListener("submit", (event) => {
    event.preventDefault();
    salvarNomeUsuario(nomeInput.value);
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const cidadeNome = cidadeInput.value.trim();
    if (!cidadeNome) return;

    buscarClima(cidadeNome);
  });
}

if (usarLocalizacao) {
  usarLocalizacao.addEventListener("click", buscarClimaPorLocalizacao);
}

window.addEventListener("resize", atualizarDispositivo);

prepararUsuario();
iniciarRelogio();
