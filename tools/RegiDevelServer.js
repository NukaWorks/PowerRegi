// commonjs

const subp = require('child_process')
const readline = require('readline')
const chalk = require('chalk')
const log = require('electron-log').scope('Regi-DevServer')
const esbuild = require('esbuild')
const {stdin: input, stdout: output} = require('node:process')

const rl = readline.createInterface({input, output})
const previewCmd = 'node ./.regi/regi.js'
const psParams = {
  maxBuffer: 2000 * 1024,
  killSignal: 'SIGKILL',
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
  const buildParams = {
    entryPoints: ['./src/Server/regi.js'],
    bundle: true,
    minify: false,
    outfile: './.regi/regi.js',
    platform: 'node',
    logLevel: 'info',
    target: 'node16',
    watch: {
      async onRebuild(error, result) {
        log.info(`${chalk.bgYellowBright.bold('Reloading')} changes detected`)
        if (error) {
          log.error(`${chalk.bgRedBright.bold('Error')} Build failed — ${error}`)
          startPreview(previewCmd).then(ps => {
            previewProcess.ps = ps
          })
        } else {
          previewProcess.kill('SIGKILL')
          startPreview(previewCmd).then(ps => {
            previewProcess.ps = ps
          })
        }
      },
    },
  }

  await esbuild.build(buildParams).then(() => {
    startPreview(previewCmd).then(ps => {
      previewProcess.ps = ps
    })

    process.on('exit', () => {
      previewProcess.ps.kill('SIGKILL')
    })

    rl.on('line', (input) => {
      if (input.match('^rs$')) {
        previewProcess.ps.kill('SIGKILL')
        startPreview(previewCmd).then(ps => {
          previewProcess.ps = ps
          log.info(`${chalk.bgGreenBright.bold('Restarted')} !`)
        })
      }
    })

    log.info(`Regi-DevServer is ${chalk.green('watching')} !`)
  })
}

main()