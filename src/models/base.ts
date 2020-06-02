import mongoose, {Document} from 'mongoose'
export interface BaseModel extends Document {
    createAt: Date
    updateAt: Date
}

export type Model = mongoose.Model<BaseModel>
export type DocumentQuery = mongoose.DocumentQuery<any, any>