import mongoose from 'mongoose'
import { UserSchema } from '../Schemas/UserSchema'

const UserModel = mongoose.model('User', UserSchema)

class User {
  constructor(user) {
    this.model = user
  }

  async build() {
    if (! await UserModel.findOne({name: this.model.name})) {
      this.model = new UserModel(this.model)

      return this.model.save().then(model => {
        return model
      })
    } else throw new Error('User already exists')
  }
}

function makeDefaultUser() {
  const data = {name: 'root'}
  return new User(data)
}

export { User, UserModel, makeDefaultUser }