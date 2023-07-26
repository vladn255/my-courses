import {Comment} from "../models/comment.model";

export class commentService {
    static async createComment({
                            lessonTitle,
                            text
                        }: { lessonTitle: string, text: string }) {

        const newComment = new Comment({
            lessonTitle,
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

    static async deleteManyComments(lessonTitle: string) {
        return Comment.deleteMany({
            lessonTitle
        })
    }
}
