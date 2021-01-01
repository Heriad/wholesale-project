import { Injectable } from '@angular/core';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompleteTheOrderAuthGuard implements CanActivate {

  constructor(public api: ApiUrlsService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.api.user && JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('shoppingCart'))) {
      return true;
    } else if (JSON.parse(localStorage.getItem('shoppingCart')) && !this.api.user && !JSON.parse(localStorage.getItem('userData'))) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    this.router.navigate(['/']);
    return false;
  }
}
