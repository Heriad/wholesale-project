import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ShoppingCart } from './../../../models/product.model';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { GetProductResponse } from 'src/app/models/response.model';
import { ErrorsHandlerService } from './../../../services/errors-handler.service';
import { NavigationBarComponent } from '../../fragments/navigation-bar/navigation-bar.component';
import { ConfirmationDialogComponent } from '../../fragments/confirmation-dialog/confirmation-dialog.component';
import { ImagePreviewDialogComponent } from '../../fragments/image-preview-dialog/image-preview-dialog.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @ViewChild('navBar', { static: true }) navBar: NavigationBarComponent;
  @ViewChild(MatSort) set content(sort: MatSort) { this.dataSource.sort = sort; }

  notifications;

  isLoading: boolean;
  shoppingCartPrice: number;
  shoppingCartQuantity: number;
  updatedCart: Array<ShoppingCart>;
  shoppingCart: Array<ShoppingCart>;

  productList = [];
  dataSource = new MatTableDataSource();

  quantity: Array<number> = [1, 2, 3, 4, 5, 6 , 7, 8, 9, 10];
  displayedColumns: string[] = ['position', 'image', 'name', 'unitPrice', 'quantity', 'totalPrice', 'delete'];

  constructor(public api: ApiUrlsService, private domSanitizer: DomSanitizer, public dialogService: MatDialog,
              private router: Router, public errHandler: ErrorsHandlerService) {}


  getNotifications(notifications) {
    this.notifications = notifications;
  }

  completeTheOrder() {
    this.router.navigate(['/complete-the-order']);
  }

  imagePreview(image) {
    const dialogRef = this.dialogService.open((ImagePreviewDialogComponent), {
      disableClose: true
    });
    dialogRef.componentInstance.image = image;
  }

  removeProductFromCart(element) {
    const dialogRef = this.dialogService.open(ConfirmationDialogComponent, {
      width: '500px',
      disableClose: true,
      data: this.notifications
    });
    dialogRef.componentInstance.title = this.notifications.confirmationDialogComponent.verify;
    dialogRef.componentInstance.content =  this.notifications.confirmationDialogComponent.removeItemFromCartDescription;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productList.splice(this.productList.findIndex(product => product._id === element._id), 1);
        this.shoppingCart.splice(this.shoppingCart.findIndex(product => product.id === element._id), 1);
        this.shoppingCartPrice -= element.totalPrice;
        this.shoppingCartQuantity -= element.quantity;
        localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
        localStorage.setItem('shoppingCartPrice', JSON.stringify(this.shoppingCartPrice));
        localStorage.setItem('shoppingCartQuantity', JSON.stringify(this.shoppingCartQuantity));
        this.productList.sort(this.compareProductList);
        this.dataSource.data.forEach((el: any, index) => {
          el.position = index + 1;
        });
        this.dataSource.data = this.productList;
        this.navBar.updateCart();
      }
    });
  }

  getProducts() {
    return new Promise<void>((resolve, reject) => {
      this.shoppingCart.forEach((el, index) => {
        let product: any;
        this.api.getProduct(el.id).subscribe((res: GetProductResponse) => {
          if (res.success) {
            product = res.data;
            product.quantity = el.quantity;
            product.position = index + 1;
            product.unitPrice = Number(product.price);
            product.totalPrice = product.quantity * product.price;
            product.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/*;base64,' +
              res.data._attachments.productImage.buffer);
            this.productList.push(product);
          }
        }, () => {
          const errorBar = this.errHandler.openErrorBar(this.notifications.errorsHandlerService.errorOccur);
          errorBar.onAction().subscribe(() => {
            this.getProducts();
          });
         });
      });
      const getProductsInterval = setInterval(() => {
        if (this.shoppingCart.length === this.productList.length) {
          clearInterval(getProductsInterval);
          resolve();
        }
      }, 200);
    });
  }

  getCartData() {
    this.shoppingCartQuantity = JSON.parse(localStorage.getItem('shoppingCartQuantity')) !== null ?
        JSON.parse(localStorage.getItem('shoppingCartQuantity')) : 0;
    this.shoppingCartPrice = JSON.parse(localStorage.getItem('shoppingCartPrice')) !== null ?
        JSON.parse(localStorage.getItem('shoppingCartPrice')) : 0;
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) !== null ? JSON.parse(localStorage.getItem('shoppingCart')) : [];
  }

  compareProductList(a, b) {
    if (a.position < b.position) {
      return -1;
    }
    if (a.position > b.position) {
      return 1;
    }
    return 0;
  }

  quantityChange(product) {
    const shoppingCartElement = this.shoppingCart.find(shoppingCart => shoppingCart.id === product._id);
    this.shoppingCartQuantity -= shoppingCartElement.quantity;
    this.shoppingCartPrice -= shoppingCartElement.quantity * product.price;
    this.shoppingCartQuantity += product.quantity;
    this.shoppingCartPrice += product.quantity * product.price;
    product.totalPrice = product.quantity * product.price;
    shoppingCartElement.quantity = product.quantity;
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
    localStorage.setItem('shoppingCartPrice', JSON.stringify(this.shoppingCartPrice));
    localStorage.setItem('shoppingCartQuantity', JSON.stringify(this.shoppingCartQuantity));
    this.navBar.updateCart();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getCartData();
    this.getProducts().then(() => {
      this.productList.sort(this.compareProductList);
      this.dataSource.data = this.productList;
      this.isLoading = false;
    });
  }

}
