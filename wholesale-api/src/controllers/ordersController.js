import { createOrder } from '../models/orderModel';
import { PaymentType } from '../models/paymentTypeModel';
import { DeliveryType } from '../models/deliveryTypeModel';
import { addOrder, getUserOrders, getAllOrders, changeOrderStatus } from '../couchdb/orderDB';

export default {

  // Create order
  async create(req, res, next) {
    if (!req.body.orderedProducts || !req.body.clientData || !req.body.deliveryType || (req.body.deliveryType === DeliveryType.SUPPLY && !req.body.deliveryAddress) || !req.body.paymentType ||
        (req.body.paymentType === PaymentType.DEFER && (!req.body.financialData || !req.body.numberOfInstallments || !req.body.riskValue)) || !req.body.orderValue || (req.body.deliveryCost == undefined) || !req.body.totalPrice ||
        !req.body.orderDate || !req.body.orderStatus) {
      return res.status(400).send({ message: 'Required data missing' });
    }
    let newOrder = createOrder(req.body.orderedProducts, req.body.clientData, req.body.deliveryType, req.body.deliveryAddress, req.body.paymentType, req.body.financialData,
      req.body.comments, req.body.orderValue, req.body.deliveryCost, req.body.numberOfInstallments, req.body.totalPrice, req.body.riskValue, req.body.orderDate, req.body.orderStatus);
    let dbResponse = await addOrder(newOrder);
    console.log('api /addOrder -  ', dbResponse);
    if (dbResponse.success) {
      return res.status(201).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    } else {
      return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    }
  },
  
  // Find order
  async getForSpecificUser(req, res, next) {
    if (!req.params.email) {
      return res.status(400).send({ message: 'Required data missing: email' });
    }
    let dbResponse = await getUserOrders(req.params.email);
    console.log('api /getUserOrders - ', dbResponse);
    if (dbResponse.success) {
      return res.status(200).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    } else {
      return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    }
  },

  // Find orders
  async getAll(req, res, next) {
    let dbResponse = await getAllOrders();
    console.log('api /getAllOrders - ', dbResponse);
    if (dbResponse.success) {
      return res.status(200).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    } else {
      return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    }
  },

  // Update order (status)
  async changeStatus(req, res, next) {
    if (!req.params.id || !req.body.status) {
      return res.status(400).send({ message: 'Required data: id, status' });
    }
    let dbResponse = await changeOrderStatus(req.params.id, req.body.status);
    console.log('api /changeOrderStatus - ', dbResponse);
    if (dbResponse.success) {
      return res.status(200).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    } else {
      return res.status(400).send({ success: dbResponse.success, message: dbResponse.message, data: dbResponse.data });
    }
  }

  // Delete order
}