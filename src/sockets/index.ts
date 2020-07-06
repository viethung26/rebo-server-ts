import socket from 'socket.io'
import { socketMiddleware } from '@mw'
import { TYPES, DIContainer, ICrudService } from '@s'
import { IArticleService } from '@s/crud/article'
export default class Socket {
    public io
    constructor(server) {
        this.io = socket.listen(server, {
            cookie: false
        })
    }
    run() {
        this.io.use(socketMiddleware.auth)
        this.io.on('connection', (socket) => {
            console.info('9779 connect', socket.id, socket.name)
            setTimeout(() => {
                socket.emit('data', 'adfadf')

            }, 2000)
            setTimeout(() => {
                socket.emit('data', 'adeddfadf')

            }, 5000)
            this.articleEvent(socket)
        })
    }

    articleEvent(socket) {
        socket.on('article-join', async data => {
            const {a_id, a_update} = data
            socket.join(a_id)
            socket.to(a_id).emit('data-'+a_id, 'mot thang vua vao '.concat(a_id," id:", socket.user._id ))
            const article = await DIContainer.get<IArticleService>(TYPES.ArticleService).readItem({filter: {_id: a_id}, populates: [{path: 'author'}, {path: 'book'}, {path: 'comments', populate: 'author'} ]})
            const newDate = new Date(article.updatedAt).getTime()
            const oldDate = new Date(a_update).getTime()
            if (newDate !== oldDate) {
                console.info('9779 send new')
                socket.emit(`update-${a_id}`, article)
            }
            // 9779 continue send new data for old
            
        })
        socket.on('article-leave', data => {
            const {a_id} = data
            socket.leave(data)
            socket.to(data).emit('data-'+a_id, 'mot thang vua ra '.concat(a_id," id:", socket.user._id ))
        })
        socket.on('article-like', async data => {
            const {a_id} = data
            console.info('9779 like article', a_id)
            const result = await DIContainer.get<IArticleService>(TYPES.ArticleService).like({author: socket.user._id}, {filter: {_id: a_id} })
            if (result) {
                socket.to(a_id).emit('like-'+a_id, socket.user._id)
            }
        })
        socket.on('article-comment', async data => {
            const {a_id, content} = data
            console.info('9779 comment article', a_id, content)
            const newComment = await DIContainer.get<ICrudService>(TYPES.CommentService).create({content, article: a_id, author: socket.user._id})
            if (newComment) {
                const comment = await DIContainer.get<ICrudService>(TYPES.CommentService).readItem({filter: {_id: newComment._id}, populates: [{path: 'author'}]})
                if (comment) socket.to(a_id).emit('comment-'+a_id, comment)
            }
        })
    }
}
