import { BaseModel } from "./base";
import mongoose, { Schema,  } from "mongoose";

export interface ArticleModel extends BaseModel {
    title: string
    content: string
    book: string
    author: string
}

const articleSchema: Schema<ArticleModel> = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    type: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    votes: {
        type: [{type: Schema.Types.ObjectId, ref: "User", unique: true}],
        default: []
    },
    comments: {
        type: [{type: Schema.Types.ObjectId, ref: "Comment"}],
        default: []
    }
}, {
    timestamps: true,
    collection: 'article'
})

export const Article: mongoose.Model<ArticleModel> = mongoose.model('Article', articleSchema)