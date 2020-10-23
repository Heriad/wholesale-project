import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiUrlsService } from 'src/app/services/api-urls.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate {

  constructor(public api: ApiUrlsService, private router: Router) { }

  canActivate() {
    if (this.api.user && JSON.parse(localStorage.getItem('userData'))) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
