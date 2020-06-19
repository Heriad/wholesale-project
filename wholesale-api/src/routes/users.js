import { Router } from 'express';
import { catchAsync } from '../utils/errors';
import usersController from '../controllers/usersController';

const api = Router();

export default () => {
    
    // POST /users
    api.post('/', catchAsync(usersController.create));


    // GET /users
    // GET /users/:id
    // PUT /users/:id
    // DELETE /users/:id

    return api;
}