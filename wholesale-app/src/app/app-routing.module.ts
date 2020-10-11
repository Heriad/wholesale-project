import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { LoginComponent } from './components/shared/login/login.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RegisterComponent } from './components/shared/register/register.component';
import { MainPageComponent } from './components/shared/main-page/main-page.component';
import { ProductItemComponent } from './components/client/product-item/product-item.component';
import { ShoppingCartComponent } from './components/client/shopping-cart/shopping-cart.component';
import { RemindPasswordComponent } from './components/shared/remind-password/remind-password.component';
import { AdministratorComponent } from './components/administrator/administrator/administrator.component';
import { CompleteTheOrderComponent } from './components/client/complete-the-order/complete-the-order.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'client', component: ClientComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'product-item/:id', component: ProductItemComponent },
  { path: 'remind-password', component: RemindPasswordComponent },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'administrator', component: AdministratorComponent, canActivate: [AuthGuard] },
  { path: 'complete-the-order', component: CompleteTheOrderComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
