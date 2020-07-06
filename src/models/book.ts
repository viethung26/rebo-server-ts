import { BaseModel } from "./base";
import mongoose, { Schema } from "mongoose";
import slugify from 'slugify'
export interface BookModel extends BaseModel {
    title: string
    author: string
    description?: string
    categories?: any[]
    cover?: string
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
        type: [{type: Schema.Types.ObjectId, ref: "Category"}],
        required: true

    },
    cover: {
        type: String,
        default: null
    },
    slug: {
        type: String,
        default: "/",
        unique: true
    },
    rates: {
        type: [{type: Schema.Types.ObjectId, ref: "Rate"}],
        default: []
    }
}, {
    timestamps: true,
    collection: 'book',
    toJSON: {virtuals: true}
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
bookSchema.virtual('rateAvg').get(function() {
    return 5
})
export const Book: mongoose.Model<BookModel> = mongoose.model('Book', bookSchema)