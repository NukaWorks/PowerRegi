import { Schema } from 'mongoose'

export const UserSchema = new Schema({
    name: String,
    email: String,
    passwd: String,
    groups: [String],
    tokens: {
        type: Map,
        of: String
    },
    uid: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
