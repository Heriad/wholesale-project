import { createResponseController } from '../controllers/responseController';
import responseStatus from '../models/responseModel';
import couchdbConfig from '../../config/couchdbConfig';
import bcrypt from 'bcrypt';

const nano = require('nano')(couchdbConfig.url);
const database = nano.db.use(couchdbConfig.dbEmployees);

// Funkcja sprawdza czy dany element znajduje się już w bazie danych
async function checkIfDataAlreadyExists(selector) {
    let dbResponse = await database.find({ selector: selector });
    if (dbResponse && dbResponse.docs.length > 0) {
        return true;
    } else {
        return false;
    }
}


// Dodanie pracownika do bazy danych
export async function addEmployee(employee) {
    let employeeExists = true;
    const selector = {
        email: employee.email
    }
    try {
        employeeExists = await checkIfDataAlreadyExists(selector);
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
        await database.find({selector: {}}).then((body) => {
            body.docs.forEach((doc) => {
                data.push(doc);
            });
        });
        return createResponseController(responseStatus.SUCCESS, 'All employees found', data);
    } catch (err) {
        return createResponseController(responseStatus.ERROR, err, null);
    }
}




