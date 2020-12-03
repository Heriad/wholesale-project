import { PaymentType } from './../../models/payment-type.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformPaymentType'
})
export class TransformPaymentTypePipe implements PipeTransform {

  transform(paymentType: string, notifications): string {
    let newPaymentType: string;
    switch (paymentType) {
      case PaymentType.TRANSFER: {
        newPaymentType = notifications.ordersPreviewComponent.bankTransferStatus;
        break;
      }
      case PaymentType.RECEIPT: {
        newPaymentType = notifications.ordersPreviewComponent.receiptPaymentStatus;
        break;
      }
      case PaymentType.DEFER: {
        newPaymentType = notifications.ordersPreviewComponent.deferPaymentStatus;
        break;
      }
    }
    return newPaymentType;
  }

}
