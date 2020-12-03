import { createClient } from '../models/clientModel';
import { addClient, getOneClient, getAllClients, updateClient, removeClient } from '../couchdb/clientDB';

export default {

  // Create client
  async create(req, res, next) {
    if (!req.body.name || !req.body.surname || !req.body.email || !req.body.password || !req.body.type) {
      return res.status(400).send({ message: 'Required data: name, surname, email, password, type' });
    }
    let newClient = createClient(req.body.name, req.body.surname, req.body.email, 
      req.body.password, req.body.companyName, req.body.regon, req.body.krs, req.body.type);
    let dbResponse = await addClient(newClient);
    console.log('api /addClient -  ', dbResponse);
    if (dbResponse.success) {
      return res.status(201).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    } else {
      return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    }
  },

  // Find client
  async getOne(req, res, next) {
    if (!req.params.id) {
      return res.status(400).send({ message: 'Required data: id' });
    }
    let dbResponse = await getOneClient(req.params.id);
    console.log('api /getOneClient - ', dbResponse);
    if (dbResponse.success) {
      return res.status(200).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    } else {
      return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    }
},


  // Find clients
  async getAll(req, res, next) {
    let dbResponse = await getAllClients();
    console.log('api /getAllClients - ', dbResponse);
    if (dbResponse.success) {
      return res.status(200).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    } else {
      return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    }
  },

  // Update client
  async update(req, res, next) {
    if (!req.params.id) {
      return res.status(400).send({ message: 'Required data: id' });
    }
    let dbResponse = await updateClient(req.params.id);
    if (dbResponse.success) {
      return res.status(200).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    } else {
      return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    }
  },

  // Delete client
  async remove(req, res, next) {
    if (!req.params.id) {
      return res.status(400).send({ message: 'Required data: id' });
    }
    let dbResponse = await removeClient(req.params.id);
    console.log('api /removeClient - ', dbResponse);
    if (dbResponse.success) {
      return res.status(200).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    } else {
      return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    }
  }

}
