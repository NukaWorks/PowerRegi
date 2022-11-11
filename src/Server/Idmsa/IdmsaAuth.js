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
import { Session, SessionModel } from '../Database/Objects/Session'
import chalk from 'chalk'

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
          const user = result

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
                }
              })

            } else {
              let token = makeAccessToken(result.uid, result.groups).replace(JWTHeader, '')
              res.cookie('idmsa', token, {
                maxAge: env.APP_SESSION_EXPIRES * 60 * 60 * 1000,
                sameSite: 'strict'
              })
            }

            if (req.cookies.session) {
              SessionModel.findOne({id: req.cookies.session})
                  .then(result => {
                    if (!result) {
                      res.clearCookie('session')
                      makeSession(req, res, user)
                    } else {
                      res.sendStatus(201)
                    }
                  })
            } else makeSession(req, res, user)

          } else res.sendStatus(401)
        }
      })
      .catch(err => () => {
        res.send(err)
        log.error(err)
      })
})

function makeSession(req, res, user) {
  new Session(req, user).build()
      .then(result => {
        log.log(`Created session ${chalk.white(result.id)} for user ${(chalk.white(req.body.username))}`)
        res.cookie('session', result.id, {
          maxAge: env.APP_SESSION_EXPIRES * 60 * 60 * 1000,
          sameSite: 'strict'
        })
        res.sendStatus(201)
        return true
      })
      .catch(err => {
        res.sendStatus(401, 'Unable to create session')
        log.error('Unable to create session')
      })

  return false
}

module.exports = idmsa