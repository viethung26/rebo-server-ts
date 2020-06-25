import { CrudService, ICrudService } from "../crud";
import { User } from "@m/user"
import {injectable} from 'inversify'

export interface IUserService extends ICrudService {
    login(data: {username: string, password: string}): any
    startReading(userId: string, bookId: string): any
    finishReading(userId: string, bookId: string): any
}
@injectable()
export default class UserService extends CrudService<typeof User> implements IUserService{
    constructor() {
        super(User)
    }
    async login({username, password}) {
        const item = await this.readItem({filter: {username}, fields: '+password'})
        try {
            const isMatch = await item.comparePassword(password)
            if (isMatch) {
                const {password, ...rest} = item._doc
                return rest
            }
        } catch (err) {
            console.info('9779 issmatch', err)

            throw {status: 303, message: 'Wrong username or password'}
        }
       
        // 9779 continue // return jwt for user
    }
    async startReading(userId, bookId) {
        await this.updateItem({
            $pull: {reads: bookId}
        }, {filter: {_id: userId}})
        return await this.updateItem({
            $addToSet: {readings: bookId}
        }, {filter: {_id: userId}})
    }
    async finishReading(userId, bookId) {
        await this.updateItem({
            $pull: {readings: bookId}
        }, {filter: {_id: userId}})
        return await this.updateItem({
            $addToSet: {reads: bookId}
        }, {filter: {_id: userId}})
        

    }
}