import { CrudRouter } from "@r/crud";
import { commentController, CommentController } from "@c";
export default class CommentRouter extends CrudRouter <CommentController> {
    constructor() {
        // 9779 improvement: auto inject
        super(commentController)
    }
}