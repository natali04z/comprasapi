const express = require('express')
const dbConnect = require('../database/config')
const { getAllSuppliers, createSupplier, putSupplier, deleteSupplier } = require('../controller/suppliersController')

class Server {
    constructor() {
        this.app = express()
        this.pathSupplier = '/api/supplier'
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
        this.app.listen(process.env.PORT, () => {
            console.log('Server is running')

        })
    }
}

module.exports = Server