import { Model, DocumentQuery } from "@m/base";
import { BaseError } from "./error/";
import mongoose from 'mongoose'
import DatabaseErrorService from "./error/database";

export interface ICrudService {
    create(data: any, option?: ICrudOption): any
    readAll(option: ICrudOption): any
    readItem(option: ICrudOption): any
    updateItem(data: any, conditions: ICrudOption): any
    deleteItem(option?: ICrudOption): any
    applyOptionsToQuery(query: DocumentQuery, option: ICrudOption):DocumentQuery
}

export interface ICrudOption {
    filter?: any
    limit?: number
    offset?: number
    populates?: any[]
    order?: any
    lean?: boolean
}

export class CrudService<T extends Model> implements ICrudService {
    constructor(public model: T) {}
    async exec(promise: Promise<any> | any){
        try {
            let result
            if (promise.hasOwnProperty("exec")) {
                result = await promise.exec();
            } else {
                result = await promise
            }
            return result

        } 
        catch(err) {
            if (err instanceof mongoose.mongo.MongoError) {
                throw new DatabaseErrorService(err).getErrorData()
            }
            if (err instanceof BaseError) {
                throw err
            }
            console.info('9779 err',err)
            throw {
                status: 500,
                message: "Another error"
            }
        }
    }
    async create(data: any, option: ICrudOption = undefined) {
        // 9779 knowledge
        console.info('9779 req', data)
        const query = this.model.create(data)
        const result = await this.exec(query)
        return result
    }
    async readAll(option: ICrudOption = {limit: 10, offset: 0}) {
        let query = this.model.find()
        query = this.applyOptionsToQuery(query, option)
        return await this.exec(query)
    }
    async readItem(option: ICrudOption) {
        let query = this.model.findOne()
        query = this.applyOptionsToQuery(query, option)
        return await this.exec(query)
    }
    async updateItem(data, option: ICrudOption) {
        const {_id} = option.filter
        console.info('9779 ', data, _id)
        let query = this.model.findOneAndUpdate({_id }, data, {new: true})
        // console.info('9779 query', query)
        const result = await this.exec(query)
        return this.readItem(option)
    }
    async deleteItem(option: ICrudOption) {
        let query = this.model.findOneAndDelete()
        query = this.applyOptionsToQuery(query, option)
        const item = await this.exec(query)
        return this.exec(item.remove())
    }
    applyOptionsToQuery(query: DocumentQuery, option: ICrudOption) {
        if (option.filter) query.where(option.filter)
        if (option.limit) query.limit(option.limit)
        if (option.offset) query.skip(option.offset)
        if (option.order) query.sort(option.order)
        if (option.lean) query.lean()
        // query.select("-password")
        option.populates?.forEach(populate => {
            query.populate(populate)
        })
        //9779 knowledge
        //lean, field => lean, select
        return query
    }
    
    
}