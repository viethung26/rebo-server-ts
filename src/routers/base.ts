import express from 'express'
import { ICrudOption } from '../services/crud'
interface IError {
    status: number
    message: string
    type?: string
    code?: number
}

export interface Request extends express.Request {
    queryInfo?: ICrudOption
}
export interface Response extends express.Response {
}
export default class BaseRouter {
    route(func: (req: Request, res: Response) => Promise<any>): any {
        return (req: Request, res: Response) => func
        .bind(this)(req, res)
        .catch((err) => {
            console.info('9779 error', err)
        })
    }
    onError(res: Response, error: IError) {
        const errorMessage = {
            "error": {
                message: error.message,
                type: error.type,
                code: error.code | 800
            }
        }
        res.status(error.status).json(errorMessage)
    }
    onSuccess(res: Response, results = {}) {
        res.status(200).json(results)
    }
}