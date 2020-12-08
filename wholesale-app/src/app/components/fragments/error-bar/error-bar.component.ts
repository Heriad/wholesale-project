import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-bar',
  templateUrl: './error-bar.component.html',
  styleUrls: ['./error-bar.component.scss']
})
export class ErrorBarComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<ErrorBarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  refreshComponentData() {
    this.snackBarRef.dismissWithAction();
  }

  ngOnInit(): void {
  }

}
