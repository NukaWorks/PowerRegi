import { Schema } from 'mongoose'

export const UserSchema = new Schema({
    name: String,
    email: String,
    passwd: String,
    groups: [String],
    uid: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
