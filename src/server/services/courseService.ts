import {Course} from "../models/course.model";
import {COLLECTIONS} from "../constants";
import {lessonService} from "./lessonService";
import {Types} from "mongoose";
import {Lesson} from "../models/lesson.model";

export class courseService {
    static async getAllCourses() {
        return Course.find();
    }

    static async createCourse({
                           authorName,
                           title,
                           description
                       }: { authorName: string, title: string, description: string }) {
        const newCourse = new Course({
            title,
            description,
            authorName
        });
        return await newCourse.save();
    }

    static async getCourse(id: string) {
        const course = await Course.aggregate([{
            $match: {
                _id: new Types.ObjectId(id),
            }
        },
            {
                $lookup: {
                    from: COLLECTIONS.LESSONS,
                    localField: 'title',
                    foreignField: 'courseTitle',
                    as: 'lessons'
                }
            }
        ]);
        return course || null;
    }

    static async deleteCourse(id: string) {
        const course = await Course.findById(id);

        if (course) {
            const deletedLessons = lessonService.deleteCourseLessons(id);
            const deletedCourse = course.deleteOne();
            return { deletedCourse, deletedLessons};
        } else {
            return null;
        }
    }
}


