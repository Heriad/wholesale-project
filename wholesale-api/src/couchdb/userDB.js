import { createResponseController } from '../controllers/responseController';
import responseStatus from '../models/responseModel';
import couchdbConfig from '../../config/couchdbConfig';

// Podłączenie nano do bazy danych
const nano = require('nano')(couchdbConfig.url);
const database = nano.db.use(couchdbConfig.dbUsers);

// Funkcja sprawdza czy dany element znajduje się już w bazie danych
async function checkIfDataAlreadyExists(key) {
    let dbResponse = await database.find({selector: {email: key}});
    if (dbResponse && dbResponse.docs.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Dodanie użytkownika do bazy danych
export async function addUser(user) {
    let userExists = true;
    try {
        userExists = await checkIfDataAlreadyExists(user.email);
        if (userExists) {
            return createResponseController(responseStatus.INVALID, `User ${user.email} already exists`, null);
        } else {
            await database.insert(user);
            return createResponseController(responseStatus.SUCCESS, 'The user has been created', user);
        }
    } catch (err) {
        return createResponseController(responseStatus.ERROR, err, null);
    }
}
