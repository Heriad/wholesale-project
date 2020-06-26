import { createEmployee, getAllEmployees } from '../couchdb/employeeDB';


export default {

    // Create employee
    async create(req, res, next) {
        if (!req.body.name || !req.body.surname || !req.body.email || !req.body.password || !req.body.workType) {
            return res.status(400).send({ message: 'Required data missing: name, surname, email, password, workType' })
        }
        let newEmployee = createEmployee(req.body.name, req.body.surname, req.body.email, 
            req.body.password, req.body.workType);
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


    // Remove employee


}