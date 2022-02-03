import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { Order } from '../models/product';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';


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
  newItem: any = {
    name: '',
    quantity: ''
  };

  displayedColumns: string[] = ['name', 'quantity', 'price', 'totalPrice','edit','delete'];
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
  options: string[] = ['Shirt', 'Jeans', 'Jacket','Joggers','Sendals','Shoes'];
  filteredOptions: Observable<string[]> | undefined;
 
  
  constructor(
    public dialogRef: MatDialogRef<OrderPopupComponent>,
    private service:ServiceService,
    private router:Router,
    private http: HttpClient,

  ) { }

  
  addItems() {
    this.items.push(this.newItem);
    console.log(this.items);
    this.newItem = {};
  }
  delete(index:any) {
    this.items.splice(index); // remove 1 item at ith place
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
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  onFormSubmit() {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value)),
    // );
    console.log("quantity of order",this.model.quantity)
    this.service.addOrder(this.model)
    .subscribe(response => {
      // params.api.setRowData(response);
      for(this.i in response){
        console.log(this.i.name)
      }
      // console.log("response check===>",response);
    });
  }
  onClose(): void {
    this.dialogRef.close(false);
  }
  
}
