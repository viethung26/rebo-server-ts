import { CrudRouter } from "@r/crud";
import { categoryController, CategoryController } from "@c";
export default class CategoryRouter extends CrudRouter <CategoryController> {
    constructor() {
        // 9779 improvement: auto inject
        super(categoryController)
    }
}