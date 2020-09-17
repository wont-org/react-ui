import {
    execSync, spawn,
} from 'child_process'
import { version } from '../package.json'

const runner = spawn('npm', ['publish'])

runner.on('close', (code) => {
    if (code === 0) {
        execSync('git add CHANGELOG.md')
        execSync(`git commit -m 'docs: changelog => ${version}'`)
        execSync(`git tag v${version}`)
        execSync(`git push origin master v${version}:v${version}`)
        execSync('git push')
        // execSync('git push origin master:master')
    } else {
        // eslint-disable-next-line no-console
        console.log(`发布失败，子进程退出，退出码 ${code}`)
    }
})
