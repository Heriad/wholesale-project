import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'login', 'edit', 'delete'];
  isOpened = true;
  rememberedTab: string;
  activeTab: string;

  constructor() {

  }

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
    } else if (event && itemName === 'tab3') {
      this.activeTab = 'tab3';
      localStorage.setItem('activeTab', 'tab3');
    } else {
      console.log('error');
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


