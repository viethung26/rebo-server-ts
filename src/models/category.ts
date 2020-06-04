import { BaseModel } from "./base";
import mongoose, { Schema } from "mongoose";

export interface CategoryModel extends BaseModel {
    name: string
    description?: string
}

const categorySchema: Schema<CategoryModel> = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'category'
})

export const Category: mongoose.Model<CategoryModel> = mongoose.model('Category', categorySchema)