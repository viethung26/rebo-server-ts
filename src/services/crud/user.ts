import { CrudService } from "../crud";
import { User } from "../../models/user";
import {injectable} from 'inversify'

@injectable()
export default class UserService extends CrudService<typeof User> {
    constructor() {
        super(User)
    }
}