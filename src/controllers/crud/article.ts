import CrudController from "../crud";
import { DIContainer, TYPES, ICrudService, ArticleService } from "@s";

export default class ArticleController extends CrudController<ICrudService> {
    constructor() {
        super(DIContainer.get<ArticleService>(TYPES.ArticleService))
    }
}