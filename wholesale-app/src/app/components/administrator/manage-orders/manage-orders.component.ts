import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { OrderStatus } from 'src/app/models/order.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeliveryType } from 'src/app/models/delivery-type.model';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { ApiResponse, GetOrdersResponse } from 'src/app/models/response.model';
import { ErrorsHandlerService } from 'src/app/services/errors-handler.service';
import { ConfirmationDialogComponent } from '../../fragments/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  notifications;

  OrderStatus = OrderStatus;
  DeliveryType = DeliveryType;
  dataSource = new MatTableDataSource();

  isLoading: boolean;
  displayedColumns: string[] = ['position', 'clientName', 'clientSurname', 'clientEmail', 'orderDate', 'deliveryInformation',
                                'totalPrice', 'status', 'orderDetails', 'cancelOrder'];

  constructor(public api: ApiUrlsService, public dialogService: MatDialog, public errHandler: ErrorsHandlerService) { }

  cancelOrder(id) {
    const dialogRef = this.dialogService.open((ConfirmationDialogComponent), {
      width: '500px',
      disableClose: true
    });
    dialogRef.componentInstance.title = 'Potwierdź';
    dialogRef.componentInstance.content = 'Czy jesteś pewny? Potwierdzenie spowoduje anulowanie zamówienia.';
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.updateOrderStatus(id, OrderStatus.CANCELED).subscribe((res: ApiResponse) => {
          if (res.success) {
            this.getOrders();
          }
        });
      }
    });
  }

  getOrders() {
    this.isLoading = true;
    this.api.getOrders().subscribe((res: GetOrdersResponse) => {
      if (res.success) {
        this.dataSource.data = res.data;
        this.isLoading = false;
      }
    }, () => {
      const errorBar = this.errHandler.openErrorBar('Wystąpił błąd');
      errorBar.onAction().subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  ngOnInit(): void {
    this.notifications = this.api.getNotificationsPL();
    this.getOrders();
  }

}
