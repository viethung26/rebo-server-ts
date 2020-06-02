import UserController from "./crud/user";
// 9779 improvement: auto inject
const userController = new UserController()

export {
    userController
}