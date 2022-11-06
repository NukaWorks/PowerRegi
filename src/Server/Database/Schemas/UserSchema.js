import { Schema } from 'mongoose'

export const UserSchema = new Schema({
    name: String, // Unique & Required
    email: String, // Optional
    passwd: String, // Required
    createdAt: {
        type: Date,
        default: Date.now
    }
})
