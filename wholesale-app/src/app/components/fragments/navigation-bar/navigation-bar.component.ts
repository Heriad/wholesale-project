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

  @Output() emitNotifications = new EventEmitter<object>();

  notifications;
  subtitle: string;
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

  changeLanguage() {
    this.setLanguageStorage();
    this.getNotifications();
    this.getSubtitle();
  }

  getSubtitle() {
    switch (this.router.url) {
      case '/': {
        this.subtitle = this.notifications.application.name;
        break;
      }
      case '/login': {
        this.subtitle = this.notifications.loginComponent.loginLabel;
        break;
      }
      case '/register': {
        // tslint:disable-next-line:max-line-length
        this.subtitle = !this.isAccountCreated ? this.notifications.registerComponent.register : this.notifications.registerComponent.registered;
      }
    }
  }

  ngOnInit(): void {
    this.getNotifications();
    this.getSubtitle();
    this.shoppingCartQuantity = JSON.parse(localStorage.getItem('shoppingCartQuantity')) !== null ?
      JSON.parse(localStorage.getItem('shoppingCartQuantity')) : 0;
  }

}
