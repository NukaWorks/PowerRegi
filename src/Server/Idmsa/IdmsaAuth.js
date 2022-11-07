import express, { json } from 'express'
import logger from 'electron-log'
const idmsa = express.Router()

// Setup Logging
const log = logger.scope('idmsa')

// Middleware that is specific to this router
idmsa.use((req, res, next) => {
  next()
})

idmsa.use(json())

// Defines Routes
idmsa.post('/login', (req, res) => {
  res.send(req.body)
  log.log(req.body)
})

module.exports = idmsa