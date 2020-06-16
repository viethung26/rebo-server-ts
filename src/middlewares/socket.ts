import io, { Socket } from "socket.io"
import { DIContainer, ITokenService, TYPES, UserService } from "@s"

interface ISocket extends Socket {
    user: any
}
export default class SocketMiddleware {
    constructor() {
        this.auth = this.auth.bind(this)
    }
    run() {

    }
    async auth(socket: ISocket, next) {
        const cookie = socket.handshake.headers.cookie || ""
        const token = cookie.split(";").find(c => c.startsWith("token"))?.split("=")[1]
        if (token) {
            const data = await DIContainer.get<ITokenService>(TYPES.TokenService).verify(token, {})
            if (data) {
                const _id = data._id
                const user = await DIContainer.get<UserService>(TYPES.UserService).readItem({filter: {_id}})
                socket.user = user
                return next()
            }
        }
        this.onError({message: "auth"}, next)
    }
    onError(err, next) {
        const error = new Error(err.message);
        next(error)
    }

}