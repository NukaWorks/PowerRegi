////////////////////////////////
//
// PowerRegi Backend Server
//
////////////////////////////////

// Importing modules
const express = require('express');
const chalk = require('chalk')
const { commercial_name, version } = require('../../package.json')
const idmsa = require('./Idmsa/IdmsaHandler')

// Setup dotenv & express
require('dotenv').config()
const app = express();
const port = process.env.APP_API_PORT;

// Setup Logging
const log = require('electron-log').scope('main')

// Define Routes
app.use('/idmsa', idmsa)

// Start server
app.listen(port, () => {
  log.info(`${chalk.cyanBright.bold(commercial_name)} (${chalk.bold(version)}) listening on port ${port}`)
})

