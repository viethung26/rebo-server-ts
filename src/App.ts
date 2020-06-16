import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import api from './routers'
import {config} from './config'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import Socket from './sockets'
class App {
    public app
    public io
    constructor() {
        this.app = express()
        this.initConfig()
        this.initMongo()
        this.initTracking()
        this.initRoutes()
    }
    private initConfig() {
        this.app.use(bodyParser.json())
        this.app.use(cookieParser())
    }
    private initTracking() {
        this.app.use(morgan('dev'))
    }
    private initRoutes() {
        this.app.use('/api', api)
    }
    private initMongo() {
        const mongo = config.database.mongo
        const mongoConfig = { 
            useFindAndModify: false, 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        }
        mongoose.connect(mongo, mongoConfig, () => {
            console.info('Mongodb connected')
        },)
    }
    private runSocket(server) {
        new Socket(server).run()
    }
    public run(port: number, callback: Function) {
        const server = this.app.listen(port, () => callback())
        this.runSocket(server)
        return server
    }
}


export default new App()