import { addOrder } from '../couchdb/orderDB';
import { createOrder } from '../models/orderModel';
import { PaymentType } from '../models/paymentTypeModel';
import { DeliveryType } from '../models/deliveryTypeModel';

export default {

  // Create order
  async create(req, res, next) {
    if (!req.body.orderedProducts || !req.body.clientData || !req.body.deliveryType || (req.body.deliveryType === DeliveryType.SUPPLY && !req.body.deliveryAddress) || !req.body.paymentType ||
        (req.body.paymentType === PaymentType.DEFER && !req.body.financialData) || !req.body.orderValue || (req.body.deliveryCost == undefined) || !req.body.totalPrice || !req.body.riskValue || !req.body.orderStatus) {
      return res.status(400).send({ message: 'Required data missing' });
    }
    let newOrder = createOrder(req.body.orderedProducts, req.body.clientData, req.body.deliveryType, req.body.deliveryAddress, req.body.paymentType,
      req.body.financialData, req.body.comments, req.body.orderValue, req.body.deliveryCost, req.body.totalPrice, req.body.riskValue, req.body.orderStatus);
    let dbResponse = await addOrder(newOrder);
    console.log('api /addOrder -  ', dbResponse);
    if (dbResponse.success) {
      return res.status(201).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    } else {
      return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    }
  }

  // Find order
  // Find orders
  // Update order (status)
  // Delete order
}