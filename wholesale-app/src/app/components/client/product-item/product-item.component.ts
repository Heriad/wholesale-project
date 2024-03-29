import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ShoppingCart } from './../../../models/product.model';
import { GetProductResponse } from './../../../models/response.model';
import { ApiUrlsService } from './../../../services/api-urls.service';
import { ErrorsHandlerService } from './../../../services/errors-handler.service';
import { ImagePreviewDialogComponent } from '../../fragments/image-preview-dialog/image-preview-dialog.component';
import { CartNotificationDialogComponent } from '../../fragments/cart-notification-dialog/cart-notification-dialog.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  product;
  notifications;

  productId: string;
  isLoading: boolean;
  shoppingCartPrice: number;
  shoppingCartQuantity: number;

  idKey = 'id';
  selectedQuantity = 1;
  shoppingCart: Array<ShoppingCart> = [];

  quantity: Array<number> = [1, 2, 3, 4, 5, 6 , 7, 8, 9, 10];

  constructor(public api: ApiUrlsService, private route: ActivatedRoute, public domSanitizer: DomSanitizer,
              public dialogService: MatDialog, public errHandler: ErrorsHandlerService) {}

  getNotifications(notifications) {
    this.notifications = notifications;
  }

  addToShoppingCart() {
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) ? JSON.parse(localStorage.getItem('shoppingCart')) : [];
    let isAlreadyInCart = false;
    this.shoppingCart.forEach(product => {
      if (product.id === this.productId) {
        product.quantity += this.selectedQuantity;
        isAlreadyInCart = true;
      }
    });
    if (!isAlreadyInCart) {
      this.shoppingCart.push({
        id: this.productId,
        quantity: this.selectedQuantity
      });
    }
    this.shoppingCartPrice += this.product.price * this.selectedQuantity;
    this.shoppingCartQuantity += this.selectedQuantity;
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
    localStorage.setItem('shoppingCartQuantity', JSON.stringify(this.shoppingCartQuantity));
    localStorage.setItem('shoppingCartPrice', JSON.stringify(this.shoppingCartPrice));
    const dialogRef = this.dialogService.open((CartNotificationDialogComponent), {
      width: '500px',
      disableClose: true,
      data: this.notifications
    });
    dialogRef.componentInstance.productImage = this.product.image;
    dialogRef.componentInstance.productQuantity = this.selectedQuantity;
    dialogRef.componentInstance.productName = this.product.name;
  }

  updateCart() {
    this.shoppingCartPrice = JSON.parse(localStorage.getItem('shoppingCartPrice')) !== null ?
      JSON.parse(localStorage.getItem('shoppingCartPrice')) : 0;
    this.shoppingCartQuantity = JSON.parse(localStorage.getItem('shoppingCartQuantity')) !== null ?
      JSON.parse(localStorage.getItem('shoppingCartQuantity')) : 0;
  }

  imagePreview(image) {
    const dialogRef = this.dialogService.open((ImagePreviewDialogComponent), {
      disableClose: true
    });
    dialogRef.componentInstance.image = image;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.productId = params[this.idKey];
      this.api.getProduct(this.productId).subscribe((res: GetProductResponse) => {
        if (res.success) {
          this.product = res.data;
          this.product.price = parseInt(this.product.price, 10);
          this.product.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/*;base64,' +
          this.product._attachments.productImage.buffer);
          this.updateCart();
        }
        this.isLoading = false;
      }, () => {
        const errorBar = this.errHandler.openErrorBar(this.notifications.errorsHandlerService.errorOccur);
        errorBar.onAction().subscribe(() => {
          this.ngOnInit();
        });
       });
    });
  }

}
