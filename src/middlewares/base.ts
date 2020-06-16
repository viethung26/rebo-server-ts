import {Request, Response} from '../routers/base'
import express from 'express'
export default class BaseMiddleWare {
    run(options?: any) {
        return (req: Request, res: Response, next: express.NextFunction) => this.use
        .bind(this)(req, res, next, options)
        .catch(err => {
            this.onError(res, err)
        }) 
    }
    async use(req: Request, res: Response, next: express.NextFunction, options?: any) {
        next()
    }
    onError(res: Response, error) {
        res.status(400).json({
            error: {
                message: error.message
            }
        })
    }
}