import type { Project } from "../types";

import appClimaHome from "../assets/images/projects/app-clima-home.png";
import appClimaResultado from "../assets/images/projects/app-clima-resultado.png";

export const projects: Project[] = [
  {
    id: "app-clima-global",

    title: "App Clima Global",

    subtitle: "Clima em tempo real com experiência responsiva",

    description:
      "Aplicação meteorológica com geolocalização, dados em tempo real, relógio, saudação dinâmica e sistema de tema automático e manual com persistência local.",

    status: "Concluído",

    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "OpenWeather API",
      "LocalStorage",
    ],

    projectUrl: "projeto1-app-clima/index.html",

    images: [appClimaHome, appClimaResultado],

    featured: true,
  },

  {
    id: "task-manager-pro",

    title: "Task Manager Pro",

    subtitle: "Organização de tarefas com interface moderna",

    description:
      "Aplicação voltada para gerenciamento de tarefas, produtividade e organização pessoal, construída com foco em usabilidade, responsividade e experiência moderna.",

    status: "Concluído",

    technologies: ["HTML5", "CSS3", "JavaScript"],

    projectUrl: "task-manager-pro/index.html",

    featured: false,
  },

  {
    id: "conversor-global-pro",

    title: "Conversor Global Pro",

    subtitle: "Conversão de moedas com dados em tempo real",

    description:
      "Conversor de moedas com cotações em tempo real, seleção de moedas, interface inspirada em plataformas financeiras, modo escuro e experiência responsiva.",

    status: "Concluído",

    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "AwesomeAPI",
      "IPAPI",
      "LocalStorage",
    ],

    projectUrl: "currency-converter-pro/index.html",

    featured: true,
  },

  {
    id: "eon-music",

    title: "EON MUSIC",

    subtitle: "Plataforma musical moderna em evolução",

    description:
      "Aplicação musical construída com React, TypeScript e Vite, com arquitetura escalável, player global, reprodução de arquivos locais e evolução planejada para biblioteca, fila, favoritos, playlists, PWA e streaming.",

    status: "Em desenvolvimento",

    technologies: ["React", "TypeScript", "Vite", "CSS3", "PWA"],

    featured: true,
  },
];
