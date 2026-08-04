<p align="center">
  <img src="images/logo.webp" alt="Seguidores Scraper" width="220">
</p>

<h1 align="center">Seguidores Scraper</h1>

<p align="center">
  Compara listas de <strong>seguidores</strong> y <strong>seguidos</strong> entre dos fechas.
</p>

<p align="center">
  <a href="https://josejavierdiazgonzalez.github.io/seguidores-scraper/extraer/">Extraer</a>
  ·
  <a href="https://josejavierdiazgonzalez.github.io/seguidores-scraper/comparar/">Comparar</a>
  ·
  <a href="https://josejavierdiazgonzalez.github.io/seguidores-scraper/analizador/">Analizador</a>
</p>

<br>

<h3 align="center">1 · Copy code</h3>
<p align="center">Abre <a href="https://josejavierdiazgonzalez.github.io/seguidores-scraper/extraer/">extraer</a> y pulsa <strong>Copy code</strong>.</p>
<p align="center">
  <img src="images/01-extraer-copy-code.gif" alt="Pagina extraer con Copy code" width="480">
</p>

<br>

<h3 align="center">2 · Consola de Instagram</h3>
<p align="center">Perfil → <code>F12</code> → <strong>Console</strong> → pega y <strong>Enter</strong>.</p>
<p align="center">
  <img src="images/02-consola-pegar-ejecutar.gif" alt="Consola: pegar y ejecutar el script" width="747">
</p>

<br>

<h3 align="center">3 · Descargar .txt</h3>
<p align="center">Al terminar, descarga seguidores y seguidos. El nombre debe empezar por <code>seguidores</code> o <code>seguidos</code>.</p>
<p align="center">
  <img src="images/03-extraer-descargar-txt.png" alt="Descargar seguidores y seguidos" width="360">
</p>

<br>

<h3 align="center">4 · Analizador</h3>
<p align="center">Abre <a href="https://josejavierdiazgonzalez.github.io/seguidores-scraper/analizador/">analizador</a>, carga los <code>.txt</code> y elige <strong>base</strong> y <strong>comparación</strong>.</p>
<p align="center">
  <img src="images/04-analizador-comparacion.png" alt="Analizador: comparacion de seguidores y seguidos" width="747">
</p>

<br>

<p align="center"><sub>Usa estas herramientas solo sobre <strong>tu cuenta</strong> o con permiso. Respeta los términos de Instagram y la privacidad de terceros.</sub></p>

<br>

<details>
<summary><strong>Clonar el repo y ejecutarlo en local</strong></summary>

<br>

Solo si quieres modificar el código, usar el comparador en terminal o desplegar tu propia copia.

### Requisitos

- [Node.js](https://nodejs.org/)
- Navegador con Instagram (sesión iniciada)

### Paso a paso

```bash
git clone https://github.com/josejavierdiazgonzalez/seguidores-scraper.git
cd seguidores-scraper
npm install
npm run build
```

- **Extraer / comparar:** `public/extraer/index.html`, `public/comparar/index.html` o GitHub Pages.
- **Comparador en terminal:** `npm run comparador` (`.txt` en `scraper/<cuenta>/`).
- **Analizador:** `public/analizador/index.html` o `/analizador/` en Pages.

### Estructura del proyecto

```text
seguidores-scraper/
├── scripts/
│   ├── comparador-txt.js
│   └── build.js
├── public/
│   ├── index.html
│   ├── extraer/index.html
│   ├── comparar/index.html
│   └── analizador/index.html
├── images/
├── package.json
├── ejemplo/
└── scraper/                       # gitignore
```

### Mantenimiento

**Extraer** - tras editar el `.js` en `otros/`:

```bash
npm run build
```

**Comparar** - minificado en `otros/comparar-minified.js` y el mismo `npm run build`.

Commit de `public/extraer/index.html` y `public/comparar/index.html` + push. GitHub Actions publica `public/` en Pages.

</details>
