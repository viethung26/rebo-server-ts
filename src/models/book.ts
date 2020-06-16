import { BaseModel } from "./base";
import mongoose, { Schema } from "mongoose";
import slugify from 'slugify'
export interface BookModel extends BaseModel {
    title: string
    author: string
    description?: string
    categories?: any[]
    slug?: string
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
    },
    categories: {
        type: [Schema.Types.ObjectId],
        ref: "Category",
        required: true

    },
    slug: {
        type: String,
        default: "/",
        unique: true
    }
}, {
    timestamps: true,
    collection: 'book'
})
bookSchema.pre("save", function(next, doc) {
    const book = this as BookModel
    book.slug = slugify(book.title, {
        replacement: '-', 
        lower: true,
        strict: true
    })
    next()
})
export const Book: mongoose.Model<BookModel> = mongoose.model('Book', bookSchema)