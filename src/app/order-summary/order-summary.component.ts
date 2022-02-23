import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { environment } from 'src/environments/environment.prod';
import { LogoutComponent } from '../logout/logout.component';
import { ProfileComponent } from '../profile/profile.component';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  totalProduct: any;
  totalOrder: any;
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
    this.service.totalProduct().subscribe((response) => {
      this.totalProduct = response;
      console.log('get count to product', response);
    });
    this.service.totalOrder().subscribe((response) => {
      this.totalOrder = response;
      console.log('get count to order', response);
    });
  }
  profile() {
    const dailogconfig = new MatDialogConfig();
    dailogconfig.disableClose = false;
    dailogconfig.autoFocus = true;
    dailogconfig.width = '30%';
    this.dialog.open(ProfileComponent, dailogconfig);
  }
  logout() {
    const dailogconfig = new MatDialogConfig();
    dailogconfig.disableClose = false;
    dailogconfig.autoFocus = true;
    dailogconfig.width = '19%';
    this.dialog.open(LogoutComponent, dailogconfig);
  }
}
