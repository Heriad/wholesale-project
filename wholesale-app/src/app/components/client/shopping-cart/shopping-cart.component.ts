import { ShoppingCart } from './../../../models/product.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { GetProductResponse } from 'src/app/models/response.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart: Array<ShoppingCart>;
  displayedColumns: string[] = ['position', 'image', 'name', 'unitPrice', 'quantity', 'price', 'delete'];
  // displayedColumns: string[] = ['position'];
  dataSource = new MatTableDataSource();
  isLoading: boolean;
  productList = [];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public api: ApiUrlsService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.dataSource.data = [];
    this.isLoading = true;
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) !== null ? JSON.parse(localStorage.getItem('shoppingCart')) : [];
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
      console.log(this.dataSource.data)
      this.isLoading = false;
    });
    
    this.dataSource.sort = this.sort;

    
  }

}