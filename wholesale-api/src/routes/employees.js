import { Router } from 'express';
import { catchAsync } from '../utils/errors';
import employeesController from '../controllers/employeesController';

const api = Router();

export default () => {

    // POST /employee
    api.post('/', catchAsync(employeesController.create));

    // GET / employee/:id
    api.get('/:id', catchAsync(employeesController.getOne));

    // GET /employees
    api.get('/', catchAsync(employeesController.getAll));

    // PUT /employee/:id
    api.put('/:id', catchAsync(employeesController.update));

    // DELETE /employee/:id
    api.delete('/:id', catchAsync(employeesController.remove));

    return api
}