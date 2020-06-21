import { BaseModel } from "./base";
import mongoose, { Schema } from "mongoose";
import { Book } from "./book";

export interface RateModel extends BaseModel {
    star: number
    book: string
    author: string
}

const rateSchema: Schema<RateModel> = new Schema({
    star: {
        type: Number,
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true,
    collection: 'rate'
})

rateSchema.pre("save", function (next) {
    const rate = this as RateModel
    Book.findOneAndUpdate({_id: rate.book}, {$push: {rates: rate._id}}, (err, raw) => {
        console.info('9779 err',err, raw)
        next()

    } )
})

export const Rate: mongoose.Model<RateModel> = mongoose.model('Rate', rateSchema)