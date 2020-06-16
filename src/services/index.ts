import UserService, {IUserService} from '@s/crud/user'
import ArticleService from '@s/crud/article'
import BookService from '@s/crud/book'
import CommentService from '@s/crud/comment'
import CategoryService from '@s/crud/category'
import { Container } from 'inversify'
import { ICrudService } from '@s/crud'
import TokenService, { ITokenService } from '@s/token'
export const TYPES = {
    UserService: Symbol.for('UserService'),
    ArticleService: Symbol.for('ArticleService'),
    BookService: Symbol.for('BookService'),
    CategoryService: Symbol.for('CategoryService'),
    CommentService: Symbol.for('CommentService'),
    TokenService: Symbol.for('TokenService')
}
const DIContainer = new Container()
DIContainer.bind<ITokenService>(TYPES.TokenService).to(TokenService)
DIContainer.bind<UserService>(TYPES.UserService).toConstantValue(new UserService())
DIContainer.bind<ArticleService>(TYPES.ArticleService).toConstantValue(new ArticleService())
DIContainer.bind<BookService>(TYPES.BookService).toConstantValue(new BookService())
DIContainer.bind<CategoryService>(TYPES.CategoryService).toConstantValue(new CategoryService())
DIContainer.bind<CommentService>(TYPES.CommentService).toConstantValue(new CommentService())

export { DIContainer,
    ArticleService,
    BookService,
    CategoryService,
    CommentService,
    UserService, 
    ICrudService,
    IUserService,
    ITokenService
}