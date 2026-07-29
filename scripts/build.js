#!/usr/bin/env node
'use strict';

/**
 * Actualiza public/index.html con el extractor minificado (GitHub Pages).
 *
 * Uso:
 *   npm run build
 *     → reutiliza el bundle ya embebido en public/index.html (refresca dist/dist.js)
 *
 *   node scripts/build.js otros/tu-extractor.js
 *     → minifica ese archivo (fuente en otros/, gitignore) y embebe en index.html
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const cachePath = path.join(root, 'dist', 'dist.js');
const indexPath = path.join(root, 'public', 'index.html');

function minificarConTerser(codigo) {
    try {
        const salida = execSync('npx --yes terser --compress --mangle -', {
            input: codigo,
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'pipe'],
            cwd: root,
        });
        return salida.trim();
    } catch {
        return codigo.replace(/\s+/g, ' ').trim();
    }
}

function leerBundleEmbebido() {
    if (!fs.existsSync(indexPath)) {
        return null;
    }
    const html = fs.readFileSync(indexPath, 'utf8');
    const match = html.match(
        /<script id="extractor-code" type="application\/json">([\s\S]*?)<\/script>/
    );
    if (!match) {
        return null;
    }
    try {
        const parsed = JSON.parse(match[1]);
        return typeof parsed === 'string' && parsed.length > 0 ? parsed : null;
    } catch {
        return null;
    }
}

function embeberEnIndexHtml(minificado) {
    const html = fs.readFileSync(indexPath, 'utf8');
    const payload = JSON.stringify(minificado);
    const re = /<script id="extractor-code" type="application\/json">[\s\S]*?<\/script>/;

    if (!re.test(html)) {
        console.error('No se encontró <script id="extractor-code"> en public/index.html.');
        process.exit(1);
    }

    fs.writeFileSync(
        indexPath,
        html.replace(
            re,
            `<script id="extractor-code" type="application/json">${payload}</script>`
        ),
        'utf8'
    );
}

function resolverMinificado() {
    const fuenteArg = process.argv[2];

    if (fuenteArg) {
        const fuentePath = path.isAbsolute(fuenteArg)
            ? fuenteArg
            : path.join(root, fuenteArg);
        if (!fs.existsSync(fuentePath)) {
            console.error('No existe el archivo:', fuentePath);
            process.exit(1);
        }
        console.log('Entrada: minificando', path.relative(root, fuentePath));
        return minificarConTerser(fs.readFileSync(fuentePath, 'utf8'));
    }

    const embebido = leerBundleEmbebido();
    if (embebido) {
        console.log('Entrada: bundle en public/index.html (sin cambios de código)');
        return embebido;
    }

    console.error(
        'No hay bundle en public/index.html.\n' +
            'Pasa la fuente en otros/, por ejemplo:\n' +
            '  node scripts/build.js otros/seguidores-seguidos-scrapper2verlista.js'
    );
    process.exit(1);
}

function main() {
    if (!fs.existsSync(indexPath)) {
        console.error('Falta public/index.html');
        process.exit(1);
    }

    const minificado = resolverMinificado();

    fs.mkdirSync(path.dirname(cachePath), { recursive: true });
    fs.writeFileSync(cachePath, minificado, 'utf8');
    embeberEnIndexHtml(minificado);

    console.log('Caché local:', path.relative(root, cachePath));
    console.log('Actualizado:', path.relative(root, indexPath));
    console.log('Tamaño minificado:', minificado.length, 'caracteres');
}

main();
