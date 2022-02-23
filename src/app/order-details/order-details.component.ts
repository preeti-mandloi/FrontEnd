import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RowGroupingDisplayType } from 'ag-grid-community';
import { environment } from 'src/environments/environment.prod';
import { LogoutComponent } from '../logout/logout.component';
import { Order } from '../models/product';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  frameworkComponents: any;
  model:Order={
    ord_id:'',
    name:'',
    quantity:0,
    paymentmode:''
   
  }

  //ng-grid from here
  public gridApi: any;
  public gridColumnApi:any;
  public columnDefs: any;
  public sortingOrder: any;
  public defaultColDef: any;
  public paginationPageSize: any;
  public paginationNumberFormatter: any;
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';
  constructor(
    private http: HttpClient, private dialog:MatDialog,
  ) { 
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params: { value: { toLocaleString: () => string; }; }) {
      return '[' + params.value.toLocaleString() + ']';
    };
    this.columnDefs=[
      {
        headerName: "Order ID",
        field:"ord_id",
        width: 315,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Product Name",
        field:"name",
        width: 315,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Items",
        field:"quantity",
        width: 315,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Payment Mode",
        field:"paymentmode",
        width: 315  ,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
     
    ];this.groupDisplayType = 'groupRows';
  
  }
  
  public autoGroupColumnDef= {
    minWidth: 200,
  };
  ngOnInit(): void {
  }
  onGridReady(params: any){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

   {
    this.http.get( environment.usersUrl+'/order/getAllOrders')
    .subscribe(response => {
        params.api.setRowData(response);
      });
    
  }
}
profile(){
  const dailogconfig=new MatDialogConfig();
  dailogconfig.disableClose=false;
  dailogconfig.autoFocus=true;
  dailogconfig.width="30%";
   this.dialog.open(ProfileComponent,dailogconfig)

}
logout(){
  const dailogconfig=new MatDialogConfig();
  dailogconfig.disableClose=false;
  dailogconfig.autoFocus=true;
  dailogconfig.width="19%";
   this.dialog.open(LogoutComponent,dailogconfig)

}

}
