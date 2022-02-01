import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { Order } from '../models/product';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent implements OnInit {
  frameworkComponents: any;


  //ng-grid from here
  public gridApi: any;
  public gridColumnApi:any;
  public columnDefs: any;
  public sortingOrder: any;
  public defaultColDef: any;
  agGrid: any;
  i:any;
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  
  constructor(
    public dialogRef: MatDialogRef<OrderPopupComponent>,
    private service:ServiceService,
    private router:Router,
    private http: HttpClient,

  ) { 
    this.columnDefs=[
 
      {
        headerName: "Name",
        field:"name",
        width: 120,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Quantity",
        field:"quantity",
        width: 100,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
  
      {
        headerName: "Price",
        field:"price",
        width: 100,
        sortable: true,
        aggFunc: "sum",
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Total Price",
        field:"totalPrice",
        width: 90,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Edit",
        field:"edit",
        width: 80,
        cellRenderer : function(params:any){
                    return '<button (click)="editRow()"><mat-icon>edit</mat-icon></button>'
                }
      },
      {
        headerName: "Delete",
        field:"Delete",
        width: 80,
        cellRenderer : function(params:any){
                    return '<button (click)="deleteRow()"><mat-icon>delete</mat-icon></button>'
                }
      },
    ]
  }
  deleteRow() {
    alert("BUTTON CLICKEFD")
}
  editRow() {
    alert("BUTTON CLICKEFD")
}
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
  model:Order={
    name:'',
    quantity:0,
    price:0,
    totalPrice:0,
  }
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.http.get( environment.usersUrl+'/product/addOrder')
    .subscribe(response => {
      // params.api.setRowData(response);
      for(this.i in response){
        console.log(this.i.name)
      }
      // console.log("response check===>",response);
    });
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  onFormSubmit() {
    this.service.addOrder(this.model).subscribe(
      (response: any) => {
        console.log(response)
        this.router.navigate([''], {
          state: {
            data: {
                'trackingId': response.trackingId
            }
          }
        });
        alert("success")
        // this.toastr.success('Your booking id is:  ' + response.trackingId, 'Booking Created');
      },
      (error: any) => {
        alert("error")
        // this.toastr.error(error.message, 'Booking Failed');
      }
    );
  }
  onClose(): void {
    this.dialogRef.close(false);
  }
  
}
