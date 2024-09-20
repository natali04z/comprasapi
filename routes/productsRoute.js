// routes/productRoutes.js
import {Router} from 'express';
import {
  getProducts,
  getOneProduct,
  postProduct,
  putProduct,
  deleteProduct
} from '../controller/productsController.js';

const productRouter = Router();

// Rutas de productos
productRouter.get('/', getProducts);             // Obtener todos los productos
productRouter.get('/:id', getOneProduct)
productRouter.post('/', postProduct);           // Crear un nuevo producto
productRouter.put('/:id', putProduct);         // Actualizar un producto
productRouter.delete('/:id', deleteProduct);      // Eliminar un producto

export default productRouter;
