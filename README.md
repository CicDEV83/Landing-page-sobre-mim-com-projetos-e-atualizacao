# 🚀 Portfolio Hub - Modern Web Solutions

Bem-vindo ao repositório do meu portfólio pessoal e hub de projetos! Este espaço centraliza minhas principais criações como Desenvolvedor Front-End, servindo de vitrine para a aplicação prática de conceitos modernos de engenharia de software, arquitetura CSS avançada e usabilidade focada no usuário.

---

## 🎨 Projeto Principal: Landing Page Portfólio

Uma interface responsiva de alta fidelidade visual feita para conectar recrutadores e desenvolvedores às minhas soluções. Ela funciona como o núcleo (Hub) do meu ecossistema de projetos.

### 🧠 Destaques Técnicos da Landing Page:

- **Semântica Estrutural:** Construída com uso rigoroso de tags semânticas para SEO e legibilidade de tela.
- **Componentização e Navegação:** Arquitetura limpa de diretórios onde cada subprojeto é modular e isolado, permitindo o fluxo contínuo de navegação ("ir e voltar") sem quebras de escopo.
- **Consistência de Design:** Uso de variáveis CSS (custom properties) para paleta de cores e tipografia consistente.

---

## ☁️ Projeto 1: App Clima Global

Aplicação que consome dados meteorológicos em tempo real, fornecendo informações dinâmicas de clima de forma limpa e intuitiva.

| <img src="./img/app-clima-preview.jpg" width="350" alt="Preview App Clima"> | **Tecnologias Utilizadas:** <br>• HTML5 Semântico <br>• CSS3 (Custom Grid & Flexbox) <br>• JavaScript (ES6+ Assíncrono) <br>• Integração com API REST |
| :-------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |

### 🛠️ Diferenciais de Engenharia no App Clima:

- **Integração Assíncrona com APIs:** Uso de `fetch`, `async/await` e tratamento robusto de exceções para garantir que o aplicativo continue funcional mesmo em caso de falha de conexão ou dados inconsistentes da API de meteorologia.
- **Acessibilidade Aplicada:** Inclusão de tags `<nav>` estruturais com o atributo `aria-label="Navegação do projeto"` para dar contexto claro a leitores de tela na jornada de retorno ao portfólio.
- **Layout Flexível:** Grid estruturado para exibir dados de temperatura, vento, umidade e horário de atualização de forma organizada e simétrica no rodapé da aplicação.

---

## 📝 Projeto 2: Task Manager Pro

Um gerenciador de tarefas avançado focado em produtividade diária, com controle de estado, contadores dinâmicos e persistência local.

| <img src="./img/task-manager-preview.jpg" width="350" alt="Preview Task Manager"> | **Tecnologias Utilizadas:** <br>• HTML5 Semântico (`<aside>`, `<footer>`, `<main>`) <br>• CSS3 (Glassmorphism & Flexbox) <br>• JavaScript Dinâmico (Manipulação de DOM) <br>• LocalStorage API |
| :-------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### 🛠️ Diferenciais de Engenharia no Task Manager:

- **Persistência de Dados Offline:** Implementação de persistência local de dados (`localStorage`), garantindo que as tarefas criadas pelo usuário permaneçam salvas mesmo após fechar ou recarregar o navegador.
- **Controle Dinâmico de Estado:** Monitoramento de lista e contadores em tempo real. Sempre que uma tarefa é criada, concluída ou excluída, o contador (`#total-tasks`) atualiza instantaneamente através de manipulação de DOM baseada em eventos.
- **Engine de Dark Mode nativo:** Algoritmo que lê a preferência de tema do sistema operacional (`window.matchMedia('(prefers-color-scheme: dark)')`) e permite alternância dinâmica de classes na tag `<body>`, sincronizando o estado preferido no `localStorage` do usuário.
- **UI/UX Polida:** Design baseado no estilo de vidro translúcido (_glassmorphism_) com microinterações elegantes. O botão de retorno (`.btn-back`) utiliza transições CSS suaves (`transition: all 0.25s`) e pequenos deslocamentos (`translateX`) para sinalizar ações físicas ao usuário.

---

## 💱 Project 3: Conversor Global / homebroker Pro - Dashboard & Converter

Dashboard financeiro estilo *Home Broker* em tempo real para conversão de moedas globais, exibição de cotações dinâmicas e indicadores de tendência de mercado.

| <img src="./img/cambio-pro-preview.jpg" width="350" alt="Preview Câmbio Pro"> | **Tecnologias Utilizadas:** <br>• HTML5 Semântico (`<main>`, `<article>`, `<header>`) <br>• CSS3 (Custom Properties, Flexbox & CSS Grid) <br>• JavaScript (ES6+ Assíncrono & Módulos ES6) <br>• Integração com API REST (AwesomeAPI / Cotações) <br>• LocalStorage API & `Intl.NumberFormat` |
| :---------------------------------- | :---------------------------------- |

### 🛠️ Diferenciais de Engenharia no Câmbio Pro:

- **Atualização Contínua em Tempo Real:** Implementação de relógio ativo por segundo e agendamento de requisições de cotação via *polling* assíncrono a cada 60 segundos com `setInterval`.
- **Tratamento e Máscara Monetária Dinâmica:** Sanitização de entradas em tempo real utilizando expressões regulares (`\D/g`) e formatação imediata da direita para a esquerda para suporte nativo a centavos e valores elevados.
- **Gestão de Estado e Persistência Local:** Armazenamento automático das preferências do usuário (moeda base, moeda destino, valor digitado e tema claro/escuro) no `localStorage`.
- **Ticker de Mercado e Sinalização Visual:** Exibição contínua do mercado de câmbio com estilização condicional (indicadores nas cores verde para alta, amarelo para estabilidade/risco e vermelho para queda).

---

## ⚙️ Arquitetura do Repositório

O projeto foi estruturado para manter total modularidade e independência de estilos, evitando conflitos de escopo entre as aplicações:

```text
Landinpage_sobre_mim/
│
├── index.html                   # Landing page e portfólio principal
├── css/                         # Estilos globais da landing page
│
├── projeto1-app-clima/          # Módulo independente do App Clima
│   ├── index.html
│   ├── css/
│   └── script.js
│
└── task-manager-pro/            # Independent Task Manager Module
    ├── index.html
    ├── css/
    └── js/
```
