import express, {json} from 'express'
import dbConnect from '../database/config.js'
import '../database/config.js'
import providerRouter from '../routes/providerRoute.js'
import productRouter from '../routes/productsRoute.js'
import cors from 'cors'

class Server {
    constructor() {
        this.app = express()
        this.listen()
        this.dbConecction()
        this.pathProvider = '/api/provider'
        this.pathProduct = '/api/product'
        this.route()
    }

    async dbConecction() {
        await dbConnect()
    }

    route() {
        this.app.use(json())
        this.app.use(cors())
        this.app.use(this.pathProvider, providerRouter)
        this.app.use(this.pathProduct, productRouter)

    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Server is running')

        })
    }
}

export default Server