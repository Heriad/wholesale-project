import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { DeliveryType, PaymentType } from './../../../models/order.model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-complete-the-order',
  templateUrl: './complete-the-order.component.html',
  styleUrls: ['./complete-the-order.component.scss']
})
export class CompleteTheOrderComponent implements OnInit {

  client; // todo type
  clientDataFormGroup: FormGroup;
  clientDataError = '';

  clientNameMaxLength = 15;
  clientSurnameMaxLength = 15;
  clientEmailMaxLength = 30;
  companyNameMaxLength = 30;
  regonMaxLength = 14;
  krsMaxLength = 10;

  DeliveryType = DeliveryType;
  deliveryFormGroup: FormGroup;
  supplyAddressFormGroup: FormGroup;
  deliveryTypeError = '';
  deliveryAddressError = '';
  countries: any[];

  PaymentType = PaymentType;
  paymentFormGroup: FormGroup;

  streetAndNumberMaxLength = 40;
  postalCodeMaxLength = 6;
  townNameMaxLength = 20;
  notesToOrderMaxLength = 1000;

  isClientLoggedIn: boolean;

  constructor(private location: Location, private fb: FormBuilder, public api: ApiUrlsService,
              private router: Router, private authService: AuthService) {
    this.countries = this.api.getCountries();
  }

  goBack() {
    this.location.back();
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

  logoutClient() {
    this.authService.logoutUser().subscribe(() => {
      this.api.logout();
      this.isClientLoggedIn = false;
      this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
    if (this.api.user) {
      this.client = this.api.user;
      this.isClientLoggedIn = true;
    } else {
      this.isClientLoggedIn = false;
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
