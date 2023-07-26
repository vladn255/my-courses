import mongoose from 'mongoose'
import {ILesson, LessonSchema} from "./lesson.model";
import {COLLECTIONS} from "../constants";


const Schema = mongoose.Schema

export interface ICourse {
    _id: string,
    title: string,
    description: string,
    authorName: string,
    allowedUserNames?: string[],
    lessons?: ILesson,
}

export const CourseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    authorName: { type: String, required: true },
    allowedUserNames: { type: [String] },
    lessons: { type: [LessonSchema]}
})

export const Course = mongoose.model(COLLECTIONS.COURSES, CourseSchema)
