////////////////////////////////
//
// PowerRegi Backend Server
//
////////////////////////////////

// Importing modules
import express from 'express'
import axios from 'axios'
import chalk from 'chalk'
import logger from 'electron-log'
import { commercial_name, version } from '../../package.json'
import idmsa from './Idmsa/IdmsaHandler'
import env from '../Common/Misc/ConfigProvider'

// Setup dotenv & express
const app = express()
const port = env.APP_API_PORT
app.disable('x-powered-by')

// Setup Logging
const log = logger.scope('main')
logger.transports.console.level = 'debug'

// Define Routes
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
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

// Start server
app.listen(port, () => {
  log.info(`${chalk.cyanBright.bold(commercial_name)} (${chalk.bold(version)}) is ${chalk.bgGreenBright.bold('UP')} to ${chalk.white.bold(`${env.APP_HOST}:${chalk.white.bold(port)}`)}`)
})