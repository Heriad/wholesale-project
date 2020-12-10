import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiUrlsService } from 'src/app/services/api-urls.service';

@Component({
  selector: 'app-navigation-bar-employee',
  templateUrl: './navigation-bar-employee.component.html',
  styleUrls: ['./navigation-bar-employee.component.scss']
})
export class NavigationBarEmployeeComponent implements OnInit {

  constructor(public router: Router, public api: ApiUrlsService, private authService: AuthService) { }

  logout() {
    this.authService.logoutUser().subscribe(() => {
      this.api.logout();
      this.router.navigate(['/login']);
    });
  }

  refresh() {
    window.location.reload();
  }

  ngOnInit(): void {
  }

}
