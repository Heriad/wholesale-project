import { createEmployee, updateEmployeeData } from '../models/employeeModel';
import { addEmployee, getAllEmployees, updateEmployee, removeEmployee } from '../couchdb/employeeDB';

export default {

    // Create employee
    async create(req, res, next) {
        if (!req.body.name || !req.body.surname || !req.body.email || !req.body.password || !req.body.workType || !req.body.type) {
            return res.status(400).send({ message: 'Required data: name, surname, email, password, workType, type' });
        }
        let newEmployee = createEmployee(req.body.name, req.body.surname, req.body.email, 
            req.body.password, req.body.workType, req.body.type);
        let dbResponse = await addEmployee(newEmployee);
        console.log('api /addEmployee', dbResponse);
        if (dbResponse.success) {
            return res.status(201).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        } else {
            return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        }
    },

    // Get employee


    // Get employees
    async getAll(req, res, next) {
        let dbResponse = await getAllEmployees();
        console.log('api /getAllEmployees', dbResponse);
        if (dbResponse.success) {
            return res.status(201).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        } else {
            return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        }
    },

    // Update employee
    async update(req, res, next) {
        if (!req.body.id || !req.body.rev || !req.body.name || !req.body.surname || !req.body.email || !req.body.password || !req.body.workType || !req.body.type) {
            return res.status(400).send({ message: 'Required data: id, rev, name, surname, email, password, workType, type' });
        }
        let updatedEmployee = updateEmployeeData(req.body.id, req.body.rev, req.body.name, req.body.surname, req.body.email,
             req.body.password, req.body.workType, req.body.type);
        let dbResponse = await updateEmployee(updatedEmployee);
        console.log('api /updateEmployee', dbResponse);
        if (dbResponse.success) {
            return res.status(201).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        } else {
            return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        }
    },

    // Remove employee
    async remove(req, res, next) {
        if (!req.params.id) {
            return res.status(400).send({ message: 'Required data: id' });
        }
        let dbResponse = await removeEmployee(req.params.id);
        console.log('api /removeEmployee', dbResponse);
        if (dbResponse.success) {
            return res.status(201).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        } else {
            return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        }
    }

}