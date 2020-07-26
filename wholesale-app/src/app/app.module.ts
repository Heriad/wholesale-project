import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/shared/login/login.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AdministratorComponent } from './components/administrator/administrator/administrator.component';
import { ClientComponent } from './components/client/client.component';
import { AddEmployeeDialogComponent } from './components/fragments/add-employee-dialog/add-employee-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './custom-material/custom-material-module';
import { NavigationBarComponent } from './components/fragments/navigation-bar/navigation-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { ManageEmployeesComponent } from './components/administrator/manage-employees/manage-employees.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/shared/register/register.component';
import { RemindPasswordComponent } from './components/shared/remind-password/remind-password.component';
import { MainPageComponent } from './components/shared/main-page/main-page.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { SentenseCaseTypeDirective } from './directives/sentense-case-type.directive';
import { ConfirmationDialogComponent } from './components/fragments/confirmation-dialog/confirmation-dialog.component';
import { ManageProductsComponent } from './components/administrator/manage-products/manage-products.component';
import { AddProductDialogComponent } from './components/fragments/add-product-dialog/add-product-dialog.component';
import { PriceOnlyDirective } from './directives/price-only.directive';
import { ProductItemComponent } from './components/client/product-item/product-item.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeComponent,
    AdministratorComponent,
    ClientComponent,
    AddEmployeeDialogComponent,
    NavigationBarComponent,
    ManageEmployeesComponent,
    RegisterComponent,
    RemindPasswordComponent,
    MainPageComponent,
    NumbersOnlyDirective,
    SentenseCaseTypeDirective,
    ConfirmationDialogComponent,
    ManageProductsComponent,
    AddProductDialogComponent,
    PriceOnlyDirective,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
