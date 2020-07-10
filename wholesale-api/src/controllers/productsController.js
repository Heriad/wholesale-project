import { createProduct } from '../models/productModel';
import { addProduct, getOneProduct, getAllProducts, removeProduct } from '../couchdb/productDB'; 

export default {

    // Create products
    async create(req, res, next) {
        console.log('Request form-data: ', req.body);
        console.log('File form-data: ', req.file);
        if (!req.body.name || !req.body.description || !req.body.price || !req.file || !req.body.producer || !req.body.createdDate) {
            return res.status(400).send({ message: 'Required data: name, description, price, file, producer, createdDate' });
        }
        let newProduct = createProduct(req.body.name, req.body.description, req.body.price, req.body.producer, req.body.createdDate, req.body.image);
        let productImage = req.file;
        let dbResponse = await addProduct(newProduct, productImage);
        console.log('api /addProduct', dbResponse);
        if (dbResponse.success) {
            return res.status(201).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        } else {
            return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        }
    },
    
    // Get product
    async getOne(req, res, next) {
        if (!req.params.id) {
            return res.status(400).send({ message: 'Required data: id' });
        }
        let dbResponse = await getOneProduct(req.params.id);
        console.log('api /getOneProduct', dbResponse);
        if (dbResponse.success) {
            return res.status(201).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        } else {
            return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        }
    },

    // Get products
    async getAll(req, res, next) {
        let dbResponse = await getAllProducts();
        console.log('api /getAllProducts', dbResponse);
        if (dbResponse.success) {
            return res.status(201).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        } else {
            return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        }
    },

    // Update product TODO
    async update(req, res, next) {

    },

    // Remove product
    async remove(req, res, next) {
        if (!req.params.id) {
            return res.status(400).send({ message: 'Required data: id' });
        }
        let dbResponse = await removeProduct(req.params.id);
        console.log('api /removeProduct', dbResponse);
        if (dbResponse.success) {
            return res.status(201).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        } else {
            return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
        }
    }

}