import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { WorkType } from './../../../models/employee.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiUrlsService } from './../../../services/api-urls.service';
import { DialogHelperService } from './../../../services/dialog-helper.service';
import { GetEmployeesResponse, ApiResponse } from 'src/app/models/response.model';
import { ErrorsHandlerService } from './../../../services/errors-handler.service';
import { AddEmployeeDialogComponent } from './../../fragments/add-employee-dialog/add-employee-dialog.component';
import { ConfirmationDialogComponent } from './../../fragments/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss'],
})
export class ManageEmployeesComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  isLoading: boolean;

  isOpened = true;
  dataSource = new MatTableDataSource();

  workType: typeof WorkType = WorkType;
  displayedColumns: string[] = ['position', 'name', 'surname', 'email', 'workType', 'edit', 'delete'];

  constructor(public api: ApiUrlsService, public dialogService: MatDialog, public dialogHelper: DialogHelperService,
              public errHandler: ErrorsHandlerService) { }

  filterData(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  editEmployee(element) {
    const dialogRef = this.dialogService.open((AddEmployeeDialogComponent), {
      width: '550px',
      disableClose: true,
      data: element,
    });
    dialogRef.componentInstance.title = 'Edytuj pracownika';
    dialogRef.componentInstance.isEdit = true;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.updateEmployee(result).subscribe((res: ApiResponse) => {
          if (res.success) {
            this.getEmployees();
          }
        });
      }
    });
  }

  removeEmployee(element) {
    const dialogRef = this.dialogService.open((ConfirmationDialogComponent), {
      width: '500px',
      disableClose: true
    });
    dialogRef.componentInstance.title = 'Potwierdź';
    dialogRef.componentInstance.content = 'Czy jesteś pewny? Potwierdzenie spowoduje usunięcie pracownika: ' +
        element.name + ' ' + element.surname;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.removeEmployee(element._id).subscribe((res: ApiResponse) => {
          if (res.success) {
            this.getEmployees();
          }
        });
      }
    });
  }

  addEmployee() {
    const dialogRef = this.dialogService.open((AddEmployeeDialogComponent), {
      width: '550px',
      disableClose: true
    });
    dialogRef.componentInstance.title = 'Dodaj pracownika';
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.createEmployee(result).subscribe((res: ApiResponse) => {
          if (res.success) {
            this.getEmployees();
          }
        });
      }
    });
  }

  getEmployees() {
    this.isLoading = true;
    this.api.getEmployees().subscribe((res: GetEmployeesResponse) => {
      if (res.success) {
        this.dataSource.data = res.data;
        this.dataSource.data.forEach((el: any, index) => {
          el.position = index + 1;
          if (el.workType === WorkType.FULLTIME) {
            el.workType = 'Pełen etat';
          } else {
            el.workType = 'Część etatu';
          }
        });
      }
      this.isLoading = false;
    }, () => {
      const errorBar = this.errHandler.openErrorBar('Wystąpił błąd');
      errorBar.onAction().subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  ngOnInit(): void {
    this.getEmployees();
    this.dataSource.sort = this.sort;
  }

}
