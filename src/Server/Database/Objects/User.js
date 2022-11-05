import mongoose from 'mongoose'
import { UserSchema } from '../Schemas/UserSchema'

const User = mongoose.model('User', UserSchema)

async function makeDefaultUser() {}

async function makeUser(userModel) {

}