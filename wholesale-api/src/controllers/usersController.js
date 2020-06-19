// const database = require('../couchdb/userDB');
// const responseController = require('./responseController');
// const responseStatus = require('../models/responseModel');

// import { createResponseController } from './responseController.js';
// import { createUser } from '../models/userModel.js';
// import { addUser } from '../couchdb/userDB.js';

// const User = require('../models/userModel');

// class UserController {
//   constructor() {
//     this.database = database;
//   }

//   async createUser(newUser) {
//     let dbResponse = await database.addUser(newUser);
//     if (dbResponse.success) {
//       return responseController.createResponseController(responseStatus.SUCCESS, dbResponse.data, dbResponse.message);
//     } else {
//       return responseController.createResponseController(responseStatus.ERROR, dbResponse.data, dbResponse.message);
//     }
//   }
// }

// module.exports = UserController;

// export default {

//   async create(req, res, next) {
//     if (!req.body.name || !req.body.surname || !req.body.email || !req.body.password) {
//       console.debug('Brak danych');
//       return res.status(400).send({
//         err: 'Brak wymaganych danych'
//       });
//     }
//     let newUser = createUser(req.body.name, req.body.surname, req.body.email, 
//       req.body.password, req.body.companyName, req.body.regon, req.body.krs, req.body.type);
//     let dbResponse = await addUser(newUser);
//     if (dbResponse.success) {
//       return createResponseController(responseStatus.SUCCESS, dbResponse.data, dbResponse.message);
//     } else {
//       return createResponseController(responseStatus.ERROR, dbResponse.data, dbResponse.message);
//     }
//   }
// }


import { createUser } from '../models/userModel';
import { addUser } from '../couchdb/userDB';

export default {

  // Create User
  async create(req, res, next) {
    if (!req.body.name || !req.body.surname || !req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Required data missing' });
    }
    let newUser = createUser(req.body.name, req.body.surname, req.body.email, 
      req.body.password, req.body.companyName, req.body.regon, req.body.krs, req.body.type);
    let dbResponse = await addUser(newUser);
    console.log('/apiCreateUser -  ', dbResponse);
    if (dbResponse.success) {
      return res.status(201).send({ success: dbResponse.success, data: dbResponse.data, message: dbResponse.message });
    } else {
      return res.status(400).send({ success: dbResponse.success, data: dbResponse.data, message: dbResponse.message });
    }
  }

  // Find user
  // Find users
  // Delete user
  // Update user

}

