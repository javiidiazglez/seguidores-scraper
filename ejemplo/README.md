# Carpeta de ejemplo

Muestra cómo nombrar y organizar los `.txt` antes de usar el **analizador** o `npm run comparador`.

## Estructura

```text
ejemplo/
└── javi/
    ├── seguidores-base.txt
    ├── seguidores-comparacion.txt
    ├── seguidos-base.txt
    └── seguidos-comparacion.txt
```

En tu PC, replica la misma idea dentro de `scraper/<cuenta>/`:

```text
scraper/
└── javi/
    ├── seguidores1Javi.txt
    ├── seguidores2Javi.txt
    ├── seguidos1Javi.txt
    └── seguidos2Javi.txt
```

## Reglas de nombre

| Prefijo | Tipo | Ejemplo |
|---------|------|---------|
| `seguidores` | Lista de seguidores | `seguidores29JulioJorge.txt` |
| `seguidos` | Lista de seguidos | `seguidos3AgostoJorge.txt` |

- **base**: archivo antiguo o más grande (referencia).
- **comparación**: archivo nuevo a contrastar.

Importante: `seguidores` debe ir **antes** que `seguidos` al nombrar, porque `seguidores…` también empieza por `seguidos`.

## Uso

- **Analizador (web):** sube los `.txt` y elige base y comparación.
- **Terminal:** `npm run comparador` lee los archivos de `scraper/<cuenta>/`.
