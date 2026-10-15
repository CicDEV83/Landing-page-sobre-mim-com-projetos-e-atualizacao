import type { Project } from "../types";

import appClimaGlobal from "../assets/images/projects/app-clima-global.png";
import favoritosPesquisa from "../assets/images/projects/favoritos-pesquisa.png";
import mapaEInfo from "../assets/images/projects/mapa-e-info.png";

import taskManagerHome from "../assets/images/projects/task-manager-home.png";
import taskManagerTask from "../assets/images/projects/task-manager-task.png";

import conversorHome from "../assets/images/projects/conversor-home.png";
import conversorHomeC from "../assets/images/projects/conversor-homec.png";
import conversorUsdBrl from "../assets/images/projects/conversor-usd-brl.png";
import conversorBrlUsd from "../assets/images/projects/conversor-brl-usd.png";

export const projects: Project[] = [
  {
    id: "app-clima-global",

    title: "App Clima Global",

    subtitle: "Clima em tempo real com experiência responsiva",

    description:
      "Aplicação meteorológica com geolocalização, dados em tempo real, relógio, saudação dinâmica e sistema de tema automático e manual com persistência local.",

    status: "Concluído",

    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "CSS3",
      "OpenWeatherMap",
      "Open-Meteo",
      "React Leaflet",
      "LocalStorage",
    ],

    projectUrl: "app-clima-global/",

    images: [appClimaGlobal, favoritosPesquisa, mapaEInfo],

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

    images: [taskManagerHome, taskManagerTask],

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

    images: [conversorHome, conversorHomeC, conversorUsdBrl, conversorBrlUsd],

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
