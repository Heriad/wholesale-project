import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { ErrorBarComponent } from '../components/fragments/error-bar/error-bar.component';


@Injectable({
  providedIn: 'root'
})
export class ErrorsHandlerService {

  barConfig: MatSnackBarConfig = {
    duration: 0,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  }

  constructor(public errorBar: MatSnackBar) { }

  openErrorBar(errorDesc) {
    return this.errorBar.openFromComponent(ErrorBarComponent, {
      data: errorDesc,
      ...this.barConfig
    });
  }
}
