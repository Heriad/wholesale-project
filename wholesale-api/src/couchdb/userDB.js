const responseController = require('../controllers/responseController');
const responseStatus = require('../models/responseModel');

const dbConfig = require('config').get('database.settings');
const dbConnectionUrl = dbConfig.scheme + "://" + dbConfig.username + ":" + dbConfig.password + "@" + dbConfig.host + ":" + dbConfig.port;
const nano = require('nano')(dbConnectionUrl);
const database = nano.db.use(dbConfig.dbName);

// Funkcja sprawa czy dany element znajduje się już w bazie danych
async function checkIfDataAlreadyExists(viewName, key) {
    var dbResponse = await database.view(dbConfig.dbName, viewName, { key: key, reduce: false, include_docs: true });
    if (dbResponse && dbResponse.rows.length > 0) {
        return true;
    } else {
        return false;
    }
}

async function addUser(user) {
    var userExists = true;
    try {
        userExists = await checkIfDataAlreadyExists('users', user.email);
        if (userExists) {
            return responseController.createResponseController(responseStatus.INVALID, 'User' + user.email + 'already exists');
        } else {
            await database.insert(user);
            return responseController.createResponseController(responseStatus.SUCCESS)
        }
    } catch (err) {
        return responseController.createResponseController(responseStatus.ERROR, null, err);
    }
}

module.exports.addUser = addUser;