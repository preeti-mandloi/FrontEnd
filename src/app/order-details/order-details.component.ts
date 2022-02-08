import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  frameworkComponents: any;


  //ng-grid from here
  public gridApi: any;
  public gridColumnApi:any;
  public columnDefs: any;
  public sortingOrder: any;
  public defaultColDef: any;
  public paginationPageSize: any;
  public paginationNumberFormatter: any;
  constructor(
    private http: HttpClient,
  ) { 
    this.columnDefs=[
      {
        headerName: "Name",
        field:"",
        width: 320,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Quantity",
        field:"",
        width: 320,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Price",
        field:"",
        width: 320,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Total Price",
        field:"",
        width: 315,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
    ]
  }

  ngOnInit(): void {
  }
  onGridReady(params: any){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

  //  {
  //     this.http.get("http://localhost:8080/product/getAllProducts")
  //     .subscribe(response => {
  //       params.api.setRowData(response);
  //     });
    
  // }
}
profile(){}
logout(){}

}
