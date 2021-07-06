import {
    src, dest, series, parallel,
} from 'gulp'
import babel from 'gulp-babel'
import { exec } from 'child_process'
import rimraf from 'rimraf'
import less from 'gulp-less'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'gulp-cssnano'
import through2 from 'through2'
import {
    lessFiles,
    paths,
    genEntry,
    getFileName,
    getDirName,
} from './scripts/utils'
import { buildAllModule as rollup } from './scripts/build'

const { outputES, outputCJS } = paths

const scripts = [
    'components/**/*.[jt]s?(x)',
    '!**/__tests__/**/*.[jt]s?(x)',
    '!**/?(*.)+(spec|test).[tj]s?(x)',
    '!components/**/*.stories.tsx',
]

function copyLess() {
    return src(lessFiles)
        .pipe(
            through2.obj(function (file, encoding, next) {
                const dirName = getDirName(file.path)
                const fileName = getFileName(file.path, '.less')
                const reg = new RegExp(`${fileName}.less$`)
                const name = ['mixins'].includes(dirName)
                    ? `style/${dirName}`
                    : `${dirName}`
                const lessPath = file.path.replace(
                    reg,
                    `${name}/${fileName}.less`,
                )
                file.path = lessPath
                this.push(file)
                next()
            }),
        )
        .pipe(dest(outputES))
        .pipe(dest(outputCJS))
}

function less2css() {
    return src(lessFiles)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(
            through2.obj(function (file, encoding, next) {
                const name = getDirName(file.path)
                const reg = /index.css$/
                if (reg.test(file.path)) {
                    const cssPath = file.path.replace(reg, `${name}/index.css`)
                    file.path = cssPath
                    this.push(file)
                }
                next()
            }),
        )
        .pipe(dest(outputES))
        .pipe(dest(outputCJS))
}

function cssInjection(content) {
    return content.replace(/\.less/g, '.css')
}

function compileScripts(babelEnv, destDir) {
    process.env.BABEL_ENV = babelEnv
    console.log('scripts', scripts)
    return src(scripts)
        .pipe(babel())
        .pipe(
            through2.obj(function (file, encoding, next) {
                const content = file.contents.toString(encoding)
                file.contents = Buffer.from(cssInjection(content))
                this.push(file)
                next()
            }),
        )
        .pipe(dest(destDir))
}

// 不必使用async，避免影响环境变量
function compileESM() {
    return compileScripts('esm', outputES)
}
function compileCJS() {
    return compileScripts('cjs', outputCJS)
}

async function genTypes() {
    exec('npm run types')
}

export const buildScripts = series(compileESM, compileCJS)

async function rmLib() {
    rimraf.sync(paths.outputES)
    rimraf.sync(paths.outputCJS)
}

exports.default = series(
    rmLib,
    genEntry,
    parallel(
        // buildScripts,
        genTypes,
        rollup,
        less2css,
        copyLess,
    ),
)
