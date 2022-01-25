import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

const routes: Routes = [
  { path: '', component : AdminDashboardComponent },
  { path: 'app-add-product', component : AddProductComponent },
  { path: 'app-admin-dashboard', component:AdminDashboardComponent},
  { path: 'app-order-details', component:OrderDetailsComponent},
  { path: 'app-order-summary', component:OrderSummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
