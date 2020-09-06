import rimraf from 'rimraf'
import { rollup } from 'rollup'
import { genEntry, resolve } from './utils'
import rollupConfig from '../rollup.config'

async function buildTsx(config) {
    const { output } = config
    const bundle = await rollup(config)
    await bundle.write(output)
}

async function buildAllModule() {
    Promise.all(rollupConfig.map(async (config) => {
        await buildTsx(config)
    }))
        .then(() => {
            console.log('tsx build success')
        })
        .catch((err) => {
            console.log('err :>> ', err)
        })
}

rimraf.sync(resolve('../lib'))
// genEntry()
buildAllModule()

export {
    buildTsx,
    buildAllModule,
}
