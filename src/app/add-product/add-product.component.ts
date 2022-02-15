import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ServiceService } from '../services/service.service';
import { NgForm } from '@angular/forms';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
// import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  private gridApi: any;

  addProduct!: FormGroup;
  
  // myControl = new FormControl();
  // options: string[] = ['Shirt', 'Jeans', 'Jacket','Joggers','Sendals','Shoes'];
  // filteredOptions: Observable<string[]> | undefined;
  date = new FormControl(new Date().toLocaleDateString());
  grid: any;

  
  
  
  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    private service:ServiceService,
    private router:Router,
    private toastr: ToastrService
    // private adminDashboard:AdminDashboardComponent,

  ) { }
  ngOnInit(): void {
    this. initForm();
    // throw new Error('Method not implemented.');
  }
  model:Product={
    status:'',
    name:'',
    quantity:0,
    type:'',
    price:0,
    mfg:'',
    exp:'',
  }
  // ngOnInit(): void {
  //   this.filteredOptions = this.myControl.valueChanges.pipe(
  //     startWith(''),
  //     map(value => this._filter(value)),
  //   );
  // }
  
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }
  initForm(){
    this.addProduct= new FormGroup(
      {
        name :new FormControl('',[Validators.required]),
        quantity :new FormControl('',[Validators.required]),
        type :new FormControl('',[Validators.required]),
        price :new FormControl('',[Validators.required]),
        mfgDate :new FormControl('',[Validators.required]),
       }
    );
    // console.log(this.model);
  }
  onFormSubmit(addProductInTable:any) {
    
    if(this.addProduct.valid){
      this.model.mfg = moment(this.model.mfg).format('YYYY-MM-DD');
    this.service.addProduct(this.model).subscribe(
      (response: any) => {
      
    
        // console.log("add product",this.model)
        
      //   this.toastr.success('Product Added', 'Success');
      // },
      // (error: any) => {
      //   this.toastr.error('Product not added', 'Error');
      // }
      alert("success ");
      addProductInTable.resetForm();
      this.gridApi.setRowData(this.model); 
      });}else{alert("faild")}
    
  }
  onClose(): void {
    this.dialogRef.close(false);
  }
}
