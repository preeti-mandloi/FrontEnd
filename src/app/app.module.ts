import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule} from'@angular/material/divider';
import { MatListModule } from '@angular/material/list'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './add-product/add-product.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrderPopupComponent } from './order-popup/order-popup.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    AdminDashboardComponent,
    OrderDetailsComponent,
    OrderPopupComponent,
    OrderSummaryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatTooltipModule,
    AppRoutingModule,
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    MatMenuModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[OrderPopupComponent]
})
export class AppModule { }
