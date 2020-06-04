import CrudController from "../crud";
import { DIContainer, TYPES, ICrudService, CommentService } from "@s";

export default class CommentController extends CrudController<ICrudService> {
    constructor() {
        super(DIContainer.get<CommentService>(TYPES.CommentService))
    }
}