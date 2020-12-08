import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GetProductsResponse } from 'src/app/models/response.model';
import { ApiUrlsService } from './../../../services/api-urls.service';
import { ErrorsHandlerService } from './../../../services/errors-handler.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  productList;
  notifications;

  isLoading: boolean;
  isScrollBtnAvailable: boolean;

  constructor(public api: ApiUrlsService, private domSanitizer: DomSanitizer, public errHandler: ErrorsHandlerService) {}

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

  getNotifications(notifications) {
    this.notifications = notifications;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getProducts().subscribe((res: GetProductsResponse) => {
      if (res.success) {
        this.productList = res.data;
        this.productList.forEach((product) => {
          product.productImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/*;base64,' +
            product._attachments.productImage.buffer);
        });
      }
      this.isLoading = false;
    }, () => {
      const errorBar = this.errHandler.openErrorBar(this.notifications.errorsHandlerService.errorOccur);
      errorBar.onAction().subscribe(() => {
        this.ngOnInit();
      });
     });
  }

}
