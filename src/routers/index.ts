import express from 'express'
import fs from 'fs'
import path from 'path'
import "reflect-metadata"

const route = express.Router()
const versions = fs.readdirSync(__dirname)

versions.forEach(version => {
    const versionDir = path.join(__dirname, version)
    if (fs.lstatSync(versionDir).isDirectory()) {
        const modules = fs.readdirSync(versionDir).filter(m => !m.startsWith("index"))
        const subRoute = express.Router()
        modules.forEach(module => {
            const {default: Router} = require(path.join(__dirname, version, module))
            // 9779 improvement: auto inject controller
            const router = new Router()
            subRoute.use(`/${module.split(".")[0]}`, router.router)
        })
        route.use(`/${version}`, subRoute)
    }
})

export default route