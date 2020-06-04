import CrudController from "../crud";
import { DIContainer, TYPES, ICrudService, CategoryService } from "@s";

export default class CategoryController extends CrudController<ICrudService> {
    constructor() {
        super(DIContainer.get<CategoryService>(TYPES.CategoryService))
    }
}