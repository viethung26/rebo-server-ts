import { CrudRouter } from "@r/crud";
import { articleController, ArticleController } from "@c";
import {Request, Response} from '@r/base'
import { authenticateMiddleware, getQueryMiddleware } from "@mw";
import { IUserService, DIContainer, TYPES, ICrudService } from "@s";
export default class ArticleRouter extends CrudRouter <ArticleController> {
    constructor() {
        // 9779 improvement: auto inject
        super(articleController)
    }
    customRouter() {
        this.router.put("/like/:_id", authenticateMiddleware.run(), this.route(this.like))
        this.router.get("/profile/:username/", authenticateMiddleware.run(), this.route(this.getFeed))
        this.router.get("/book/:slug/", authenticateMiddleware.run(), getQueryMiddleware.run(), this.route(this.getBookArticle))
        this.router.get("/trending", authenticateMiddleware.run(), getQueryMiddleware.run(), this.route(this.getTrending))
    }
    async like(req: Request, res: Response) {
        const {_id} = req.params
        console.info('9779 like', _id)

        if (req.user) {
            const result = await this.controller.like({author: req.user._id}, {filter: {_id} })
            return this.onSuccess(res, result)
        }
        return this.onError(res, {
            message: "Login before Like",
            status: 301
        })
    }
    async getFeed(req: Request, res: Response) {
        const {username} = req.params
        const readUser = await DIContainer.get<IUserService>(TYPES.UserService).readItem({filter: {username}})
        console.info('9779 user', readUser)
        if (req.user && readUser) {
            const result = await this.controller.readAll({filter: {author: readUser._id}, populates: [{path: 'author'}, {path: 'book'}, {path: 'comments', populate: 'author'}], order: {createdAt: 'desc'}})
            return this.onSuccess(res, result)
        }
        return this.onError(res, {
            message: "Login before Like",
            status: 301
        })
    }
    async getBookArticle (req: Request, res: Response) {
        const {slug} = req.params
        if (req.user) {
            const readBook = await DIContainer.get<ICrudService>(TYPES.BookService).readItem({filter: {slug}})
            if (readBook) {
                const result = await this.controller.readAll({filter: {book: readBook._id}, populates: [{path: 'author'}, {path: 'book'}, {path: 'comments', populate: 'author'}], order: {updatedAt: 'asc'}})
                return this.onSuccess(res, result)
            }
            return this.onError(res, {
                message: "Can't find this book",
                status: 404
            })
        }
        return this.onError(res, {
            message: "Login before Like",
            status: 301
        })
    }
    async getTrending(req: Request, res: Response) {
        const result = await this.controller.readTrending()
        return this.onSuccess(res, result)
    }
}