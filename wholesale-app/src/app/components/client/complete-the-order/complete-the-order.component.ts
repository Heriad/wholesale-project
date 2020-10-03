import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { DeliveryType } from './../../../models/order.model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-complete-the-order',
  templateUrl: './complete-the-order.component.html',
  styleUrls: ['./complete-the-order.component.scss']
})
export class CompleteTheOrderComponent implements OnInit {

  DeliveryType = DeliveryType;
  deliveryFormGroup: FormGroup;
  deliveryTypeError = '';
  countries: any[];

  streetAndNumberMaxLength = 40;
  postalCodeMaxLength = 6;
  townNameMaxLength = 20;

  constructor(private location: Location, private fb: FormBuilder, public api: ApiUrlsService) {
    this.countries = this.api.getCountries();
  }

  goBack() {
    this.location.back();
  }

  validateDeliveryType() {
    if (this.deliveryFormGroup.controls.deliveryType.invalid) {
      this.deliveryTypeError = 'Uzupełnienie sposobu dostawy jest wymagane, aby przejść dalej.';
    } else {
      this.deliveryTypeError = '';
    }
  }

  ngOnInit(): void {
    this.deliveryFormGroup = this.fb.group({
      deliveryType: ['', Validators.required]
    });
  }

}
