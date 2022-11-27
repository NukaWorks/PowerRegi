import subp from 'child_process'
import readline from 'readline'
import chalk from 'chalk'
import logger from 'electron-log'
import { stdin, stdout } from 'node:process'
import esbuild from 'esbuild'

const log = logger.scope('Regi-DevServer')
const rl = readline.createInterface(stdin, stdout)
const previewCmd = {
  cmd: 'node',
  args: ['regi']
}
const psParams = {
  cwd: './.regi',
  maxBuffer: 2000 * 1024,
  detached: false,
  killSignal: 'SIGKILL',
  env: {...process.env, FORCE_COLOR: '1'}
}
let previewProcess = {}

async function startPreview(cmds) {
  const ps = await subp.spawn(cmds.cmd, cmds.args, psParams)

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
          await previewProcess.ps.kill('SIGKILL')
          if (!isCrashed) {
            await startPreview(previewCmd).then(ps => {
              previewProcess.ps = ps
            }).catch(err => {
              log.error(`${chalk.bgRedBright.bold('Error')} ${err}`)
            })
          }
        } else {
          await previewProcess.ps.kill('SIGKILL')
          await startPreview(previewCmd).then(ps => {
            previewProcess.ps = ps
          }).catch(err => {
            log.error(`${chalk.bgRedBright.bold('Error')} ${err}`)
          })
        }
      },
    },
  }

  await esbuild.build(buildParams).then(async () => {
    await startPreview(previewCmd).then(ps => {
      previewProcess.ps = ps
    }).catch(err => {
      log.error(`${chalk.bgRedBright.bold('Error')} ${err}`)
    })

    process.on('exit', () => {
      previewProcess.ps.kill('SIGKILL')
    })

    rl.on('line', async (input) => {
      if (input.match('^rs$')) {
        if (isCrashed) {
          log.error(`${chalk.bgRedBright.bold('Error')} Please fix errors before reloading`)
        } else {
          await previewProcess.ps.kill('SIGKILL')
          startPreview(previewCmd).then(ps => {
            previewProcess.ps = ps
            log.info(`${chalk.bgGreenBright.bold('Restarted')} !`)
          }).catch(err => {
            log.error(`${chalk.bgRedBright.bold('Error')} ${err}`)
          })
        }
      }
    })

    log.info(`Regi-DevServer is ${chalk.green('watching')} !`)
  })
}

main()