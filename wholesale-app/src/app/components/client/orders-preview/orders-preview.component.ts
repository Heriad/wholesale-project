import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order, OrderStatus } from './../../../models/order.model';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { DeliveryType } from 'src/app/models/delivery-type.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-orders-preview',
  templateUrl: './orders-preview.component.html',
  styleUrls: ['./orders-preview.component.scss']
})
export class OrdersPreviewComponent implements OnInit {

  @ViewChild(MatSort) set content1(sort: MatSort) { this.dataSourceAll.sort = sort; }
  @ViewChild(MatSort) set content2(sort: MatSort) { this.dataSourceCanceled.sort = sort; }
  @ViewChild(MatSort) set content3(sort: MatSort) { this.dataSourceCompleted.sort = sort; }
  @ViewChild(MatSort) set content4(sort: MatSort) { this.dataSourceInProgress.sort = sort; }

  notifications;

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

  constructor(public api: ApiUrlsService) { }

  getNotifications(notifications) {
    this.notifications = notifications;
  }

  orderDetails(order) {
    console.log('implement me');
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
    this.api.getUserOrders(this.api.user.email).subscribe((res: any) => {
      if (res.success) {
        this.allOrders = res.data;
        this.assignOrders();
      }
    });
  }

}
