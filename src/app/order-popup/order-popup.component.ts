import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { Order } from '../models/product';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD

=======
>>>>>>> 7ae27c7a9e2e393ec2cf6f56dad1beca3f46abae
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
<<<<<<< HEAD
        width: 120,
=======
        width: 70,
>>>>>>> 7ae27c7a9e2e393ec2cf6f56dad1beca3f46abae
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Quantity",
        field:"quantity",
<<<<<<< HEAD
        width: 100,
=======
        width: 80,
>>>>>>> 7ae27c7a9e2e393ec2cf6f56dad1beca3f46abae
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
  
      {
        headerName: "Price",
        field:"price",
<<<<<<< HEAD
        width: 100,
=======
        width: 70,
>>>>>>> 7ae27c7a9e2e393ec2cf6f56dad1beca3f46abae
        sortable: true,
        aggFunc: "sum",
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Total Price",
        field:"totalPrice",
<<<<<<< HEAD
        width: 90,
=======
        width: 80,
>>>>>>> 7ae27c7a9e2e393ec2cf6f56dad1beca3f46abae
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
      {
        headerName: "Edit",
        field:"edit",
<<<<<<< HEAD
        width: 80,
        cellRenderer : function(params:any){
                    return '<button (click)="editRow()"><mat-icon>edit</mat-icon></button>'
                }
=======
        width: 70,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
>>>>>>> 7ae27c7a9e2e393ec2cf6f56dad1beca3f46abae
      },
      {
        headerName: "Delete",
        field:"Delete",
<<<<<<< HEAD
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
=======
        width: 70,
        sortable: true,
        sortingOrder:['asc', 'desc', 'null'],
        headerCheckboxSelection: false,
      },
    ]
  }
>>>>>>> 7ae27c7a9e2e393ec2cf6f56dad1beca3f46abae
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
