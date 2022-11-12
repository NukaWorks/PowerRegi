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

  async checkSession(id, user) {
    const session = await SessionModel.findOne({id}).then(session => {
     return user.sessions.includes(session.id)
    })
    return user.sessions.includes(id);
  }

  async deleteSession(id, user) {
    await user.deleteOne({$pull: {sessions: id}})
    return SessionModel.deleteOne({id})
  }
}

export { SessionModel, Session }