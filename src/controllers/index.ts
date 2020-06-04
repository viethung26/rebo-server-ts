import UserController from "@c/crud/user"
import { ICrudService } from "@s/crud"
import ArticleController from "@c/crud/article"
import BookController from "@c/crud/book"
import CategoryController from "@c/crud/category"
import CommentController from "@c/crud/comment"

// 9779 improvement: auto inject
const userController = new UserController()
const bookController = new BookController()
const categoryController = new CategoryController()
const commentController = new CommentController()
const articleController = new ArticleController()

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
    ICrudService
}