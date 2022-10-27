import { Schema } from 'mongoose'

export const UserSchema = new Schema({
    name: String, // Unique & Required
    email: String, // Optional
    password: String, //TODO bcrypt here
    createdAt: {
        type: Date,
        default: Date.now
    }
})
