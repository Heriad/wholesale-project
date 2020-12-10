import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceOnlyDirective } from './directives/price-only.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { LoginComponent } from './components/shared/login/login.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { TransformOrderStatusPipe } from './pipes/transform-order-status.pipe';
import { TransformPaymentTypePipe } from './pipes/transform-payment-type.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './custom-material/custom-material-module';
import { RegisterComponent } from './components/shared/register/register.component';
import { SentenceCaseTypeDirective } from './directives/sentence-case-type.directive';
import { MainPageComponent } from './components/shared/main-page/main-page.component';
import { ErrorBarComponent } from './components/fragments/error-bar/error-bar.component';
import { ProductItemComponent } from './components/client/product-item/product-item.component';
import { ShoppingCartComponent } from './components/client/shopping-cart/shopping-cart.component';
import { OrdersPreviewComponent } from './components/client/orders-preview/orders-preview.component';
import { NavigationBarComponent } from './components/fragments/navigation-bar/navigation-bar.component';
import { RemindPasswordComponent } from './components/shared/remind-password/remind-password.component';
import { ManageOrdersComponent } from './components/administrator/manage-orders/manage-orders.component';
import { AdministratorComponent } from './components/administrator/administrator/administrator.component';
import { ManageProductsComponent } from './components/administrator/manage-products/manage-products.component';
import { CompleteTheOrderComponent } from './components/client/complete-the-order/complete-the-order.component';
import { ManageEmployeesComponent } from './components/administrator/manage-employees/manage-employees.component';
import { AddProductDialogComponent } from './components/fragments/add-product-dialog/add-product-dialog.component';
import { AddEmployeeDialogComponent } from './components/fragments/add-employee-dialog/add-employee-dialog.component';
import { ConfirmationDialogComponent } from './components/fragments/confirmation-dialog/confirmation-dialog.component';
import { WaitResponseDialogComponent } from './components/fragments/wait-response-dialog/wait-response-dialog.component';
import { ImagePreviewDialogComponent } from './components/fragments/image-preview-dialog/image-preview-dialog.component';
import { NavigationBarEmployeeComponent } from './components/fragments/navigation-bar-employee/navigation-bar-employee.component';
import { CartNotificationDialogComponent } from './components/fragments/cart-notification-dialog/cart-notification-dialog.component';
import { OrderNotificationDialogComponent } from './components/fragments/order-notification-dialog/order-notification-dialog.component';
import { ChangeOrderStatusDialogComponent } from './components/fragments/change-order-status-dialog/change-order-status-dialog.component';
import { NavigationBarAdministratorComponent } from './components/fragments/navigation-bar-administrator/navigation-bar-administrator.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorBarComponent,
    RegisterComponent,
    MainPageComponent,
    EmployeeComponent,
    PriceOnlyDirective,
    ProductItemComponent,
    NumbersOnlyDirective,
    ManageOrdersComponent,
    ShoppingCartComponent,
    OrdersPreviewComponent,
    NavigationBarComponent,
    AdministratorComponent,
    RemindPasswordComponent,
    ManageProductsComponent,
    TransformOrderStatusPipe,
    TransformPaymentTypePipe,
    ManageEmployeesComponent,
    CompleteTheOrderComponent,
    AddProductDialogComponent,
    SentenceCaseTypeDirective,
    AddEmployeeDialogComponent,
    ImagePreviewDialogComponent,
    WaitResponseDialogComponent,
    ConfirmationDialogComponent,
    CartNotificationDialogComponent,
    OrderNotificationDialogComponent,
    NavigationBarAdministratorComponent,
    NavigationBarEmployeeComponent,
    ChangeOrderStatusDialogComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
