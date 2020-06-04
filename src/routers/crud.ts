import BaseRouter from "./base"
import express from "express"
import {Request, Response} from "./base"
import CrudController from "../controllers/crud"
import { getQueryMiddleWare } from "../middlewares"

interface ICrudRoute {
    create(req: Request, res: Response):any
    readAll(req: Request, res: Response):any
    readItem(req: Request, res: Response):any
    updateItem(req: Request, res: Response):any
    deleteItem(req: Request, res: Response):any

}
export class CrudRouter<T extends CrudController<any>> extends BaseRouter implements ICrudRoute {
    router: express.Router
    constructor(public controller: T) {
        super()
        this.router = express.Router()
        this.customRouter()
        this.defaultRouter()
    }
    customRouter() {}
    defaultRouter() {
        this.router.get('/', getQueryMiddleWare.run(), this.route(this.readAll))
        this.router.get('/:_id', getQueryMiddleWare.run(), this.route(this.readItem))
        this.router.put('/:_id', getQueryMiddleWare.run(), this.route(this.updateItem))
        this.router.post('/', this.route(this.create))
        this.router.delete('/:_id', getQueryMiddleWare.run(), this.route(this.deleteItem))
    }
    async create(req: Request, res: Response) {
        const result = await this.controller.create(req.body, undefined)
        this.onSuccess(res, result)
    }
    async readAll(req: Request, res: Response) {
        const result = await this.controller.readAll(req.queryInfo)
        this.onSuccess(res, result)
    }
    async readItem(req: Request, res: Response) {
        const {_id} = req.params
        if (!req.queryInfo) {
            req.queryInfo = {}
        }
        req.queryInfo.filter = {_id}
        const result = await this.controller.readItem(req.queryInfo)
        // const result = await this.controller.readItem(req.body)
        // res.status(200).json(result)
        this.onSuccess(res, result)
    }
    async updateItem(req: Request, res: Response) {
        const {_id} = req.params
        const result = await this.controller.updateItem(req.body, {filter: {_id}})
        this.onSuccess(res, result)
    }
    async deleteItem(req: Request, res: Response) {
        const {_id} = req.params
        const result = await this.controller.deleteItem({filter: {_id}})
        this.onSuccess(res, result)
    }
}