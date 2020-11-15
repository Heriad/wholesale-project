import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './../components/fragments/confirmation-dialog/confirmation-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class DialogHelperService {

  constructor(private dialogService: MatDialog) {}

  openConfirmation(title?: string, text?: string) {
    const dialogRef = this.dialogService.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.title = title ? title : 'Potwierdź';
    dialogRef.componentInstance.content = text ? text : 'Czy jesteś pewny?';
  }

}
