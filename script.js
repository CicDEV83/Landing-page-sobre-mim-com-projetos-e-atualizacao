/* =========================================================================
   LÓGICA DO DARK MODE
   ========================================================================= */
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const themeIcon = themeToggleBtn.querySelector("i");

// Verifica preferência salva do usuário ou preferência do sistema
const currentTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;

if (currentTheme === "dark" || (!currentTheme && systemPrefersDark)) {
  body.classList.add("dark-mode");
  themeIcon.classList.replace("ph-moon", "ph-sun");
}

themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeIcon.classList.replace("ph-moon", "ph-sun");
  } else {
    localStorage.setItem("theme", "light");
    themeIcon.classList.replace("ph-sun", "ph-moon");
  }
});

/* =========================================================================
   LÓGICA DO CONTADOR DE VISITANTES ÚNICOS
   ========================================================================= */
async function iniciarContador() {
  const counterElement = document.getElementById("visitor-count");

  // DICA: Para se excluir do contador, abra o Console do Navegador (F12)
  // e cole este código: localStorage.setItem('isDev', 'true');
  const isDev = localStorage.getItem("isDev");
  const hasVisited = localStorage.getItem("hasVisited");

  // Chave única para o seu portfólio (não mude isso para não zerar a contagem)
  const namespace = "portfolio_solinftec_2026";
  const key = "visitantes_unicos";
  const apiUrl = `https://api.counterapi.dev/v1/${namespace}/${key}`;

  if (isDev === "true") {
    counterElement.textContent = "Modo Dev (Oculto)";
    counterElement.style.color = "var(--text-muted)";
    return;
  }

  try {
    let response;

    // Se a pessoa nunca acessou seu site neste navegador, registra o 'Up' (Soma +1)
    if (!hasVisited) {
      response = await fetch(`${apiUrl}/up`);
      localStorage.setItem("hasVisited", "true"); // Marca para não somar +1 se der F5
    } else {
      // Se já acessou antes, apenas busca o número atual sem somar
      response = await fetch(apiUrl);
    }

    if (!response.ok) throw new Error("Erro na API de contagem");

    const data = await response.json();
    counterElement.textContent = data.count;
  } catch (error) {
    console.error("Falha ao obter contador:", error);
    counterElement.textContent = "--";
  }
}

// Start or counter when or HTML content load
document.addEventListener("DOMContentLoaded", iniciarContador);
