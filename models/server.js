const express = require('express')
const dbConnect = require('../database/config')
require('../database/config')
const { getAllSuppliers, createSupplier, putSupplier, deleteSupplier } = require('../controller/suppliersController');

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3000
        this.listen()
        this.dbConecction()
        this.pathSupplier= '/api/exportation'
        this.route()
        
        
    }

    async dbConecction() {
        await dbConnect()
    }

    route() {
        this.app.use(express.json())
        this.app.get(this.pathSupplier,getAllSuppliers)
        this.app.post(this.pathSupplier,createSupplier)
        this.app.put(this.pathSupplier, putSupplier)
        this.app.delete(this.pathSupplier+'/:id',deleteSupplier)
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }
}

module.exports = Server