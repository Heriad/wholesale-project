import { Router } from 'express';
import { catchAsync } from '../utils/errors';
import clientsController from '../controllers/clientsController';

const api = Router();

export default () => {
    
    // POST /client
    api.post('/', catchAsync(clientsController.create));

    // GET /client/:id
    api.get('/:id', catchAsync(clientsController.getOne));

    // GET /client
    api.get('/', catchAsync(clientsController.getAll));

    // PUT /client/:id
    api.put('/:id', catchAsync(clientsController.update));

    // DELETE /client/:id
    api.delete('/:id', catchAsync(clientsController.remove));

    return api;
}