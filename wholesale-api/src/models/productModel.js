import { v4 as uuid } from 'uuid';
import moment from 'moment';

function Product(name, description, price, image, producer, createdDate) {
    this._id = uuid();
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.producer = producer;
    this.createdDate = moment(createdDate).format('DD/MM/YYYY');
}

export function createProduct(name, description, price, image, producer, createdDate) {
    return new Product(name, description, price, image, producer, createdDate)
}