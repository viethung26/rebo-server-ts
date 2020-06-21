import { CrudRouter } from "@r/crud";
import { bookController, BookController } from "@c";
import { authenticateMiddleware } from "@mw"
import {Request, Response} from '@r/base'

export default class BookRouter extends CrudRouter <BookController> {
    constructor() {
        // 9779 improvement: auto inject
        super(bookController)
    }
    customRouter() {
        this.router.get("/recommend", authenticateMiddleware.run(), this.route(this.recommend))
    }
    async recommend(req: Request, res: Response) {
        if (req.user) {
            const {categories = [], reads = [], readings = []} = req.user
            if (categories.length > 0) {
                const result = await this.controller.recommend(categories, [...readings, ...reads])
                return this.onSuccess(res, result)
            }
        }
        return this.onError(res, {
            message: "Add favorite genre before",
            status: 303
        })
    }
}