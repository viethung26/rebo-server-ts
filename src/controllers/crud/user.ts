import CrudController from "../crud";
import { DIContainer, TYPES, UserService, IUserService, ITokenService } from "@s";

export default class UserController extends CrudController<IUserService> {
    constructor() {
        super(DIContainer.get<UserService>(TYPES.UserService))
    }
    async login(data) {
        const item = await this.service.login(data)
        if (item) {
            const payload = {
                _id: item._id
            }
            const options = {}
            const token = await DIContainer.get<ITokenService>(TYPES.TokenService).sign(payload, options)
            return {token, item}

        }
        return null
    }
}