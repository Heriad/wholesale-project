import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;

  constructor(@Inject(MAT_DIALOG_DATA) public notifications: any) { }

  ngOnInit(): void {
  }

}
