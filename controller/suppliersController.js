const Supplier = require('../models/suppliers')

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find()
        res.status(200).json(suppliers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const postSupplier = async (req, res) => {
    try {
        const newSupplier = new Supplier(req.body)
        await newSupplier.save()
        res.status(201).json(newSupplier)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const putSupplier = async (req, res) => {
    try {
        const { id } = req.params
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedSupplier) {
            return res.status(404).json({ message: "Proveedor no encontrado" })
        }
        res.status(200).json(updatedSupplier)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params
        const deletedSupplier = await Supplier.findByIdAndDelete(id)
        if (!deletedSupplier) {
            return res.status(404).json({ message: "Proveedor no encontrado" })
        }
        res.status(200).json({ message: "Proveedor eliminado con éxito" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllSuppliers,
    postSupplier,
    putSupplier,
    deleteSupplier
}