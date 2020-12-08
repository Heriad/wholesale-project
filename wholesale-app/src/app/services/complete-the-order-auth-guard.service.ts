import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiUrlsService } from 'src/app/services/api-urls.service';

@Injectable({
  providedIn: 'root'
})
export class CompleteTheOrderAuthGuard implements CanActivate {

  constructor(public api: ApiUrlsService, private router: Router) { }

  canActivate() {
    if (this.api.user && JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('shoppingCart'))) {
      return true;
    } else if (JSON.parse(localStorage.getItem('shoppingCart')) && !this.api.user && !JSON.parse(localStorage.getItem('userData'))) {
      this.router.navigate(['/login']);
      return false;
    }
    this.router.navigate(['/']);
    return false;
  }
}
