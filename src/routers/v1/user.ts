import { CrudRouter } from "@r/crud";
import { userController, UserController } from "@c"
import {Request, Response} from '@r/base'
import { authenticateMiddleware } from "@mw";
export default class UserRouter extends CrudRouter <UserController> {
    constructor() {
        // 9779 improvement: auto inject
        super(userController)
    }
    customRouter() {
        this.router.post("/login", this.route(this.login))
        this.router.get("/logout", authenticateMiddleware.run(), this.route(this.logout))
        this.router.get("/me", authenticateMiddleware.run(), this.route(this.readMe))
        this.router.post("/startreading", authenticateMiddleware.run(), this.route(this.startReading))
        this.router.post("/finishreading", authenticateMiddleware.run(), this.route(this.finishReading))
    }
    async login(req: Request, res: Response) {
        const result = await this.controller.login(req.body)
        if (result) {
            const {token, item} = result
            res.cookie("token", token, {
                maxAge: 1000*60*60*24,
            })
            return this.onSuccess(res, item)
        }
        this.onError(res, {
            status: 301,
            message: "Wrong username or password"
        })
    }
    async logout(req: Request, res: Response) {
        res.clearCookie("token")
        const test = {
            user: 'hung',
            age: 22
        }
        res.status(200).json(test)
    }
    async readMe(req: Request, res: Response) {
        if (req.user) {
            const {password, ...rest} = req.user._doc
            return this.onSuccess(res, rest)
        }
        this.onError(res, {status: 301, message: 'Login before'})
    }
    async startReading(req: Request, res: Response) {
        const {book} = req.body
        if (req.user && book) {
            const result = this.controller.startReading(req.user._id, book )
            return this.onSuccess(res, result)
        }
        this.onError(res, {status: 301, message: 'Login before'})
    }
    async finishReading(req: Request, res: Response) {
        const {book} = req.body
        if (req.user && book) {
            const result = this.controller.finishReading(req.user._id, book )
            return this.onSuccess(res, result)
        }
        this.onError(res, {status: 301, message: 'Login before'})
    }
}