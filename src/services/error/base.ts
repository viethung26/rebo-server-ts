export interface IErrorData {
    message: string
    type?: string
    code?: number
}
export default class BaseError extends Error {
    constructor(public error: IErrorData){
        super()
    }
    toJSON() {
        return this.error
    }

}