import { DeliveryType } from './delivery-type.model';
import { WorkType } from './employee.model';
import { OrderedProducts, OrderStatus } from './order.model';
import { PaymentType } from './payment-type.model';
import { UserRole } from './user-role.model';

export class ApiResponse {
  success: boolean;
  message: string;
  data: object;
}

export class GetEmployeesResponse {
  success: boolean;
  message: string;
  data: Array<{
    _id: string;
    _rev: string;
    name: string;
    surname: string;
    password: string;
    email: string;
    type: UserRole;
    workType: WorkType
  }>;
}

export class GetProductsResponse {
  success: boolean;
  message: string;
  data: Array<{
    _id: string;
    _rev: string;
    _attachments: any;
    name: string;
    description: string;
    price: number;
    producer: string;
    createdDate: Date;
  }>;
}

export class GetProductResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    _rev: string;
    _attachments: any;
    name: string;
    description: string;
    price: number;
    producer: string;
    createdDate: Date;
  };
}

export class GetOrdersResponse {
  success: boolean;
  message: string;
  data: Array<{
    _id: string;
    _rev: string;
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
  }>;
}
