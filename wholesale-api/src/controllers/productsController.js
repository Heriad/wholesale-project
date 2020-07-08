

export default {

    // Create products
    async create(req, res, next) {
        if (!req.body.name || !req.body.description || !req.body.price || !req.body.image || !req.body.producer || !req.body.timestamp) {
            return res.status(400).send({ message: 'Required data: name, description, price, image, producer, timestamp' });
        }
        
    }

    // Get product
    // Get products
    // Update product
    // Remove product

}