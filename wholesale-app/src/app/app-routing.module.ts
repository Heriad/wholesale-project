import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { LoginComponent } from './components/shared/login/login.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { RegisterComponent } from './components/shared/register/register.component';
import { MainPageComponent } from './components/shared/main-page/main-page.component';
import { ProductItemComponent } from './components/client/product-item/product-item.component';
import { ShoppingCartComponent } from './components/client/shopping-cart/shopping-cart.component';
import { RemindPasswordComponent } from './components/shared/remind-password/remind-password.component';
import { AdministratorComponent } from './components/administrator/administrator/administrator.component';
import { CompleteTheOrderComponent } from './components/client/complete-the-order/complete-the-order.component';
import { ManageEmployeesComponent } from './components/administrator/manage-employees/manage-employees.component';


// TODO POPRAWIC ROUTING admi/manage jest nie uzywany jako osobna podstrona
const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'client', component: ClientComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'product-item/:id', component: ProductItemComponent },
  { path: 'administrator', component: AdministratorComponent },
  { path: 'remind-password', component: RemindPasswordComponent },
  { path: 'complete-the-order', component: CompleteTheOrderComponent },
  { path: 'administrator/manage-employees', component: ManageEmployeesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
