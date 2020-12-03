import { v4 as uuid } from 'uuid';

function Order(orderedProducts, clientData, deliveryType, deliveryAddress, paymentType,
    financialData, comments, orderValue, deliveryCost, totalPrice, riskValue, orderDate, orderStatus) {
  this._id = uuid();
  this.orderedProducts = orderedProducts;
  this.clientData = clientData;
  this.deliveryType = deliveryType;
  this.deliveryAddress = deliveryAddress;
  this.paymentType = paymentType;
  this.paymentType = paymentType;
  this.financialData = financialData;
  this.comments = comments;
  this.orderValue = orderValue;
  this.deliveryCost = deliveryCost;
  this.totalPrice = totalPrice;
  this.riskValue = riskValue;
  this.orderDate = orderDate
  this.orderStatus = orderStatus;
}

export function createOrder(orderedProducts, clientData, deliveryType, deliveryAddress, paymentType, 
    financialData, comments, orderValue, deliveryCost, totalPrice, riskValue, orderDate, orderStatus) {
  return new Order(orderedProducts, clientData, deliveryType, deliveryAddress, paymentType,
    financialData, comments, orderValue, deliveryCost, totalPrice, riskValue, orderDate, orderStatus);
}