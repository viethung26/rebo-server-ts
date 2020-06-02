import { Model } from "../models/base";

export interface ICrudService {
    create(params, option): any
}

export class CrudService<T extends Model> {
    constructor(public model: T) {}
    async exec(promise: Promise<any> | any){
        try {
            if (promise.hasOwnProperty("exec")) {
                console.info('9779 exec')
                return await promise.exec();
            } else {
                console.info('9779 exec2')

                return await promise
            }
        } 
        catch(e) {
            console.info('9779 error', e)
        }
    }
    async create(params: any, option) {
        // 9779 knowledge
        const query = this.model.create(params)
        const result = await this.exec(query)
        console.info('9779 result query', result)
        return result
    }
}