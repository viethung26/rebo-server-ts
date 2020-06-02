import CrudController from "../crud";
import { ICrudService } from "../../services/crud";
import { DIContainer, TYPES } from "../../services";
import UserService from "../../services/crud/user";

export default class UserController extends CrudController<ICrudService> {
    constructor() {
        super(DIContainer.get<UserService>(TYPES.UserService))
    }

}