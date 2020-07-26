import { DomSanitizer } from '@angular/platform-browser';
import { ShoppingChart } from './../../../models/product.model';
import { GetProductResponse } from './../../../models/response.model';
import { ApiUrlsService } from './../../../services/api-urls.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  productId: string;
  isLoading: boolean;
  product;
  shoppingChart: Array<ShoppingChart> = [];
  shoppingChartPrice: number;
  shoppingChartQuantity: number;
  constructor(public api: ApiUrlsService, private route: ActivatedRoute, public domSanitizer: DomSanitizer,
              private router: Router) {

  }

  backToMainPage() {
    this.router.navigate(['/']);
  }

  addToShoppintChart() {
    this.shoppingChart.push({
      id: this.productId,
      quantity: 1
    });
    this.shoppingChartPrice += this.product.price;
    this.shoppingChartQuantity += 1;
    localStorage.setItem('shoppingChart', JSON.stringify(this.shoppingChart));
    localStorage.setItem('shoppingChartQuantity', JSON.stringify(this.shoppingChartQuantity));
    localStorage.setItem('shoppingChartPrice', JSON.stringify(this.shoppingChartPrice));
    this.updateChart();
  }

  updateChart() {
    this.shoppingChartPrice = JSON.parse(localStorage.getItem('shoppingChartPrice')) !== null ?
        JSON.parse(localStorage.getItem('shoppingChartPrice')) : 0;
    this.shoppingChartQuantity = JSON.parse(localStorage.getItem('shoppingChartQuantity')) !== null ?
        JSON.parse(localStorage.getItem('shoppingChartQuantity')) : 0;
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
          this.updateChart();
        }
        this.isLoading = false;
      });
    });
  }

  // ngOnDestroy() {
  //   this.route.unsubscribe();
  // }
}
