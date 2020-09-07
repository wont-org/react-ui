import {
    src, dest, series, parallel,
} from 'gulp'
import babel from 'gulp-babel'
import { execSync } from 'child_process'
import rimraf from 'rimraf'
import less from 'gulp-less'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'gulp-cssnano'
import through2 from 'through2'
import {
    lessFiles, paths, genEntry, tsxFiles, getDirName, index,
} from './scripts/utils'
import { buildAllModule as rollup } from './scripts/build'

const { outputES, outputCJS } = paths

const scripts = [
    'components/**/*.tsx',
    '!components/**/*.stories.tsx',
]

function copyLess() {
    return src(lessFiles)
        .pipe(
            through2.obj(function (file, encoding, next) {
                const name = getDirName(file.path)
                const reg = /index.less$/
                const lessPath = file.path.replace(reg, `${name}/index.less`)
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
                const cssPath = file.path.replace(reg, `${name}/index.css`)
                file.path = cssPath
                this.push(file)
                next()
            }),
        )
        .pipe(dest(outputES))
        .pipe(dest(outputCJS))
}

function cssInjection(content) {
    return content
        .replace(/\.less/g, '.css');
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
                next();
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
    execSync('npm run types')
}

const buildScripts = series(
    genTypes,
    compileESM,
    compileCJS,
)

async function rmLib() {
    rimraf.sync(paths.outputES)
    rimraf.sync(paths.outputCJS)
}

exports.default = series(
    rmLib,
    genEntry,
    parallel(
        buildScripts,
        // rollup,
        less2css,
        copyLess,
    ),
)
