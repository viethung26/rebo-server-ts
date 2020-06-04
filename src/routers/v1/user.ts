import { CrudRouter } from "@r/crud";
import { userController, UserController } from "@c"
import {Request, Response} from '@r/base'
export default class UserRouter extends CrudRouter <UserController> {
    constructor() {
        // 9779 improvement: auto inject
        super(userController)
    }
    customRouter() {
        this.router.post("/login", this.route(this.login))
        this.router.get("/logout", this.route(this.logout))
    }
    async login(req: Request, res: Response) {
        
    }
    async logout(req: Request, res: Response) {

    }
}