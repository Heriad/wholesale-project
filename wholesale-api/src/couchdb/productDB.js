
import { createResponseController } from '../controllers/responseController';
import  { checkIfDataAlreadyExists } from '../utils/util';
import couchdbConfig from '../../config/couchdbConfig';
import responseStatus from '../models/responseModel';


const nano = require('nano')(couchdbConfig.url);
const database = nano.db.use(couchdbConfig.dbProducts);

// TODO attachment użyć multipart
export async function addProduct(product) {
    let productExists = true;
    const selector = {
        name: product.name
    }
    try {
        productExists = await checkIfDataAlreadyExists(selector, database);
        if (productExists) {
            return createResponseController(responseStatus.INVALID, `Product ${product.name} already exists`, null);
        } else {
            await database.insert(product);
            return createResponseController(responseStatus.SUCCESS, 'The product has been created', product);
        }
    } catch (err) {
        return createResponseController(responseStatus.ERROR, err, null);
    }
}