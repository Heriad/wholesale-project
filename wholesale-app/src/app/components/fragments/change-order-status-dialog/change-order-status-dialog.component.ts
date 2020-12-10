import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderStatus } from './../../../models/order.model';
import { ApiUrlsService } from './../../../services/api-urls.service';

@Component({
  selector: 'app-change-order-status-dialog',
  templateUrl: './change-order-status-dialog.component.html',
  styleUrls: ['./change-order-status-dialog.component.scss']
})
export class ChangeOrderStatusDialogComponent implements OnInit {

  notifications;
  errorStatus: string;
  newStatus: OrderStatus;

  statusList = [
    OrderStatus.INPROGRESS,
    OrderStatus.COMPLETED,
    OrderStatus.CANCELED
  ];

  OrderStatus = OrderStatus;

  constructor(public api: ApiUrlsService, public matDialogRef: MatDialogRef<ChangeOrderStatusDialogComponent>) { }

  confirm() {
    if (this.newStatus) {
      this.matDialogRef.close(this.newStatus);
    } else {
      this.errorStatus = 'Nie wybrano statusu';
    }
  }

  ngOnInit(): void {
    this.notifications = this.api.getNotificationsPL();
  }

}
