import BaseController from "./base";
import { CrudService, ICrudService, ICrudOption } from "../services/crud";
import { Model } from "../models/base";

interface ICrudController {
    create(params: any, options?: ICrudOption):any
    readAll(options?: ICrudOption):any
    readItem(options?: ICrudOption):any
    updateItem(data, options?: ICrudOption):any
    deleteItem(options: ICrudOption):any
}

export default class CrudController<T extends ICrudService> extends BaseController implements ICrudController{
    constructor(public service: T) {
        super()
    }
    async create(data, options) {
        return await this.service.create(data, options)
    }
    async readAll(options) {
        return await this.service.readAll(options)
    }
    async readItem(options) {
        return await this.service.readItem(options)
    }
    async updateItem(data, options) {
        return await this.service.updateItem(data, options)
    }
    async deleteItem(options) {
        return await this.service.deleteItem(options)
    }
}