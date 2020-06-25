import BaseMiddleWare from "./base";
import { Request, Response } from "../routers/base"
import express from "express"
import { DIContainer, ITokenService, TYPES, UserService } from "@s";

export default class AuthenticationMiddleware extends BaseMiddleWare {
    async use(req: Request, res: Response, next: express.NextFunction, options?: any) {
        const { token } = req.cookies || {}
        console.info('9779 token', token)
        if (token) {
            const data = await DIContainer.get<ITokenService>(TYPES.TokenService).verify(token, {})
            if (data) {
                const _id = data._id
                const user = await DIContainer.get<UserService>(TYPES.UserService).readItem({filter: {_id}})
                req.user = user
            }
        }
            next()
    }
}