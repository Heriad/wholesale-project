import responseStatus from '../models/responseModel';
import couchdbConfig from '../../config/couchdbConfig';
import { createResponseController } from '../controllers/responseController';

const nano = require('nano')(couchdbConfig.url);
const databaseClients = nano.db.use(couchdbConfig.dbClients);
const databaseEmployees = nano.db.use(couchdbConfig.dbEmployees);
const databaseAdmins = nano.db.use(couchdbConfig.dbAdmins);

export async function getUser(userEmail) {
  let user;
  const selector = {
    email: userEmail
  };
  try {
    await databaseClients.find({ selector: selector }).then((body) => {
      if (body.docs[0]) {
        user = body.docs[0];
      }
    });
    await databaseEmployees.find({ selector: selector }).then((body) => {
      if (body.docs[0]) {
        user = body.docs[0];
      }
    });
    await databaseAdmins.find({ selector: selector }).then((body) => {
      if (body.docs[0]) {
        user = body.docs[0];
      }
    });
    if (user) {
      return createResponseController(responseStatus.SUCCESS, 'User data', user); 
    } else {
      return createResponseController(responseStatus.INVALID, 'User data not found', null); 
    }
  } catch (err) {
    return createResponseController(responseStatus.ERROR, err, null);
  }
}