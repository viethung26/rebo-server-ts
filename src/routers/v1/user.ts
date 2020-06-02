import { CrudRouter } from "../crud";
import UserController from "../../controllers/crud/user";
import { userController } from "../../controllers";
export default class UserRouter extends CrudRouter <UserController> {
    constructor() {
        // 9779 improvement: auto inject
        super(userController)
    }
}