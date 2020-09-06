import glob from 'glob' // https://github.com/isaacs/node-glob#readme
import path from 'path'
import fs from 'fs'

function resolve(pathStr) {
    return path.resolve(__dirname, pathStr)
}

function getFileName(pathStr: string, ext: string) {
    return path.basename(pathStr, ext)
}

const desc = '// 此文件是脚本自动生成，请勿在此修改\n\n'

const lessFiles = glob.sync(resolve('../components/**/*.less'))

const tsxFiles = glob.sync(resolve('../components/**/*.tsx'), {
    ignore: [
        resolve('../components/**/*.stories.tsx'),
        resolve('../components/index.tsx'),
    ],
})

const namedInputs = {}
const components = tsxFiles.map((file) => {
    const name = path.basename(file, '.tsx')
    namedInputs[name] = file
    return {
        name,
        path: file,
    }
})

const buildStat = {
    components,
}

const paths = {
    namedInputs,
    lib: resolve('../lib'),
    input: resolve('../components/index.tsx'),
    outputES: resolve('../lib/es'),
    outputCJS: resolve('../lib/cjs'),
    compileDir: resolve('../components'),
    tsEsConfig: resolve('../tsconfig.es.json'),
}

// console.log('paths :>> ', paths)

async function genEntry() {
    // console.log('genEntry :>> ', tsxFiles)
    let exportVars = ''
    let exportScripts = ''
    tsxFiles.forEach((file) => {
        const name = path.basename(file, '.tsx')
        // this.state.umdInputScript += `import ${name} from './${name}/${name}'\n`
        exportScripts += `import { ${name} } from './${name.toLocaleLowerCase()}/${name}'\n`
        exportVars += `    ${name},\n`
    })
    // this.state.umdInputScript += `\nexport default {\n${exportVars}}\n`
    exportScripts += `\nexport default {\n${exportVars}}\n`
    fs.writeFileSync(paths.input, desc + exportScripts)
}

// fs.writeFileSync(
//     resolve('../build-stat.json'),
//     JSON.stringify(buildStat, null, 4),
// )

export {
    resolve,
    getFileName,
    genEntry,
    desc,
    lessFiles,
    namedInputs,
    buildStat,
    tsxFiles,
    paths, // 打包入口路径相关
}
