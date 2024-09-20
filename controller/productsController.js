import Product from '../models/products.js';

// Method GET: Get all products
export async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Products do not exist' });
    }
}

// Method GET: Get a product by ID
export async function getOneProduct(req, res) {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error with product' });
    }
}

// Method POST: Create a new product
export async function postProduct(req, res) {
    const { name, category, price, stock, minimumStock } = req.body;
    let msg = 'Product created successfully';
    try {
        const newProduct = new Product({ name, category, price, stock, minimumStock });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        msg = 'Error creating product';
        res.status(500).json({ message: msg });
    }
}

// Method PUT: Update a product
export async function putProduct(req, res) {
    const { id } = req.params;
    const { name, category, price, stock, minimumStock } = req.body;
    let msg = 'Product updated successfully';
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, category, price, stock, minimumStock }, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product does not exist' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        msg = 'Error updating product';
        res.status(500).json({ message: msg });
    }
}

// Method DELETE: Delete a product
export async function deleteProduct(req, res) {
    const { id } = req.params;
    let msg = 'Product deleted successfully';
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: msg });
    } catch (error) {
        msg = 'Error deleting product';
        res.status(500).json({ message: msg });
    }
}
