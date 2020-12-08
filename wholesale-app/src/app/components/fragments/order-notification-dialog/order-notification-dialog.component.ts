import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-notification-dialog',
  templateUrl: './order-notification-dialog.component.html',
  styleUrls: ['./order-notification-dialog.component.scss']
})
export class OrderNotificationDialogComponent implements OnInit {

  @Input() header: string;
  @Input() content: string;
  @Input() closeBtn: string;

  constructor() { }

  ngOnInit(): void {
  }

}
