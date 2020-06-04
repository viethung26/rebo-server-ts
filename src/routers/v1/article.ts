import { CrudRouter } from "@r/crud";
import { articleController, ArticleController } from "@c";
export default class ArticleRouter extends CrudRouter <ArticleController> {
    constructor() {
        // 9779 improvement: auto inject
        super(articleController)
    }
}