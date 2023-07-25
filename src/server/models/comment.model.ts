import mongoose from 'mongoose'
import {COLLECTIONS} from "../constants";


const Schema = mongoose.Schema

export interface IComment {
    _id: string,
    lessonId: string,
    text: string,
}

export const CommentSchema = new Schema({
    lessonId: { type: String, required: true },
    text: { type: String, required: true}
})

export const Comment = mongoose.model(COLLECTIONS.COMMENTS, CommentSchema)
