import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { getAllOrder, Order } from '../models/product';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


// export interface PeriodicElement {
//   name: string;
//   quantity : number;
//   price: number;
//   totalPrice: number;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {name: 'Shirt', quantity: 2, price: 1000, totalPrice: 2000},
//   ]
@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent implements OnInit {
  items: Array<any> = [];
  newItem: any = { };
  
  // displayedColumns: string[] = ['name', 'quantity', 'price', 'totalPrice','edit','delete'];
  // dataSource = ELEMENT_DATA;  
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
  model:getAllOrder={
   
    name:'',
    quantity:0,
    price:0,
   totalPrice:0,
   paymentMode:''
  }
  
  constructor(
    public dialogRef: MatDialogRef<OrderPopupComponent>,
    private service:ServiceService,
    private http: HttpClient,
    private toastr: ToastrService,

  ) {
    this.http.get( environment.usersUrl+'/product/getAllProducts')
      .subscribe((response : any)=> {
        for (const property in response) {
          this.options.push(response[property]["name"]);
          // this.options.push(response[property]["quantity"]);
        }
      });
   }
  //  (click)="onEdit(i)"
  //  onEdit(index){
  //   this.editMode = true;
  //   this.editIndex = index;
  //   this.ngxSmartModalService.open('myModal');
  //   this.form.setValue({
  //     rec:this.data[index].recipient,
  //     msg:this.data[index].message
  //   });
  // }
  addItems() {
    this.service.addOrder(this.newItem).subscribe(response => {
    if(this.options.indexOf(this.newItem.name) !== -1){
      this.items.push(response);
      this.newItem = {};
    }
    else{
      alert("Please choose from available products only");
    }
    })
  }
  itemsAdd(){

  }
  removeItem(index:any) {
    this.items.splice(index,1); // remove 1 item at ith place
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
    this.service.getAllOrder(this.items).subscribe(response => {
      console.log("get all order",response)
    })
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
  
}
