import { ShoppingCart } from './../../../models/product.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { GetProductResponse } from 'src/app/models/response.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSort } from '@angular/material/sort';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../fragments/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

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
  updatedCart: Array<ShoppingCart>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public api: ApiUrlsService, private domSanitizer: DomSanitizer, private location: Location,
              public dialogService: MatDialog, private router: Router) { }

  goBack() {
    this.location.back();
  }

  completeTheOrder() {
    this.router.navigate(['/complete-the-order']);
  }

  removeProductFromCart(element) {
    const dialogRef = this.dialogService.open(ConfirmationDialogComponent, {
      width: '500px',
      disableClose: true
    });
    dialogRef.componentInstance.title = 'Potwierdź';
    dialogRef.componentInstance.text = 'Czy aby na pewno? Potwierdzenie spowoduje usunięcie produktu z koszyka.';
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.shoppingCart.splice(this.shoppingCart.findIndex(product => product.id === element._id), 1);
        this.productList.splice(this.productList.findIndex(product => product._id === element._id), 1);
        this.shoppingCartQuantity -= element.quantity;
        this.shoppingCartPrice -= element.price;
        localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
        localStorage.setItem('shoppingCartQuantity', JSON.stringify(this.shoppingCartQuantity));
        localStorage.setItem('shoppingCartPrice', JSON.stringify(this.shoppingCartPrice));
        this.dataSource.data = this.productList;
      }
    });
  }

  ngOnInit(): void {
    this.shoppingCartQuantity = JSON.parse(localStorage.getItem('shoppingCartQuantity')) !== null ?
        JSON.parse(localStorage.getItem('shoppingCartQuantity')) : 0;
    this.shoppingCartPrice = JSON.parse(localStorage.getItem('shoppingCartPrice')) !== null ?
        JSON.parse(localStorage.getItem('shoppingCartPrice')) : 0;
    this.dataSource.data = [];
    this.isLoading = true;
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) !== null ? JSON.parse(localStorage.getItem('shoppingCart')) : [];
    const promise = new Promise((resolve, reject) => {
      this.shoppingCart.forEach((el, index) => {
          let product: any;
          this.api.getProduct(el.id).subscribe((res: GetProductResponse) => {
            if (res.success) {
              product = res.data;
              product.quantity = el.quantity;
              product.position  = index + 1;
              product.totalPrice = product.quantity * product.price;
              product.image =  this.domSanitizer.bypassSecurityTrustUrl('data:image/*;base64,' +
                  res.data._attachments.productImage.buffer);
              this.productList.push(product);
            }
          });
      });
      resolve();
    }).then(() => {
        this.dataSource.data = this.productList;
        this.isLoading = false;
        this.dataSource.sort = this.sort;
    });
  }

}
