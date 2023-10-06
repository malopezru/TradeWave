import express, { Application } from 'express'
import cors from 'cors'
import { router } from '../routes/User'
import { db } from '../db/connection'
import { Subscriber } from '../controller/subscriber'

export class Server {
    private app: Application
    private port: number
    private apiPaths = {
        users: '/users'
    }
    private subscriber = new Subscriber()

    constructor() {
        this.app = express()
        this.port = 4000
        this.dbConnection()
        this.middlewares()
        this.routes()
        this.subscriber.sendUser()
    }

    async dbConnection() {
        try {
            await db.authenticate()
            console.log('Connected to mySQL Database')
        } catch (error) {
            throw new Error((error as Error).message as string)
        }
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.apiPaths.users, router)
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('User MS running in port ' + this.port )
        })
    }
}