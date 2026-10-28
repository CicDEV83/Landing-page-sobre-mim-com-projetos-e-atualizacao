import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./styles/global/tokens.css";
import "./styles/global/globals.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Elemento #root nao encontrado.");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);