# 👨‍💻 Portfolio — Cicero W. Silva

Portfólio profissional desenvolvido para apresentar minha evolução como **Full Stack Developer**, meus projetos, tecnologias utilizadas e minha abordagem no desenvolvimento de aplicações modernas.

O projeto foi reconstruído utilizando **React, TypeScript e Vite**, com foco em arquitetura organizada, código semântico, responsividade, experiência do usuário e evolução contínua.

🌐 **Portfólio online:**  
https://cicdev83.github.io/Landing-page-sobre-mim-com-projetos-e-atualizacao/

---

## 🚀 Sobre o projeto

Este portfólio funciona como meu principal ambiente profissional para apresentação de projetos e experimentos desenvolvidos durante minha evolução na área de tecnologia.

Mais do que uma página de apresentação, o objetivo é demonstrar na prática conceitos como:

- ⚛️ Componentização com React
- 🔷 TypeScript
- 🧩 Arquitetura organizada por responsabilidades
- 📱 Desenvolvimento responsivo e Mobile First
- ♿ Estrutura HTML semântica e acessibilidade
- 🎨 UI/UX moderna
- 🌗 Tema claro e escuro
- 💾 Persistência de preferências no navegador
- 🔌 Integração com APIs
- ✨ Animações e interações
- 🧹 Clean Code
- 📦 Build e deploy automatizados

---

## 🛠️ Tecnologias

### Frontend

- React
- TypeScript
- Vite
- HTML5
- CSS3
- JavaScript ES6+

### Ferramentas e desenvolvimento

- Git
- GitHub
- GitHub Actions
- GitHub Pages
- VS Code
- ESLint

---

## 🎨 Interface

A interface foi desenvolvida com uma identidade visual moderna e tecnológica, mantendo equilíbrio entre estética e legibilidade.

Entre os principais recursos estão:

- 🌗 Tema claro e escuro com persistência
- ✨ Animações de entrada no Hero
- 👁️ Scroll Reveal com Intersection Observer
- 🪟 Glassmorphism
- 🌈 Gradientes dinâmicos
- 💚 Efeitos neon
- 📱 Layout responsivo
- 🖥️ Adaptação para diferentes tamanhos de tela
- 🎠 Carrossel interativo de projetos

As animações também respeitam a preferência do sistema por redução de movimento através de `prefers-reduced-motion`.

---

## 🧑‍💻 Hero

A área principal apresenta:

- Nome e posicionamento profissional
- Full Stack Developer
- Status para novas oportunidades
- Apresentação profissional
- Acesso direto aos projetos
- LinkedIn
- Perfil tecnológico `developer.profile`
- Animações sequenciais de entrada
- Efeito neon dinâmico

---

## 📂 Projetos

### 🌦️ App Clima Global

Aplicação meteorológica com informações climáticas em tempo real.

**Principais recursos:**

- Geolocalização
- Dados meteorológicos em tempo real
- Relógio
- Saudação dinâmica
- Tema automático e manual
- Persistência com LocalStorage
- Interface responsiva

**Tecnologias:**

`HTML5` `CSS3` `JavaScript` `OpenWeather API` `LocalStorage`

---

### ✅ Task Manager Pro

Aplicação para gerenciamento de tarefas e produtividade.

Desenvolvida com foco em:

- Organização
- Usabilidade
- Responsividade
- Experiência moderna
- Manipulação dinâmica da interface

**Tecnologias:**

`HTML5` `CSS3` `JavaScript`

---

### 💱 Conversor Global Pro

Aplicação de conversão de moedas inspirada em interfaces financeiras.

**Principais recursos:**

- Cotações em tempo real
- Conversão entre moedas
- Integração com APIs
- Tema escuro
- Interface responsiva
- Persistência local

**Tecnologias:**

`HTML5` `CSS3` `JavaScript` `AwesomeAPI` `IPAPI` `LocalStorage`

---

### 🎵 EON MUSIC

Projeto em desenvolvimento para construção de uma plataforma moderna de reprodução musical.

Atualmente sua arquitetura utiliza:

`React` `TypeScript` `Vite`

A evolução planejada inclui:

- Player global
- Reprodução de músicas locais
- Biblioteca musical
- Fila de reprodução
- Favoritos
- Shuffle
- Repeat
- Playlists
- PWA
- Evolução futura para recursos de streaming

> 🚧 **Status:** Em desenvolvimento.

---

## 👨‍🚀 Sobre mim

A seção **Sobre** apresenta minha evolução como desenvolvedor e os princípios que procuro aplicar na construção dos projetos.

### 🏗️ Arquitetura

Estruturas organizadas, componentizadas e preparadas para evolução.

### 🎯 Experiência

Interfaces responsivas, acessíveis e pensadas para diferentes dispositivos.

### ⚙️ Engenharia

Código limpo, semântico e desenvolvido com atenção à manutenção e escalabilidade.

---

## 📬 Contato

O portfólio possui uma área dedicada para contato profissional.

- 📧 **E-mail:** csilvaw9.3@gmail.com
- 💼 **LinkedIn:** Cicero Silva
- 🐙 **GitHub:** CicDEV83
- 💬 **WhatsApp:** disponível diretamente pelo portfólio

Os canais foram implementados com links diretos para facilitar contatos profissionais e oportunidades.

---

## 👁️ Contador de visitantes

O projeto possui uma arquitetura própria para exibição e gerenciamento do contador de visitantes.

A implementação está separada em:

```text
VisitorSection
      ↓
useVisitorCounter
      ↓
visitorService
      ↓
serviço de persistência
```

O frontend e a interface do contador já estão preparados.

> ⚠️ O serviço remoto anteriormente utilizado para persistência apresentou descontinuidade em seu endpoint. A camada de persistência será substituída futuramente sem necessidade de reconstruir o componente visual.

Também está planejada uma evolução para permitir **identificação profissional voluntária de visitantes**, mantendo informações identificáveis protegidas e disponíveis somente em ambiente administrativo autenticado.

---

## 🧱 Arquitetura principal

```text
src/
├── app/
│   └── App.tsx
│
├── assets/
│   └── images/
│       └── projects/
│
├── components/
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── VisitorSection.tsx
│   └── ProjectCarousel/
│
├── data/
│   └── projects.ts
│
├── hooks/
│   ├── useScrollReveal.ts
│   ├── useTheme.ts
│   └── useVisitorCounter.ts
│
├── services/
│   └── visitorService.ts
│
├── styles/
│   ├── animations.css
│   ├── globals.css
│   └── variables.css
│
├── types/
│   └── index.ts
│
└── main.tsx
```

Essa separação mantém componentes, dados, hooks, serviços, estilos e tipos com responsabilidades específicas.

---

## 📱 Responsividade

O projeto segue uma abordagem responsiva e Mobile First.

Foram considerados:

- Smartphones
- Tablets
- Notebooks
- Desktops
- Diferentes proporções e larguras de tela

O layout utiliza principalmente:

- CSS Grid
- Flexbox
- `rem`
- `%`
- `clamp()`
- unidades responsivas

A validação final também é realizada em dispositivos físicos.

---

## 🌗 Sistema de temas

O portfólio possui temas:

- ☀️ Claro
- 🌙 Escuro

A preferência é armazenada através de `localStorage`, permitindo que o tema escolhido seja preservado entre acessos.

Na ausência de uma preferência salva, a aplicação considera a configuração de tema do próprio sistema operacional.

---

## ♿ Acessibilidade

Algumas das práticas utilizadas incluem:

- HTML semântico
- Hierarquia correta de headings
- `aria-label`
- `aria-labelledby`
- Textos alternativos
- Navegação estruturada
- Suporte a `prefers-reduced-motion`
- Contraste entre conteúdo e background

---

## ⚡ Build

Para gerar uma versão de produção:

```bash
npm run build
```

O Vite gera os arquivos otimizados no diretório:

```text
dist/
```

---

## 🧪 Desenvolvimento local

Instale as dependências:

```bash
npm install
```

Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

---

## 🚀 Deploy

O projeto utiliza **GitHub Actions + GitHub Pages**.

O workflow realiza o build da aplicação e publica automaticamente a versão de produção no GitHub Pages.

O Vite está configurado com o `base` correspondente ao nome do repositório para garantir o carregamento correto dos assets em produção.

---

## 🗺️ Evoluções planejadas

O portfólio continuará evoluindo junto com minha formação e meus projetos.

Entre os próximos passos:

- 🔐 Persistência própria do contador de visitantes
- 👔 Identificação profissional voluntária
- 🛡️ Área administrativa protegida
- 📊 Métricas privadas do portfólio
- 📱 Refinamentos após testes em smartphones físicos
- 🎵 Evolução contínua do EON MUSIC
- ⚛️ Migração e evolução dos projetos selecionados
- 🧠 Ampliação dos conhecimentos Full Stack
- 🗄️ Integrações com backend e banco de dados

---

## 👨‍💻 Autor

**Cicero W. Silva**  
Full Stack Developer

💼 LinkedIn:  
https://www.linkedin.com/in/cicero-silva-056253362/

🐙 GitHub:  
https://github.com/CicDEV83

📧 E-mail:  
csilvaw9.3@gmail.com

---

## 📄 Licença e direitos

© 2026 Cicero W. Silva. Todos os direitos reservados.

Unwrapped as ⚛️ **React + TypeScript**.
