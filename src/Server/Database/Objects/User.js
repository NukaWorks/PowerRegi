import mongoose from 'mongoose'
import { UserSchema } from '../Schemas/UserSchema'

const UserModel = mongoose.model('User', UserSchema)

export class User {
  async makeDefaultUser() {
    const data = {name: 'root'}

    if (await UserModel.findOne({name: data.name})) {
      throw new Error('User already exists')
    } else return new UserModel(data)
  }

  async makeUser(userModel) {
    return new UserModel(userModel)
  }
}

export { UserModel }