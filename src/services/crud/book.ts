import { CrudService } from "../crud";
import { Book } from "@m/book";
import {injectable} from 'inversify'

@injectable()
export default class BookService extends CrudService<typeof Book> {
    constructor() {
        super(Book)
    }
}