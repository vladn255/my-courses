import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface User {
    name: string
}

const UserSchema = new Schema<User>({
    name: {type: String, required: true},
});

export const User= mongoose.model<User>('users', UserSchema);
