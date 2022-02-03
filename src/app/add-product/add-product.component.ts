import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
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



  
  // myControl = new FormControl();
  // options: string[] = ['Shirt', 'Jeans', 'Jacket','Joggers','Sendals','Shoes'];
  // filteredOptions: Observable<string[]> | undefined;
  date = new FormControl(new Date().toLocaleDateString());

  
  
  
  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    private service:ServiceService,
    private router:Router,
    private toastr: ToastrService
    // private adminDashboard:AdminDashboardComponent,

  ) { }
  ngOnInit(): void {
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
  onFormSubmit() {
    this.model.mfg = moment(this.model.mfg).format('DD-MM-YYYY');
    // this.model.exp = moment(this.model.exp).format('DD-MM-YYYY');
    this.service.addProduct(this.model).subscribe(
      (response: any) => {
        this.toastr.success('Product Added', 'Success');
      },
      (error: any) => {
        this.toastr.error('Product not added', 'Error');
      }
    );
  }
  onClose(): void {
    this.dialogRef.close(false);
  }
}
