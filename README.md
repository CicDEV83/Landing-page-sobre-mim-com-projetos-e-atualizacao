# 🚀 EonLabs — Engenharia de Software e Soluções Digitais

**EonLabs • Idealizada por CicGhost • React + TypeScript + Vite**

Repositório da página institucional da **EonLabs**, com foco na apresentação de soluções digitais sob medida para empresas. A experiência visual combina um tema escuro em azul-noturno, detalhes em ciano e violeta, componentes responsivos e exemplos conceituais de interfaces de software.

> **Estado do projeto:** landing page institucional implementada e revisada visualmente no ambiente local. Publicação da versão atual, verificação final de navegação e Central de Privacidade/LGPD ainda dependem de validação. Este README descreve a versão preparada para atualização, não confirma que ela já esteja disponível no site público.

## 🌐 Acesso ao site

**[Abrir a versão hospedada no GitHub Pages](https://cicdev83.github.io/Landing-page-sobre-mim-com-projetos-e-atualizacao/)**

O endereço acima pertence ao repositório. **A versão pública poderá continuar anterior até a conclusão do deploy desta atualização.**

---

## 🏢 Apresentação institucional

A EonLabs desenvolve e apresenta propostas de engenharia de software, design de produtos digitais, automação e sistemas adaptáveis a processos empresariais. A comunicação da landing page é institucional e voltada à apresentação de possibilidades técnicas e ao recebimento de solicitações de projetos.

**Mensagem principal da página:**

> Soluções digitais **sob medida** para acelerar negócios.

A página utiliza explicações sobre serviços e abordagens. Isso **não constitui comprovação de contratos executados, certificações, resultados comerciais ou sistemas em produção**.

### Identidade visual

- Paleta escura com azul-noturno, ciano e violeta.
- Títulos com gradiente, botões de chamada para ação e cartões responsivos.
- Animações moderadas, com consideração à preferência por movimento reduzido.
- Demonstrações visuais rotuladas como **interfaces conceituais demonstrativas**.

## 🧭 Estrutura atual da landing page

A versão institucional é composta por componentes React separados:

| Seção | Descrição |
| --- | --- |
| **Header** | Marca EonLabs, navegação por âncoras e CTA para solicitar projeto. |
| **Hero** | Título institucional, descrição, botões e carrossel visual de segmentos. |
| **Specialties** | Faixa de especialidades/soluções digitais. |
| **Services** | Apresentação de serviços e soluções para empresas. |
| **Cases** | Carrossel de cenários **conceituais** de aplicação; não são clientes ou resultados comprovados. |
| **Problems** | Desafios de negócio que podem ser abordados por soluções digitais. |
| **Methodology** | Etapas da abordagem de trabalho. |
| **About** | Posicionamento e princípios institucionais. |
| **Technologies** | Tecnologias e competências apresentadas pela EonLabs. |
| **FAQ** | Perguntas frequentes. |
| **Contact** | Formulário e canais para solicitação de projetos. |
| **Footer** | Identidade institucional, copyright e navegação de retorno. |

O conteúdo efetivamente exibido é definido pelos componentes em `src/components/sections/`, pelos estilos e pelos arquivos de dados. O README não deve ser usado para anunciar seções ou funcionalidades que ainda não estejam implementadas.

## 🖼️ Hero — vitrine de segmentos

A vitrine à direita do título principal exibe imagens conceituais de **dashboard desktop e aplicativo para celular**, com alternância automática a cada **6 segundos**.

**Segmentos representados:** Pet Shop, Saúde, Restaurantes, Beleza e Estética, Imobiliárias e Varejo/E-commerce.

Recursos:

- Seis imagens locais em `src/assets/images/hero/`.
- Transição suave entre slides; setas e indicadores de navegação.
- Identificação e texto de contexto sincronizados com o segmento ativo.
- Composição **sem cartão externo**, integrada visualmente ao fundo da página.
- Suavização gradual do fundo de imagem nas bordas.
- Pausa da alternância durante a interação e respeito à preferência por movimento reduzido.
- Adaptação a telas pequenas, intermediárias e grandes.

**Nota:** os mockups são apenas ilustrações conceituais. Números, nomes e indicadores existentes nessas imagens não são dados de clientes reais.

## 💼 Cases conceituais

O carrossel de Cases apresenta cenários ilustrativos por segmento empresarial, com problema, abordagem e solução. Os exemplos conhecidos incluem **AgroLink, VitaCare, FlowOps e ZenitPay**.

**Regra editorial:** exemplos, métricas e depoimentos fictícios não devem ser publicados como comprovação de clientes atendidos. Antes da publicação, verificar se todos os cards distinguem claramente demonstração de trabalho real.

No celular, as setas de navegação ficam **juntas, alinhadas à direita e acima dos cards**, evitando o espaço vertical excessivo observado durante os testes. Em telas maiores, permanecem nas laterais do carrossel.

## ✉️ Contato comercial

A seção de contato está implementada em `src/components/sections/Contact/ContactForm.tsx`, apoiada pela configuração `src/components/sections/Contact/contact.ts`.

O formulário recebe informações sobre o solicitante e o projeto e **prepara uma mensagem no aplicativo de e-mail**; o visitante precisa confirmar o envio no aplicativo configurado. **Não há confirmação de backend de envio automático nessa implementação.**

Há também acesso configurado ao WhatsApp comercial. Os canais podem ser utilizados sem obrigar a exibição pública do número de telefone ou endereço de e-mail na interface.

- **E-mail de contato configurado:** `csilvaw9.3@gmail.com`.
- **WhatsApp:** canal comercial configurado no código.
- **Importante:** não publicar credenciais, tokens, segredos ou dados pessoais desnecessários.

## 🔐 Privacidade e proteção de dados — etapa seguinte

A **Central de Privacidade e LGPD** foi planejada, mas **não deve ser descrita como implementada** enquanto seus componentes, textos e comportamentos não forem concluídos e validados.

Escopo acordado:

1. Aviso de privacidade acessível antes da confirmação de ciência no primeiro acesso.
2. Botão **“Li e estou ciente — Acessar EonLabs”**, com registro local da versão do aviso.
3. Ciência do aviso **separada de consentimento** para tratamentos opcionais de dados.
4. Preferências de cookies opcionais com opções de aceitar e rejeitar, quando esses cookies existirem.
5. Política de Privacidade, Política de Cookies, Termos de Uso, informações de Segurança da Informação e Direitos dos Titulares.
6. Versão institucional em PDF, organizada conforme normas ABNT aplicáveis.
7. Verificação dos tratamentos reais, das integrações e das medidas efetivamente adotadas.

Publicar um aviso ou exigir o clique em um botão **não é garantia automática de conformidade com a LGPD**. Os documentos deverão descrever os processos existentes e passar por revisão apropriada.

## 🛠️ Tecnologias do site institucional

- **React 19:** componentes e interface.
- **TypeScript:** tipagem da aplicação.
- **Vite 8:** desenvolvimento e build de produção.
- **HTML semântico e CSS Modules:** organização e estilização das seções.
- **CSS Grid, Flexbox e media queries:** layout responsivo.
- **JavaScript moderno:** estados, temporizadores, eventos e navegação.
- **ESLint:** análise estática do código.
- **Git e GitHub:** versionamento.
- **GitHub Pages:** destino atualmente documentado para hospedagem estática.

Bibliotecas, serviços ou competências listados em materiais antigos não devem ser confundidos com dependências comprovadas da **landing atual**. Para conferir as versões instaladas, consulte `package.json` e o arquivo de lock.

## 🧱 Organização de componentes

Estrutura representativa dos arquivos discutidos e implementados:

```text
src/
├── app/
│   └── App.tsx
├── assets/
│   └── images/
│       ├── cases/
│       └── hero/
│           ├── beleza.png
│           ├── imobiliarias.png
│           ├── petshop.png
│           ├── restaurantes.png
│           ├── saude.png
│           └── varejo.png
├── components/
│   ├── layout/
│   │   ├── Header/
│   │   └── Footer/
│   └── sections/
│       ├── Hero/
│       │   ├── Hero.tsx
│       │   └── Hero.module.css
│       ├── Specialties/
│       ├── Services/
│       ├── Cases/
│       ├── Problems/
│       ├── Methodology/
│       ├── About/
│       ├── Technologies/
│       ├── FAQ/
│       └── Contact/
├── data/
│   └── cases.ts
├── styles/
│   ├── sections/
│   │   └── Cases.module.css
│   └── globals.css
└── main.tsx
```

**Observação:** esta árvore descreve os principais caminhos conhecidos. Antes de publicar, compare-a com a estrutura efetiva do checkout e evite mover arquivos desnecessariamente.

## 💻 Execução local

Pré-requisitos: Node.js compatível com as dependências do projeto e npm.

```bash
git clone https://github.com/CicDEV83/Landing-page-sobre-mim-com-projetos-e-atualizacao.git
cd Landing-page-sobre-mim-com-projetos-e-atualizacao
npm install
npm run dev
```

O Vite indicará no terminal o endereço da aplicação local.

## ✅ Verificação técnica

```bash
npm run lint
npm run build
npm run preview
git diff --check
```

A verificação de TypeScript faz parte do script de build informado para este projeto (`tsc -b && vite build`). **A aprovação dessas etapas deve ser registrada após uma execução atual**, não presumida a partir de builds antigos.

### Checklist antes do deploy

- Conferir conteúdo e links das seções.
- Validar o Hero nas seis imagens e testar os Cases em telas pequenas.
- Conferir navegação por âncoras e compensação do Header fixo.
- Testar formulário de contato e WhatsApp.
- Verificar textos e imagens conceituais para evitar alegações não demonstradas.
- Revisar recursos carregados, acessibilidade, desempenho e dados de contato.
- Confirmar que arquivos `.env*`, chaves e backups sensíveis não serão publicados.
- Concluir a etapa de privacidade planejada antes de declarar conformidade.
- Verificar branch, workflow e configuração efetiva do GitHub Pages.

## 🚀 Publicação

**Destino documentado:** GitHub Pages.

O projeto é desenvolvido localmente e o conteúdo público somente muda após envio correto do código e execução do fluxo de publicação do repositório. A presença de uma pasta `dist/` não significa, isoladamente, que a versão pública foi substituída.

Antes do `git push`, conferir quais diretórios pertencem ao site atual e quais são **projetos independentes**. Não apagar pastas de outros aplicativos nem enviar backups temporários sem necessidade.

---

# 📦 Projetos próprios mantidos no repositório

Os tópicos seguintes preservam documentação técnica histórica de iniciativas próprias. **Não significam que essas aplicações estejam sendo exibidas na landing institucional atual, nem que todas as funções estejam disponíveis publicamente.** O status de cada projeto deve ser validado em seu próprio diretório.



---

# 🌦️ App Clima Global — Nova versão React



## Visão geral



O **App Clima Global** evoluiu de uma aplicação inicial criada com HTML, CSS e JavaScript para um dashboard meteorológico desenvolvido com **React, TypeScript e Vite**.



A nova versão foi concebida para oferecer uma experiência climática interativa, com informações em tempo real, visualização cartográfica, indicadores ambientais e interface futurista Cyberpunk Neon.



O aplicativo combina dados de serviços meteorológicos externos com recursos nativos do navegador, gerenciamento de estado React e persistência local.



**Status de desenvolvimento:** funcionalidades principais implementadas, com testes locais e revisões técnicas realizados.



**Status de publicação:** integração à versão pública do portfólio ainda pendente.



## Tecnologias do App Clima Global



\| Tecnologia      | Aplicação                                    |

\| --------------- | -------------------------------------------- |

\| React           | Componentização da interface                 |

\| TypeScript      | Contratos de dados e tipagem                 |

\| Vite            | Desenvolvimento e build de produção          |

\| HTML5           | Estrutura semântica                          |

\| CSS3            | Design, responsividade e cenários climáticos |

\| OpenWeatherMap  | Clima atual e previsão meteorológica         |

\| Open-Meteo      | Qualidade do ar e índice UV                  |

\| React Leaflet   | Mapa climático interativo                    |

\| Leaflet         | Recursos de navegação cartográfica           |

\| OpenStreetMap   | Cartografia de base                          |

\| LocalStorage    | Persistência de favoritos e tema             |

\| Geolocation API | Consulta por localização do dispositivo      |



## Funcionalidades implementadas



### 🔎 Busca meteorológica



\- Pesquisa pelo nome da cidade

\- Consulta de dados meteorológicos reais

\- Exibição de cidade e país

\- Temperatura atual

\- Sensação térmica

\- Descrição das condições meteorológicas

\- Indicadores complementares

\- Mensagens de carregamento

\- Tratamento de erros de consulta

\- Proteção contra atualização da interface por respostas de pesquisas antigas



### 📍 Geolocalização



O aplicativo permite solicitar a localização do dispositivo por meio da API nativa do navegador.



O recurso contempla:



\- Solicitação de permissão

\- Consulta pelas coordenadas geográficas

\- Validação dos dados de localização

\- Tratamento de permissão negada

\- Tratamento de tempo esgotado

\- Alternativa de busca manual



A geolocalização depende das permissões do navegador e do contexto de segurança disponível.



### 🌡️ Indicadores meteorológicos



O dashboard apresenta seis indicadores principais:



1. Umidade relativa do ar

2. Velocidade do vento em km/h

3. Pressão atmosférica em hPa

4. Índice UV

5. Horário do nascer do sol

6. Horário do pôr do sol



Os horários são calculados considerando o deslocamento de fuso horário informado pela API meteorológica.



### 📆 Previsão de cinco dias



O aplicativo apresenta uma previsão organizada em cartões por dia, incluindo:



\- Dia da semana

\- Ícone meteorológico

\- Temperatura mínima estimada

\- Temperatura máxima estimada

\- Descrição do tempo

\- Probabilidade de precipitação

\- Estados de carregamento e ausência de dados



A previsão utiliza dados da OpenWeatherMap disponibilizados em intervalos de três horas, agrupados conforme a data local da cidade.



No celular, a visualização utiliza cartões horizontais com rolagem.



### 🍃 Qualidade do ar e índice UV



O aplicativo utiliza a **Open-Meteo Air Quality API** para consultar:



\- Índice de qualidade do ar na escala US AQI

\- Classificação descritiva da qualidade do ar

\- Índice ultravioleta



A classificação US AQI contempla categorias como boa, moderada, ruim para pessoas sensíveis, ruim, muito ruim e perigosa.



A integração possui tratamento de falhas: se os dados ambientais não estiverem disponíveis, a consulta meteorológica principal ainda poderá ser apresentada.



### 🗺️ Mapa climático interativo



O dashboard integra **React Leaflet**, **Leaflet** e **OpenStreetMap**.



Entre os recursos implementados estão:



\- Visualização cartográfica

\- Navegação e zoom

\- Marcador da localização consultada

\- Atualização da região exibida conforme a busca

\- Seleção de camadas meteorológicas

\- Integração com informações climáticas



O carregamento do mapa e de determinadas camadas depende da disponibilidade dos serviços externos.



### ♡ Cidades favoritas



O aplicativo permite:



\- Salvar cidades favoritas

\- Remover cidades salvas

\- Consultar novamente o clima de uma cidade favorita

\- Exibir a última temperatura conhecida

\- Atualizar informações de favoritos consultados

\- Mostrar contador de cidades salvas

\- Preservar a lista por meio do `localStorage`



A implementação também valida os registros recuperados do armazenamento local e evita duplicações por identificador de cidade e país.



### 🌓 Temas claro e escuro



O aplicativo oferece alternância manual entre os dois temas.



A escolha do usuário é preservada em `localStorage`.



A interface mantém estilos específicos para cartões, textos, painéis, navegação e elementos decorativos em ambos os modos.



### 🌤️ Cenários meteorológicos dinâmicos



O painel principal altera a apresentação conforme as condições recebidas.



Os cenários implementados contemplam:



\- Céu limpo

\- Céu com nuvens

\- Chuva

\- Tempestade

\- Neve

\- Névoa

\- Período diurno

\- Período noturno



Os cenários utilizam CSS, gradientes, transparências, elementos decorativos e animações.



O tema noturno possui representação visual própria, incluindo lua e atmosfera de baixa iluminação.



### 💬 Saudações dinâmicas



O painel apresenta mensagens relacionadas ao clima consultado, considerando as condições meteorológicas e o período do dia.



Entre os exemplos estão mensagens para céu limpo, chuva, tempestade, neve, névoa e período noturno.



### 🕒 Relógio em tempo real



O aplicativo possui um relógio integrado ao rodapé do dashboard.



Se uma cidade foi consultada, o relógio apresenta o horário correspondente ao fuso retornado pela API.



Na ausência de uma consulta, utiliza o horário local do dispositivo.



O componente também apresenta a data e a localização associada.



### 💡 Recomendações climáticas inteligentes



O aplicativo utiliza regras meteorológicas para gerar quatro destaques:



1. Condições climáticas atuais

2. Chuva e precipitação

3. Qualidade do ar

4. Atividades ao ar livre



As recomendações consideram informações como:



\- Sensação térmica

\- Tipo de condição meteorológica

\- Previsão de chuva

\- Qualidade do ar

\- Velocidade do vento

\- Índice UV

\- Período do dia



São recomendações baseadas em regras programadas, e não em inferência de um modelo de inteligência artificial.



\---



## 📱 Experiência mobile do App Clima Global



A versão mobile possui uma interface própria para facilitar a navegação em telas menores.



### Recursos implementados



\- Cabeçalho adaptado

\- Botão superior de menu

\- Barra inferior de navegação

\- Acesso rápido a Início, Buscar, Salvos, Mapas e Mais

\- Menu expandido com opções complementares

\- Botão específico de localização

\- Indicadores meteorológicos em grade

\- Previsão horizontal com rolagem

\- Adaptação dos painéis e do rodapé

\- Estilos para tema claro e escuro



### Acessibilidade da navegação



A navegação mobile foi revisada com:



\- `aria-expanded`

\- Identificação dos controles e regiões

\- Fechamento pela tecla `Escape`

\- Retorno do foco ao botão de abertura

\- Identificação de destinos ativos

\- Preservação da navegação por teclado



A contenção completa de foco em um eventual diálogo modal permanece como possível melhoria futura.



### Validação mobile pendente



Embora existam estilos responsivos implementados, **os testes práticos em smartphone físico ainda não foram concluídos**.



A revisão futura verificará especialmente um possível recorte horizontal observado em testes de emulação, além de áreas de toque, legibilidade e comportamento da navegação.



\---



## 🧱 Arquitetura do App Clima Global



A nova versão utiliza uma organização por responsabilidades.



```text

app-clima-global-dashboard/

├── public/

├── src/

│   ├── components/

│   │   ├── dashboard/

│   │   │   └── ClimateMap.tsx

│   │   ├── layout/

│   │   │   ├── Sidebar.tsx

│   │   │   └── Topbar.tsx

│   │   └── weather/

│   │       └── WeatherHero.tsx

│   ├── data/

│   ├── hooks/

│   ├── services/

│   │   └── weatherService.ts

│   ├── styles/

│   │   ├── climate-map.css

│   │   ├── layout.css

│   │   ├── light-mode.css

│   │   ├── mobile-dashboard.css

│   │   ├── mobile-navigation.css

│   │   └── variables.css

│   ├── types/

│   ├── utils/

│   │   └── weatherHighlights.ts

│   ├── App.tsx

│   └── main.tsx

├── .env.local

├── package.json

└── vite.config.ts

```



O arquivo `.env.local` é destinado à configuração local e não deve ser publicado no Git.



### Principais responsabilidades



**`App.tsx`**



Coordena estado meteorológico, pesquisas, favoritos, tema, navegação e composição do dashboard.



**`WeatherHero.tsx`**



Apresenta o painel climático principal, incluindo temperatura, saudação, cenário meteorológico e interação com favoritos.



**`ClimateMap.tsx`**



Responsável pela interface cartográfica e interação com o mapa climático.



**`Sidebar.tsx`**



Implementa navegação lateral e controles de navegação mobile.



**`Topbar.tsx`**



Implementa busca meteorológica e controles do cabeçalho.



**`weatherService.ts`**



Centraliza comunicação com os serviços meteorológicos, normalização dos dados, validações e previsão.



**`weatherHighlights.ts`**



Contém as regras responsáveis pelas recomendações climáticas inteligentes.



\---



## 🧹 Clean Code e refatorações do App Clima Global



Durante a Sprint 12 foram realizadas revisões técnicas incrementais.



### Melhorias implementadas



\- Separação das recomendações climáticas em `weatherHighlights.ts`

\- Extração do componente `WeatherHero.tsx`

\- Remoção de propriedades redundantes dos indicadores meteorológicos

\- Organização das responsabilidades do componente principal

\- Limpeza inicial de regras CSS duplicadas

\- Revisão do gerenciamento de favoritos

\- Melhorias de acessibilidade na navegação mobile

\- Preservação de comentários técnicos e organizacionais

\- Ajuste visual do relógio no rodapé



### Auditorias realizadas



\- Tipagem React e TypeScript

\- Gerenciamento de estados

\- Persistência em `localStorage`

\- Tratamento de erros

\- Componentização

\- Semântica JSX

\- Responsividade

\- Navegação e acessibilidade

\- Integrações meteorológicas

\- Segurança de configuração da API

\- Organização de estilos



O princípio adotado durante as refatorações foi **separar responsabilidades quando existe benefício real**, evitando a criação de arquivos desnecessários.



### Validação técnica



Nas verificações locais realizadas durante o desenvolvimento:



\- ESLint aprovado

\- Compilação TypeScript aprovada

\- Build de produção aprovado

\- Testes visuais e funcionais executados no navegador

\- Busca, favoritos, temas e painel climático verificados



Os resultados não substituem testes automatizados abrangentes nem uma auditoria completa de acessibilidade e segurança.



\---



## 🖼️ Galeria premium do App Clima Global



A apresentação do projeto no portfólio recebeu três novas imagens, preparadas para evidenciar a interface do dashboard.



### Imagens integradas



```text

src/assets/images/projects/

├── app-clima-global.png

├── favoritos-pesquisa.png

└── mapa-e-info.png

```



### Apresentações



**Visão geral do dashboard**



Exibe a interface Cyberpunk Neon, o painel climático principal e a organização dos componentes.



**Favoritos e pesquisa**



Destaca a consulta meteorológica e o sistema de cidades salvas.



**Mapa e informações**



Apresenta a previsão meteorológica, o mapa interativo e os indicadores complementares.



As imagens foram integradas à configuração de projetos em `src/data/projects.ts`.



O build local do portfólio confirmou a resolução dos caminhos dos três arquivos.



### Próxima atualização visual



Está planejada a inclusão de demonstrações realizadas em smartphone físico, permitindo apresentar também a experiência mobile do aplicativo.



\---



## ⚠️ Segurança da API meteorológica



Durante o desenvolvimento local, o App Clima Global utiliza uma variável de ambiente com prefixo `VITE_` para configurar a chave da OpenWeatherMap.



Em projetos Vite, essas variáveis são incorporadas ao código executado no navegador.



Consequentemente, **o arquivo `.env.local` não ser enviado ao Git não significa que a chave ficará secreta após a publicação de uma aplicação frontend estática**.



Antes da disponibilização pública, é necessário avaliar medidas como:



\- Monitoramento do consumo da API

\- Limites de utilização

\- Configuração das permissões e restrições oferecidas pelo provedor

\- Rotação de chaves eventualmente expostas

\- Uso de um backend ou proxy intermediário quando for necessário manter credenciais privadas



O GitHub Pages fornece hospedagem estática e não executa um backend responsável por proteger credenciais.



\---



\

---

## 💱 Conversor Global Pro



Aplicação de conversão de moedas com interface inspirada em plataformas financeiras.



### Recursos



\- Conversão entre moedas

\- Consulta de cotações

\- Integração com APIs

\- Interface moderna

\- Tema escuro

\- Persistência de preferências



**Tecnologias:** HTML5, CSS3, JavaScript e APIs externas.



\---



\

---

## 🎵 EON MUSIC



Projeto de plataforma musical em desenvolvimento.



**Tecnologias-base:** React, TypeScript e Vite.



### Funcionalidades em evolução ou planejadas



\- Reprodução musical

\- Player global

\- Biblioteca de músicas

\- Fila de reprodução

\- Favoritos

\- Reprodução aleatória

\- Repetição

\- Playlists

\- Evolução para PWA

\- Possíveis recursos futuros de streaming



**Status:** Em desenvolvimento.



\---



\


---

## 👨‍💻 Autoria e identidade

**EonLabs** — laboratório de tecnologia e inovação idealizado por **CicGhost**.

- **GitHub:** [CicDEV83](https://github.com/CicDEV83)
- **E-mail profissional:** csilvaw9.3@gmail.com

## 📄 Direitos autorais

© 2026 EonLabs. Todos os direitos reservados.

Desenvolvido com **React, TypeScript e Vite**.

> Este README foi reorganizado para refletir a nova página institucional, preservando separadamente a documentação histórica dos projetos próprios.
