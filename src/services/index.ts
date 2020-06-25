import UserService, {IUserService} from '@s/crud/user'
import ArticleService from '@s/crud/article'
import BookService, {IBookService} from '@s/crud/book'
import CommentService from '@s/crud/comment'
import CategoryService from '@s/crud/category'
import { Container } from 'inversify'
import { ICrudService } from '@s/crud'
import TokenService, { ITokenService } from '@s/token'
import RateService from './crud/rate'
import ItemService, { IItemService } from './crud/item'
export const TYPES = {
    UserService: Symbol.for('UserService'),
    ArticleService: Symbol.for('ArticleService'),
    BookService: Symbol.for('BookService'),
    CategoryService: Symbol.for('CategoryService'),
    CommentService: Symbol.for('CommentService'),
    RateService: Symbol.for('RateService'),
    ItemService: Symbol.for('ItemService'),
    TokenService: Symbol.for('TokenService')
}
const DIContainer = new Container()
DIContainer.bind<ITokenService>(TYPES.TokenService).to(TokenService)
DIContainer.bind<UserService>(TYPES.UserService).toConstantValue(new UserService())
DIContainer.bind<ArticleService>(TYPES.ArticleService).toConstantValue(new ArticleService())
DIContainer.bind<BookService>(TYPES.BookService).toConstantValue(new BookService())
DIContainer.bind<CategoryService>(TYPES.CategoryService).toConstantValue(new CategoryService())
DIContainer.bind<CommentService>(TYPES.CommentService).toConstantValue(new CommentService())
DIContainer.bind<RateService>(TYPES.RateService).toConstantValue(new RateService())
DIContainer.bind<ItemService>(TYPES.ItemService).toConstantValue(new ItemService())

export { DIContainer,
    ArticleService,
    BookService,
    CategoryService,
    CommentService,
    RateService,
    UserService, 
    ItemService,
    ICrudService,
    IUserService,
    IBookService,
    IItemService,
    ITokenService
}