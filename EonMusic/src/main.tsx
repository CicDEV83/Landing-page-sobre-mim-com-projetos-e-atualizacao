import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app/App";
import { PlayerProvider } from "./features/player/PlayerContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Falha ao encontrar o elemento root. O aplicativo não pôde ser inicializado.",
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </StrictMode>,
);
