import { Router } from 'express';
import { catchAsync } from '../utils/errors';
import usersController from '../controllers/usersController';

const api = Router();

export default () => {
    
    // POST /users
    api.post('/', catchAsync(usersController.create));

    // GET /users/:id
    api.get('/:id', catchAsync(usersController.getOne));

    // GET /users
    api.get('/', catchAsync(usersController.getAll));

    // PUT /users/:id
    api.put('/:id', catchAsync(usersController.update));

    // DELETE /users/:id
    api.delete('/:id', catchAsync(usersController.remove));

    return api;
}