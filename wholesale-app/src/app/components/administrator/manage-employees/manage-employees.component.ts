import { ConfirmationDialogComponent } from './../../fragments/confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit } from '@angular/core';
import { ApiUrlsService } from './../../../services/api-urls.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss']
})
export class ManageEmployeesComponent implements OnInit {

  constructor(public api: ApiUrlsService, public dialogService: MatDialog) { }

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

  editEmployee() {
    console.log('Tutaj będzie super modal');
  }

  removeEmployee() {
    const dialogRef = this.dialogService.open((ConfirmationDialogComponent), {
      height: '220px',
      width: '500px'
    });
    dialogRef.componentInstance.title = 'Potwierdź';
    dialogRef.componentInstance.text = 'Czy jesteś pewny?';
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // api do usuniecia uzytkownika
      }
    });
  }

  addEmployee() {
    console.log('Modalek z dodaniem pracownika');
  }

  ngOnInit(): void {
  }

}
