import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/shared/login/login.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AdministratorComponent } from './components/administrator/administrator/administrator.component';
import { ClientComponent } from './components/client/client.component';
import { AddEmployeeModalComponent } from './components/fragments/add-employee-modal/add-employee-modal.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeComponent,
    AdministratorComponent,
    ClientComponent,
    AddEmployeeModalComponent,
    NavigationBarComponent,
    ManageEmployeesComponent,
    RegisterComponent,
    RemindPasswordComponent,
    MainPageComponent,
    NumbersOnlyDirective,
    SentenseCaseTypeDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
