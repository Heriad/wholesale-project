import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Output() isMenuOpened = new EventEmitter<boolean>();
  opened = true;

  constructor(public router: Router) { }

  logout() {
    this.router.navigate(['']);
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
