import { BaseModel } from "./base";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
export interface UserModel extends BaseModel {
    username: string
    displayname?: string
    password: string
    avatar: string
    methods: {}
}

const SALT_ROUND = 10

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false 
    },
    displayname: {
        type: String,
    },
    avatar: {
        type: String
    },
    categories: {
        type: [{type: Schema.Types.ObjectId, ref: 'Category'}],
        default: []
    },
    readings: {
        type: [{type: Schema.Types.ObjectId, ref: 'Book'}],
        default: []
    },
    reads: {
        type: [{type: Schema.Types.ObjectId, ref: 'Book'}],
        default: []
    }
}, {
    timestamps: true,
    collection: 'user'
})

userSchema.pre("save", function (next) {
    console.info('9779 save')
    const user = this as UserModel
    bcrypt.genSalt(SALT_ROUND, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = async function(pass: string) {
    console.info('9779 pass', pass, this)
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass, this.password, (err, isMatch) => {
            if (err) reject(err)
            resolve(isMatch)
        })
    })
}

export const User: mongoose.Model<UserModel> = mongoose.model('User', userSchema)