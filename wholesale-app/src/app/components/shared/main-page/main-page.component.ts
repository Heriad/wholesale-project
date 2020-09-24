import { GetProductsResponse } from 'src/app/models/response.model';
import { ApiUrlsService } from './../../../services/api-urls.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  productList;
  isLoading: boolean;
  isScrollBtnAvailable: boolean;
  shoppingCartQuantity: number;

  constructor(public api: ApiUrlsService, private domSanitizer: DomSanitizer) { }

  onScroll(event) {
    if ((event.target as Element).scrollTop > 0) {
      this.isScrollBtnAvailable = true;
    } else {
      this.isScrollBtnAvailable = false;
    }
  }

  scrollToTop() {
    const element = document.querySelector('#topOfTheScreen');
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getProducts().subscribe((res: GetProductsResponse) => {
      console.log(res);
      if (res.success) {
        this.productList = res.data;
        this.productList.forEach((product) => {
          product.productImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/*;base64,' +
            product._attachments.productImage.buffer);
        });
      }
      this.isLoading = false;
    });
    this.shoppingCartQuantity = JSON.parse(localStorage.getItem('shoppingCartQuantity')) !== null ?
        JSON.parse(localStorage.getItem('shoppingCartQuantity')) : 0;
  }

}
