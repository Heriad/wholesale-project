import { Router } from 'express';
import { catchAsync } from '../utils/errors';
import usersController from '../controllers/usersController';

const api = Router();

export default () => {
    
    // POST /users
    api.post('/', catchAsync(usersController.create));

    // GET /users/:id w ogóle potrzebne? jednak potrzebne np. do edycji danego usera

    // GET /users  po typie
    api.get('/', catchAsync(usersController.getAll));


    
    // PUT /users/:id do aktyalizacji danych jego np mziana hasła, czy pracownika
    // DELETE /users/:id

    return api;
}