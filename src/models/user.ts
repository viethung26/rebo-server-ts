import { BaseModel } from "./base";
import mongoose, { Schema } from "mongoose";

export interface UserModel extends BaseModel {
    username: string
    displayname?: string
    salt: string
    avatar: string
}

const userSchema: Schema<UserModel> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    displayname: {
        type: String,
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'user'
})

export const User: mongoose.Model<UserModel> = mongoose.model('User', userSchema)