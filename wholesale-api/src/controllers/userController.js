const database = require('../couchdb/userDB');
const responseController = require('./responseController');
const responseStatus = require('../models/responseModel');


class UserController {
  constructor() {
    this.database = database;
  }

  async createUser(newUser) {
    let dbResponse = await database.addUser(newUser);
    if (dbResponse.success) {
      return responseController.createResponseController(responseStatus.SUCCESS, dbResponse.data, dbResponse.message);
    } else {
      return responseController.createResponseController(responseStatus.ERROR, dbResponse.data, dbResponse.message);
    }
  }
}

module.exports = UserController;