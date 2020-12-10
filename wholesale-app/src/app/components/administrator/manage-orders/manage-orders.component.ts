import { PaymentType } from './../../../models/payment-type.model';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { OrderStatus } from 'src/app/models/order.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeliveryType } from 'src/app/models/delivery-type.model';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { ErrorsHandlerService } from 'src/app/services/errors-handler.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiResponse, GetOrdersResponse, GetProductResponse } from 'src/app/models/response.model';
import { ConfirmationDialogComponent } from '../../fragments/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ManageOrdersComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  notifications;
  expandedElement;
  selectedOrderDetails;

  PaymentType = PaymentType;
  OrderStatus = OrderStatus;
  DeliveryType = DeliveryType;
  dataSource = new MatTableDataSource();

  isLoading: boolean;
  memorizedIndex: number;
  displayedColumns: string[] = ['position', 'clientName', 'clientSurname', 'clientEmail', 'orderDate', 'deliveryInformation',
                                'totalPrice', 'status', 'orderDetails', 'cancelOrder'];

  constructor(public api: ApiUrlsService, public dialogService: MatDialog, public errHandler: ErrorsHandlerService,
              private domSanitizer: DomSanitizer) { }

  filterData(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
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
