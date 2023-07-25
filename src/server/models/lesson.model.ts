import mongoose from 'mongoose'
import {ICourse} from "./course.model";
import {CommentSchema, IComment} from "./comment.model";
import {COLLECTIONS} from "../constants";


const Schema = mongoose.Schema

export interface ILesson {
    _id: string,
    courseId: string,
    title: string,
    description: string,
    comments?: IComment[],
    courseData?: ICourse,
}

export const LessonSchema = new Schema({
    courseId: { type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    comments: { type: [CommentSchema]}
})

export const Lesson = mongoose.model(COLLECTIONS.LESSONS, LessonSchema)
