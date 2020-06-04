import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import api from './routers'
import {config} from './config'
import mongoose from 'mongoose'
class App {
    public app
    constructor() {
        this.app = express()
        this.initConfig()
        this.initMongo()
        this.initTracking()
        this.initRoutes()
    }
    private initConfig() {
        this.app.use(bodyParser.json())
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
}


export default new App().app