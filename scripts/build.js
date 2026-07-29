#!/usr/bin/env node
'use strict';

/**
 * Minifica el extractor con Terser y actualiza public/index.html (GitHub Pages).
 *
 *   npm run build
 *   node scripts/build.js otros/otro-archivo.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const defaultSource = path.join(root, 'otros', 'seguidores-seguidos-scrapper_completo.js');
const cachePath = path.join(root, 'dist', 'dist.js');
const indexPath = path.join(root, 'public', 'index.html');
const syntaxCheckPath = path.join(root, '.build-check.js');

function rutaTerser() {
    const bin = process.platform === 'win32' ? 'terser.cmd' : 'terser';
    const local = path.join(root, 'node_modules', '.bin', bin);
    if (fs.existsSync(local)) {
        return local;
    }
    return null;
}

function minificarConTerser(fuentePath) {
    const terser = rutaTerser();
    const archivo = path.resolve(fuentePath);

    let salida;
    if (terser) {
        salida = execSync(`"${terser}" "${archivo}" -c -m`, {
            encoding: 'utf8',
            cwd: root,
            stdio: ['ignore', 'pipe', 'pipe'],
            windowsHide: true,
        });
    } else {
        salida = execSync(`npx --yes terser "${archivo}" -c -m`, {
            encoding: 'utf8',
            cwd: root,
            stdio: ['ignore', 'pipe', 'pipe'],
            windowsHide: true,
        });
    }

    return salida.trim();
}

function validarSintaxis(codigo) {
    fs.writeFileSync(syntaxCheckPath, codigo, 'utf8');
    try {
        execSync(`node --check "${syntaxCheckPath}"`, {
            cwd: root,
            stdio: 'pipe',
            windowsHide: true,
        });
    } finally {
        if (fs.existsSync(syntaxCheckPath)) {
            fs.unlinkSync(syntaxCheckPath);
        }
    }
}

function validarEstructuraIife(codigo) {
    const inicio = codigo.slice(0, 20);
    const fin = codigo.slice(-12);
    if (!/^\(\(\)|^\(function/.test(codigo)) {
        throw new Error('El minificado no empieza con IIFE ((function o (() =>).');
    }
    if (!fin.includes(')();') && !fin.endsWith('})()')) {
        throw new Error('El minificado no termina como IIFE invocable ()();');
    }
}

function leerBundleEmbebido() {
    if (!fs.existsSync(indexPath)) {
        return null;
    }
    const html = fs.readFileSync(indexPath, 'utf8');
    const startTag = '<script id="extractor-code" type="application/json">';
    const start = html.indexOf(startTag);
    if (start === -1) {
        return null;
    }
    const contentStart = start + startTag.length;
    const end = html.indexOf('</script>', contentStart);
    if (end === -1) {
        return null;
    }
    try {
        const parsed = JSON.parse(html.slice(contentStart, end));
        return typeof parsed === 'string' && parsed.length > 0 ? parsed : null;
    } catch {
        return null;
    }
}

function embeberEnIndexHtml(minificado) {
    const html = fs.readFileSync(indexPath, 'utf8');
    const startTag = '<script id="extractor-code" type="application/json">';
    const start = html.indexOf(startTag);

    if (start === -1) {
        console.error('No se encontró <script id="extractor-code"> en public/index.html.');
        process.exit(1);
    }

    const contentStart = start + startTag.length;
    const end = html.indexOf('</script>', contentStart);

    if (end === -1) {
        console.error('Cierre </script> del bundle no encontrado.');
        process.exit(1);
    }

    const payload = JSON.stringify(minificado).replace(/</g, '\\u003c');
    const actualizado =
        html.slice(0, contentStart) + payload + html.slice(end);

    fs.writeFileSync(indexPath, actualizado, 'utf8');
}

function resolverMinificado() {
    const fuenteArg = process.argv[2];
    const fuentePath = fuenteArg
        ? path.isAbsolute(fuenteArg)
            ? fuenteArg
            : path.join(root, fuenteArg)
        : defaultSource;

    if (fs.existsSync(fuentePath)) {
        console.log('Entrada: Terser →', path.relative(root, fuentePath));
        const minificado = minificarConTerser(fuentePath);
        validarEstructuraIife(minificado);
        validarSintaxis(minificado);
        return minificado;
    }

    const embebido = leerBundleEmbebido();
    if (embebido) {
        console.log('Entrada: bundle ya en public/index.html (sin re-minificar)');
        console.warn('Pasa la ruta del .js en otros/ para regenerar con Terser.');
        return embebido;
    }

    console.error(
        'No hay fuente ni bundle.\n' +
            '  npm install\n' +
            '  npm run build\n' +
            'o: node scripts/build.js otros/seguidores-seguidos-scrapper_completo.js'
    );
    process.exit(1);
}

function main() {
    if (!fs.existsSync(indexPath)) {
        console.error('Falta public/index.html');
        process.exit(1);
    }

    let minificado;
    try {
        minificado = resolverMinificado();
    } catch (error) {
        console.error('Error al minificar:', error.message || error);
        console.error('Ejecuta: npm install   (instala terser local)');
        process.exit(1);
    }

    fs.mkdirSync(path.dirname(cachePath), { recursive: true });
    fs.writeFileSync(cachePath, minificado, 'utf8');
    embeberEnIndexHtml(minificado);

    console.log('Caché local:', path.relative(root, cachePath));
    console.log('Actualizado:', path.relative(root, indexPath));
    console.log('Tamaño minificado:', minificado.length, 'caracteres');
    console.log('Final:', minificado.slice(-80));
}

main();
