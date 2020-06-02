import {Request, Response} from 'express'
export default class BaseRouter {
    route(func: (req: Request, res: Response) => Promise<any>): any {
        return (req: Request, res: Response) => func
        .bind(this)(req, res)
        .catch((err) => {
            console.info('9779 error', err)
        })
    }
}