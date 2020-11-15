import { Router } from '@angular/router';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-notification-dialog',
  templateUrl: './cart-notification-dialog.component.html',
  styleUrls: ['./cart-notification-dialog.component.scss']
})
export class CartNotificationDialogComponent implements OnInit {

  @Input() productName: string;
  @Input() productImage: string;
  @Input() productQuantity: number;

  constructor(private router: Router, public dialogRef: MatDialogRef<CartNotificationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public notifications: any) { }

  goToShoppingCart() {
    this.router.navigate(['/shopping-cart']);
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
