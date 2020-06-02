import BaseRouter from "./base"
import express, {Request, Response} from "express"
import CrudController from "../controllers/crud"

export class CrudRouter<T extends CrudController<any>> extends BaseRouter {
    router: express.Router
    constructor(public controller: T) {
        super()
        this.router = express.Router()
        this.defaultRouter()
    }
    defaultRouter() {
        this.router.post('/', (req, res, next) => {
            next()
        },this.route(this.create))
    }
    async create(req: Request, res: Response) {
        const result = await this.controller.create(req.body, undefined)
        console.info('9779 result', result)
        res.status(200).json(result)
    }
}