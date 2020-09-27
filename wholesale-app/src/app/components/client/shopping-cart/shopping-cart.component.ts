import { ShoppingCart } from './../../../models/product.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { GetProductResponse } from 'src/app/models/response.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSort } from '@angular/material/sort';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart: Array<ShoppingCart>;
  displayedColumns: string[] = ['position', 'image', 'name', 'unitPrice', 'quantity', 'price', 'delete'];
  dataSource = new MatTableDataSource();
  isLoading: boolean;
  shoppingCartQuantity: number;
  shoppingCartPrice: number;
  productList = [];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public api: ApiUrlsService, private domSanitizer: DomSanitizer, private location: Location) { }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.shoppingCartQuantity = JSON.parse(localStorage.getItem('shoppingCartQuantity')) !== null ?
        JSON.parse(localStorage.getItem('shoppingCartQuantity')) : 0;
    this.shoppingCartPrice = JSON.parse(localStorage.getItem('shoppingCartPrice')) !== null ?
        JSON.parse(localStorage.getItem('shoppingCartPrice')) : 0;
    this.dataSource.data = [];
    this.isLoading = true;
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) !== null ? JSON.parse(localStorage.getItem('shoppingCart')) : [];
    console.log('Test: ', this.shoppingCart)
    this.shoppingCart.forEach((el, index) => {
      let product: any;
      this.api.getProduct(el.id).subscribe((res: GetProductResponse) => {
        if (res.success) {
          product = res.data;
          product.quantity = el.quantity;
          product.position  = index + 1;
          product.totalPrice = product.quantity * product.price;
          product.image =  this.domSanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + res.data._attachments.productImage.buffer);
          this.dataSource.data.push(product);
        }
      });
      this.isLoading = false;
    });
    this.dataSource.sort = this.sort;
  }

}
