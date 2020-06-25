import { BaseModel } from "./base";
import mongoose, { Schema,  } from "mongoose";

export interface ItemModel extends BaseModel {
    book: string
    author: string
    description: string
    price: number
    contact: string
}

const itemSchema: Schema<ItemModel> = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
    collection: 'item'
})

export const Item: mongoose.Model<ItemModel> = mongoose.model('Item', itemSchema)