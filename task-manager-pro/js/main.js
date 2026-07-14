// 1. Seleção de Elementos
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const totalTasksSpan = document.getElementById("total-tasks");

// --- NOVA FUNÇÃO: CARREGAR AO INICIAR ---
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach((task) => addTaskToScreen(task));
  }
}

// --- NOVA FUNÇÃO: SALVAR ---
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-item span").forEach((span) => {
    tasks.push(span.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// --- FUNÇÃO ADICIONAR (Atualizada) ---
function addTaskToScreen(text) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.innerHTML = `
        <span>${text}</span>
        <button class="btn-delete">Excluir</button>
    `;
  taskList.appendChild(li);
  updateCounter();
}

// --- EVENTO DE ADICIONAR ---
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskText = taskInput.value;
  if (taskText.trim() !== "") {
    addTaskToScreen(taskText);
    saveTasks(); // <--- SALVA NO NAVEGADOR
    taskInput.value = "";
  }
});

// --- EVENTO DE EXCLUIR (Atualizado) ---
taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-delete")) {
    event.target.parentElement.remove();
    saveTasks(); // <--- ATUALIZA O SALVAMENTO
    updateCounter();
  }
});

// --- ATUALIZAÇÃO DO CONTADOR ---
function updateCounter() {
  totalTasksSpan.textContent = taskList.querySelectorAll("li").length;
}

// Inicializa carregando o que estava salvo
loadTasks();

// =========================================
// SISTEMA DE TEMA (DARK/LIGHT MODE)
// =========================================
const themeBtn = document.getElementById("theme-btn");

// 1. Função para carregar o tema que o usuário escolheu na última visita
function loadTheme() {
  const savedTheme = localStorage.getItem("app-theme");

  // Se o tema salvo for o escuro, aplica ele direto na raiz (html)
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeBtn.textContent = "☀️ Modo Claro";
  }
}

// 2. Ouvinte de evento para o clique no botão
themeBtn.addEventListener("click", () => {
  // Verifica qual é o tema atual ativo no momento do clique
  const currentTheme = document.documentElement.getAttribute("data-theme");

  if (currentTheme === "dark") {
    // Se está escuro, muda para o claro
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("app-theme", "light"); // Salva na memória
    themeBtn.textContent = "🌙 Modo Escuro";
  } else {
    // Se está claro, muda para o escuro
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("app-theme", "dark"); // Salva na memória
    themeBtn.textContent = "☀️ Modo Claro";
  }
});

// Executa a verificação de tema assim que o arquivo JS é lido
loadTheme();
