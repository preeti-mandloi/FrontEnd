import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { AuthenticationService } from './services/Auth/authentication.service';

const routes: Routes = [
  { path:'', component:LoginComponent},
  { path: 'app-admin-dashboard', component : AdminDashboardComponent ,canActivate:[AuthenticationService]},
  { path: 'app-add-product', component : AddProductComponent,canActivate:[AuthenticationService] },
  { path: 'app-admin-dashboard', component:AdminDashboardComponent, canActivate:[AuthenticationService]},
  { path: 'app-order-details', component:OrderDetailsComponent, canActivate:[AuthenticationService]},
  { path: 'app-order-summary', component:OrderSummaryComponent, canActivate:[AuthenticationService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
