import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: ['./remind-password.component.scss']
})
export class RemindPasswordComponent implements OnInit {

  notifications;

  constructor() { }

  getNotifications(notifications) {
    this.notifications = notifications;
  }

  ngOnInit(): void {
  }

}
