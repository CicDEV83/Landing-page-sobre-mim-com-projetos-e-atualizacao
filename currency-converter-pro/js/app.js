/**
 * LÓGICA DO DASHBOARD DO HOME BROKER (CURRENCY CONVERTER)
 * Arquivo: app.js
 */

// 1. Importando os serviços da API diretamente via ES6 Modules
import { detectUserLocation, fetchExchangeRates } from "./api.js";

// Lista de moedas suportadas com suas bandeiras oficiais e símbolos
const AVAILABLE_CURRENCIES = {
  BRL: {
    name: "Real Brasileiro",
    symbol: "R$",
    flag: "https://flagcdn.com/w40/br.png",
    symbolChar: "R$",
  },
  USD: {
    name: "Dólar Americano",
    symbol: "$",
    flag: "https://flagcdn.com/w40/us.png",
    symbolChar: "$",
  },
  EUR: {
    name: "Euro",
    symbol: "€",
    flag: "https://flagcdn.com/w40/eu.png",
    symbolChar: "€",
  },
  GBP: {
    name: "Libra Esterlina",
    symbol: "£",
    flag: "https://flagcdn.com/w40/gb.png",
    symbolChar: "£",
  },
  ARS: {
    name: "Peso Argentino",
    symbol: "$",
    flag: "https://flagcdn.com/w40/ar.png",
    symbolChar: "$",
  },
  JPY: {
    name: "Iene Japonês",
    symbol: "¥",
    flag: "https://flagcdn.com/w40/jp.png",
    symbolChar: "¥",
  },
  CAD: {
    name: "Dólar Canadense",
    symbol: "$",
    flag: "https://flagcdn.com/w40/ca.png",
    symbolChar: "$",
  },
  AUD: {
    name: "Dólar Australiano",
    symbol: "$",
    flag: "https://flagcdn.com/w40/au.png",
    symbolChar: "$",
  },
  CHF: {
    name: "Franco Suíço",
    symbol: "Fr",
    flag: "https://flagcdn.com/w40/ch.png",
    symbolChar: "CHF",
  },
  CNY: {
    name: "Yuan Chinês",
    symbol: "¥",
    flag: "https://flagcdn.com/w40/cn.png",
    symbolChar: "¥",
  },
};

// Seleção de Elementos do DOM
const dom = {
  userName: document.getElementById("user-name"),
  editNameBtn: document.getElementById("edit-name-btn"),
  userLocation: document.getElementById("user-location"),
  themeToggle: document.getElementById("theme-toggle"),
  amountInput: document.getElementById("amount"),
  baseSymbol: document.getElementById("base-symbol"),
  baseCurrency: document.getElementById("base-currency"),
  targetCurrency: document.getElementById("target-currency"),
  baseFlag: document.getElementById("base-flag"),
  targetFlag: document.getElementById("target-flag"),
  swapBtn: document.getElementById("swap-btn"),
  baseLabel: document.getElementById("base-label"),
  targetLabel: document.getElementById("target-label"),
  rateValue: document.getElementById("rate-value"),
  primaryOutput: document.getElementById("primary-output"),
  updateTime: document.getElementById("update-time"),
  ratesGrid: document.getElementById("rates-grid"),
};

// Estado da Aplicação (Memória em execução)
let appState = {
  user: { name: "Investidor", currency: "BRL" },
  rates: {},
  base: "BRL",
  target: "USD",
};

// Inicialização do App
document.addEventListener("DOMContentLoaded", async () => {
  setupUserPreferences();
  populateDropdowns();
  setupEventListeners();

  // Detecta localização e configura moeda sugerida por padrão
  await initializeLocationAndCurrencies();

  // Executa a primeira carga de cotações
  await updateExchangeData();
});

/* =========================================================================
   CONFIGURAÇÕES INICIAIS E PREFERÊNCIAS
   ========================================================================= */

function setupUserPreferences() {
  // Nome do usuário
  const savedName = localStorage.getItem("broker-user-name");
  if (savedName) {
    appState.user.name = savedName;
    dom.userName.textContent = savedName;
  }

  // Tema Claro/Escuro
  const savedTheme = localStorage.getItem("broker-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeButtonUI(savedTheme);
}

async function initializeLocationAndCurrencies() {
  const geo = await detectUserLocation();
  dom.userLocation.innerHTML = `📍 Conectado de: <strong>${geo.country}</strong>`;

  // Se a moeda do usuário for suportada por nós, configure-a como base
  if (AVAILABLE_CURRENCIES[geo.currency]) {
    appState.base = geo.currency;
    appState.target = geo.currency === "USD" ? "BRL" : "USD"; // Evita base e target serem iguais
  }

  dom.baseCurrency.value = appState.base;
  dom.targetCurrency.value = appState.target;
  updateDropdownVisuals();
}

function populateDropdowns() {
  let optionsHTML = "";
  for (const [code, info] of Object.entries(AVAILABLE_CURRENCIES)) {
    optionsHTML += `<option value="${code}">${code} - ${info.name}</option>`;
  }
  dom.baseCurrency.innerHTML = optionsHTML;
  dom.targetCurrency.innerHTML = optionsHTML;
}

/* =========================================================================
   EVENTOS (INTERATIVIDADE)
   ========================================================================= */

function setupEventListeners() {
  // Editar Nome
  dom.editNameBtn.addEventListener("click", () => {
    const newName = prompt("Qual o seu nome, investidor?", appState.user.name);
    if (newName && newName.trim() !== "") {
      appState.user.name = newName.trim();
      dom.userName.textContent = appState.user.name;
      localStorage.setItem("broker-user-name", appState.user.name);
    }
  });

  // Alternar Tema
  dom.themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("broker-theme", nextTheme);
    updateThemeButtonUI(nextTheme);
  });

  // Mudança nos campos de Moeda e Valores
  dom.baseCurrency.addEventListener("change", (e) => {
    appState.base = e.target.value;
    updateDropdownVisuals();
    updateExchangeData();
  });

  dom.targetCurrency.addEventListener("change", (e) => {
    appState.target = e.target.value;
    updateDropdownVisuals();
    updateExchangeData();
  });

  dom.amountInput.addEventListener("input", () => {
    calculateConversions();
  });

  // Botão de Inversão (Swap)
  dom.swapBtn.addEventListener("click", () => {
    const temp = appState.base;
    appState.base = appState.target;
    appState.target = temp;

    dom.baseCurrency.value = appState.base;
    dom.targetCurrency.value = appState.target;

    updateDropdownVisuals();
    updateExchangeData();
  });
}

function updateThemeButtonUI(theme) {
  if (theme === "light") {
    dom.themeToggle.innerHTML = `<span class="theme-icon">🌙</span> Modo Escuro`;
  } else {
    dom.themeToggle.innerHTML = `<span class="theme-icon">☀️</span> Modo Claro`;
  }
}

function updateDropdownVisuals() {
  const baseData = AVAILABLE_CURRENCIES[appState.base];
  const targetData = AVAILABLE_CURRENCIES[appState.target];

  // Atualiza Símbolo no Input
  dom.baseSymbol.textContent = baseData.symbol;

  // Atualiza Bandeiras nos Dropdowns
  dom.baseFlag.src = baseData.flag;
  dom.baseFlag.alt = `Bandeira ${appState.base}`;
  dom.baseFlag.classList.remove("hidden");

  dom.targetFlag.src = targetData.flag;
  dom.targetFlag.alt = `Bandeira ${appState.target}`;
  dom.targetFlag.classList.remove("hidden");
}

/* =========================================================================
   SISTEMA DE CORRETAGEM & CÁLCULOS (O CORE FINANCEIRO)
   ========================================================================= */

async function updateExchangeData() {
  dom.primaryOutput.textContent = "Calculando taxas...";

  const allCodes = Object.keys(AVAILABLE_CURRENCIES);

  try {
    const rawData = await fetchExchangeRates(appState.base, allCodes);

    appState.rates = { [appState.base]: 1.0 };

    for (const key in rawData) {
      const targetCode = rawData[key].codein;
      const originCode = rawData[key].code;
      const bidValue = parseFloat(rawData[key].bid);

      appState.rates[originCode] = 1 / bidValue;
    }

    calculateConversions();

    const now = new Date();
    dom.updateTime.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch (error) {
    dom.primaryOutput.textContent = "Erro na rede. Tentando novamente...";
    console.error("Falha ao processar cotações em tempo real:", error);
  }
}

function calculateConversions() {
  const inputValue = parseFloat(dom.amountInput.value) || 0;

  if (inputValue <= 0) {
    dom.primaryOutput.textContent = "Digite um valor maior que 0";
    dom.ratesGrid.innerHTML = "";
    return;
  }

  const baseRate = appState.rates[appState.base] || 1;
  const targetRate = appState.rates[appState.target];

  let convertedAmount = 0;
  let singleRateRelation = 0;

  if (appState.base === appState.target) {
    convertedAmount = inputValue;
    singleRateRelation = 1.0;
  } else if (targetRate) {
    singleRateRelation = targetRate / baseRate;
    convertedAmount = inputValue * singleRateRelation;
  }

  dom.baseLabel.textContent = appState.base;
  dom.targetLabel.textContent = appState.target;
  dom.rateValue.textContent = singleRateRelation.toFixed(4);

  dom.primaryOutput.textContent = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: appState.target,
  }).format(convertedAmount);

  renderMarketBoard(inputValue);
}

function renderMarketBoard(inputValue) {
  let gridHTML = "";
  const baseRate = appState.rates[appState.base] || 1;

  for (const [code, info] of Object.entries(AVAILABLE_CURRENCIES)) {
    if (code === appState.base) continue;

    const targetRate = appState.rates[code];
    if (!targetRate) continue;

    const converted = inputValue * (targetRate / baseRate);

    const formattedVal = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: code,
    }).format(converted);

    const seed = code.charCodeAt(0) + code.charCodeAt(1);
    const mockTrend = seed % 2 === 0 ? "up" : "down";
    const mockPercent = ((seed % 10) / 7.5).toFixed(2);
    const trendIcon = mockTrend === "up" ? "▲" : "▼";

    gridHTML += `
      <article class="rate-card">
        <div class="card-head">
          <img src="${info.flag}" alt="Bandeira ${code}">
          <div>
            <h3>${code}</h3>
            <p>${info.name}</p>
          </div>
        </div>
        <div class="card-body">
          <span class="converted-value">${formattedVal}</span>
          <span class="trend ${mockTrend}">${trendIcon} ${mockPercent}%</span>
        </div>
      </article>
    `;
  }

  dom.ratesGrid.innerHTML = gridHTML;
}
