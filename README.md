<p align="center">
  <img src="images/logo.webp" alt="Seguidores Scraper" width="220">
</p>

# Seguidores Scraper

Proyecto para **comparar archivos `.txt`** de **seguidores** y **seguidos** entre fechas.

**Copiar scripts (Copy code):**

- **Extraer (seguidores/seguidos):** [https://javiidiazglez.github.io/seguidores-scraper/extraer/](https://javiidiazglez.github.io/seguidores-scraper/extraer/)
- **Comparar (en Instagram):** [https://javiidiazglez.github.io/seguidores-scraper/comparar/](https://javiidiazglez.github.io/seguidores-scraper/comparar/)

La raíz [https://javiidiazglez.github.io/seguidores-scraper/](https://javiidiazglez.github.io/seguidores-scraper/) muestra el menú con **extraer** y **comparar** (sin redirección automática).

## Uso (GitHub Pages)

1. Abre **[extraer](https://javiidiazglez.github.io/seguidores-scraper/extraer/)** o **[comparar](https://javiidiazglez.github.io/seguidores-scraper/comparar/)** según el script que necesites
2. Pulsa **Copy code**
3. En Instagram: perfil → `F12` → **Console** → pega y **Enter**
4. Descarga los `.txt` en `scraper/<cuenta>/`
5. Compara: `npm run comparador`

Las capturas del tutorial van en [`images/`](images/) (ver [`images/README.md`](images/README.md)).

## Estructura del proyecto

```text
seguidores-scraper/
├── scripts/
│   ├── comparador-txt.js
│   └── build.js
├── public/
│   ├── assets/logo.ico            # Favicon del sitio (GitHub Pages)
│   ├── index.html                 # Menú: enlaces a extraer/ y comparar/
│   ├── extraer/index.html         # Copy code extractor (bundle embebido)
│   └── comparar/index.html        # Copy code comparar (desde otros/comparar-minified.js)
├── dist/                          # Solo local (gitignore): caché de dist/dist.js
├── images/                        # Capturas del README (no van a Pages)
├── .github/workflows/             # Despliegue Pages
├── package.json                   # npm run build, npm run comparador
├── ejemplo/
├── scraper/                      # gitignore
└── otros/                         # gitignore: fuentes locales (extractor, comparar-minified.js)
```

**No uses `public/dist/`** — era un duplicado viejo. Los bundles van en `public/extraer/index.html` y `public/comparar/index.html`; `dist/dist.js` es caché local del script **extraer**.

### Repositorio público: qué se sube

| Qué | ¿En Git? | ¿Lo ves en tu PC? |
|-----|----------|-------------------|
| Fuente legible del extractor (`.js` en `otros/`) | **No** | Sí (solo local) |
| `dist/dist.js` (caché local) | **No** | Sí (regenerable con `npm run build`) |
| Comparador, README, ejemplo | **Sí** | Sí |
| `otros/comparar-minified.js` (comparar, local) | **No** | Sí (embebido en `public/comparar/index.html` con `npm run build`) |
| `public/extraer/index.html` | **Sí** | Sí |
| `public/comparar/index.html` | **Sí** | Sí |

**Oculto para GitHub** = listado en `.gitignore`. Git **no los sube** al repo público.

En tu PC **siguen existiendo** (`dist/`, `otros/`, `scraper/`, etc.) pero Git **no los sube** si están en `.gitignore`.

Comprueba antes del push:

```bash
git status
git add -n .
```

No deben aparecer `otros/`, `scraper/` ni `dist/`.

En la página publicada el script **no se muestra en la caja**; solo se copia con **Copy code**.

### Mantenimiento (tú, con Node)

**Extraer** — tras editar el `.js` del extractor en `otros/`:

```bash
npm install
npm run build
```

**Comparar** — deja el minificado en `otros/comparar-minified.js` y ejecuta el mismo `npm run build`. No se modifica ese archivo en el build; solo se embebe en `public/comparar/index.html`.

(o `node scripts/build.js otros/tu-archivo-extractor.js` si ya tienes `node_modules`)

El build de **extraer** usa **Terser**. Eso minifica, guarda copia en `dist/dist.js` (local) y actualiza `public/extraer/index.html`. **Comparar** lee `otros/comparar-minified.js` tal cual. Haz commit de `public/extraer/index.html` y `public/comparar/index.html` y push.

GitHub Actions publica solo la carpeta `public/` en Pages.

Activa Pages en el repo: **Settings → Pages → Build and deployment → GitHub Actions**.

### Primer push (checklist)

1. `git add .` y revisa que **no** entren `scraper/`, `otros/` ni `dist/` (`git status` antes del commit).
2. `git commit` y `git push` a `main` o `master` (el workflow escucha ambas).
3. En GitHub: **Actions** → workflow *Deploy GitHub Pages* en verde.
4. Abre [extraer](https://javiidiazglez.github.io/seguidores-scraper/extraer/) o [comparar](https://javiidiazglez.github.io/seguidores-scraper/comparar/), **Copy code**, pega en la consola de Instagram.

Si el workflow falla con “no tiene el bundle”, ejecuta `npm run build` en local y vuelve a commitear `public/extraer/index.html` y `public/comparar/index.html`.

---

## Requisitos

- Navegador con Instagram (sesión iniciada).
- [Node.js](https://nodejs.org/) para el comparador y para `npm run build`.

---

## Parte 1: Sacar los `.txt` (Copy code)

**1.** Abre la página para copiar el código:

**[https://javiidiazglez.github.io/seguidores-scraper/extraer/](https://javiidiazglez.github.io/seguidores-scraper/extraer/)**

(en local, tras `npm run build`, también puedes abrir `public/extraer/index.html`)

![Pagina copy code](images/02-consola-script.png)

**2.** Pulsa **Copy code**.

**3.** En Instagram, abre tu perfil → `F12` → **Console** → pega y **Enter**.

![Perfil de Instagram](images/01-perfil-instagram.png)

**4.** En el panel **Extractor Instagram**, pulsa **Iniciar Programa Completo**.

![Panel del extractor](images/03-panel-extractor.png)

**5.** Al terminar, descarga seguidores y seguidos en `.txt`.

![Panel finalizado](images/05-panel-finalizado.png)

**6.** Guárdalos en la misma carpeta de la cuenta. El nombre debe empezar por `seguidores` o `seguidos`:

```text
scraper/jorge/seguidores29JulioJorge.txt
scraper/jorge/seguidos29JulioJorge.txt
```

---

## Parte 2: Comparar `.txt`

```bash
npm run comparador
```

![Comparador](images/07-comparador-terminal.png)

Elige cuenta (`scraper/<nombre>/`), luego archivo **base** y **comparación** para seguidores y para seguidos. Solo verás archivos cuyo nombre empiece por `seguidores` o `seguidos`, según corresponda.

Ejemplo en [`ejemplo/javi/`](ejemplo/javi/).

![Resultado](images/08-resultado-comparador.png)

---

## Carpetas `public/`, `dist/` e `images/`

| Carpeta | Uso |
|---------|-----|
| `public/` | `index.html` (menú), `extraer/` y `comparar/` (Copy code en Pages) |
| `dist/` | Caché local del `.js` minificado (no se sube a Git) |
| `images/` | Capturas del README en GitHub |

---

## Resumen

| Objetivo | Dónde |
|----------|--------|
| Copiar script extraer | [https://javiidiazglez.github.io/seguidores-scraper/extraer/](https://javiidiazglez.github.io/seguidores-scraper/extraer/) |
| Copiar script comparar | [https://javiidiazglez.github.io/seguidores-scraper/comparar/](https://javiidiazglez.github.io/seguidores-scraper/comparar/) |
| Comparar `.txt` en terminal | `npm run comparador` |
| Actualizar Copy code | `npm run build` + commit `public/extraer/index.html` y `public/comparar/index.html` |
| Ver estructura ejemplo | `ejemplo/` |
| Capturas README | `images/` |

---

## Aviso

Usa estas herramientas solo sobre **tu cuenta** o con permiso. Respeta los términos de Instagram y la privacidad de terceros.
