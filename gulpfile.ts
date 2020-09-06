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
    lessFiles, paths, genEntry, tsxFiles, getFileName,
} from './scripts/utils'
import { buildAllModule as rollup } from './scripts/build'

const { outputES, outputCJS } = paths

function less2css() {
    return src(lessFiles)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(
            through2.obj(function (file, encoding, next) {
                const name = getFileName(file.path, '.css')
                const reg = new RegExp(`${name}.css`)
                file.path = file.path.replace(reg, `${name}/${name.toLowerCase()}.css`)
                this.push(file)
                next()
            }),
        )
        .pipe(dest(outputES))
        .pipe(dest(outputCJS))
}

function compileScripts(babelEnv, destDir) {
    process.env.BABEL_ENV = babelEnv
    return src(tsxFiles)
        .pipe(babel())
        .pipe(
            through2.obj(function z(file, encoding, next) {
                const name = getFileName(file.path, '.js')
                if (name !== 'index') {
                    const reg = new RegExp(`${name}.js`)
                    file.path = file.path.replace(reg, `${name}/${name.toLowerCase()}.js`)
                    this.push(file)
                    next()
                } else {
                    this.push(file)
                    next()
                }
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
    rimraf.sync(paths.lib)
}

exports.default = series(
    rmLib,
    genEntry,
    parallel(
        buildScripts,
        // rollup,
        less2css,
    ),
)
