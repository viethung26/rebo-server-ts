import CrudController from "../crud";
import { DIContainer, TYPES, ICrudService, ArticleService } from "@s";
import { IArticleService } from "@s/crud/article";
import { ICrudOption } from "@s/crud";

export default class ArticleController extends CrudController<IArticleService> {
    constructor() {
        super(DIContainer.get<ArticleService>(TYPES.ArticleService))
    }
    async like(data, options: ICrudOption) {
        return await this.service.like(data, options)
    }
}