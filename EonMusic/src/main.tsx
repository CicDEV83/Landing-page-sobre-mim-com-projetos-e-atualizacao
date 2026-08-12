import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Falha ao encontrar o elemento root. O aplicativo não pôde ser inicializado.",
  );
}

// Inicialização segura usando a API concorrente do React 18+
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
