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
//     if (!req.query.name || !req.query.surname || !req.query.email || !req.query.password) {
//       console.debug('Brak danych');
//       return res.status(400).send({
//         err: 'Brak wymaganych danych'
//       });
//     }
//     let newUser = createUser(req.query.name, req.query.surname, req.query.email, 
//       req.query.password, req.query.companyName, req.query.regon, req.query.krs, req.query.type);
//     let dbResponse = await addUser(newUser);
//     if (dbResponse.success) {
//       return createResponseController(responseStatus.SUCCESS, dbResponse.data, dbResponse.message);
//     } else {
//       return createResponseController(responseStatus.ERROR, dbResponse.data, dbResponse.message);
//     }
//   }
// }

import { createResponseController } from './responseController';
import { createUser } from '../models/userModel';
import { addUser } from '../couchdb/userDB';
import responseStatus from '../models/responseModel';

export default {

  // Create User
  async create(req, res, next) {
    console.log('Test: ', req);
    console.log('Koniec req')
    if (!req.query.name || !req.query.surname || !req.query.email || !req.query.password) {
      console.debug('Brak danych');
      return res.status(400).send({
        err: 'Brak wymaganych danych'
      });
    }
    let newUser = createUser(req.query.name, req.query.surname, req.query.email, 
      req.query.password, req.query.companyName, req.query.regon, req.query.krs, req.query.type);
    let dbResponse = await addUser(newUser);
    console.log('Test res: ', dbResponse);
    if (dbResponse.success) {
      return createResponseController(responseStatus.SUCCESS, dbResponse.data, dbResponse.message);
    } else {
      return createResponseController(responseStatus.ERROR, dbResponse.data, dbResponse.message);
    }
    
  }

  // Find user
  // Find users
  // Delete user
  // Update user

}

