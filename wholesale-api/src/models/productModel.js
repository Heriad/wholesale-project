import { v4 as uuid } from 'uuid';
import moment from 'moment';

function Product(name, description, price, producer, createdDate) {
    this._id = uuid();
    this.name = name;
    this.description = description;
    this.price = price;
    this.producer = producer;
    this.createdDate = moment(Number(createdDate)).format('DD/MM/YYYY');
}

function UpdatedProduct(id, rev, name, description, price, producer, createdDate) {
    this._id = id,
    this._rev = rev,
    this.name = name,
    this.description = description,
    this.price = price,
    this.producer = producer,
    this.createdDate = createdDate
}

export function createProduct(name, description, price, producer, createdDate) {
    return new Product(name, description, price, producer, createdDate)
}

export function updateProductData(id, rev, name, description, price, producer, createdDate) {
    return new UpdatedProduct(id, rev, name, description, price, producer, createdDate)
}