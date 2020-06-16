import { BaseModel } from "./base";
import mongoose, { Schema } from "mongoose";
import { Article } from "./article";

export interface CommentModel extends BaseModel {
    content: string
    article: string
    author: string
}

const commentSchema: Schema<CommentModel> = new Schema({
    content: {
        type: String,
        required: true
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article",
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true,
    collection: 'comment'
})

commentSchema.pre("save", function (next) {
    const comment = this as CommentModel
    Article.findOneAndUpdate({_id: comment.article}, {$push: {comments: comment._id}}, (err, raw) => {
        console.info('9779 err',err, raw)
        next()

    } )
})

export const Comment: mongoose.Model<CommentModel> = mongoose.model('Comment', commentSchema)