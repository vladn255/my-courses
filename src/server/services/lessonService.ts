import {Course} from "../models/course.model";
import {ILesson, Lesson} from "../models/lesson.model";
import {commentService} from "./commentService";

export class lessonService {
    static async getAllLessons(id: string) {
        const course = await Course.findById(id);
        const lessons = await Lesson.aggregate([{
            $match: {
                courseId: course?._id
            }
        },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'lessonId',
                    as: 'comments',
                }
            }])
        return lessons || null;
    };

    static async createLesson({
                           courseId,
                           title,
                           description
                       }: {
        courseId: string,
        title: string,
        description: string
    }) {
        const newLesson = new Lesson({
            courseId,
            title,
            description
        });

        return await newLesson.save()
    }

    static async getLesson(id: string) {
        const lesson = await Lesson.aggregate([{
            $match: {
                _id: id
            }
        },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'lessonId',
                    as: 'comments',
                }
            }])

        return lesson || null
    }

    static async deleteLesson(id: string) {
        const lesson = await Lesson.findById(id);
        if (lesson) {
            return lesson.deleteOne();
        } else {
            return null;
        }
    }

    static async deleteCourseLessons(courseId: string) {
        const courseLessons = await Lesson.aggregate([{
            $match: {
                courseId: courseId,
            }
        }]);

        for (const lesson of courseLessons) {
            await commentService.deleteManyComments(lesson._id)
        }

        return Lesson.deleteMany({
            courseId: courseId
        })
    }
}
