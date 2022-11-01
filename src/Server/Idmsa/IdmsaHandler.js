import express from 'express'
import logger from 'electron-log'
const idmsa = express.Router()

// Setup Logging
const log = logger.scope('idmsa')

// Middleware that is specific to this router
idmsa.use((req, res, next) => {
  next()
})

// Defines Routes
idmsa.get('/', (req, res) => {
  res.send('Hello World!')
  log.debug('Hello World!')
})

module.exports = idmsa