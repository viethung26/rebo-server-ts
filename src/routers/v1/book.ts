import { CrudRouter } from "@r/crud";
import { bookController, BookController } from "@c";
export default class BookRouter extends CrudRouter <BookController> {
    constructor() {
        // 9779 improvement: auto inject
        super(bookController)
    }
}