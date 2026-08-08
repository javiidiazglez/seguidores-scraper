'use strict';

const USUARIOS_OMITIR = new Set(['fonsi.100']);

function esFalsoPositivo(nombre) {
    return USUARIOS_OMITIR.has(nombre.toLowerCase());
}

function normalizarLista(texto) {
    return texto
        .split(/\r?\n/)
        .map(linea => linea.trim())
        .filter(linea => Boolean(linea) && !esFalsoPositivo(linea));
}

function compararListas(listaOrigen, listaDestino) {
    const setDestino = new Set(listaDestino.unicos);
    return listaOrigen.unicos.filter(nombre => !setDestino.has(nombre));
}

function tipoDeArchivo(nombreArchivo) {
    const nombre = nombreArchivo.toLowerCase();

    if (!nombre.endsWith('.txt')) {
        return null;
    }

    if (nombre.startsWith('seguidores')) {
        return 'seguidores';
    }

    if (nombre.startsWith('seguidos')) {
        return 'seguidos';
    }

    return null;
}

function formatearDiferencia(cantidad) {
    return cantidad > 0 ? `(-${cantidad})` : '(0)';
}

function formatearResumenDiferencia(totalBase, totalComparacion, cantidadDiferencia) {
    if (cantidadDiferencia === 0) {
        return `Sin Diferencias. ${totalBase} = ${totalComparacion}: (0)`;
    }

    if (totalBase > totalComparacion) {
        return `Baja de ${totalBase} a ${totalComparacion}: ${formatearDiferencia(cantidadDiferencia)}`;
    }

    if (totalBase < totalComparacion) {
        return `Sube de ${totalBase} a ${totalComparacion}: ${formatearDiferencia(cantidadDiferencia)}`;
    }

    return `${totalBase} = ${totalComparacion}: ${formatearDiferencia(cantidadDiferencia)}`;
}

function listasDesdeTexto(textoBase, textoComparacion) {
    const base = normalizarLista(textoBase);
    const comparacion = normalizarLista(textoComparacion);

    return {
        base: { total: base.length, unicos: Array.from(new Set(base)) },
        comparacion: { total: comparacion.length, unicos: Array.from(new Set(comparacion)) },
    };
}

module.exports = {
    USUARIOS_OMITIR,
    esFalsoPositivo,
    normalizarLista,
    compararListas,
    tipoDeArchivo,
    formatearDiferencia,
    formatearResumenDiferencia,
    listasDesdeTexto,
};
