<p align="center">
  <img src="images/logo.webp" alt="Seguidores Scraper" width="220">
</p>

<h1 align="center">Seguidores Scraper</h1>

<p align="center">
  Compara listas de <strong>seguidores</strong> y <strong>seguidos</strong> entre dos fechas.
</p>

<p align="center">
  <a href="https://josejavierdiazglez.github.io/seguidores-scraper/extraer/" target="_blank" rel="noopener noreferrer">Extraer</a>
  ·
  <a href="https://josejavierdiazglez.github.io/seguidores-scraper/comparar/" target="_blank" rel="noopener noreferrer">Comparar</a>
  ·
  <a href="https://josejavierdiazglez.github.io/seguidores-scraper/analizador/" target="_blank" rel="noopener noreferrer">Analizador</a>
</p>

---

<a id="1-copiar-codigo"></a>

## 1. Copiar código

Entra en <a href="https://josejavierdiazglez.github.io/seguidores-scraper/extraer/" target="_blank" rel="noopener noreferrer">Extraer</a>, pulsa **Copy code** y copia el script.

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

Guárdalos en `scraper/<cuenta>/` (carpeta local, una por perfil). Más detalle en [Comparador en terminal](#comparador-en-terminal).

---

## 4. Analizador

En <a href="https://josejavierdiazglez.github.io/seguidores-scraper/analizador/" target="_blank" rel="noopener noreferrer">Analizador</a>, sube los archivos y elige cuál es la **base** y cuál la **comparación** (seguidores y seguidos por separado).

<p align="center">
  <img src="images/04-analizador-comparacion-1.png" alt="Analizador: comparacion de seguidores y seguidos" width="747">
</p>

Alternativa en terminal: [`pnpm run comparador`](#comparador-en-terminal).

---

> ⚠️ **Aviso legal** - Usa estas herramientas **solo en tu cuenta** o con permiso explícito de quien corresponda.  
> 📵 No recopiles ni compartas datos de terceros sin su consentimiento.  
> 📋 El uso de Instagram queda bajo **tu responsabilidad** y sus <a href="https://help.instagram.com/" target="_blank" rel="noopener noreferrer">términos de servicio</a>; este proyecto es una utilidad sin garantías ni soporte oficial.

<details>
<summary><strong>CLONAR REPOSITORIO Y COMPARADOR EN TERMINAL</strong></summary>

<br>

### Requisitos

- Navegador con Instagram (sesión iniciada) para los scripts de consola
- <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a> + <a href="https://pnpm.io/" target="_blank" rel="noopener noreferrer">pnpm</a> solo para `pnpm run comparador`

### Instalación

```bash
git clone git@github.com:josejavierdiazglez/seguidores-scraper.git
cd seguidores-scraper
pnpm install
pnpm test
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

<a id="comparador-en-terminal"></a>

### Comparador en terminal

```bash
pnpm run comparador
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

En GitHub Pages: <a href="https://josejavierdiazglez.github.io/seguidores-scraper/" target="_blank" rel="noopener noreferrer">josejavierdiazglez.github.io/seguidores-scraper/</a>

### Estructura del repo

```text
seguidores-scraper/
├── public/              # Web: extraer, comparar, analizador
├── scripts/
│   ├── comparador-lib.js
│   ├── comparador-txt.js
│   └── comparador-txt.test.js
├── ejemplo/             # .txt de muestra
├── images/              # Capturas del README
├── scraper/             # Tus .txt (local, gitignore)
├── package.json         # pnpm test, pnpm run comparador
└── pnpm-lock.yaml
```

</details>
