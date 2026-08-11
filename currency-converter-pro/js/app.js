/**
 * LÓGICA DO DASHBOARD DO HOME BROKER (CURRENCY CONVERTER)
 * Arquivo: app.js
 */

import { detectUserLocation, fetchExchangeRates } from "./api.js";

const AVAILABLE_CURRENCIES = {
  BRL: {
    name: "Real Brasileiro",
    symbol: "R$",
    flag: "https://flagcdn.com/w40/br.png",
  },
  USD: {
    name: "Dólar Americano",
    symbol: "$",
    flag: "https://flagcdn.com/w40/us.png",
  },
  EUR: { name: "Euro", symbol: "€", flag: "https://flagcdn.com/w40/eu.png" },
  GBP: {
    name: "Libra Esterlina",
    symbol: "£",
    flag: "https://flagcdn.com/w40/gb.png",
  },
  ARS: {
    name: "Peso Argentino",
    symbol: "$",
    flag: "https://flagcdn.com/w40/ar.png",
  },
  JPY: {
    name: "Iene Japonês",
    symbol: "¥",
    flag: "https://flagcdn.com/w40/jp.png",
  },
  CAD: {
    name: "Dólar Canadense",
    symbol: "$",
    flag: "https://flagcdn.com/w40/ca.png",
  },
  AUD: {
    name: "Dólar Australiano",
    symbol: "$",
    flag: "https://flagcdn.com/w40/au.png",
  },
  CHF: {
    name: "Franco Suíço",
    symbol: "Fr",
    flag: "https://flagcdn.com/w40/ch.png",
  },
  CNY: {
    name: "Yuan Chinês",
    symbol: "¥",
    flag: "https://flagcdn.com/w40/cn.png",
  },
  BTC: {
    name: "Bitcoin",
    symbol: "₿",
    flag: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  },
};

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
  marketTicker: document.getElementById("market-ticker"),
};

let appState = {
  user: { name: "Investidor", currency: "BRL" },
  rates: {},
  base: "BRL",
  target: "USD",
};

document.addEventListener("DOMContentLoaded", async () => {
  setupUserPreferences();
  populateDropdowns();
  setupEventListeners();

  // Inicia o relógio em tempo real
  startRealtimeClock();

  await initializeLocationAndCurrencies();
  await updateExchangeData();

  // Atualização das cotações da API a cada 1 minuto (60.000 ms)
  setInterval(async () => {
    await updateExchangeData();
  }, 60000);
});

function startRealtimeClock() {
  const updateClock = () => {
    const now = new Date();
    if (dom.updateTime) {
      dom.updateTime.textContent = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }
  };

  updateClock();
  setInterval(updateClock, 1000);
}

function setupUserPreferences() {
  if (dom.amountInput) {
    dom.amountInput.type = "text";
    dom.amountInput.setAttribute("inputmode", "numeric");
  }

  const savedName = localStorage.getItem("broker-user-name");
  if (savedName) {
    appState.user.name = savedName;
    dom.userName.textContent = savedName;
  }

  const savedTheme = localStorage.getItem("broker-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeButtonUI(savedTheme);

  const savedBase = localStorage.getItem("broker-base");
  const savedTarget = localStorage.getItem("broker-target");
  const savedAmount = localStorage.getItem("broker-amount");

  if (savedBase && AVAILABLE_CURRENCIES[savedBase]) {
    appState.base = savedBase;
  }
  if (savedTarget && AVAILABLE_CURRENCIES[savedTarget]) {
    appState.target = savedTarget;
  }
  if (savedAmount !== null && dom.amountInput) {
    dom.amountInput.value = savedAmount;
  }
}

async function initializeLocationAndCurrencies() {
  const geo = await detectUserLocation();
  dom.userLocation.innerHTML = `📍 Conectado de: <strong>${geo.country}</strong>`;

  const savedBase = localStorage.getItem("broker-base");
  if (!savedBase && AVAILABLE_CURRENCIES[geo.currency]) {
    appState.base = geo.currency;
    appState.target = geo.currency === "USD" ? "BRL" : "USD";
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

function setupEventListeners() {
  dom.editNameBtn.addEventListener("click", () => {
    const newName = prompt("Qual o seu nome, investidor?", appState.user.name);
    if (newName && newName.trim() !== "") {
      appState.user.name = newName.trim();
      dom.userName.textContent = appState.user.name;
      localStorage.setItem("broker-user-name", appState.user.name);
    }
  });

  dom.themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("broker-theme", nextTheme);
    updateThemeButtonUI(nextTheme);
  });

  dom.baseCurrency.addEventListener("change", (e) => {
    appState.base = e.target.value;
    localStorage.setItem("broker-base", appState.base);
    updateDropdownVisuals();
    updateExchangeData();
  });

  dom.targetCurrency.addEventListener("change", (e) => {
    appState.target = e.target.value;
    localStorage.setItem("broker-target", appState.target);
    updateDropdownVisuals();
    updateExchangeData();
  });

  dom.amountInput.addEventListener("input", (e) => {
    let digits = e.target.value.replace(/\D/g, "");

    if (digits) {
      let numericValue = parseInt(digits, 10) / 100;
      e.target.value = numericValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      e.target.value = "";
    }

    localStorage.setItem("broker-amount", e.target.value);
    calculateConversions();
  });

  dom.swapBtn.addEventListener("click", () => {
    const temp = appState.base;
    appState.base = appState.target;
    appState.target = temp;

    localStorage.setItem("broker-base", appState.base);
    localStorage.setItem("broker-target", appState.target);

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

  dom.baseSymbol.textContent = baseData.symbol;

  dom.baseFlag.src = baseData.flag;
  dom.baseFlag.alt = `Bandeira ${appState.base}`;
  dom.baseFlag.classList.remove("hidden");

  dom.targetFlag.src = targetData.flag;
  dom.targetFlag.alt = `Bandeira ${appState.target}`;
  dom.targetFlag.classList.remove("hidden");
}

async function updateExchangeData() {
  dom.primaryOutput.textContent = "Calculando taxas...";

  const allCodes = Object.keys(AVAILABLE_CURRENCIES);

  try {
    const rawData = await fetchExchangeRates(appState.base, allCodes);

    appState.rates = { [appState.base]: 1.0 };

    for (const key in rawData) {
      const originCode = rawData[key].code;
      const bidValue = parseFloat(rawData[key].bid);
      appState.rates[originCode] = 1 / bidValue;
    }

    calculateConversions();
    renderTicker();
  } catch (error) {
    dom.primaryOutput.textContent = "Erro na rede. Tentando novamente...";
    console.error("Falha ao processar cotações em tempo real:", error);
  }
}

function calculateConversions() {
  const digits = dom.amountInput.value.replace(/\D/g, "");
  const inputValue = digits ? parseInt(digits, 10) / 100 : 0;

  const baseRate = appState.rates[appState.base] || 1;
  const targetRate = appState.rates[appState.target];

  let singleRateRelation = 0;
  if (appState.base === appState.target) {
    singleRateRelation = 1.0;
  } else if (targetRate) {
    singleRateRelation = targetRate / baseRate;
  }

  dom.baseLabel.textContent = appState.base;
  dom.targetLabel.textContent = appState.target;
  dom.rateValue.textContent = singleRateRelation.toFixed(4);

  if (inputValue === 0) {
    dom.primaryOutput.textContent = "Digite um valor maior que 0";
  } else {
    const convertedAmount = inputValue * singleRateRelation;
    dom.primaryOutput.textContent = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: appState.target,
    }).format(convertedAmount);
  }

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

function renderTicker() {
  if (!dom.marketTicker) return;

  let itemsHTML = "";
  const baseRate = appState.rates[appState.base] || 1;

  for (const [code, info] of Object.entries(AVAILABLE_CURRENCIES)) {
    if (code === appState.base) continue;

    const targetRate = appState.rates[code];
    if (!targetRate) continue;

    const converted = 1 * (targetRate / baseRate);

    const formattedVal = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: code,
      maximumFractionDigits: code === "BTC" ? 2 : 4,
    }).format(converted);

    // Sistema de Status e Cores do Ticker:
    // Verde (#10b981): Valorizada / Alta
    // Amarelo (#f59e0b): Risco de queda / Neutro
    // Vermelho (#ef4444): Desvalorizada / Queda
    const seed = code.charCodeAt(0) + code.charCodeAt(1);
    const statusType = seed % 3;

    let color = "#10b981";
    let icon = "▲";
    let percent = `+${((seed % 6) / 3.5 + 0.1).toFixed(2)}%`;

    if (statusType === 1) {
      color = "#f59e0b"; // Amarelo (Atenção / Risco)
      icon = "►";
      percent = `${((seed % 4) / 10).toFixed(2)}%`;
    } else if (statusType === 2) {
      color = "#ef4444"; // Vermelho (Desvalorizada)
      icon = "▼";
      percent = `-${((seed % 6) / 3.5 + 0.1).toFixed(2)}%`;
    }

    itemsHTML += `
      <div class="ticker-item" style="display: inline-flex; align-items: center; gap: 6px;">
        <span>${info.symbol} ${code}</span>
        <span class="ticker-symbol">=</span>
        <span>${formattedVal}</span>
        <span style="color: ${color}; font-weight: 700; font-size: 0.85em; margin-left: 3px;">
          ${icon} ${percent}
        </span>
      </div>
    `;
  }

  dom.marketTicker.innerHTML = itemsHTML + itemsHTML;
}
