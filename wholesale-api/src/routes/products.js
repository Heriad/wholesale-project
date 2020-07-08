import { Router } from 'express';
import { catchAsync } from '../utils/errors';
import productsController from '../controllers/productsController';

const api = Router();

export default () => {

    // POST /products
    api.post('/', catchAsync(productsController.create));

    // GET /products/:id
    api.get('/:id', catchAsync(productsController.getOne));
    
    // GET /products
    api.get('/', catchAsync(productsController.getAll));

    // PUT /products/:id
    api.put('/:id', catchAsync(productsController.update));

    // DELETE /products/:id
    api.delete('/:id', catchAsync(productsController.remove));

    return api
}