import express, { json } from 'express'
import logger from 'electron-log'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import mongoose from 'mongoose'
import { makeAccessToken, UserModel } from '../Database/Objects/User'
import { certKeys } from '../../Common/Misc/ConfigProvider.mjs'
import cookieParser from 'cookie-parser'
import env from '../../Common/Misc/ConfigProvider.mjs'

const idmsa = express.Router()

// Setup Logging
const log = logger.scope('idmsa')

// Middleware that is specific to this router
idmsa.use((req, res, next) => {
  next()
})

idmsa.use(json())
idmsa.use(cookieParser());

const JWTHeader = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."

// Defines Routes
idmsa.post('/login', (req, res) => {
  UserModel.findOne({ name: req.body.username })
      .then(result => {
          if (!result) {
            res.sendStatus(401)
            log.error(`User ${req.body.username} not found !`)
          } else {
            if (bcrypt.compareSync(req.body.passwd, result.passwd)) {
                let token = makeAccessToken(result.uid, result.groups).replace(JWTHeader, '')
                result.updateOne({ tokens: { session: token } }).then(r => {
                  res.cookie('idmsa', token, { maxAge: env.APP_SESSION_EXPIRES * 60 * 60 * 1000 })
                  res.sendStatus(200)
                })
            }
          }
      })
      .catch(err => () => {
        res.send(err)
        log.error(err)
      })
})

module.exports = idmsa