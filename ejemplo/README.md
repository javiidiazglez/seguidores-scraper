# Carpeta de ejemplo

Muestra cómo organizar los `.txt` antes de usar el comparador.

```text
ejemplo/
└── javi/
    ├── seguidores-base.txt
    ├── seguidores-comparacion.txt
    ├── seguidos-base.txt
    └── seguidos-comparacion.txt
```

- **base**: archivo antiguo o más grande.
- **comparacion**: archivo nuevo a contrastar.

El comparador detecta el tipo por el **nombre del archivo**:

- Empieza por `seguidores` → seguidores (p. ej. `seguidores29JulioJorge.txt`)
- Empieza por `seguidos` → seguidos (p. ej. `seguidos3AgostoJorge.txt`)

Replica la misma idea en `scraper/<cuenta>/` (todos los `.txt` en la misma carpeta).
