import { Router } from 'express';
import { catchAsync } from '../utils/errors';
import clientsController from '../controllers/clientsController';

const api = Router();

export default () => {
  // POST /clients
  api.post('/', catchAsync(clientsController.create));

  // GET /clients/:id
  api.get('/:id', catchAsync(clientsController.getOne));

  // GET /clients
  api.get('/', catchAsync(clientsController.getAll));

  // PUT /clients/:id
  api.put('/:id', catchAsync(clientsController.update));

  // DELETE /clients/:id
  api.delete('/:id', catchAsync(clientsController.remove));

  return api;
}