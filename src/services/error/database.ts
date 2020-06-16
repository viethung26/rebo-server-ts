import BaseError from "./base";

export default class DatabaseErrorService {
    constructor(public error){}
    getStatus() {
        switch (this.error.code) {
            case 11000:
                return 409
            default: 
                return 500
        }
    }
    getErrorData() {
        const error = {
            status: this.getStatus(),
            message: "Database error"
        }
        return error
    }
}