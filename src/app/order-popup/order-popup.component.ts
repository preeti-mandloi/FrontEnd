import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { Order } from '../models/product';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


export interface PeriodicElement {
  name: string;
  quantity : number;
  price: number;
  totalPrice: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Shirt', quantity: 2, price: 1000, totalPrice: 2000},
  ]
@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent implements OnInit {
  items: Array<any> = [];
  newItem: any = { };
  
  // displayedColumns: string[] = ['name', 'quantity', 'price', 'totalPrice','edit','delete'];
  dataSource = ELEMENT_DATA;  
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
  options: any[] = [];
  filteredOptions: Observable<string[]> | undefined;
 
  
  constructor(
    public dialogRef: MatDialogRef<OrderPopupComponent>,
    private service:ServiceService,
    private http: HttpClient,
    private toastr: ToastrService,

  ) {
    this.http.get( environment.usersUrl+'/getAllProducts')
      .subscribe((response : any)=> {
        for (const property in response) {
          this.options.push(response[property]["name"]);
        }
      });
   }

  
  addItems() {
    if(this.options.indexOf(this.newItem.name) !== -1){
      this.items.push(this.newItem);
      this.newItem = {};
    }
    else{
      alert("Please choose from available products only");
    }
     
  }

  removeItem(index:any) {
    this.items.splice(index,1); // remove 1 item at ith place
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
  }
  

  private _filter(value: string): any[] {
    if(value){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }    
    return [];
  }

  onFormSubmit() {
    console.log("quantity of order",this.items)
    this.service.addOrder(this.items).subscribe(response => {
      // for(this.i in response){
      //   console.log(response[this.i])
      // }
      this.toastr.success("Added Order", "Success");
    },
    error => {
      this.toastr.error('Failed to add Order');
    });
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
  
}
