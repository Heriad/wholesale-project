import { addProduct } from '../couchdb/productDB'; 
import { createProduct } from '../models/productModel';

export default {

    // Create products
    async create(req, res, next) {
        if (!req.body.name || !req.body.description || !req.body.price || !req.body.image || !req.body.producer || !req.body.timestamp) {
            return res.status(400).send({ message: 'Required data: name, description, price, image, producer, timestamp' });
        }
        let newProduct = createProduct(req.body.name, req.body.description, req.body.price, req.body.image, req.body.producer, req.body.timestamp);
        let dbResponse = await addProduct(newProduct);
        console.log('api /addProduct', dbResponse);
        if (dbResponse.success) {
            return res.status(201).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        } else {
            return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        }
    }

    // Get product
    // Get products
    // Update product
    // Remove product

}