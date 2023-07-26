import {Course} from "../models/course.model";
import {Lesson} from "../models/lesson.model";
import {commentService} from "./commentService";
import {Types} from "mongoose";

export class lessonService {
    static async getAllLessons(id: string) {
        const course = await Course.findById(id);

        const lessons = await Lesson.aggregate([{
            $match: {
                courseTitle: course?.title
            }
        },
            {
                $lookup: {
                    from: 'comments',
                    localField: 'title',
                    foreignField: 'lessonTitle',
                    as: 'comments',
                }
            }])
        return lessons || null;
    }

    static async createLesson({
                           courseTitle,
                           title,
                           description
                       }: {
        courseTitle: string,
        title: string,
        description: string
    }) {
        const newLesson = new Lesson({
            courseTitle,
            title,
            description
        });

        return await newLesson.save()
    }

    static async getLesson(id: string) {
        const lesson = await Lesson.aggregate([{
            $match: {
                _id: new Types.ObjectId(id)
            }
        },
            {
                $lookup: {
                    from: 'comments',
                    localField: 'title',
                    foreignField: 'lessonTitle',
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

    static async deleteCourseLessons(courseTitle: string) {
        const courseLessons = await Lesson.aggregate([{
            $match: {
                courseTitle,
            }
        }]);

        for (const lesson of courseLessons) {
            await commentService.deleteManyComments(lesson._id)
        }

        return Lesson.deleteMany({
            courseTitle
        })
    }
}
