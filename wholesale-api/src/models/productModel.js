import { v4 as uuid } from 'uuid';

function Product(name, description, price, image, producer, timestamp) {
    this._id = uuid();
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.producer = producer;
    this.timestamp = timestamp;
}

export function createProduct(name, description, price, image, producer, timestamp) {
    return new Product(name, description, price, image, producer, timestamp)
}