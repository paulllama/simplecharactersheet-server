import express, { Express, Request } from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import http from 'http'
import https from 'https'
import cors from 'cors'
import dotenv from 'dotenv'

import { clerkMiddleware } from '@clerk/express'

import mongoose from 'mongoose'
import Models from "./models"
import { addRoutesToExpressApp } from './routes'

dotenv.config()
const port = process.env.PORT
const env = process.env.NODE_ENV

const app: Express = addRoutesToExpressApp(
    express()
        .use(cors<Request>())
        .use(bodyParser.json())
        .use(clerkMiddleware())
)
const createServer = env === 'local' ?
    () => https.createServer({
        key: fs.readFileSync('./cert/localhost.key'),
        cert: fs.readFileSync('./cert/localhost.crt'),
    }, app) :
    () => http.createServer(app)

const serve = async (): Promise<String | void> => {
    await mongoose.connect(Models.MONGO_CONNECTION_URI)
    createServer().listen(port, () => {
        console.log(`[server]: ${env} server is running on port ${port}`)
    })
}
serve().catch(console.error)
