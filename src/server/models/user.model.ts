import mongoose from 'mongoose'
import {COLLECTIONS} from "../constants";


const Schema = mongoose.Schema

export interface IUser {
  name: string
}

export const UserSchema = new Schema<IUser>({
  name: { type: String, required: true }
})

export const User = mongoose.model<IUser>(COLLECTIONS.USERS, UserSchema)
