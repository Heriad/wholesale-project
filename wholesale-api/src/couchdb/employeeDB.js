import { createResponseController } from '../controllers/responseController';
import { checkIfDataAlreadyExists } from '../utils/util';
import responseStatus from '../models/responseModel';
import couchdbConfig from '../../config/couchdbConfig';
import bcrypt from 'bcrypt';

const nano = require('nano')(couchdbConfig.url);
const database = nano.db.use(couchdbConfig.dbEmployees);

// Dodanie pracownika do bazy danych
export async function addEmployee(employee) {
    let employeeExists = true;
    const selector = {
        email: employee.email
    }
    try {
        employeeExists = await checkIfDataAlreadyExists(selector, database);
        if (employeeExists) {
            return createResponseController(responseStatus.INVALID, `Employee ${employee.email} already exists`, null);
        } else {
            const saltRounds = 10;
            employee.password = await bcrypt.hash(employee.password, saltRounds);
            await database.insert(employee);
            return createResponseController(responseStatus.SUCCESS, 'The employee has been created', employee);
        }
    } catch (err) {
        return createResponseController(responseStatus.ERROR, err, null);
    }
}

// Wyjęcie wszystkich pracowników z bazy danych
export async function getAllEmployees() {
    try {
        let data = [];
        await database.find({ selector: {} }).then((body) => {
            body.docs.forEach((doc) => {
                delete doc.password;
                data.push(doc);
            });
        });
        return createResponseController(responseStatus.SUCCESS, 'All employees found', data);
    } catch (err) {
        return createResponseController(responseStatus.ERROR, err, null);
    }
}

// Aktualizacja danych wybranego pracownika
export async function updateEmployee(employee) {
    try {
        await database.insert(employee);
        return createResponseController(responseStatus.SUCCESS, 'Employee has been updated', null);
    } catch (err) {
        return createResponseController(responseStatus.ERROR, err, null);
    }
}

// Usunięcie wybranego pracownika z bazy danych
export async function removeEmployee(id) {
    try {
        const selector = {
            _id: id
        }
        let employee;
        await database.find({ selector: selector }).then((body) => {
            employee = body.docs[0];
        });
        if (employee) {
            await database.destroy(employee._id, employee._rev);
            return createResponseController(responseStatus.SUCCESS, `Employee has been removed`, null);
        } else {
            return createResponseController(responseStatus.INVALID, 'Employee not found', null);
        }
    } catch (err) {
        return createResponseController(responseStatus.ERROR, err, null);
    }
}




