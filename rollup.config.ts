import commonjs from '@rollup/plugin-commonjs'
import resolvePlugin from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import less from 'rollup-plugin-less'
import { terser } from 'rollup-plugin-terser'
import { paths } from './scripts/utils'

const extensions = ['.ts', '.tsx', '.jsx']

// umd iife
// const globals = {
//     react: 'react',
//     'prop-types': 'prop-types',
// }

const external = ['react', 'prop-types']

function genPlugins(opt) {
    const { useTerser = false, genDts = false } = opt || {}
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
            tsconfig: paths.tsEsConfig,
            tsconfigOverride: {
                compilerOptions: {
                    declaration: genDts,
                },
            },
        }),
        babel({
            exclude: 'node_modules/**',
            extensions,
            babelHelpers: 'runtime',
        }),
        useTerser ? terser() : {},
    ]
    return plugins
}

function entryFileNames(params) {
    const { facadeModuleId } = params
    if (facadeModuleId.indexOf('index') !== -1) {
        return '[name].js'
    }
    return '[name]/[name].js'
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
        plugins: genPlugins({ genDts: true, outputDir: paths.outputES }),
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
        plugins: genPlugins({ genDts: true }),
    },
]

export default rollupConfig
