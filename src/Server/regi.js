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
const app = express();
const port = env.APP_API_PORT;
app.disable('x-powered-by');

// Setup Logging
const log = logger.scope('main')

// Define Routes
app.use('/idmsa', idmsa)

app.get('/', (req, res) => {
  res.send({
    'build': {
      'name': commercial_name,
      'version': version
    },
    'domain': env.APP_FQDN
  })
})

// Start server
app.listen(port, () => {
  log.info(`${chalk.cyanBright.bold(commercial_name)} (${chalk.bold(version)}) listening on port ${port}`)
})

