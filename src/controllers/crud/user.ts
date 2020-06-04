import CrudController from "../crud";
import { DIContainer, TYPES, ICrudService, UserService } from "@s";

export default class UserController extends CrudController<ICrudService> {
    constructor() {
        super(DIContainer.get<UserService>(TYPES.UserService))
    }
}