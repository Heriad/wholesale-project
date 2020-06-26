import { Router } from 'express';
import { catchAsync } from '../utils/errors';
import employeesController from '../controllers';

const api = Router();

export default () => {

    // POST /employee
    api.post('/'. catchAsync(employeesController.create));

    // GET / employee/:id
    api.get('/:id'. catchAsync(employeesController.getOne));

    // GET /employees
    api.post('/'. catchAsync(employeesController.getAll));

    // PUT /employee/:id
    api.post('/:id'. catchAsync(employeesController.update));

    // DELETE /employee/:id
    api.post('/:id'. catchAsync(employeesController.remove));

    return api
}