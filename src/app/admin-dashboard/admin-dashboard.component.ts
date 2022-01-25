import { Component,  ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { OrderPopupComponent } from '../order-popup/order-popup.component';
import { AddProductComponent } from '../add-product/add-product.component';
// import { MatSidenav } from '@angular/material/sidenav';
// import {BreakpointObserver} from '@angular/cdk/layout' ; 

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent  {

  // @ViewChild(MatSidenav) sidenav!:MatSidenav;
  frameworkComponents: any;


  //ng-grid from here
  public gridApi: any;
  public gridColumnApi:any;
  public columnDefs: any;
  public sortingOrder: any;
  public defaultColDef: any;
  public paginationPageSize: any;
  public paginationNumberFormatter: any;
  agGrid: any;

  
  constructor(
    // private observer:BreakpointObserver,
    private http: HttpClient,
    private dialog:MatDialog,
  ){
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params: { value: { toLocaleString: () => string; }; }) {
      return '[' + params.value.toLocaleString() + ']';
    };
    
    this.columnDefs=[
      {
        headerName: "Status",
        field:"",
        width: 170,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Name",
        field:"name",
        width: 200,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Quantity",
        field:"quantity",
        width: 170,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Type",
        field:"type",
        width: 160,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Price",
        field:"price",
        width: 170,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Manufacturing Date",
        field:"mfg",
        width: 200,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Expiry Date",
        field:"exp",
        width: 200,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
   
    ]
 
  }
  // ngAfterViewInit() {
  //   this.addTotal(this.addProduct)
  // }

  // addTotal(_addProduct: () => void) {
  //   let fieldsObj = {
  //     price: 0
  //   }
  //   this.addProduct.forEach(
  //     (row) => {
  //       for (let key in fieldsObj) {
  //         fieldsObj[key] += row[key]
  //       }
  //     }
  //   )
  //   this.agGrid.api.updateRowData({
  //     add: [{ make: 'Total', price: fieldsObj['price']}]
  //   });
  // }

  onGridReady(params: any){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
   {
      this.http.get( environment.usersUrl+'/product/getAllProducts')
      .subscribe(response => {
        params.api.setRowData(response);
      });
    
  }
}

addOrder(){
  const dailogconfig=new MatDialogConfig();
  dailogconfig.disableClose=false;
  dailogconfig.autoFocus=true;
  dailogconfig.width="40%";
   this.dialog.open(OrderPopupComponent,dailogconfig)
}
addProduct(){
  const dailogconfig=new MatDialogConfig();
  dailogconfig.disableClose=false;
  dailogconfig.autoFocus=true;
  dailogconfig.width="40%";
   this.dialog.open(AddProductComponent,dailogconfig)
}
// onClose(){
//   this.dialog.closeAll();
// }
  

// onProfile(){
//    this.dialog.open()
// }
  // ngAfterViewInit(){
  //   this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
  //     if (res.matches) {
  //       this.sidenav.mode = 'over';
  //       this.sidenav.close();
  //     } else {
  //       this.sidenav.mode = 'side';
  //       this.sidenav.open();
  //     }
  //   });
  // }

}
