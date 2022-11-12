import mongoose from 'mongoose'
import { SessionSchema } from '../Schemas/SessionSchema'
import env from '../../../Common/Misc/ConfigProvider.mjs'

const SessionModel = mongoose.model('Session', SessionSchema)

class Session {
  #user

  constructor(req, user) {
    this.#user = user
    this.session = new SessionModel({
      id: crypto.randomUUID().replaceAll('-', ''),
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

async function checkSession(id, user) {
  return await SessionModel.findOne({id}).then(async session => {
        return await user.findOne({sessions: id})
            .then(user => {
              if (user) {
                return session.createdAt > Date.now()
              } else return false
            }).catch(() => false)
      }
  ).catch(() => false)
}

async function deleteSession(id, user) {
  await user.deleteOne({$pull: {sessions: id}})
  return SessionModel.deleteOne({id})
}

export {
  SessionModel,
  Session,
  deleteSession,
  checkSession
}