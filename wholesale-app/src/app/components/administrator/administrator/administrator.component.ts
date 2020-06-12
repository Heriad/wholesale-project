import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  // Array of columns names
  displayedColumns: string[] = ['id', 'name', 'login', 'edit', 'delete'];
  isOpened = true;
  activeTab: string;

  constructor() {

  }

  openMenuSideBar(isMenuOpened: boolean) {
    console.log(isMenuOpened);
    this.isOpened = isMenuOpened;
  }

  changeTab(event, itemName) {
    if (event && itemName === 'manage-employees') {
      this.activeTab = 'manage-employees';
    } else if (event && itemName === 'tab2') {
      this.activeTab = 'tab2';
    } else if (event && itemName === 'tab3') {
      this.activeTab = 'tab3';
    } else {
      console.log('error');
    }
  }

  addEmployee() {

  }

  ngOnInit(): void {
  }

}


