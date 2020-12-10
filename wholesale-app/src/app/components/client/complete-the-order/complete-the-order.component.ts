import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ShoppingCart } from 'src/app/models/product.model';
import { PaymentType } from 'src/app/models/payment-type.model';
import { DeliveryType } from 'src/app/models/delivery-type.model';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetProductResponse, ApiResponse } from 'src/app/models/response.model';
import { ErrorsHandlerService } from './../../../services/errors-handler.service';
import { Order, OrderedProducts, OrderStatus } from './../../../models/order.model';
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

  lastYear: number;
  countries: any[];
  riskValue: number;
  deliveryCost: number;
  orderComments: string;
  shoppingCartPrice: number;
  paymentFormGroup: FormGroup;
  deliveryFormGroup: FormGroup;
  clientDataFormGroup: FormGroup;
  shoppingCart: Array<ShoppingCart>;
  supplyAddressFormGroup: FormGroup;
  financialDataFormGroup: FormGroup;

  orderPrice = 0;
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

  productList = [];
  clientDataErrors = [];
  paymentTypeError = '';
  deliveryTypeError = '';
  financialDataError = '';
  deliveryAddressError = '';
  PaymentType = PaymentType;
  DeliveryType = DeliveryType;

  orderedProducts: Array<OrderedProducts> = [];

  constructor(private fb: FormBuilder, public api: ApiUrlsService, private router: Router, public dialogService: MatDialog,
              private domSanitizer: DomSanitizer, public errHandler: ErrorsHandlerService) {
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
    if (this.deliveryFormGroup.value.deliveryType === DeliveryType.PERSONAL) {
      this.deliveryCost = 0;
    } else {
      this.deliveryCost = 20;
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

  validatePaymentType() {
    if (this.paymentFormGroup.controls.paymentType) {
      this.paymentTypeError = '';
    }
  }

  validatePaymentFinancialData() {
    if (this.paymentFormGroup.controls.paymentType.invalid) {
      this.paymentTypeError = this.notifications.completeTheOrderComponent.paymentTypeRequired;
    } else if (this.financialDataFormGroup.invalid) {
       this.financialDataError = this.notifications.completeTheOrderComponent.requiredFields;
       this.paymentTypeError = '';
    } else {
      this.paymentTypeError = '';
      this.financialDataError = '';
    }
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      this.shoppingCart.forEach((el, index) => {
        let product: any;
        this.api.getProduct(el.id).subscribe((res: GetProductResponse) => {
          if (res.success) {
            product = res.data;
            product.quantity = el.quantity;
            product.unitPrice = Number(product.price);
            product.totalPrice = product.quantity * product.price;
            product.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/*;base64,' +
              res.data._attachments.productImage.buffer);
            this.productList.push(product);
            this.orderedProducts.push({
              productId: res.data._id,
              quantity: el.quantity
            });
          }
        }, () => {
          const errorBar = this.errHandler.openErrorBar(this.notifications.errorsHandlerService.errorOccur);
          errorBar.onAction().subscribe(() => {
            this.getProducts();
          });
         });
      });
      const getProductsInterval = setInterval(() => {
        if (this.shoppingCart.length === this.productList.length) {
          clearInterval(getProductsInterval);
          resolve();
        }
      }, 200);
    });
  }

  // Funkcja do pobierania ceny, aby nikt jej nie zmienił w localStorage
  getProductsPrice() {
    this.productList.forEach(product => {
      this.orderPrice += product.totalPrice;
    });
  }

  calculateRiskValue() {
    // todo model ryzyka zaimplementowac tutaj
    this.riskValue = 51;
  }

  submitOrder() {
    const waitDialogRef = this.dialogService.open((WaitResponseDialogComponent), {
      width: '500px',
      disableClose: true
    });
    waitDialogRef.componentInstance.headerText = this.notifications.completeTheOrderComponent.orderProcess;
    waitDialogRef.componentInstance.contentText = this.notifications.completeTheOrderComponent.wait;
    this.calculateRiskValue();
    const newOrder: Order = {
      orderedProducts: this.orderedProducts,
      clientData: {
        name: this.clientDataFormGroup.controls.name.value,
        surname: this.clientDataFormGroup.controls.surname.value,
        email: this.clientDataFormGroup.controls.email.value,
        companyName: this.clientDataFormGroup.controls.companyName.value,
        regon: this.clientDataFormGroup.controls.regon.value,
        krs: this.clientDataFormGroup.controls.krs.value
      },
      deliveryType: this.deliveryFormGroup.controls.deliveryType.value,
      ...(this.deliveryFormGroup.controls.deliveryType.value === DeliveryType.SUPPLY && this.deliveryFormGroup.valid && {
        deliveryAddress: {
          streetAndNumber: this.supplyAddressFormGroup.controls.streetAndNumber.value,
          postalCode: this.supplyAddressFormGroup.controls.postalCode.value,
          townName: this.supplyAddressFormGroup.controls.townName.value,
          country: this.supplyAddressFormGroup.controls.country.value
        },
      }),
      paymentType: this.paymentFormGroup.controls.paymentType.value,
      ...(this.paymentFormGroup.controls.paymentType.value === PaymentType.DEFER && this.financialDataFormGroup.valid && {
        financialData: {
          totalAssets: this.financialDataFormGroup.controls.totalAssets.value,
          currentAssets: this.financialDataFormGroup.controls.currentAssets.value,
          currentLiabilities: this.financialDataFormGroup.controls.currentLiabilities.value,
          foreignCapital: this.financialDataFormGroup.controls.foreignCapital.value,
          netProfit: this.financialDataFormGroup.controls.netProfit.value,
          salesRevenue: this.financialDataFormGroup.controls.salesRevenue.value
        }
      }),
      ...(this.orderComments && {
        comments: this.orderComments
      }),
      orderValue: this.orderPrice,
      deliveryCost: this.deliveryCost,
      ...(this.paymentFormGroup.controls.paymentType.value === PaymentType.DEFER && {
        numberOfInstallments: this.numberOfInstallments
      }),
      totalPrice: this.orderPrice + this.deliveryCost,
      ...(this.riskValue && {
        riskValue: this.riskValue
      }),
      orderDate: new Date(),
      orderStatus: OrderStatus.NEW
    };
    this.api.createOrder(newOrder).subscribe((res: ApiResponse) => {
      if (res.success) {
        localStorage.removeItem('shoppingCart');
        localStorage.removeItem('shoppingCartPrice');
        localStorage.removeItem('shoppingCartQuantity');
        waitDialogRef.close();
        const dialogRef = this.dialogService.open((OrderNotificationDialogComponent), {
          width: '500px',
          disableClose: true
        });
        dialogRef.componentInstance.header = this.notifications.orderNotificationDialogComponent.orderSubmitted;
        dialogRef.componentInstance.content = this.notifications.orderNotificationDialogComponent.dialogNotificationContent;
        dialogRef.componentInstance.closeBtn = this.notifications.orderNotificationDialogComponent.close;
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.api.user) {
      this.client = this.api.user;
    }
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) !== null ? JSON.parse(localStorage.getItem('shoppingCart')) : [];
    this.getProducts().then(() => {
      this.getProductsPrice();
    });
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
    this.financialDataFormGroup = this.fb.group({
      totalAssets: ['', Validators.required],
      currentAssets: ['', Validators.required],
      currentLiabilities: ['', Validators.required],
      foreignCapital: ['', Validators.required],
      netProfit: ['', Validators.required],
      salesRevenue: ['', Validators.required]
    });
  }

}
