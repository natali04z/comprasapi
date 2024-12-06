// routes/providerRoutes.js
import {Router} from 'express';
import {
  getdistribucion,
  getOnedistribucion,
  postdistibucion,
  putdistribucion,
  deletedistribucon
} from '../controller/distribucionController.js';

const distribucionRouter = Router();

// Provider routes
distribucionRouter.get('/', getdistribucion);               // Get all providers
distribucionRouter.get('/:id', getOnedistribucion);         // Get provider by ID
distribucionRouter.post('/', postdistibucion);            // Create a new provider
distribucionRouter.put('/:id',putdistribucion);          // Update a provider
distribucionRouter.delete('/:id', deletedistribucon);       // Delete a provider

export default distribucionRouter;
