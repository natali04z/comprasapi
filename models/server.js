const express = require('express')
const dbConnect = require('../database/config')
const { getAllSuppliers, createSupplier, putSupplier, deleteSupplier } = require('../controller/suppliersController')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3001
        this.host = process.env.HOST || '127.0.0.1'
        this.pathSupplier = '/api/exportation'

        this.listen()
        this.dbConecction()
        this.route()
    }

    async dbConecction() {
        await dbConnect()
    }

    route() {
        this.app.use(express.json())
        this.app.get(this.pathSupplier, getAllSuppliers)
        this.app.post(this.pathSupplier, createSupplier)
        this.app.put(this.pathSupplier + '/:id', putSupplier)
        this.app.delete(this.pathSupplier + '/:id', deleteSupplier)
    }

    listen() {
        this.app.listen(this.port, this.host, () => {
            console.log(`The server is running at http://${this.host}:${this.port}`)
        })
    }
}

module.exports = Server