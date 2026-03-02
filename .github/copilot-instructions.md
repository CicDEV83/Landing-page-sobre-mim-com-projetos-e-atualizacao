# Copilot Instructions - Portfolio Landing Page

## Project Overview

This is a **personal portfolio landing page** for a fullstack developer in formation (Cicero W. Silva), built with vanilla HTML5, CSS3, and JavaScript. The project consists of two main parts:

1. **Root Landing Page** (`/`) - Main portfolio showcase with 3D particle background
2. **Weather App Demo** (`/projeto1-app-clima/`) - Embedded project example using OpenWeatherMap API

## Architecture & Key Patterns

### Landing Page Core Features

**1. Typewriter Text Animation**

- Files: `script.js` (lines 18-38), `index.html` (all `.typing` elements)
- Pattern: DOM elements with `data-text` attribute are dynamically typed out via `typeWriter()` function
- Cascade timing: Each typing element delays by `800ms * element_index` via staggered setTimeout in DOMContentLoaded
- CSS cursor: `.blink-dot` class adds animated blinking effect to dots

**2. 3D Particle Background (Canvas-based)**

- File: `script.js` (lines 92-248)
- 220 particles with full 3D transformations (rotate3D, projection)
- **Perspective effect**: Uses `perspective = 900px` and `maxDepth = 1200` for depth
- **Mouse interactivity**: Rotation triggered by mousemove (rotationX/Y based on cursor position)
- **Scroll boost**: `scrollSpeedBoost` multiplier (set to 8) activated on scroll, decays by 90% per frame
- **Particle connections**: Lines drawn between particles within `distance < 9000` threshold
- Canvas resizing handled in resize event listener to maintain full-window coverage

**3. Visual Styling Approach**

- CSS Variables: `--cor-primaria` (#00bcd4), `--cor-fundo`, `--cor-card`, `--cor-texto`
- Glassmorphism: All sections use `backdrop-filter: blur(15px)` + `rgba(255,255,255,0.05)` background
- Gradient animations: `gradientMove` keyframe animates background-position over 15s
- 3D perspective: `main { perspective: 1000px }` enables `section:hover { rotateX/Y }`

### Global Interaction Patterns

- **WhatsApp Integration** (`abrirWhatsApp()` line 4): Opens WhatsApp with pre-filled message
- **Smooth Scrolling** (`irParaContato()` line 10): `scrollIntoView({ behavior: "smooth" })`
- **Custom Cursor** (CSS `.cursor` class): Hidden default cursor, custom 15px circle with glow that scales on hover
- **Parallax** (lines 308-313): Hero section shifts by `window.scrollY * 0.15`
- **Loader System** (lines 316-323): Fixed overlay that fades out on window load

### Weather Project Specifics

**File Structure**: `projeto1-app-clima/{index.html, script.js, style.css}`

**API Setup - OpenWeatherMap**:

- API Key: Embedded in `script.js` line 1 as `const apiKey = "b98966e169785c6b77365acc80010d41s"`
- Two fetch endpoints used:
  - By city name: `https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&appid=${apiKey}&units=metric&lang=pt_br`
  - By geolocation: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
- Units: Metric (Celsius), Language: Portuguese (`pt_br`)
- Response contains: `main.temp`, `main.humidity`, `weather[0].description`, `weather[0].icon`, `weather[0].main`

**Data Flow**:

1. App auto-initializes with geolocation via `obterLocalizacao()` (uses Geolocation API)
2. User can search by city name via form submission
3. Both flows call `atualizarTela(dados)` which updates DOM and triggers dynamic background
4. Weather icon loaded from OpenWeatherMap CDN: `https://openweathermap.org/img/wn/${icon}@2x.png`

**Key Functions**:

- `atualizarRelogio()` - Real-time clock, updated every 1000ms via `setInterval()`
- `atualizarSaudacao()` - Greeting based on hour: <12 = "Bom dia", <18 = "Boa tarde", else = "Boa noite"
- `buscarClima(nomeCidade)` - Async fetch by city name
- `buscarClimaPorCoords(lat, lon)` - Async fetch by coordinates
- `atualizarTela(dados)` - Updates all DOM elements with weather data
- `mudarFundo(condicao)` - Dynamic gradient background based on weather condition
- `voltar()` - Navigation back to landing page (`../index.html`)

**Dynamic Background Logic** (`mudarFundo()`):

- Cloudy: Gray gradient (`#757f9a` to `#d7dde8`)
- Rainy: Dark blue gradient (`#4b79a1` to `#283e51`)
- Clear: Sunny yellow gradient (`#f7971e` to `#ffd200`)
- Default: Blue gradient (`#1e3c72` to `#2a5298`)
- Transition: 0.5s ease

**Design**: Centered card with glassmorphism (`backdrop-filter: blur(15px)` with `rgba(255, 255, 255, 0.1)`), responsive max-width: 500px

## Development Conventions

### Naming & Structure

- Portuguese naming: Variables, IDs, function names use Portuguese (`cidadeInput`, `formClima`)
- Semantic HTML: Proper use of `<header>`, `<section>`, `<article>`, `<figure>` tags
- Data attributes: Store content in `data-text` (typing) and `data-tooltip` (skill cards)

### CSS Organization

- Global variables in `:root` at top
- Mobile-first responsive breakpoints: `@media (max-width: 768px)` and `(max-width: 480px)`
- Animations defined separately in `@keyframes` section
- Color consistency: All primary accents use CSS var `--cor-primaria`

### JavaScript Patterns

- DOM-ready: All interactive code wrapped in `DOMContentLoaded` event
- Global scope: Helper functions (`abrirWhatsApp`, `typeWriter`) declared globally
- Event delegation: Queries like `document.querySelectorAll(".typing")` then forEach for batch operations
- Canvas animation: Single `requestAnimationFrame` loop, not multiple animation frames

## Common Tasks & Implementation Notes

**Adding New Sections**:

1. Add HTML with class `typing` on heading/text for auto-typewriter effect
2. Ensure section has proper `id` for internal linking
3. Animation delay handled automatically by forEach index in DOMContentLoaded

**Modifying Particle Background**:

- Particle count: `const particleCount = 220` (line 85)
- Connection distance threshold: `distance < 9000` (line 218)
- Color scheme: Cyan particles (`rgba(0,240,255,...)`) hardcoded in `draw()` and `connectParticles()`
- Perspective constant: `perspective = 900` (line 83) controls depth

**Styling New Elements**:

- Always use `--cor-primaria` for primary accent color
- Use glassmorphism pattern: `background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(15px);`
- Responsive breakpoints are 768px and 480px

## Weather App Integration & API Notes

**Critical Implementation Details**:

- Geolocation permission required: App calls `navigator.geolocation.getCurrentPosition()` on page load
- API key is hardcoded in `projeto1-app-clima/script.js` line 1 (not ideal for production - consider env variables for future versions)
- Error handling missing: No try/catch on fetch calls or geolocation failures - add graceful fallbacks if extending
- CORS: OpenWeatherMap API supports CORS; no proxy needed
- Rate limiting: Free tier allows ~1000 requests/day - monitor usage

**Testing the Weather App Locally**:

1. Browser must support Geolocation API (HTTPS or localhost required for permission)
2. On first load, user must allow location access
3. Can override with city search form
4. Icon images load from OpenWeatherMap CDN (requires internet)

## No Build Process

This is a static HTML/CSS/JS project with **zero build tools**. All files serve directly as-is. No bundlers, no compilation.

## Quick Reference - File Locations

- Landing page main style: `style.css` (CSS variables, particles, glassmorphism at lines 1-50)
- Landing page animation: `script.js` (typewriter, particles, interactions at lines 18-328)
- Weather app logic: `projeto1-app-clima/script.js` (API, clock, background at lines 1-139)
- Responsive design breakpoints: Both `style.css` files use 768px and 480px media queries
