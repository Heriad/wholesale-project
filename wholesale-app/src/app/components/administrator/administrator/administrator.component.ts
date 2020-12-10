import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit, OnDestroy {

  activeTab: string;
  rememberedTab: string;

  isOpened = true;

  displayedColumns: string[] = ['id', 'name', 'login', 'edit', 'delete'];

  constructor() {}

  openMenuSideBar(isMenuOpened: boolean) {
    this.isOpened = isMenuOpened;
  }

  changeTab(event, itemName) {
    if (event && itemName === 'manage-products') {
      this.activeTab = 'manage-products';
      localStorage.setItem('activeTab', 'manage-products');
    } else if (event && itemName === 'manage-employees') {
      this.activeTab = 'manage-employees';
      localStorage.setItem('activeTab', 'manage-employees');
    } else if (event && itemName === 'manage-orders') {
      this.activeTab = 'manage-orders';
      localStorage.setItem('activeTab', 'manage-orders');
    }
  }

  ngOnInit(): void {
    this.rememberedTab = localStorage.getItem('activeTab');
    if (this.rememberedTab) {
      this.activeTab = this.rememberedTab;
    } else {
      this.activeTab = 'manage-products';
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('activeTab');
  }

}


