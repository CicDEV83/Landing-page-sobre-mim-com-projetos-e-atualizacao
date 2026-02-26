/* ==========================
   RELÓGIO + SAUDAÇÃO
========================== */

function atualizarRelogio() {
  const agora = new Date();
  const horaAtual = agora.getHours();

  const horas = String(horaAtual).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");

  const relogioEl = document.getElementById("relogio");
  const saudacaoEl = document.getElementById("saudacao");

  if (relogioEl) {
    relogioEl.textContent = `${horas}:${minutos}:${segundos}`;
  }

  if (saudacaoEl) {
    let mensagem;

    if (horaAtual >= 5 && horaAtual < 12) {
      mensagem = "Bom dia";
    } else if (horaAtual >= 12 && horaAtual < 18) {
      mensagem = "Boa tarde";
    } else {
      mensagem = "Boa noite";
    }

    saudacaoEl.textContent = mensagem;
  }
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

function obterLocalizacao() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        buscarClimaPorCoordenadas(lat, lon);
      },
      (erro) => {
        alert("Não foi possível obter sua localização.");
      }
    );
  } else {
    alert("Geolocalização não suportada pelo navegador.");
  }
}

async function buscarClima(cidade) {
  const apiKey = "b98966e169785c6b77365acc80010d41s";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

  const response = await fetch(url);
  const data = await response.json();

  document.getElementById("cidade").textContent = data.name;
  document.getElementById("temperatura").textContent = data.main.temp + "°C";
  document.getElementById("descricao").textContent = data.weather[0].description;
  document.getElementById("umidade").textContent = "Umidade: " + data.main.humidity + "%";

  // 🔥 AQUI ENTRA O NOVO CÓDIGO
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.getElementById("iconeClima").src = iconUrl;
}

function mensagemInteligente(condicao, temperatura) {
  const mensagem = document.getElementById("mensagemClima");

  if (condicao === "Rain") {
    mensagem.textContent = "Leve um guarda-chuva ☔";
  } else if (condicao === "Clear" && temperatura > 30) {
    mensagem.textContent = "Dia perfeito para piscina! ☀️";
  } else if (temperatura < 15) {
    mensagem.textContent = "Está frio, use um casaco 🧥";
  } else {
    mensagem.textContent = "Tenha um excelente dia! 🌤️";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  obterLocalizacao();
});
