import { CrudService } from "../crud";
import { Comment } from "@m/comment";
import {injectable} from 'inversify'

@injectable()
export default class CommentService extends CrudService<typeof Comment> {
    constructor() {
        super(Comment)
    }
}