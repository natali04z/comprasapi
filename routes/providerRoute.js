// routes/providerRoutes.js
import {Router} from 'express';
import {
  getProviders,
  getOneProvider,
  postProvider,
  putProvider,
  deleteProvider
} from '../controller/providerController.js';

const providerRouter = Router();

// Provider routes
providerRouter.get('/', getProviders);               // Get all providers
providerRouter.get('/:id', getOneProvider);         // Get provider by ID
providerRouter.post('/', postProvider);            // Create a new provider
providerRouter.put('/:id',putProvider);          // Update a provider
providerRouter.delete('/:id', deleteProvider);       // Delete a provider

export default providerRouter;
