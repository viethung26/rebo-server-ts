import { CrudService, ICrudService } from "../crud";
import { User } from "@m/user"
import {injectable} from 'inversify'

export interface IUserService extends ICrudService {
    login(data: {username: string, password: string}): any
}
@injectable()
export default class UserService extends CrudService<typeof User> {
    constructor() {
        super(User)
    }
    async login({username, password}) {
        const item = await this.readItem({filter: {username}})
        try {
            const isMatch = await item.comparePassword(password)
            if (isMatch) {
                return item
            }
        } catch (err) {
            throw {status: 303, message: 'Wrong username or password'}
        }
       
        // 9779 continue // return jwt for user
    }
}