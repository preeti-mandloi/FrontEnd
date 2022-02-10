import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { Order } from '../models/product';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  addProductInRow!: FormGroup;
  items: Array<any> = [];
  newItem: any = { };
  // model:item={
  //   name:'',
  //     quantity:0,
  //     price:0,
  //    totalPrice:0,
  //    paymentMode:''
  // }
  // displayedColumns: string[] = ['name', 'quantity', 'price', 'totalPrice','edit','delete'];
  // dataSource = ELEMENT_DATA;  
  frameworkComponents: any;
  //ng-grid from here
  public gridApi: any;
  public gridColumnApi:any;
  public columnDefs: any;
  public sortingOrder: any;
  public defaultColDef: any;
  public agGrid: any;
  public obj:any=[] ;
  public i:any;
  public myControl = new FormControl();
  public options: any[] = [];
  public filteredOptions: Observable<string[]> | undefined;
  // model:GetAllOrder={
   
  //   name:'',
  //   quantity:0,
  //   price:0,
  //  totalPrice:0,
  //  paymentMode:''
  // }
  // obj!: GetAllOrder;
  
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
    if(this.addProductInRow.valid){
    this.service.addOrder(this.newItem).subscribe(response => {
    if(this.options.indexOf(this.newItem.name) !== -1){
      this.items.push(response);
      console.log("data of order",this.items)
      // this.toastr.success('Product Added', 'Success');
      this.newItem = {};
      alert("success")
    // }
    // else{
    //   (error: any) =>{
    //     this.toastr.success('Product not Added', 'Error');
    //   }
     
    }
    })}else{
      alert("faild")
    }
  }

  removeItem(index:any) {
    this.items.splice(index,1); // remove 1 item at ith place
  }


  
  ngOnInit(): void {
    this.initForm();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    ); 
  }
  initForm(){
    this.addProductInRow= new FormGroup(
      {
        name :new FormControl('',[Validators.required]),
        quantity :new FormControl('',[Validators.required]),
       
       }
    );
    // console.log(this.model);
  }

  private _filter(value: string): any[] {
    if(value){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }    
    return [];
  }
 
  onFormSubmit(OrderformModel:NgForm) {
    console.log(['paymentMode'].values);
    console.log("check get all ",this.items)
    this.obj=this.items;
    this.service.getAllOrder(this.obj).subscribe(response => {
      console.log("get all order",response)
    })
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
  
}
