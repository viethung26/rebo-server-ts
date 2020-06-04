import { Model, DocumentQuery } from "@m/base";

export interface ICrudService {
    create(data: any, option: ICrudOption): any
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
}

export class CrudService<T extends Model> implements ICrudService {
    constructor(public model: T) {}
    async exec(promise: Promise<any> | any){
        try {
            if (promise.hasOwnProperty("exec")) {
                return await promise.exec();
            } else {
                return await promise
            }
        } 
        catch(e) {
            console.info('9779 error', e)
        }
    }
    async create(data: any, option: ICrudOption) {
        // 9779 knowledge
        const query = this.model.create(data)
        const result = await this.exec(query)
        console.info('9779 result query', result)
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
        let query = this.model.findOneAndUpdate({_id }, data, {new: true})
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
        option.populates?.forEach(populate => {
            query.populate(populate)
        })
        //9779 knowledge
        //lean, field => lean, select
        return query
    }
    
    
}