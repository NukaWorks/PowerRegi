import mongoose from 'mongoose'
import {SessionSchema} from '../Schemas/SessionSchema'
import env from '../../../Common/Misc/ConfigProvider.mjs'
import {UserModel} from './User'
import { v4 as uuidv4 } from 'uuid'

const SessionModel = mongoose.model('Session', SessionSchema)

class Session {
   #user

   constructor(req, user) {
      this.#user = user
      this.session = new SessionModel({
         id: uuidv4().replaceAll('-', ''),
         ip: req.ip,
         ua: req.headers['user-agent'],
         expires: new Date(Date.now() + (env.APP_SESSION_EXPIRES * 60 * 60 * 1000))
      })
   }

   async build() {
      await this.session.save()
      await this.#user.updateOne({$push: {sessions: this.session.id}})
      return this.session
   }
}

async function checkSession(sid, uid) {
   return await SessionModel.findOne({sid}).then(async session => {
          return await UserModel.findOne({uid: uid, sessions: sid})
              .then(user => {
                 return !!user;
              }).catch(() => false)
       }
   ).catch(() => false)
}

async function deleteSession(sid, uid) {
   return await UserModel.findOne({uid: uid}).then(user => {
      user.deleteOne({$pull: {uid: uid, sessions: sid}})
      return SessionModel.deleteOne({sid})
   })
}

async function deleteAllSessions(uid) {
   return await UserModel.findOne({uid: uid}).then(user => {
      user.updateOne({uid: uid, sessions: []})
      return SessionModel.deleteMany({id: {$in: user.sessions}})
   })
}

async function deleteAllExpiredSessions(uid) {
   return await UserModel.findOne({uid: uid}).then(user => {
      return SessionModel.find({id: {$in: user.sessions}, expires: {$lt: new Date()}}).then(sessions => {
         return sessions.forEach(session => {
            user.updateOne({$pull: {sessions: session.id}})
            session.deleteOne()
         })
      })
   })
}

async function disableSession(sid, uid) {
   return await UserModel.findOne({uid: uid}).then(user => {
      return SessionModel.updateOne({id: sid}, {disabled: true})
   })
}

async function disableAllSessions(uid) {
   return await UserModel.findOne({uid: uid}).then(user => {
      return SessionModel.updateMany({id: {$in: user.sessions}}, {disabled: true})
   })
}

async function disableAllExpiredSessions(uid) {
   return await UserModel.findOne({uid: uid}).then(user => {
      return SessionModel.updateMany({expires: {$lt: new Date()}}, {disabled: true})
   })
}

export {
   SessionModel,
   Session,
   deleteSession,
   deleteAllExpiredSessions,
   deleteAllSessions,
   disableSession,
   disableAllSessions,
   disableAllExpiredSessions,
   checkSession
}