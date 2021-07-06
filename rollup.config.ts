import commonjs from '@rollup/plugin-commonjs'
import resolvePlugin from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import less from 'rollup-plugin-less'
import { terser } from 'rollup-plugin-terser'
import { paths } from './scripts/utils'

const extensions = ['.ts', '.tsx', '.jsx', '.js', '.less', '.css']

// umd iife
// const globals = {
//     react: 'react',
//     'prop-types': 'prop-types',
// }

const external = [
    'react',
    'prop-types',
    'classnames',
    '@wont/utils',
    /@babel\/runtime/,
]

function genPlugins(opt: Record<string, unknown> = {}) {
    const { useTerser = false } = opt
    const plugins = [
        less({
            output: false,
        }),
        json(),
        resolvePlugin({
            customResolveOptions: {
                moduleDirectory: paths.compileDir,
            },
            extensions,
        }),
        commonjs(),
        typescript({
            tsconfig: paths.tsconfig,
            declaration: false,
            module: 'esnext',
        }),
        babel({
            exclude: 'node_modules/**',
            extensions,
            // https://github.com/rollup/plugins/tree/master/packages/babel
            babelHelpers: 'runtime',
        }),
        useTerser ? terser() : {},
    ]
    return plugins
}

function entryFileNames(params) {
    const { facadeModuleId = '' } = params
    if (
        facadeModuleId
        && facadeModuleId.indexOf('components/index.tsx') !== -1
    ) {
        return 'index.js'
    }
    return '[name]/index.js'
}

const rollupConfig = [
    {
        input: paths.namedInputs,
        output: {
            dir: paths.outputES,
            entryFileNames,
            format: 'esm',
            exports: 'auto',
        },
        external,
        plugins: genPlugins(),
    },
    {
        input: paths.namedInputs,
        output: {
            format: 'cjs',
            exports: 'auto',
            dir: paths.outputCJS,
            entryFileNames,
        },
        external,
        plugins: genPlugins(),
    },
]

export default rollupConfig
