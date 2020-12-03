import bcrypt from 'bcrypt';
import responseStatus from '../models/responseModel';
import couchdbConfig from '../../config/couchdbConfig';
import { checkIfDataAlreadyExists } from '../utils/util';
import { createResponseController } from '../controllers/responseController';

// Podłączenie nano do bazy danych
const nano = require('nano')(couchdbConfig.url);
const database = nano.db.use(couchdbConfig.dbClients);

// Dodanie klienta do bazy danych
export async function addClient(client) {
  let clientExists = true;
  const selector = {
    email: client.email
  }
  try {
    clientExists = await checkIfDataAlreadyExists(selector, database);
    if (clientExists) {
      return createResponseController(responseStatus.INVALID, `Client ${client.email} already exists`, null);
    } else {
      const saltRounds = 10;
      client.password = await bcrypt.hash(client.password, saltRounds);
      await database.insert(client);
      return createResponseController(responseStatus.SUCCESS, 'The client has been created', client);
    }
  } catch (err) {
    return createResponseController(responseStatus.ERROR, err, null);
  }
}

export async function getOneClient(id) {
  let client;
  try {
    await database.get(id).then((body) => {
      delete body.password;
      client = body;
    });
    if (client) {
      return createResponseController(responseStatus.SUCCESS, 'Client found', client);
    } else {
      return createResponseController(responseStatus.INVALID, 'Client not found', null);
    }
  } catch (err) {
    return createResponseController(responseStatus.ERROR, err, null);
  }
}

export async function getAllClients() {
  try {
    let data = [];
    await database.find({ selector: {} }).then((body) => {
      body.docs.forEach((doc) => {
        delete doc.password;
        data.push(doc);
      });
    });
    return createResponseController(responseStatus.SUCCESS, 'All clients found', data);
  } catch (err) {
    return createResponseController(responseStatus.ERROR, err, null);
  }
}

//TODO
export async function updateClient(id) {
  try {
      
  } catch (err) {

  }
}

export async function removeClient(id) {
  try {
    const selector = {
      _id: id
    }
    let client;
    await database.find({ selector: selector }).then((body) => {
      client = body.docs[0];
    });
    if (client) {
      await database.destroy(client._id, client._rev);
      return createResponseController(responseStatus.SUCCESS, `Client has been removed`, null);
    } else {
      return createResponseController(responseStatus.INVALID, 'Client not found', null);
    }
  } catch (err) {
    return createResponseController(responseStatus.ERROR, err, null);
  }
}
