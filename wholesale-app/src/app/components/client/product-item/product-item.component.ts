import { DomSanitizer } from '@angular/platform-browser';
import { ShoppingCart } from './../../../models/product.model';
import { GetProductResponse } from './../../../models/response.model';
import { ApiUrlsService } from './../../../services/api-urls.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePreviewDialogComponent } from '../../fragments/image-preview-dialog/image-preview-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { UserRole } from 'src/app/models/user-role.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  productId: string;
  isLoading: boolean;
  product;
  shoppingCart: Array<ShoppingCart> = [];
  shoppingCartPrice: number;
  shoppingCartQuantity: number;
  quantity: Array<number> = [1, 2, 3, 4, 5, 6 , 7, 8, 9, 10];
  selectedQuantity = 1;

  constructor(public api: ApiUrlsService, private route: ActivatedRoute, public domSanitizer: DomSanitizer,
              public dialogService: MatDialog, private router: Router, private authService: AuthService) {

  }

  backToMainPage() {
    this.router.navigate(['/']);
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
    this.updateCart();
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

  logoutClient() {
    this.authService.logoutUser().subscribe(() => {
      this.api.logout();
      this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.api.getProduct(this.productId).subscribe((res: GetProductResponse) => {
        if (res.success) {
          this.product = res.data;
          this.product.price = parseInt(this.product.price, 10);
          this.product.productImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/*;base64,' +
          this.product._attachments.productImage.buffer);
          this.updateCart();
        }
        this.isLoading = false;
      });
    });
  }

}
