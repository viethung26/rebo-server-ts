import { CrudService } from "../crud";
import { Article } from "@m/article";
import {injectable} from 'inversify'

@injectable()
export default class ArticleService extends CrudService<typeof Article> {
    constructor() {
        super(Article)
    }
}