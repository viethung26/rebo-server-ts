import { CrudRouter } from "@r/crud";
import { articleController, ArticleController } from "@c";
import {Request, Response} from '@r/base'
import { authenticateMiddleware } from "@mw";
export default class ArticleRouter extends CrudRouter <ArticleController> {
    constructor() {
        // 9779 improvement: auto inject
        super(articleController)
    }
    customRouter() {
        this.router.put("/like/:_id", authenticateMiddleware.run(), this.route(this.like))
    }
    async like(req: Request, res: Response) {
        const {_id} = req.params
        console.info('9779 like', _id)

        if (req.user) {
            const result = await this.controller.like({author: req.user._id}, {filter: {_id} })
            console.info('9779 result', result)
            return this.onSuccess(res, result)
        }
        return this.onError(res, {
            message: "Login before Like",
            status: 301
        })
    }
}