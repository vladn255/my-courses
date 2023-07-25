import {Course} from "../models/course.model";
import {COLLECTIONS} from "../constants";
import {lessonService} from "./lessonService";
import {commentService} from "./commentService";
import {ILesson, Lesson} from "../models/lesson.model";
import {Comment} from "../models/comment.model";

export class courseService {
    static async getAllCourses() {
        return Course.find();
    }

    static async createCourse({
                           authorId,
                           title,
                           description
                       }: { authorId: string, title: string, description: string }) {
        const newCourse = new Course({
            title,
            description,
            authorId
        });
        return await newCourse.save();
    }

    static async getCourse(id: string) {
        const course = await Course.aggregate([{
            $match: {
                _id: id,
            }
        },
            {
                $lookup: {
                    from: COLLECTIONS.LESSONS,
                    localField: '_id',
                    foreignField: 'courseId',
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


