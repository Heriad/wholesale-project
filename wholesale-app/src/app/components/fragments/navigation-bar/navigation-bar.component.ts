import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Language } from 'src/app/models/language.model';
import { AuthService } from 'src/app/services/auth.service';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Input() isAccountCreated: boolean;
  @Input() isBackBtnAvailable: boolean;
  @Input() isLoginLinkAvailable: boolean;
  @Input() isRegisterLinkAvailable: boolean;
  @Input() isLogoutLinkAvailable: boolean;
  @Input() isShoppingCartLinkAvailable: boolean;
  @Input() isShoppingCartPriceLinkAvailable: boolean;

  @Output() emitNotifications = new EventEmitter<object>();

  notifications;
  subtitle: string;
  shoppingCartPrice: number;
  selectedLanguage: Language;
  shoppingCartQuantity: number;

  constructor(public api: ApiUrlsService, private authService: AuthService, private router: Router,
              private location: Location) {
    if (sessionStorage.getItem('selectedLanguage')) {
      this.selectedLanguage = sessionStorage.getItem('selectedLanguage') as Language;
    } else {
      this.selectedLanguage = Language.PL;
    }
  }

  goBack() {
    this.location.back();
  }

  logoutClient() {
    this.authService.logoutUser().subscribe(() => {
      this.api.logout();
      this.router.navigate(['/']);
    });
  }

  setLanguageStorage() {
    sessionStorage.setItem('selectedLanguage', this.selectedLanguage);
  }

  getNotifications() {
    if (this.selectedLanguage === 'PL') {
      this.notifications = this.api.getNotificationsPL();
    } else if (this.selectedLanguage === 'ENG') {
      this.notifications = this.api.getNotificationsEn();
    }
    this.emitNotifications.emit(this.notifications);
  }

  updateCart() {
    this.shoppingCartQuantity = JSON.parse(localStorage.getItem('shoppingCartQuantity')) !== null ?
      JSON.parse(localStorage.getItem('shoppingCartQuantity')) : 0;
    this.shoppingCartPrice = JSON.parse(localStorage.getItem('shoppingCartPrice')) !== null ?
      JSON.parse(localStorage.getItem('shoppingCartPrice')) : 0;
  }

  changeLanguage() {
    this.setLanguageStorage();
    this.getNotifications();
    this.getSubtitle();
  }

  getSubtitle() {
    switch (this.router.url.split('/')[1]) {
      case '': {
        this.subtitle = this.notifications.application.name;
        break;
      }
      case 'login?returnUrl=%2Fcomplete-the-order':
      case 'login': {
        this.subtitle = this.notifications.loginComponent.loginLabel;
        break;
      }
      case 'register': {
        // tslint:disable-next-line:max-line-length
        this.subtitle = !this.isAccountCreated ? this.notifications.registerComponent.register : this.notifications.registerComponent.registered;
        break;
      }
      case 'remind-password': {
        this.subtitle = this.notifications.remindPasswordComponent.remindPassword;
        break;
      }
      case 'product-item': {
        this.subtitle = this.notifications.application.name;
        break;
      }
      case 'shopping-cart': {
        this.subtitle = this.notifications.shoppingCartComponent.cart;
        break;
      }
      case 'orders-preview': {
        this.subtitle = this.notifications.ordersPreviewComponent.myOrders;
        break;
      }
      case 'complete-the-order': {
        this.subtitle = this.notifications.completeTheOrderComponent.completeTheOrder;
        break;
      }
    }
  }

  ngOnInit(): void {
    this.getNotifications();
    this.getSubtitle();
    this.updateCart();
  }

}
