// commonjs

const subp = require('child_process')
const chalk = require('chalk')
const log = require('electron-log').scope('Regi-DevServer')

const previewCmd = 'node ./.regi/regi.js'

async function startPreview(cmd) {
  const ps = await subp.exec(cmd, {
    maxBuffer: 2000 * 1024,
    killSignal: 'SIGKILL',
    env: { ...process.env, FORCE_COLOR: '1' }
  }, (err, stdout, stderr)  => {
    if (err && stderr.length >= 0) {
      console.error(`${stderr}`)
    }
  })

  ps.stdout.on('data', (data) => {
    console.log(data)
  })

  return ps
}

async function main() {
  let preview = await startPreview(previewCmd)

  require('esbuild').build({
    entryPoints: ['./src/Server/regi.js'],
    bundle: true,
    minify: true,
    outfile: './.regi/regi.js',
    platform: 'node',
    logLevel: 'info',
    target: 'node16',
    watch: {
      async onRebuild(error, result) {
        log.info(`${chalk.bgYellowBright.bold('Reloading')} changes detected`)
        if (error) {
          log.error(`${chalk.bgRedBright.bold('Error')} Build failed — ${error}`)
          preview.kill('SIGKILL')
        }
        else {
          preview.kill('SIGKILL')
          preview = await startPreview(previewCmd)
        }
      },
    },
  }).then(result => {
    log.info(`Regi-DevServer is ${chalk.green('watching')} !`)
  })

  process.on('exit', () => {
    preview.kill('SIGKILL')
  })
}

main()