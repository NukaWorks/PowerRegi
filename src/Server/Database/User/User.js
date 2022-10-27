import mongoose from 'mongoose'
import { UserSchema } from '../Schemas/UserSchema'

const UserModel = mongoose.model('User', UserSchema)