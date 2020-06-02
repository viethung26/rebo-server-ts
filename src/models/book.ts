import { BaseModel } from "./base";
import mongoose, { Schema } from "mongoose";

export interface BookModel extends BaseModel {
    title: string
    author: string
    description?: string
}

const bookSchema: Schema<BookModel> = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'book'
})

export const Book: mongoose.Model<BookModel> = mongoose.model('Book', bookSchema)