# Landing Page — Configuração da API (App Clima)

Este repositório contém uma landing page pessoal e um pequeno projeto demonstrativo de clima em `projeto1-app-clima/` que usa a API do OpenWeatherMap.

Este README explica como configurar a _API key_ do OpenWeatherMap de forma segura e as opções rápidas para desenvolvimento local.

Opção 1 — Rápida (não segura)

- Abra `projeto1-app-clima/script.js` e substitua o valor de `const apiKey = "..."` pela sua chave.
- Atenção: NÃO comite a chave no repositório. Use esta opção apenas para testes rápidos em local.

Opção 2 — Recomendada (sem commitar a chave)

1. Crie um ficheiro `projeto1-app-clima/config.example.js` com o conteúdo:

```js
// projeto1-app-clima/config.example.js
window.OPENWEATHER_API_KEY = "YOUR_API_KEY_HERE";
```

2. Copie este ficheiro para `projeto1-app-clima/config.js` e substitua `YOUR_API_KEY_HERE` pela sua chave privada.
3. Adicione `projeto1-app-clima/config.js` ao `.gitignore` para garantir que não será comitado:

```
# Ignore local API key
projeto1-app-clima/config.js
```

4. Inclua o `config.js` em `projeto1-app-clima/index.html` ANTES do `script.js`:

```html
<!-- antes do -->
<script src="config.js"></script>
<script src="script.js"></script>
```

5. (Opcional) Alteração segura no `script.js` para ler a chave de `window.OPENWEATHER_API_KEY`:

```js
// no topo de projeto1-app-clima/script.js
const apiKey = window.OPENWEATHER_API_KEY || "";
if (!apiKey) {
  console.warn(
    "OpenWeather API key not set. Configure projeto1-app-clima/config.js or edit script.js for local testing.",
  );
}
```

Notas importantes

- Geolocation: o app pede permissão para geolocalização; isto só funciona em `https://` ou `http://localhost`.
- Não comite chaves secretas. Se for necessário partilhar instruções, inclua apenas `config.example.js` ou `.env.example`.
- A API do OpenWeatherMap tem limites de uso no plano gratuito (~1000 requests/dia). Monitore se o app for usado frequentemente.

Testar localmente

- Servir ficheiros por um servidor local (recomendado) — exemplo com `http-server` ou Live Server.

Em PowerShell (Windows):

```powershell
npx http-server -c-1 .
# ou, se usar Live Server no VS Code, basta clicar em "Go Live"
```

Se quiser que eu implemente a leitura a partir de `window.OPENWEATHER_API_KEY` e a inclusão automática de `config.example.js`, posso abrir um PR com essas mudanças — diga se prefere isso.
