import { BaseModel } from "./base";
import mongoose, { Schema } from "mongoose";

export interface CommentModel extends BaseModel {
    content: string
    article: string
    author: string
}

const commentSchema: Schema<CommentModel> = new Schema({
    content: {
        type: String,
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

export const Comment: mongoose.Model<CommentModel> = mongoose.model('Comment', commentSchema)