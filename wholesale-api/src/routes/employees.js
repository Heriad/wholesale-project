import { Router } from 'express';
import { catchAsync } from '../utils/errors';
import employeesController from '../controllers/employeesController';

const api = Router();

export default () => {

    // POST /employees
    api.post('/', catchAsync(employeesController.create));

    // GET /employees/:id
    api.get('/:id', catchAsync(employeesController.getOne));

    // GET /employees
    api.get('/', catchAsync(employeesController.getAll));

    // PUT /employees
    api.put('/', catchAsync(employeesController.update));

    // DELETE /employees/:id
    api.delete('/:id', catchAsync(employeesController.remove));

    return api
}