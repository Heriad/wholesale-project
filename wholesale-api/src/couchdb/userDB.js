import { createResponseController } from '../controllers/responseController';
import { userType } from '../models/userModel';
import couchdbConfig from '../../config/couchdbConfig';
import responseStatus from '../models/responseModel';
import bcrypt from 'bcrypt';

// Podłączenie nano do bazy danych
const nano = require('nano')(couchdbConfig.url);
const database = nano.db.use(couchdbConfig.dbUsers);

// Funkcja sprawdza czy dany element znajduje się już w bazie danych
async function checkIfDataAlreadyExists(selector) {
    let dbResponse = await database.find({ selector: selector });
    if (dbResponse && dbResponse.docs.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Dodanie użytkownika do bazy danych
export async function addUser(user) {
    let userExists = true;
    const selector = {
        email: user.email
    }
    try {
        userExists = await checkIfDataAlreadyExists(selector);
        if (userExists) {
            return createResponseController(responseStatus.INVALID, `User ${user.email} already exists`, null);
        } else {
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
            await database.insert(user);
            return createResponseController(responseStatus.SUCCESS, 'The user has been created', user);
        }
    } catch (err) {
        return createResponseController(responseStatus.ERROR, err, null);
    }
}

export async function getOneUser(id) {
    let user;
    try {
        await database.get(id).then((body) => {
            user = body;
        });
        if (user) {
            return createResponseController(responseStatus.SUCCESS, 'User found', user);
        } else {
            return createResponseController(responseStatus.INVALID, 'User not found', null);
        }
    } catch (err) {
        return createResponseController(responseStatus.ERROR, err, null);
    }
}

export async function getAllUsers(type) {
    try {
        let data = [];
        if (type != userType.ALL && type != userType.CLIENT && type != userType.EMPLOYEE) {
            return createResponseController(responseStatus.INVALID, `Incorrect type: ${type} selector`, null);
        } else if (type == userType.ALL) {
            await database.find({selector: {}}).then((body) => {
                body.docs.forEach((doc) => {
                    data.push(doc);
                });
            });
        } else {
            await database.find({selector: {type: type}}).then((body) => {
                body.docs.forEach((doc) => {
                    data.push(doc);
                });
            });
        }   
        return createResponseController(responseStatus.SUCCESS, `Users found of the given type: ${type}`, data);
    } catch (err) {
        return createResponseController(responseStatus.ERROR, err, null);
    }
}

export async function updateUser(id) {
    try {
        
    } catch (err) {

    }
}

export async function removeUser(id) {
    try {
        const selector = {
            _id: id
        }
        let user;
        await database.find({ selector: selector }).then((body) => {
            user = body.docs[0];
        });
        if (user) {
            await database.destroy(user._id, user._rev);
            return createResponseController(responseStatus.SUCCESS, `User has been removed`, null);
        } else {
            return createResponseController(responseStatus.INVALID, 'User not found', null);
        }
    } catch (err) {
        return createResponseController(responseStatus.ERROR, err, null);
    }
}
