import CrudController from "../crud";
import { DIContainer, TYPES, ICrudService, BookService } from "@s";

export default class BookController extends CrudController<ICrudService> {
    constructor() {
        super(DIContainer.get<BookService>(TYPES.BookService))
    }
}