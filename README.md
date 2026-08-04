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

<a id="1-copiar-codigo"></a>

## 1. Copiar código

Entra en [Extraer](https://josejavierdiazgonzalez.github.io/seguidores-scraper/extraer/), pulsa **Copy code** y copia el script.

<p align="center">
  <img src="images/01-extraer-copy-code.gif" alt="Pagina extraer con Copy code" width="480">
</p>

---

## 2. Consola de Instagram

Abre tu perfil, pulsa `F12`, ve a **Console**, pega el código y pulsa **Enter**.

<p align="center">
  <img src="images/02-consola-pegar-ejecutar.gif" alt="Consola: pegar y ejecutar el script" width="747">
</p>

---

## 3. Descargar `.txt`

Cuando termine el proceso, descarga seguidores y seguidos. Nómbralos empezando por `seguidores` o `seguidos`.

<p align="center">
  <img src="images/03-extraer-descargar-txt.png" alt="Descargar seguidores y seguidos" width="360">
</p>

Guárdalos en `scraper/<cuenta>/` (carpeta local, una por perfil). Más detalle abajo en **Clonar el repo**.

---

## 4. Analizador

En [Analizador](https://josejavierdiazgonzalez.github.io/seguidores-scraper/analizador/), sube los archivos y elige cuál es la **base** y cuál la **comparación** (seguidores y seguidos por separado).

<p align="center">
  <img src="images/04-analizador-comparacion-1.png" alt="Analizador: comparacion de seguidores y seguidos" width="747">
</p>

Alternativa en terminal: `npm run comparador` (ver sección clonar).

---

<sub>Usa estas herramientas solo sobre **tu cuenta** o con permiso. Respeta los términos de Instagram y la privacidad de terceros.</sub>

<details>
<summary><strong>Clonar el repo y ejecutarlo en local</strong></summary>

<br>

### Requisitos

- Navegador con Instagram (sesión iniciada) para los scripts de consola
- [Node.js](https://nodejs.org/) solo para `npm run comparador`

### Instalación

```bash
git clone https://github.com/josejavierdiazgonzalez/seguidores-scraper.git
cd seguidores-scraper
npm install
```

### Carpeta `scraper/` (tus `.txt`)

Crea una carpeta por cuenta y guarda ahí todos los `.txt`:

```text
scraper/
└── javi/
    ├── seguidores1Javi.txt
    ├── seguidores2Javi.txt
    ├── seguidos1Javi.txt
    └── seguidos2Javi.txt
```

- El nombre debe **empezar por** `seguidores` o `seguidos`.
- Seguidores y seguidos van en la **misma carpeta**, mezclados.
- `scraper/` no se sube a Git: es solo en tu PC.

Ejemplo listo para probar en [`ejemplo/`](ejemplo/).

### Comparador en terminal

```bash
npm run comparador
```

Elige carpeta, archivo **base** y **comparación** para seguidores y seguidos.

<p align="center">
  <img src="images/05-comparador-terminal.png" alt="Comparador en terminal" width="560">
</p>

### Abrir las páginas en local

Abre los HTML de `public/` en el navegador (no hace falta servidor):

| Página | Archivo |
|--------|---------|
| Menú | `public/index.html` |
| Extraer | `public/extraer/index.html` |
| Comparar | `public/comparar/index.html` |
| Analizador | `public/analizador/index.html` |

En GitHub Pages: [josejavierdiazgonzalez.github.io/seguidores-scraper/](https://josejavierdiazgonzalez.github.io/seguidores-scraper/)

### Estructura del repo

```text
seguidores-scraper/
├── public/              # Web: extraer, comparar, analizador
├── scripts/
│   └── comparador-txt.js
├── ejemplo/             # .txt de muestra
├── images/              # Capturas del README
├── scraper/             # Tus .txt (local, gitignore)
└── package.json
```

</details>
