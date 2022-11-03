////////////////////////////////
//
// PowerRegi Backend Server
//
////////////////////////////////

// Importing modules
import express from 'express'
import chalk from 'chalk'
import logger from 'electron-log'
import { commercial_name, version } from '../../package.json'
import idmsa from './Idmsa/IdmsaHandler'
import env from '../Common/Misc/ConfigProvider'
import mongoose from 'mongoose'

// Setup Logging
const log = logger.scope('Regi')
logger.transports.console.level = 'debug'

// Setup dotenv & express
const app = express()
const port = env.APP_API_PORT
app.disable('x-powered-by')

// Define Routes
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  log.verbose(`${chalk.bgGreenBright.bold(req.method)} ${req.url} (${chalk.bold(req.ip)} - ${chalk.grey(req.headers['user-agent'])})`)

  if ('OPTIONS' === req.method) {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use('/idmsa', idmsa)

app.get('/', (req, res) => {
  res.send({
    'build': {
      'name': commercial_name, 'version': version
    },
    'domain': env.APP_HOST
  })
})

// Define Database and Start the server
mongoose.connect(env.APP_DB_URI)
    .then(result => {
      log.info(`${chalk.green.bold('Successfully')} connected to ${chalk.white.bold(result.connection.name)} ${chalk.grey(`(${result.connection.host})`)} database !`)

      // Start server
      app.listen(port, () => {
        log.info(`${chalk.cyanBright.bold(commercial_name)} (${chalk.bold(version)}) is ${chalk.bgGreenBright.bold('UP')} to ${chalk.white.bold(`${env.APP_HOST}:${chalk.white.bold(port)}`)}`)
      })
    })
    .catch(err => {
      log.error(`${chalk.red.bold('Failed')} to connect to database :/ \n ${chalk.red(err)}`)
    })
