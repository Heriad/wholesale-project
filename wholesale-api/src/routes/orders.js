import { Router } from 'express';
import { catchAsync } from '../utils/errors';
import ordersController from '../controllers/ordersController';

const api = Router();

export default () => {

    // POST /orders
    api.post('/', catchAsync(ordersController.create));

    // GET /orders/:email
    api.get('/:email', catchAsync(ordersController.getForSpecificUser));

    // GET /orders
    api.get('/', catchAsync(ordersController.getAll));

    // PUT /orders/:id
    api.put('/:id', catchAsync(ordersController.changeStatus));

    // DELETE /orders/:id
    // api.delete('/:id', catchAsync(ordersController.remove));

    return api;
}