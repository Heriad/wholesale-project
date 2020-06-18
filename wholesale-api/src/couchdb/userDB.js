import { createResponseController } from '../controllers/responseController';
import responseStatus from '../models/responseModel';
import couchdbConfig from '../../config/couchdbConfig';

// Podłączenie nano do bazy danych
const nano = require('nano')(couchdbConfig.url);
const database = nano.db.use(couchdbConfig.dbName);

// Funkcja sprawdza czy dany element znajduje się już w bazie danych
async function checkIfDataAlreadyExists(viewName, key) {
    console.log('tu1', database);
    let dbResponse = await database.view('users', viewName, { key: key, reduce: false, include_docs: true });
    console.log('tu2')
    if (dbResponse && dbResponse.rows.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Dodanie użytkownika do bazy danych
export async function addUser(user) {
    let userExists = true;
    try {
        userExists = await checkIfDataAlreadyExists('users', user.email);
        console.log('UserExist: ', userExists);
        if (userExists) {
            return createResponseController(responseStatus.INVALID, 'User' + ' ' + user.email + ' ' + 'already exists');
        } else {
            await database.insert(user);
            return createResponseController(responseStatus.SUCCESS)
        }
    } catch (err) {
        return createResponseController(responseStatus.ERROR, null, err);
    }
}
