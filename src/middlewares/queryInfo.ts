import BaseMiddleWare from "./base";
import {Request, Response} from "../routers/base"
import express from "express"

export default class QueryInfoMiddleware extends BaseMiddleWare {
    async use(req: Request, res: Response, next: express.NextFunction, options?: any) {
        const filter = this.parseJSON(req.query.filter)
        const limit = Number.parseInt(req.query.limit as string) || undefined
        const offset = Number.parseInt(req.query.offset as string) || undefined
        const populates = this.parseJSON(req.query.populates)

        const order = this.parseJSON(req.query.order)
        req.queryInfo = {
            filter,
            limit,
            offset,
            populates,
            order
        }
        next()
    }
    parseJSON(query: any) {
        if(query) {
            try {
                query = JSON.parse(query)
            } catch (err) {
                console.info('9779 parse', err)
                query = undefined
            }
        }
        return query
    }
}