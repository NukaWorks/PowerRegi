import {Schema} from 'mongoose'

export const SessionSchema = new Schema({
   id: String,
   ip: String,
   ua: String,
   expires: Date,
   disabled: {type: Boolean, default: false},
   createdAt: {
      type: Date,
      default: Date.now
   }
})
