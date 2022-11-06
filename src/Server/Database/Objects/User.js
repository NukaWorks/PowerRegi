import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { UserSchema } from '../Schemas/UserSchema'

const saltRounds = 10;
const UserModel = mongoose.model('User', UserSchema)

class User {
  constructor(user) {
    this.model = user
  }

  async generateHash(password) {
    return await bcrypt.hash(password, saltRounds)
  }

  async build() {
    if (!await UserModel.findOne({name: this.model.name})) {
      this.model = new UserModel(this.model)
      this.model.passwd = await this.generateHash(this.model.passwd)

      return this.model.save().then(model => {
        return model
      })
    } else throw new Error('User already exists')
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
  const data = {name: 'root', passwd: 'root'}
  return new User(data)
}

export { User, UserModel, makeDefaultUser }