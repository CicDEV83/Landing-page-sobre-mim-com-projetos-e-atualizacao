import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  // Caminho previsto para publicação dentro do GitHub Pages.
  base: "/Landing-page-sobre-mim-com-projetos-e-atualizacao/app-clima-global/",
});
