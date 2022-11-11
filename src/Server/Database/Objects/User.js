import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { UserSchema } from '../Schemas/UserSchema'
import jwt from 'jsonwebtoken'
import env, { certKeys } from '../../../Common/Misc/ConfigProvider.mjs'

const saltRounds = 10
const UserModel = mongoose.model('User', UserSchema)

//NOTE: A user need to be associated with a group to be able to login (users)
class User {
  constructor(user) {
    this.model = user
  }

  async generateHash(password) {
    return await bcrypt.hash(password, saltRounds)
  }

  #makeUid() {
    return crypto.randomUUID().split('-')[0]
  }

  async build() {
    const uModel = await UserModel.findOne({name: this.model.name})
    if (!uModel) {
      this.model = new UserModel(this.model)
      this.model.uid = this.#makeUid()
      this.model.passwd = await this.generateHash(this.model.passwd)
      if (!this.model.groups.includes('users')) this.model.groups.push('users')
      return this.model.save().then(model => {
        return model
      })
    } else {
      this.model = uModel
    }
  }

  async update(data) {
    if (await UserModel.findOne({name: this.model.name})) {
      return UserModel.findOneAndUpdate({name: this.model.name}, data).then(model => {
        this.model = model
        return model.save().then(model => {
          return model
        }).catch(err => {
          throw err
        })
      }).catch(err => {
        throw err
      })
    } else throw new Error('User not found')
  }
}

function makeDefaultUser() {
  const data = {name: 'root', groups: ['admin', 'users'], passwd: 'root'}
  return new User(data)
}

function makeAccessToken(uid, groups) {
  return jwt.sign({
    u: uid, g: groups, d: Date.now()
  }, certKeys.privkey, {expiresIn: `${env.APP_SESSION_EXPIRES}h`})
}

export { User, UserModel, makeDefaultUser, makeAccessToken }