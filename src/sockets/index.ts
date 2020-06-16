import socket from 'socket.io'
import { socketMiddleware } from '@mw'
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

            socket.on('connect', fn => {
                fn("sss")
            })
            socket.on('disconnect', fn => {
                console.info('9779 dis')
            })
            socket.on('message', (data, fn) => {
                console.info('9779 message', data)
                fn("xx")
            })
        })
    }

    articleEvent(socket) {
        socket.on('article-join', data => {
            const {a_id, a_update} = data
            console.info('9779 data', a_update)
            socket.join(a_id)
            // 9779 continue send new data for old
            socket.to(a_id).emit('data-'+a_id, 'mot thang vua vao '.concat(a_id," id:", socket.user._id ))
        })
        socket.on('article-leave', data => {
            socket.leave(data)
            socket.to(data).emit('data-'+data, 'mot thang vua ra '.concat(data," id:", socket.user._id ))
        })
        socket.on('article-like', data => {
            console.info('9779 like article', data)
            socket.in(data).emit('like-'+data, socket.user._id)
        })
    }
}
