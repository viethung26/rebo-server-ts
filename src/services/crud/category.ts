import { CrudService } from "../crud";
import { Category } from "@m/category";
import {injectable} from 'inversify'

@injectable()
export default class CategoryService extends CrudService<typeof Category> {
    constructor() {
        super(Category)
    }
}