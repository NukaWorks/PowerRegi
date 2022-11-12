import express, { json } from 'express'
import logger from 'electron-log'
import bcrypt from 'bcryptjs'
import { makeAccessToken, UserModel } from '../Database/Objects/User'
import env, { certKeys } from '../../Common/Misc/ConfigProvider.mjs'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { checkSession, Session, SessionModel } from '../Database/Objects/Session'
import chalk from 'chalk'

const idmsa = express.Router()

// Setup Logging
const log = logger.scope('idmsa')

// Middlewares
idmsa.use(json())
idmsa.use(cookieParser())
idmsa.use((req, res, next) => {
  next()
})

// Defines Routes
idmsa.post('/login', (req, res) => {
  UserModel.findOne({name: req.body.username})
      .then(user => {
        if (!user) {
          res.sendStatus(401, `User ${req.body.username} not found !`)
          log.debug(`User ${req.body.username} not found !`)
        } else {
          if (req.body.passwd && bcrypt.compareSync(req.body.passwd, user.passwd)) {
            let token = null
            if (req.cookies.idmsa) {
              token = req.cookies.idmsa
              jwt.verify(token, certKeys.privkey, (err, decoded) => {
                if (err || (decoded.u !== user.uid && decoded.g !== user.groups)) {
                  log.debug('Unable to verify token, creating a new one...', err)
                  token = makeAccessToken(user.uid, user.groups)
                }
              })
            } else {
              token = makeAccessToken(user.uid, user.groups)
            }

            if (req.cookies.session) {
              SessionModel.findOne({id: req.cookies.session})
                  .then(result => {
                    if (!result) {
                      res.clearCookie('session')
                      makeSession(req, user)
                          .then(session => {
                            commitAuth(session, res, req, token)
                          })
                          .catch(() => {
                            res.sendStatus(401, 'Unable to create session')
                          })
                    } else commitAuth(result, res, req, token)  // Do not create a new session,
                                                                // renew it.
                  })
            } else {
              makeSession(req, user)
                  .then(session => {
                    commitAuth(session, res, req, token)
                  })
                  .catch(() => {
                    res.sendStatus(401, 'Unable to create session')
                  })
            }
          } else res.sendStatus(401)
        }
      })
      .catch(err => () => {
        res.sendStatus(401, 'Unable to login')
        log.debug('Unable to login', err)
      })
})

idmsa.post('/session', (req, res) => {
  // Fetch les cookies et faire
  checkSession(req.cookies.session, req.body.uid)
})

function commitAuth(session, res, req, token) {
  if (session) res.cookie('session', session.id, {
    maxAge: env.APP_SESSION_EXPIRES * 60 * 60 * 1000,
    sameSite: 'strict',
    secure: true
  })

  if (token) res.cookie('idmsa', token, {
    maxAge: env.APP_SESSION_EXPIRES * 60 * 60 * 1000,
    sameSite: 'strict',
    secure: true
  })

  if (!token && !session) {
    res.sendStatus(401, 'Unable to login')
  } else {
    res.setHeader('Authorization', token)
    res.sendStatus(201)
  }
}

async function makeSession(req, user) {
  return await new Session(req, user).build()
      .then(result => {
        log.debug(`Created session ${chalk.bold.white(result.id)} for user ${(chalk.bold.white(user.name))}`)
        return result
      })
      .catch(err => {
        log.debug(`Unable to create session for user ${chalk.bold.white(user.name)}`, err)
      })
}

module.exports = idmsa