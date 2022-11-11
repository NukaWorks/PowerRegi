import express, { json } from 'express'
import logger from 'electron-log'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import mongoose from 'mongoose'
import { makeAccessToken, UserModel } from '../Database/Objects/User'
import { certKeys } from '../../Common/Misc/ConfigProvider.mjs'
import cookieParser from 'cookie-parser'
import env from '../../Common/Misc/ConfigProvider.mjs'
import jwt from 'jsonwebtoken'

const idmsa = express.Router()

// Setup Logging
const log = logger.scope('idmsa')

// Middleware that is specific to this router
idmsa.use((req, res, next) => {
  next()
})

idmsa.use(json())
idmsa.use(cookieParser())

const JWTHeader = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'

// Defines Routes
idmsa.post('/login', (req, res) => {
  UserModel.findOne({name: req.body.username})
      .then(result => {
        if (!result) {
          res.sendStatus(401, `User ${req.body.username} not found !`)
          log.error(`User ${req.body.username} not found !`)
        } else {
          if (req.body.passwd && bcrypt.compareSync(req.body.passwd, result.passwd)) {
            if (req.cookies.idmsa) {
              let token = JWTHeader.concat(req.cookies.idmsa)
              jwt.verify(token, certKeys.privkey, (err, decoded) => {
                if (err) {
                  res.clearCookie('idmsa')
                  res.sendStatus(401, 'Invalid token')
                }

                if (decoded.u !== result.uid && decoded.g !== result.groups) {
                  res.clearCookie('idmsa')
                  res.sendStatus(401, 'Invalid token')
                } else {
                  res.sendStatus(201)
                }
              })
            } else {
              let token = makeAccessToken(result.uid, result.groups).replace(JWTHeader, '')
              res.cookie('idmsa', token, {
                maxAge: env.APP_SESSION_EXPIRES * 60 * 60 * 1000,
                sameSite: 'strict'
              })
              res.sendStatus(201)
            }
          } else res.sendStatus(401)
        }
      })
      .catch(err => () => {
        res.send(err)
        log.error(err)
      })
})

module.exports = idmsa