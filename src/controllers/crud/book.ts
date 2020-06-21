import CrudController from "../crud";
import { DIContainer, TYPES, BookService, IBookService } from "@s";

export default class BookController extends CrudController<IBookService> {
    constructor() {
        super(DIContainer.get<BookService>(TYPES.BookService))
    }
    async recommend(categories: string[], reads: string[]) {
        return await this.service.recommend(categories, reads)
    }
}