import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryType, PaymentType } from './../../../models/order.model';
import { WaitResponseDialogComponent } from '../../fragments/wait-response-dialog/wait-response-dialog.component';
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
  townNameMaxLength = 20;
  postalCodeMaxLength = 6;
  clientNameMaxLength = 15;
  numberOfInstallments = 0;
  clientEmailMaxLength = 30;
  companyNameMaxLength = 30;
  clientSurnameMaxLength = 15;
  notesToOrderMaxLength = 1000;
  streetAndNumberMaxLength = 40;

  lastYear: number;
  countries: any[];
  shoppingCartPrice: number;
  paymentFormGroup: FormGroup;
  deliveryFormGroup: FormGroup;
  clientDataFormGroup: FormGroup;
  supplyAddressFormGroup: FormGroup;

  installmentInfo = '';
  clientDataErrors = [];
  deliveryTypeError = '';
  deliveryAddressError = '';
  PaymentType = PaymentType;
  DeliveryType = DeliveryType;

  constructor(private fb: FormBuilder, public api: ApiUrlsService, private router: Router, public dialogService: MatDialog) {
    this.countries = this.api.getCountries();
  }

  getNotifications(notifications) {
    this.notifications = notifications;
    if (this.clientDataErrors.length > 0) {
      this.validateUserData();
    }
    if (this.deliveryTypeError.length > 0 || this.deliveryAddressError.length > 0) {
      this.validateDeliveryAddress();
    }
  }

  validateUserData() {
    this.clientDataErrors = [];
    if (this.clientDataFormGroup.controls.name.invalid || this.clientDataFormGroup.controls.surname.invalid ||
        this.clientDataFormGroup.controls.companyName.invalid || this.clientDataFormGroup.controls.email.value.length === 0) {
      this.clientDataErrors.push(this.notifications.completeTheOrderComponent.requiredFields);
    }
    if (this.clientDataFormGroup.controls.email.invalid) {
      this.clientDataErrors.push(this.notifications.completeTheOrderComponent.wrongEmail);
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
      this.deliveryTypeError = this.notifications.completeTheOrderComponent.deliveryType;
    } else if (this.supplyAddressFormGroup.invalid) {
      this.deliveryAddressError = this.notifications.completeTheOrderComponent.requiredFields;
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

    const waitDialogRef = this.dialogService.open((WaitResponseDialogComponent), {
      width: '500px',
      disableClose: true
    });
    waitDialogRef.componentInstance.headerText = this.notifications.completeTheOrderComponent.orderProcess;
    waitDialogRef.componentInstance.contentText = this.notifications.completeTheOrderComponent.wait;

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
    this.lastYear = new Date().getFullYear() - 1;
    this.shoppingCartPrice = localStorage.getItem('shoppingCartPrice') ? parseInt(localStorage.getItem('shoppingCartPrice'), 10) : 0;
    this.clientDataFormGroup = this.fb.group({
      name: [this.client.name, Validators.required],
      surname: [this.client.surname, Validators.required],
      email: [this.client.email, [Validators.required, Validators.email]],
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
