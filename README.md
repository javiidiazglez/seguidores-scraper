# Seguidores Scrapper

Proyecto para **comparar archivos `.txt`** de **seguidores** y **seguidos** entre fechas.

## Uso (GitHub Pages)

1. Abre `https://<tu-usuario>.github.io/<nombre-repo>/`
2. Pulsa **Copy code**
3. En Instagram: perfil → `F12` → **Console** → pega y **Enter**
4. Descarga los `.txt` en `scrapper/<cuenta>/...`
5. Compara: `node scripts/comparador-txt.js`

Las capturas del tutorial van en [`images/`](images/) (ver [`images/README.md`](images/README.md)).

## Estructura del proyecto

```text
seguidores-scrapper/
├── scripts/
│   ├── comparador-txt.js
│   └── build.js
├── public/
│   └── index.html                 # Copy code + bundle embebido → GitHub Pages
├── dist/                          # Solo local (gitignore): caché de dist/dist.js
├── images/                        # Capturas del README (no van a Pages)
├── .github/workflows/             # Despliegue Pages
├── package.json                   # npm run build
├── ejemplo/
├── scrapper/                      # gitignore
└── otros/                         # gitignore: fuente legible del extractor
```

**No uses `public/dist/`** — era un duplicado viejo. Solo existen `public/index.html` (lo público) y `dist/dist.js` (caché en tu PC tras `npm run build`).

### Repositorio público: qué se sube

| Qué | ¿En Git? | ¿Lo ves en tu PC? |
|-----|----------|-------------------|
| Fuente legible del extractor (`.js` en `otros/`) | **No** | Sí (solo local) |
| `dist/dist.js` (caché local) | **No** | Sí (regenerable con `npm run build`) |
| Comparador, README, ejemplo | **Sí** | Sí |
| `public/index.html` (bundle embebido) | **Sí** | Sí |

**Oculto para GitHub** = listado en `.gitignore`. Git **no los sube** al repo público.

En tu PC **siguen existiendo** (`dist/`, `otros/`, `scrapper/`, etc.) pero Git **no los sube** si están en `.gitignore`.

Comprueba antes del push:

```bash
git status
git add -n .
```

No deben aparecer `otros/`, `scrapper/` ni `dist/`.

En la página publicada el script **no se muestra en la caja**; solo se copia con **Copy code**.

### Mantenimiento (tú, con Node)

Tras editar el `.js` del extractor en `otros/`:

```bash
npm install
npm run build
```

(o `node scripts/build.js otros/tu-archivo-extractor.js` si ya tienes `node_modules`)

El build usa **Terser** (no un “minificado falso” que unía líneas y rompía comentarios `//`, dejando el script a medias en la consola).

Eso minifica, guarda copia en `dist/dist.js` (local) y actualiza el bundle en `public/index.html`. Haz commit de `public/index.html` y push.

GitHub Actions publica solo la carpeta `public/` en Pages.

Activa Pages en el repo: **Settings → Pages → Build and deployment → GitHub Actions**.

### Primer push (checklist)

1. `git add .` y revisa que **no** entren `scrapper/`, `otros/` ni `dist/` (`git status` antes del commit).
2. `git commit` y `git push` a `main` o `master` (el workflow escucha ambas).
3. En GitHub: **Actions** → workflow *Deploy GitHub Pages* en verde.
4. Abre `https://<usuario>.github.io/<nombre-repo>/`, **Copy code**, pega en la consola de Instagram.

Si el workflow falla con “no tiene el bundle”, ejecuta `npm run build` en local y vuelve a commitear `public/index.html`.

---

## Requisitos

- Navegador con Instagram (sesión iniciada).
- [Node.js](https://nodejs.org/) para el comparador y para `npm run build`.

---

## Parte 1: Sacar los `.txt` (Copy code)

**1.** Abre la página publicada, por ejemplo:

`https://<tu-usuario>.github.io/<nombre-repo>/`

(en local puedes abrir `public/index.html` después de `npm run build`)

![Pagina copy code](images/02-consola-script.png)

**2.** Pulsa **Copy code**.

**3.** En Instagram, abre tu perfil → `F12` → **Console** → pega y **Enter**.

![Perfil de Instagram](images/01-perfil-instagram.png)

**4.** En el panel **Extractor Instagram**, pulsa **Iniciar Programa Completo**.

![Panel del extractor](images/03-panel-extractor.png)

**5.** Al terminar, descarga seguidores y seguidos en `.txt`.

![Panel finalizado](images/05-panel-finalizado.png)

**6.** Guárdalos así:

```text
scrapper/jorge/seguidores/seguidores29JulioJorge.txt
scrapper/jorge/seguidos/seguidos29JulioJorge.txt
```

---

## Parte 2: Comparar `.txt`

```bash
node scripts/comparador-txt.js
```

![Comparador](images/07-comparador-terminal.png)

Elige cuenta (`scrapper/<nombre>/`), luego archivo **base** y **comparación** para seguidores y para seguidos.

Ejemplo en [`ejemplo/javi/`](ejemplo/javi/).

![Resultado](images/08-resultado-comparador.png)

---

## Carpetas `public/`, `dist/` e `images/`

| Carpeta | Uso |
|---------|-----|
| `public/` | Solo `index.html` — lo que ve el usuario en Pages |
| `dist/` | Caché local del `.js` minificado (no se sube a Git) |
| `images/` | Capturas del README en GitHub |

---

## Resumen

| Objetivo | Dónde |
|----------|--------|
| Copiar script (usuarios) | `https://<usuario>.github.io/<repo>/` |
| Comparar listas | `node scripts/comparador-txt.js` |
| Actualizar Copy code | `npm run build` + commit `public/index.html` |
| Ver estructura ejemplo | `ejemplo/` |
| Capturas README | `images/` |

---

## Aviso

Usa estas herramientas solo sobre **tu cuenta** o con permiso. Respeta los términos de Instagram y la privacidad de terceros.
