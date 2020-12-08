import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { LoginComponent } from './components/shared/login/login.component';
import { LoggedInAuthGuard } from './services/logged-in-auth-guard.service';
import { EmployeeComponent } from './components/employee/employee.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RegisterComponent } from './components/shared/register/register.component';
import { MainPageComponent } from './components/shared/main-page/main-page.component';
import { CompleteTheOrderAuthGuard } from './services/complete-the-order-auth-guard.service';
import { ProductItemComponent } from './components/client/product-item/product-item.component';
import { ShoppingCartComponent } from './components/client/shopping-cart/shopping-cart.component';
import { OrdersPreviewComponent } from './components/client/orders-preview/orders-preview.component';
import { RemindPasswordComponent } from './components/shared/remind-password/remind-password.component';
import { AdministratorComponent } from './components/administrator/administrator/administrator.component';
import { CompleteTheOrderComponent } from './components/client/complete-the-order/complete-the-order.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'client', component: ClientComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'product-item/:id', component: ProductItemComponent },
  { path: 'remind-password', component: RemindPasswordComponent },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInAuthGuard] },
  { path: 'administrator', component: AdministratorComponent, canActivate: [AuthGuard] },
  { path: 'orders-preview', component: OrdersPreviewComponent, canActivate: [AuthGuard] },
  { path: 'complete-the-order', component: CompleteTheOrderComponent, canActivate: [CompleteTheOrderAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
