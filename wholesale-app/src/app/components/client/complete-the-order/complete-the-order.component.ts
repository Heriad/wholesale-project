import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryType, PaymentType } from './../../../models/order.model';
import { OrderNotificationDialogComponent } from '../../fragments/order-notification-dialog/order-notification-dialog.component';

@Component({
  selector: 'app-complete-the-order',
  templateUrl: './complete-the-order.component.html',
  styleUrls: ['./complete-the-order.component.scss']
})
export class CompleteTheOrderComponent implements OnInit {

  client; // todo type
  notifications;

  krsMaxLength = 10;
  regonMaxLength = 14;
  clientNameMaxLength = 15;
  clientEmailMaxLength = 30;
  companyNameMaxLength = 30;
  clientSurnameMaxLength = 15;

  countries: any[];
  DeliveryType = DeliveryType;
  paymentFormGroup: FormGroup;
  deliveryFormGroup: FormGroup;
  clientDataFormGroup: FormGroup;
  supplyAddressFormGroup: FormGroup;

  clientDataError = '';
  deliveryTypeError = '';
  deliveryAddressError = '';
  PaymentType = PaymentType;

  townNameMaxLength = 20;
  postalCodeMaxLength = 6;
  notesToOrderMaxLength = 1000;
  streetAndNumberMaxLength = 40;

  constructor(private fb: FormBuilder, public api: ApiUrlsService, private router: Router, public dialogService: MatDialog) {
    this.countries = this.api.getCountries();
  }

  getNotifications(notifications) {
    this.notifications = notifications;
  }

  validateUserData() {
    if (this.clientDataFormGroup.invalid) {
      this.clientDataError = 'Uzupełnij wymagane pola';
    } else {
      this.clientDataError = '';
    }
  }

  validateDeliveryType() {
    if (this.deliveryFormGroup.controls.deliveryType) {
      this.deliveryTypeError = '';
      this.deliveryAddressError = '';
    }
  }

  validateDeliveryAddress() {
    if (this.deliveryFormGroup.controls.deliveryType.invalid) {
      this.deliveryTypeError = 'Uzupełnienie sposobu dostawy jest wymagane, aby przejść dalej.';
    } else if (this.supplyAddressFormGroup.invalid) {
      this.deliveryAddressError = 'Uzupełnij wymagane pola';
      this.deliveryTypeError = '';
    } else {
      this.deliveryTypeError = '';
      this.deliveryAddressError = '';
    }
  }

  validatePayment() {

  }

  submitOrder() {
    // todo w srodku subscribe po wywolaniu api z zlozeniem zamowienia
    localStorage.removeItem('shoppingCart');
    localStorage.removeItem('shoppingCartPrice');
    localStorage.removeItem('shoppingCartQuantity');

    const dialogRef = this.dialogService.open((OrderNotificationDialogComponent), {
      width: '500px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
    if (this.api.user) {
      this.client = this.api.user;
    }
    this.clientDataFormGroup = this.fb.group({
      name: [this.client.name, Validators.required],
      surname: [this.client.surname, Validators.required],
      email: [this.client.email, Validators.required],
      companyName: [this.client.companyName, Validators.required],
      regon: [this.client.regon],
      krs: [this.client.krs]
    });
    this.deliveryFormGroup = this.fb.group({
      deliveryType: ['', Validators.required]
    });
    this.supplyAddressFormGroup = this.fb.group({
      streetAndNumber: ['', Validators.required],
      postalCode: ['', Validators.required],
      townName: ['', Validators.required],
      country: ['PL', Validators.required]
    });
    this.paymentFormGroup = this.fb.group({
      paymentType: ['', Validators.required]
    });
  }

}
