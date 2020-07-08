
import { createResponseController } from '../controllers/responseController';
import couchdbConfig from '../../config/couchdbConfig';
import responseStatus from '../models/responseModel';

const nano = require('nano')(couchdbConfig.url);
const database = nano.db.use(couchdbConfig.dbProducts);

export async function addProduct(product) {
    try {
        // TODO
        console.log('Product: ', product);
        await database.insert(product);
        return createResponseController(responseStatus.SUCCESS, 'The product has been created', product);
    } catch (err) {
        return createResponseController(responseStatus.ERROR, err, null);
    }
}