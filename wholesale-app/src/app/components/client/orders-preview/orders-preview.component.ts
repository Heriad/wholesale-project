import { MatSort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeliveryType } from 'src/app/models/delivery-type.model';
import { GetProductResponse } from 'src/app/models/response.model';
import { Order, OrderStatus } from './../../../models/order.model';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { animate, state, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-orders-preview',
  templateUrl: './orders-preview.component.html',
  styleUrls: ['./orders-preview.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class OrdersPreviewComponent implements OnInit {

  @ViewChild(MatSort) set content1(sort: MatSort) { this.dataSourceAll.sort = sort; }
  @ViewChild(MatSort) set content2(sort: MatSort) { this.dataSourceCanceled.sort = sort; }
  @ViewChild(MatSort) set content3(sort: MatSort) { this.dataSourceCompleted.sort = sort; }
  @ViewChild(MatSort) set content4(sort: MatSort) { this.dataSourceInProgress.sort = sort; }

  notifications;
  expandedElement;
  selectedOrderDetails;

  isLoading: boolean;
  memorizedIndex: number;

  allOrders: Array<Order> = [];
  canceledOrders: Array<Order> = [];
  completedOrders: Array<Order> = [];
  inProgressOrders: Array<Order> = [];

  DeliveryType = DeliveryType;
  dataSourceAll = new MatTableDataSource();
  dataSourceCanceled = new MatTableDataSource();
  dataSourceCompleted = new MatTableDataSource();
  dataSourceInProgress = new MatTableDataSource();

  displayedColumns: string[] = ['position', 'orderDate', 'deliveryInformation', 'totalPrice', 'paymentType', 'status', 'orderDetails'];

  constructor(public api: ApiUrlsService, private domSanitizer: DomSanitizer) { }

  getNotifications(notifications) {
    this.notifications = notifications;
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

  assignOrders() {
    this.allOrders.forEach(order => {
      if (order.orderStatus === OrderStatus.INPROGRESS) {
        this.inProgressOrders.push(order);
      } else if (order.orderStatus === OrderStatus.COMPLETED) {
        this.completedOrders.push(order);
      } else if (order.orderStatus === OrderStatus.CANCELED) {
        this.canceledOrders.push(order);
      }
    });
    this.dataSourceAll.data = this.allOrders;
    this.dataSourceCanceled.data = this.canceledOrders;
    this.dataSourceCompleted.data = this.completedOrders;
    this.dataSourceInProgress.data = this.inProgressOrders;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getUserOrders(this.api.user.email).subscribe((res: any) => {
      if (res.success) {
        this.allOrders = res.data;
        this.assignOrders();
        this.isLoading = false;
      }
    });
  }

}
