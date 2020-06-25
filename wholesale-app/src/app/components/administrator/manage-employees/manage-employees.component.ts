import { ApiUrlsService } from './../../../services/api-urls.service';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { ApiResponse } from 'src/app/models/response.model';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss']
})
export class ManageEmployeesComponent implements OnInit {

  constructor(public api: ApiUrlsService) { }

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
