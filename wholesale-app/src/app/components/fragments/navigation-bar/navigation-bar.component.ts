import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Output() isMenuOpened = new EventEmitter<boolean>();

  opened = true;

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

  onMenuToggle() {
    this.opened = !this.opened;
    this.isMenuOpened.emit(this.opened);
  }

  ngOnInit(): void {
  }

}
