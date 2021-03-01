import responseStatus from '../models/responseModel';
import couchdbConfig from '../../config/couchdbConfig';
import { checkIfDataAlreadyExists } from '../utils/util';
import { createResponseController } from '../controllers/responseController';

const nano = require('nano')(couchdbConfig.url);
const database = nano.db.use(couchdbConfig.dbProducts);

export async function addProduct(product, productImage) {
  let productExists = true;
  const selector = {
    name: product.name
  }
  try {
    productExists = await checkIfDataAlreadyExists(selector, database);
    if (productExists) {
      return createResponseController(responseStatus.INVALID, `Product ${product.name} already exists`, null);
    } else {
      await database.multipart.insert(product, [{ name: productImage.fieldname, data: productImage.buffer, content_type: productImage.mimetype }], product._id);
      return createResponseController(responseStatus.SUCCESS, 'The product has been created', product);
    }
  } catch (err) {
    return createResponseController(responseStatus.ERROR, err, null);
  }
}

export async function getOneProduct(id) {
  let product;
  try {
    await database.get(id).then(async (body) => {
      product = body;
      await database.attachment.get(product._id, 'productImage').then((el) => {
        product._attachments.productImage.buffer = el.toString('base64');
      });
    });
    if (product) {
      return createResponseController(responseStatus.SUCCESS, 'Product found', product);
    } else {
      return createResponseController(responseStatus.INVALID, 'Product not found', null);
    }
  } catch (err) {
      return createResponseController(responseStatus.ERROR, err, null);
  }
}

export async function getAllProducts(productList) {
  try {
    let data = [];
    await database.find({ selector: {} }).then(async (body) => {
      for (let doc of body.docs) {
        await database.attachment.get(doc._id, 'productImage').then((el) => {
          doc._attachments.productImage.buffer = el.toString('base64');
        });
        data.push(doc);
      }
    });
    return createResponseController(responseStatus.SUCCESS, 'All products found', data);
  } catch (err) {
      return createResponseController(responseStatus.ERROR, err, null);
  }
}

export async function updateProduct(updatedProduct, updatedImageProduct) {
  try {
    await database.multipart.insert(updatedProduct, [{ name: updatedImageProduct.fieldname, data: updatedImageProduct.buffer, content_type: updatedImageProduct.mimetype }], updatedProduct._id);
    return createResponseController(responseStatus.SUCCESS, 'Product has been updated', null);
  } catch (err) {
    return createResponseController(responseStatus.ERROR, err, null);
  }
}

export async function removeProduct(id) {
  try {
    const selector = {
      _id: id
    }
    let product;
    await database.find({ selector: selector }).then((body) => {
      product = body.docs[0];
    });
    if (product) {
      await database.destroy(product._id, product._rev);
      return createResponseController(responseStatus.SUCCESS, 'Product has been removed', null);
    } else {
      return createResponseController(responseStatus.INVALID, 'Product not found', null);
    }
  } catch (err) {
    return createResponseController(responseStatus.ERROR, err, null);
  }
}