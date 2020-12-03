import { OrderStatus } from './../../models/order.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformOrderStatus'
})
export class TransformOrderStatusPipe implements PipeTransform {

  transform(status: string, notifications): string {
    let newStatus: string;
    switch (status) {
      case OrderStatus.NEW: {
        newStatus = notifications.ordersPreviewComponent.newStatus;
        break;
      }
      case OrderStatus.INPROGRESS: {
        newStatus = notifications.ordersPreviewComponent.inProgressStatus;
        break;
      }
      case OrderStatus.COMPLETED: {
        newStatus = notifications.ordersPreviewComponent.completedStatus;
        break;
      }
      case OrderStatus.CANCELED: {
        newStatus = notifications.ordersPreviewComponent.canceledStatus;
        break;
      }
    }
    return newStatus;
  }

}
