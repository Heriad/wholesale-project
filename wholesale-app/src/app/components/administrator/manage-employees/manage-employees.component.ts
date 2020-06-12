import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss']
})
export class ManageEmployeesComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['id', 'name', 'login', 'edit', 'delete'];
  isOpened = true;

  ELEMENT_DATA = [
    {
      id: '1234',
      name: 'Adam Kowalski',
      login: 'kowalA'
    },
    {
      id: '1234',
      name: 'Adam Kowalski',
      login: 'kowalA'
    },
    {
      id: '1234',
      name: 'Adam Kowalski',
      login: 'kowalA'
    },
    {
      id: '1234',
      name: 'Adam Kowalski',
      login: 'kowalA'
    }
    ];

    dataSource = this.ELEMENT_DATA;

  ngOnInit(): void {
  }

}
