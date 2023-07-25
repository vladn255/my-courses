import {Comment} from "../models/comment.model";

export class commentService {
    static async createComment({
                            lessonId,
                            text
                        }: { lessonId: string, text: string }) {

        const newComment = new Comment({
            lessonId,
            text,
        });
        return await newComment.save()
    }

    static async deleteComment(id: string) {
        const comment = await Comment.findById(id);
        if (comment) {
            return comment.deleteOne();
        } else {
            return null;
        }
    }

    static async deleteManyComments(lessonId: string) {
        return Comment.deleteMany({
            lessonId: lessonId
        })
    }
}
