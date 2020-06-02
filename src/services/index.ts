import UserService from './crud/user'
import { Container } from 'inversify'

export const TYPES = {
    UserService: Symbol.for('UserService')
}
const DIContainer = new Container()

DIContainer.bind<UserService>(TYPES.UserService).toConstantValue(new UserService())

export { DIContainer }