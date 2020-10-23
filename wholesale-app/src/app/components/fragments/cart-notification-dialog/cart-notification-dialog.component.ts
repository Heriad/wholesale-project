import { MatDialogRef } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-notification-dialog',
  templateUrl: './cart-notification-dialog.component.html',
  styleUrls: ['./cart-notification-dialog.component.scss']
})
export class CartNotificationDialogComponent implements OnInit {

  @Input() productName: string;

  constructor(private router: Router, public dialogRef: MatDialogRef<CartNotificationDialogComponent>) { }

  goToShoppingCart() {
    this.router.navigate(['/shopping-cart']);
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
