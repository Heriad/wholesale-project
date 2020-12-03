import { PaymentType } from './payment-type.model';
import { DeliveryType } from './delivery-type.model';

export enum OrderStatus {
  NEW = 'new',
  INPROGRESS = 'inProgress',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

export class OrderedProducts {
  productId: string;
  quantity: number;
}

export class Order {
  orderedProducts: Array<OrderedProducts>;
  clientData: {
    name: string,
    surname: string,
    email: string,
    companyName: string,
    regon: number,
    krs: number
  };
  deliveryType: DeliveryType;
  deliveryAddress?: {
    streetAndNumber: string,
    postalCode: string,
    townName: string,
    country: string
  };
  paymentType: PaymentType;
  financialData?: {
    totalAssets: number,
    currentAssets: number,
    currentLiabilities: number,
    foreignCapital: number,
    netProfit: number,
    salesRevenue: number
  };
  comments?: string;
  orderValue: number;
  deliveryCost: number;
  totalPrice: number;
  riskValue?: number;
  orderDate: Date;
  orderStatus: OrderStatus;
}
