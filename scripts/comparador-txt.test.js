'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
    esFalsoPositivo,
    normalizarLista,
    compararListas,
    tipoDeArchivo,
    formatearDiferencia,
    formatearResumenDiferencia,
    listasDesdeTexto,
} = require('./comparador-lib');

describe('tipoDeArchivo', () => {
    it('detecta seguidores antes que seguidos', () => {
        assert.equal(tipoDeArchivo('seguidores1Javi.txt'), 'seguidores');
        assert.equal(tipoDeArchivo('seguidos1Javi.txt'), 'seguidos');
        assert.equal(tipoDeArchivo('lista.txt'), null);
    });

    it('es case insensitive y exige .txt', () => {
        assert.equal(tipoDeArchivo('SEGUIDORES1.TXT'), 'seguidores');
        assert.equal(tipoDeArchivo('Seguidos2.csv'), null);
        assert.equal(tipoDeArchivo('seguidores'), null);
    });
});

describe('normalizarLista', () => {
    it('omite lineas vacias y fonsi.100', () => {
        const lista = normalizarLista('ana_dev\n\nfonsi.100\npedrodev\n');
        assert.deepEqual(lista, ['ana_dev', 'pedrodev']);
    });

    it('esFalsoPositivo es case insensitive', () => {
        assert.equal(esFalsoPositivo('Fonsi.100'), true);
        assert.equal(esFalsoPositivo('pepito'), false);
    });

    it('recorta espacios y conserva orden', () => {
        assert.deepEqual(
            normalizarLista('  ana  \n  pedro  \n'),
            ['ana', 'pedro']
        );
    });
});

describe('compararListas', () => {
    it('encuentra usuarios en base que no estan en comparacion', () => {
        const { base, comparacion } = listasDesdeTexto(
            'ana_dev\ncarlosmusic\njavifit\nluciaarte\npedrodev\n',
            'ana_dev\njavifit\nluciaarte\npedrodev\n'
        );

        const diff = compararListas(base, comparacion);
        assert.deepEqual(diff, ['carlosmusic']);
    });

    it('devuelve lista vacia si no hay bajas', () => {
        const { base, comparacion } = listasDesdeTexto('a\nb\n', 'a\nb\nc\n');
        assert.deepEqual(compararListas(base, comparacion), []);
    });

    it('deduplica unicos en base', () => {
        const { base, comparacion } = listasDesdeTexto('a\na\nb\n', 'a\n');
        assert.deepEqual(compararListas(base, comparacion), ['b']);
        assert.equal(base.total, 3);
        assert.equal(base.unicos.length, 2);
    });
});

describe('formatearResumenDiferencia', () => {
    it('resume bajada de totales', () => {
        assert.equal(
            formatearResumenDiferencia(357, 356, 1),
            'Baja de 357 a 356: (-1)'
        );
    });

    it('resume subida de totales con bajas listadas', () => {
        assert.equal(
            formatearResumenDiferencia(10, 12, 1),
            'Sube de 10 a 12: (-1)'
        );
    });

    it('si no hay bajas listadas, dice sin diferencias aunque cambien totales', () => {
        assert.equal(
            formatearResumenDiferencia(10, 12, 0),
            'Sin Diferencias. 10 = 12: (0)'
        );
    });

    it('resume sin diferencias', () => {
        assert.equal(
            formatearResumenDiferencia(10, 10, 0),
            'Sin Diferencias. 10 = 10: (0)'
        );
    });

    it('formatearDiferencia', () => {
        assert.equal(formatearDiferencia(0), '(0)');
        assert.equal(formatearDiferencia(2), '(-2)');
    });
});
