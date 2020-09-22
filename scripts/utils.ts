import glob from 'glob' // https://github.com/isaacs/node-glob#readme
import path from 'path'
import { writeFileSync, readFileSync } from 'fs'
import less from 'less'

function resolve(pathStr) {
    return path.resolve(__dirname, pathStr)
}

function getFileName(pathStr: string, ext: string) {
    return path.basename(pathStr, ext)
}

function getDirName(pathStr: string) {
    return path.basename(path.dirname(pathStr))
}

const desc = '// 此文件是脚本自动生成，请勿在此修改\n\n'

const lessFiles = glob.sync(resolve('../components/**/*.less'))
const index = resolve('../components/index.tsx')

const tsxFiles = glob.sync(resolve('../components/**/*.tsx'), {
    ignore: [
        resolve('../components/**/*.stories.tsx'),
        resolve('../components/**/__tests__/*.test.tsx'),
        index,
    ],
})


interface NameInputs {
    index?: string
}
const namedInputs: NameInputs = {
}
const components = tsxFiles.map((file) => {
    const name = getDirName(file)
    namedInputs[name] = file
    return {
        name,
        path: file,
    }
})
namedInputs.index = index
console.log('namedInputs :>> ', namedInputs)

const buildStat = {
    components,
}

const paths = {
    namedInputs,
    lib: resolve('../lib'),
    input: resolve('../components/index.tsx'),
    outputES: resolve('../es'),
    outputCJS: resolve('../lib'),
    compileDir: resolve('../components'),
    tsEsConfig: resolve('../tsconfig.es.json'),
}

// console.log('paths :>> ', paths)

async function genEntry() {
    // console.log('genEntry :>> ', tsxFiles)
    let exportVars = ''
    let exportScripts = ''
    tsxFiles.forEach((pathStr) => {
        const name = getDirName(pathStr)
        const Name = name.charAt(0).toUpperCase() + name.slice(1)
        exportScripts += `import ${Name} from './${name}'\n`
        exportVars += `    ${Name},\n`
    })
    exportScripts += `\nexport default {\n${exportVars}}\n`
    writeFileSync(paths.input, desc + exportScripts)
}

function transformLess(lessFile, config = {}) {
    // const { cwd = process.cwd() } = config
    // const resolvedLessFile = path.resolve(cwd, lessFile)

    let data = readFileSync(lessFile, 'utf-8')
    data = data.replace(/^\uFEFF/, '')

    // Do less compile
    const lessOpts = {
        paths: [path.dirname(lessFile)],
        filename: lessFile,
        // plugins: [new NpmImportPlugin({ prefix: '~' })],
        javascriptEnabled: true,
    }
    return less
        .render(data, lessOpts)
        // .then(result => postcss(postcssConfig.plugins).process(result.css, { from: undefined }))
        .then((r) => r.css)
}

// writeFileSync(
//     resolve('../build-stat.json'),
//     JSON.stringify(buildStat, null, 4),
// )

export {
    resolve,
    getFileName,
    getDirName,
    genEntry,
    transformLess,
    desc,
    lessFiles,
    namedInputs,
    index,
    buildStat,
    tsxFiles,
    paths, // 打包入口路径相关
}
