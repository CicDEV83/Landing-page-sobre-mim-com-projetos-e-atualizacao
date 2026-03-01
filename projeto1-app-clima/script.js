const apiKey = "b98966e169785c6b77365acc80010d41s";

const form = document.getElementById("formClima");
const cidadeInput = document.getElementById("cidadeInput");

const saudacao = document.getElementById("saudacao");
const relogio = document.getElementById("relogio");

const cidade = document.getElementById("cidade");
const temperatura = document.getElementById("temperatura");
const descricao = document.getElementById("descricao");
const umidade = document.getElementById("umidade");
const icone = document.getElementById("icone");

// =======================
// RELÓGIO EM TEMPO REAL
// =======================

function atualizarRelogio() {
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, "0");
  const minutos = agora.getMinutes().toString().padStart(2, "0");
  const segundos = agora.getSeconds().toString().padStart(2, "0");

  relogio.textContent = `${horas}:${minutos}:${segundos}`;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// =======================
// SAUDAÇÃO POR HORÁRIO
// =======================

function atualizarSaudacao() {
  const hora = new Date().getHours();

  if (hora < 12) {
    saudacao.textContent = "Bom dia";
  } else if (hora < 18) {
    saudacao.textContent = "Boa tarde";
  } else {
    saudacao.textContent = "Boa noite";
  }
}

atualizarSaudacao();

// =======================
// BUSCA POR CIDADE
// =======================

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const cidadeNome = cidadeInput.value;
  buscarClima(cidadeNome);
});

// =======================
// GEOLOCALIZAÇÃO
// =======================

function obterLocalizacao() {
  navigator.geolocation.getCurrentPosition((posicao) => {
    const lat = posicao.coords.latitude;
    const lon = posicao.coords.longitude;
    buscarClimaPorCoords(lat, lon);
  });
}

obterLocalizacao();

// =======================
// FETCH POR NOME
// =======================

async function buscarClima(nomeCidade) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&appid=${apiKey}&units=metric&lang=pt_br`;

  const resposta = await fetch(url);
  const dados = await resposta.json();

  atualizarTela(dados);
}

// =======================
// FETCH POR COORDENADAS
// =======================

async function buscarClimaPorCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

  const resposta = await fetch(url);
  const dados = await resposta.json();

  atualizarTela(dados);
}

// =======================
// ATUALIZA TELA
// =======================

function atualizarTela(dados) {
  cidade.textContent = dados.name;
  temperatura.textContent = `Temperatura: ${dados.main.temp}°C`;
  descricao.textContent = `Clima: ${dados.weather[0].description}`;
  umidade.textContent = `Umidade: ${dados.main.humidity}%`;

  icone.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`;

  mudarFundo(dados.weather[0].main);
}

// =======================
// FUNDO DINÂMICO
// =======================

function mudarFundo(condicao) {
  const body = document.body;

  if (condicao.includes("Cloud")) {
    body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
  } else if (condicao.includes("Rain")) {
    body.style.background = "linear-gradient(135deg, #4b79a1, #283e51)";
  } else if (condicao.includes("Clear")) {
    body.style.background = "linear-gradient(135deg, #f7971e, #ffd200)";
  } else {
    body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
  }
}

// =======================
// VOLTAR
// =======================

function voltar() {
  window.location.href = "../index.html";
}
