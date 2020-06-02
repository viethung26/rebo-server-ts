import BaseController from "./base";
import { CrudService, ICrudService } from "../services/crud";
import { Model } from "../models/base";

interface ICrudController {
    create(params: any, options?: any):any
}

export default class CrudController<T extends ICrudService> extends BaseController implements ICrudController{
    constructor(public service: T) {
        super()
    }
    async create(params, options) {
        return this.service.create(params, options)
    }
}