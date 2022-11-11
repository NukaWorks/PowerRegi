import subp from 'child_process'
import readline from 'readline'
import chalk from 'chalk'
import logger from 'electron-log'
import { stdin, stdout } from 'node:process'

const log = logger.scope('Regi-DevServer')
import esbuild from 'esbuild'

const rl = readline.createInterface(stdin, stdout)
const previewCmd = 'node ./.regi/regi.js'
const psParams = {
  maxBuffer: 2000 * 1024,
  killSignal: 'SIGTERM',
  env: {...process.env, FORCE_COLOR: '1'}
}
let previewProcess = {}

async function startPreview(cmd) {
  const ps = await subp.exec(cmd, psParams)

  ps.stdout.on('data', data => process.stdout.write(data))
  ps.stderr.on('data', data => process.stderr.write(data))
  return ps
}

async function main() {
  let isCrashed = false
  const buildParams = {
    entryPoints: ['./src/Server/regi.js'],
    format: 'cjs',
    bundle: true,
    minify: false,
    outfile: './.regi/regi.js',
    platform: 'node',
    logLevel: 'info',
    target: 'node16',
    watch: {
      async onRebuild(error, result) {
        isCrashed = false
        log.info(`${chalk.bgYellowBright.bold('Reloading')} changes detected`)

        if (error) {
          isCrashed = true
          log.error(`${chalk.bgRedBright.bold('Error')} Build failed — ${error}`)
          await previewProcess.ps.kill('SIGTERM')
          if (!isCrashed) {
            await startPreview(previewCmd).then(ps => {
              previewProcess.ps = ps
            })
          }
        } else {
          await previewProcess.ps.kill('SIGTERM')
          await startPreview(previewCmd).then(ps => {
            previewProcess.ps = ps
          })
        }
      },
    },
  }

  await esbuild.build(buildParams).then(async () => {
    await startPreview(previewCmd).then(ps => {
      previewProcess.ps = ps
    })

    process.on('exit', () => {
      previewProcess.ps.kill('SIGTERM')
    })

    rl.on('line', async (input) => {
      if (input.match('^rs$')) {
        if (isCrashed) {
          log.error(`${chalk.bgRedBright.bold('Error')} Please fix errors before reloading`)
        } else {
          await previewProcess.ps.kill('SIGTERM')
          await startPreview(previewCmd).then(ps => {
            previewProcess.ps = ps
            log.info(`${chalk.bgGreenBright.bold('Restarted')} !`)
          })
        }
      }
    })

    log.info(`Regi-DevServer is ${chalk.green('watching')} !`)
  })
}

main()