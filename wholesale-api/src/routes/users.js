import { Router } from 'express';
import usersController from '../controllers/usersController';

const api = Router();

export default () => {
    
    // POST /users
    api.post('/', usersController.create);


    // GET /users
    // GET /users/:id
    // PUT /users/:id
    // DELETE /users/:id

    return api;
}