import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { Order, OrderStatus } from 'src/app/models/order.model';
import { PaymentType } from 'src/app/models/payment-type.model';
import { DeliveryType } from 'src/app/models/delivery-type.model';
import { ApiUrlsService } from './../../services/api-urls.service';
import { ApiResponse, GetProductResponse } from 'src/app/models/response.model';
import { ErrorsHandlerService } from './../../services/errors-handler.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeOrderStatusDialogComponent } from './../fragments/change-order-status-dialog/change-order-status-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EmployeeComponent implements OnInit {

  notifications;
  expandedElement;
  selectedOrderDetails;

  isLoading: boolean;
  memorizedIndex: number;

  allOrders: Array<Order> = [];
  newOrders: Array<Order> = [];
  canceledOrders: Array<Order> = [];
  completedOrders: Array<Order> = [];
  inProgressOrders: Array<Order> = [];

  PaymentType = PaymentType;
  OrderStatus = OrderStatus;
  DeliveryType = DeliveryType;
  dataSourceAll = new MatTableDataSource();
  dataSourceNew = new MatTableDataSource();
  dataSourceCanceled = new MatTableDataSource();
  dataSourceCompleted = new MatTableDataSource();
  dataSourceInProgress = new MatTableDataSource();

  displayedColumns: string[] = ['position', 'clientName', 'clientSurname', 'clientEmail', 'orderDate', 'deliveryInformation',
                                'totalPrice', 'status', 'orderDetails', 'changeStatus'];

  constructor(public api: ApiUrlsService, public errHandler: ErrorsHandlerService, private domSanitizer: DomSanitizer,
              public dialogService: MatDialog) { }

  assignOrders(orders) {
    orders.forEach(order => {
      if (order.orderStatus === OrderStatus.NEW) {
        this.newOrders.push(order);
      } else if (order.orderStatus === OrderStatus.INPROGRESS) {
        this.inProgressOrders.push(order);
      } else if (order.orderStatus === OrderStatus.COMPLETED) {
        this.completedOrders.push(order);
      } else if (order.orderStatus === OrderStatus.CANCELED) {
        this.canceledOrders.push(order);
      }
    });
    this.dataSourceAll.data = this.allOrders;
    this.dataSourceNew.data = this.newOrders;
    this.dataSourceCanceled.data = this.canceledOrders;
    this.dataSourceCompleted.data = this.completedOrders;
    this.dataSourceInProgress.data = this.inProgressOrders;
  }

  orderDetails(order, index) {
    if (order && this.memorizedIndex !== index) {
      this.isLoading = true;
      const productsArr = [];
      this.memorizedIndex = index;
      this.selectedOrderDetails = [];
      order.orderedProducts.forEach(productBasicData => {
        let product: any;
        this.api.getProduct(productBasicData.productId).subscribe((res: GetProductResponse) => {
          if (res.success) {
            product = res.data;
            product.quantity = productBasicData.quantity;
            product.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + res.data._attachments.productImage.buffer);
            productsArr.push(product);
          }
        });
        const getProductsInterval = setInterval(() => {
          if (productsArr.length === order.orderedProducts.length) {
            clearInterval(getProductsInterval);
            this.isLoading = false;
            this.selectedOrderDetails = productsArr;
          }
        }, 200);
      });
    }
  }

  changeOrderStatus(id) {
    const dialogRef = this.dialogService.open(ChangeOrderStatusDialogComponent, {
      width: '500px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(newStatus => {
      if (newStatus) {
        this.api.updateOrderStatus(id, newStatus).subscribe((res: ApiResponse) => {
          if (res.success) {
            this.getOrders();
          }
        });
      }
    });
  }

  getOrders() {
    this.api.getOrders().subscribe((res: any) => {
      if (res.success) {
        this.allOrders = res.data;
        this.assignOrders(res.data);
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
    this.isLoading = true;
    this.notifications = this.api.getNotificationsPL();
    this.getOrders();
  }

}
