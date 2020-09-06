import fs from 'fs'
import commonjs from '@rollup/plugin-commonjs'
import resolvePlugin from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import less from 'rollup-plugin-less'
import { terser } from 'rollup-plugin-terser'
import { paths, getFileName } from './utils'

const extensions = ['.ts', '.tsx', '.jsx']

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
        useTerser ? terser() : {},
    ]
    return plugins
}

const rollupConfig = [
    {
        input: paths.namedInputs,
        output: {
            dir: paths.outputES,
            entryFileNames: '[name]/[name].js',
            format: 'esm',
        },
        external,
        plugins: genPlugins({ genDts: true, outputDir: paths.outputES }),
    },
    {
        input: {
            index: paths.input,
        },
        output: {
            dir: paths.outputES,
            entryFileNames: '[name].js',
            format: 'esm',
        },
        external,
        plugins: genPlugins({ genDts: true }),
    },
    // {
    //     input: paths.namedInputs,
    //     output: {
    //         format: 'cjs',
    //         dir: paths.outputCJS,
    //         entryFileNames: '[name]/[name].js',
    //     },
    //     external,
    //     plugins: genPlugins({ genDts: true }),
    // },
    // {
    //     input: {
    //         index: paths.input,
    //     },
    //     output: {
    //         format: 'cjs',
    //         dir: paths.outputCJS,
    //         entryFileNames: '[name].js',
    //         exports: 'default',
    //     },
    //     external,
    //     plugins: genPlugins({ genDts: true }),
    // },
]

export default rollupConfig
