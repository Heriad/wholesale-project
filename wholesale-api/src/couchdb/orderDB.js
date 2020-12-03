import responseStatus from '../models/responseModel';
import couchdbConfig from '../../config/couchdbConfig';
import { createResponseController } from '../controllers/responseController';

const nano = require('nano')(couchdbConfig.url);
const database = nano.db.use(couchdbConfig.dbOrders);

export async function addOrder(order) {
  try {
    await database.insert(order);
    return createResponseController(responseStatus.SUCCESS, 'The order has been created', order);
  } catch (err) {
    return createResponseController(responseStatus.ERROR, err, null);
  }
}