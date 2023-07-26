import {IUser, User} from '../models/user.model'

export class userService {
    static async getAllUsers () {
        const users: IUser[] = await User.find();
        return users;
    }

    static async createUser (name: string) {
        const newUser = new User({
            name
        })
        return await newUser.save();
    }

    static async getUser (id: string) {
        const user = await User.findById(id)
        return user || null;
    }
}
