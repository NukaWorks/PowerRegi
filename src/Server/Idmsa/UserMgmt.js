import express from 'express'
import logger from 'electron-log'

const userMgmt = express.Router()

// Setup Logging
const log = logger.scope('UserMgmt')

// Middleware that is specific to this router
userMgmt.use((req, res, next) => {
   next()
})

// Defines Routes
userMgmt.get('/', (req, res) => {
   res.send('Hello World!')
   log.debug('Hello World!')
})

module.exports = userMgmt