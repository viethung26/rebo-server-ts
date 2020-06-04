import {Request, Response} from '../routers/base'
import express from 'express'
export default class BaseMiddleWare {
    run(options?: any) {
        return (req: Request, res: Response, next: express.NextFunction) => this.use
        .bind(this)(req, res, next, options)
        .catch(err => {
            console.info('9779 middleware', err)
        }) 
    }
    async use(req: Request, res: Response, next: express.NextFunction, options?: any) {
        next()
    }
}