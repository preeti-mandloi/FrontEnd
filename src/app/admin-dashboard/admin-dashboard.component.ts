import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { OrderPopupComponent } from '../order-popup/order-popup.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { ServiceService } from '../services/service.service';
import { AllProduct } from '../models/product';
import { ProfileComponent } from '../profile/profile.component';
import { LogoutComponent } from '../logout/logout.component';
import * as moment from 'moment';
import { GridOptions, HeaderNavigationDirection } from 'ag-grid-community';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  frameworkComponents: any;

  public gridApi!: GridOptions;
  public gridColumnApi: any;
  public columnDefs: any;
  public sortingOrder: any;
  public defaultColDef: any;
  public paginationPageSize: any;
  public paginationNumberFormatter: any;
  agGrid: any;

  model: AllProduct = {
    status: '',
    name: '',
    quantity: 0,
    type: '',
    price: 0,
    mfg: '',
    exp: '',
  };
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private service: ServiceService
  ) {
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params: {
      value: { toLocaleString: () => string };
    }) {
      return '[' + params.value.toLocaleString() + ']';
    };

    this.columnDefs = [
      {
        headerName: 'Status',
        field: 'status',
        width: 170,
        sortable: true,
        sortingOrder: ['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
        cellStyle: function (params: any) {
          if (params.value == 'Available') {
            return { color: 'green' };
          } else {
            return { color: 'red' };
          }
        },
      },
      {
        headerName: 'Name',
        field: 'name',
        width: 200,
        sortable: true,
        sortingOrder: ['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
        width: 170,
        sortable: true,
        sortingOrder: ['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: 'Type',
        field: 'type',
        width: 160,
        sortable: true,
        sortingOrder: ['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: 'Price',
        field: 'price',
        width: 170,
        sortable: true,
        aggFunc: 'sum',
        sortingOrder: ['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: 'Manufacturing Date',
        field: 'mfg',
        width: 200,
        sortable: true,
        sortingOrder: ['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: 'Expiry Date',
        field: 'exp',
        width: 200,
        sortable: true,
        sortingOrder: ['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params;
    this.gridColumnApi = params.columnApi;
    {
      this.model.mfg = moment(this.model.mfg).format('DD-MM-YYYY');
      this.refresh();
    }
  }
  refresh() {
    this.service.getAllProduct().subscribe((data) => {
      console.log(data);
      const response = data as any;
      this.gridApi.api?.setRowData(response);
      console.log('check grid data', this.gridApi);
    });
  }

  addOrder() {
    const dailogconfig = new MatDialogConfig();
    dailogconfig.disableClose = false;
    dailogconfig.autoFocus = true;
    dailogconfig.width = '50%';
    this.dialog.open(OrderPopupComponent, dailogconfig)
    .afterClosed()
    .subscribe((result) => {
      if (result.data === 'success') {
        this.refresh();
      }
    });
  }
  addProduct() {
    const dailogconfig = new MatDialogConfig();
    dailogconfig.disableClose = false;
    dailogconfig.autoFocus = true;
    dailogconfig.width = '40%';
    this.dialog
      .open(AddProductComponent, dailogconfig)
      .afterClosed()
      .subscribe((result) => {
        if (result.data === 'success') {
          this.refresh();
        }
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
