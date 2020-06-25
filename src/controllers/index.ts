import UserController from "@c/crud/user"
import { ICrudService } from "@s/crud"
import ArticleController from "@c/crud/article"
import BookController from "@c/crud/book"
import CategoryController from "@c/crud/category"
import CommentController from "@c/crud/comment"
import RateController from "./crud/rate"
import ItemController from "./crud/item"

// 9779 improvement: auto inject
const userController = new UserController()
const bookController = new BookController()
const categoryController = new CategoryController()
const commentController = new CommentController()
const rateController = new RateController()
const articleController = new ArticleController()
const itemController = new ItemController()

export {
    userController,
    UserController,
    articleController,
    ArticleController,
    categoryController,
    CategoryController,
    bookController,
    BookController,
    commentController,
    CommentController,
    rateController,
    RateController,
    itemController,
    ItemController,
    ICrudService
}