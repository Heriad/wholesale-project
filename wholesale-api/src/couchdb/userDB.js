import { createResponseController } from '../controllers/responseController';
import responseStatus from '../models/responseModel';
import couchdbConfig from '../../config/couchdbConfig';

// Podłączenie nano do bazy danych
const nano = require('nano')(couchdbConfig.url);
const database = nano.db.use(couchdbConfig.dbName);

// Funkcja sprawdza czy dany element znajduje się już w bazie danych
async function checkIfDataAlreadyExists(viewName, key) {
    var dbResponse = await database.view(couchdbConfig.dbName, viewName, { key: key, reduce: false, include_docs: true });
    if (dbResponse && dbResponse.rows.length > 0) {
        return true;
    } else {
        return false;
    }
}

export async function addUser(user) {
    let userExists = true;
    try {
        console.log('UserExist: ', userExists);
        userExists = await checkIfDataAlreadyExists('users', user.email);
        if (userExists) {
            return createResponseController(responseStatus.INVALID, 'User' + user.email + 'already exists');
        } else {
            await database.insert(user);
            return createResponseController(responseStatus.SUCCESS)
        }
    } catch (err) {
        return createResponseController(responseStatus.ERROR, null, err);
    }
}
