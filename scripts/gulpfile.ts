import {
    src, dest, series, parallel,
} from 'gulp'
import path from 'path'
import rimraf from 'rimraf'
import less from 'gulp-less'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'gulp-cssnano'
import through2 from 'through2'
import {
    lessFiles, paths, genEntry,
} from './utils'

const { outputES, outputCJS } = paths

const transformLess = (filePath, option?) => less.render(filePath, option)
    .then((output) => {
        console.log('output :>> ', output)
        return output.css
    })
    .catch((error) => {
        throw error
    })

function less2css() {
    return src(lessFiles)
        .pipe(less())
        // .pipe(autoprefixer())
        // .pipe(cssnano())
        .pipe(
            through2.obj(function(file, encoding, next) {
                let compDir = path.basename(file.path, '.css')
                const Name = compDir.charAt(0).toUpperCase() + compDir.slice(1)
                // dest(outputES + compDir)
                const reg = new RegExp(`${compDir}.css`)
                file.path = file.path.replace(reg, `${Name}/${compDir}.css`)
                this.push(file)
                next()
            }),
        )
        .pipe(dest(outputES))
        // .pipe(dest(outputCJS))
}

async function rmLib() {
    rimraf.sync(paths.lib)
}

// async function buildAll() {

// }

// exports.build = less2css
exports.default = series(
    // rmLib,
    // genEntry,
    parallel(
        // buildAllModule,
        less2css,
    ),
)
