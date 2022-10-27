const express = require('express')
const idmsa = express.Router()

// Setup Logging
const log = require('electron-log').scope('idmsa')

// middleware that is specific to this router
idmsa.use((req, res, next) => {
  next()
})

// Defines Routes
idmsa.get('/', (req, res) => {
  res.send('Hello World!')
  log.debug('Hello World!')
})

// router.use("/idmsa", idmsa)

module.exports = idmsa