import {IUser, User} from '../models/user.model'
import mongoose from "mongoose";

export class userService {
    static async getAllUsers () {
        const users: IUser[] = await User.find();
        return users;
    }

    static async createUser (name: string) {
        const newUser = new User({
            _id: new mongoose.Types.ObjectId().toHexString(),
            name
        })
        const user = await newUser.save()
        return user;
    }

    static async getUser (id: string) {
        const user = await User.findById(id)
        return user || null;
    }
}
