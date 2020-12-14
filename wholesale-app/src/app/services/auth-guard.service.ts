import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserRole } from 'src/app/models/user-role.model';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, public api: ApiUrlsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated() && this.api.user) {
      switch (this.api.user.role) {
        case UserRole.CLIENT: {
          if (route.routeConfig.path === 'complete-the order' || route.routeConfig.path === 'orders-preview'||
              route.routeConfig.path === '' || route.routeConfig.path === 'shopping-cart' ||
              route.routeConfig.path === 'product-item/:id') {
            return true;
          }
          break;
        }
        case UserRole.EMPLOYEE: {
          if (route.routeConfig.path === 'employee') {
            return true;
          }
          break;
        }
        case UserRole.ADMIN: {
          if (route.routeConfig.path === 'administrator') {
            return true;
          }
          break;
        }
      }
      if (this.api.user.role === UserRole.CLIENT) {
        this.router.navigate(['/']);
      } else if (this.api.user.role === UserRole.EMPLOYEE) {
        this.router.navigate(['/employee']);
      } else if (this.api.user.role === UserRole.ADMIN) {
        this.router.navigate(['/administrator']);
      }
      return false;
    }
    if (route.routeConfig.path === 'employee' || route.routeConfig.path === 'administrator') {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
    return true;
  }

}
