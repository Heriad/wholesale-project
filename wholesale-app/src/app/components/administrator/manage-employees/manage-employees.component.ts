import { AddEmployeeDialogComponent } from './../../fragments/add-employee-dialog/add-employee-dialog.component';
import { DialogHelperService } from './../../../services/dialog-helper.service';
import { ConfirmationDialogComponent } from './../../fragments/confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit } from '@angular/core';
import { ApiUrlsService } from './../../../services/api-urls.service';
import { MatDialog } from '@angular/material/dialog';
import { GetEmployeesResponse } from 'src/app/models/response.model';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss']
})
export class ManageEmployeesComponent implements OnInit {

  constructor(public api: ApiUrlsService, public dialogService: MatDialog, public dialogHelper: DialogHelperService) { }

  displayedColumns: string[] = ['name', 'surname', 'email', 'workType', 'edit', 'delete'];
  isOpened = true;
  dataSource;

  // ELEMENT_DATA = [
  //   {
  //     id: '1234',
  //     name: 'Lolek Kowalski',
  //     login: 'bez loginu'
  //   },
  // ];

  // dataSource = this.ELEMENT_DATA;

  editEmployee() {
    console.log('Tutaj będzie super modal');
  }

  removeEmployee() {
    const dialogRef = this.dialogService.open((ConfirmationDialogComponent), {
      width: '500px',
      height: '220px',
      disableClose: true
    });
    dialogRef.componentInstance.title = 'Potwierdź';
    dialogRef.componentInstance.text = 'Czy jesteś pewny?';
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // api do usuniecia pracownika
      }
    });
  }

  addEmployee() {
    const dialogRef = this.dialogService.open((AddEmployeeDialogComponent), {
      width: '550px',
      height: '500px',
      disableClose: true
    });
    dialogRef.componentInstance.title = 'Dodaj pracownika';
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.createEmployee(result).subscribe((res) => {
          console.log(res);
        });
      }
    });
  }

  getEmployees() {
    this.api.getEmployees().subscribe((res: GetEmployeesResponse) => {
      console.log('Found employees: ', res);
      console.log('Test: ' , res.data[0].name);
      this.dataSource = res.data;
    });
  }

  ngOnInit(): void {
    this.getEmployees();
  }

}
