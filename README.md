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

---

## 1 · Copiar código

Entra en [Extraer](https://josejavierdiazgonzalez.github.io/seguidores-scraper/extraer/), pulsa **Copy code** y copia el script.

<p align="center">
  <img src="images/01-extraer-copy-code.gif" alt="Pagina extraer con Copy code" width="480">
</p>

---

## 2 · Consola de Instagram

Abre tu perfil, pulsa `F12`, ve a **Console**, pega el código y pulsa **Enter**.

<p align="center">
  <img src="images/02-consola-pegar-ejecutar.gif" alt="Consola: pegar y ejecutar el script" width="747">
</p>

---

## 3 · Descargar `.txt`

Cuando termine el proceso, descarga seguidores y seguidos. Nómbralos empezando por `seguidores` o `seguidos`.

<p align="center">
  <img src="images/03-extraer-descargar-txt.png" alt="Descargar seguidores y seguidos" width="360">
</p>

---

## 4 · Analizador

En [Analizador](https://josejavierdiazgonzalez.github.io/seguidores-scraper/analizador/), sube los archivos y elige cuál es la **base** y cuál la **comparación** (seguidores y seguidos por separado).

<p align="center">
  <img src="images/04-analizador-comparacion.png" alt="Analizador: comparacion de seguidores y seguidos" width="747">
</p>

---

<sub>Usa estas herramientas solo sobre **tu cuenta** o con permiso. Respeta los términos de Instagram y la privacidad de terceros.</sub>

<details>
<summary><strong>Clonar el repo y ejecutarlo en local</strong></summary>

<br>

Para modificar el código, usar el comparador en terminal o desplegar tu propia copia.

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
