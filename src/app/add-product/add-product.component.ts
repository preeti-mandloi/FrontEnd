import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ServiceService } from '../services/service.service';
import { NgForm } from '@angular/forms';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
// import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {



  
  myControl = new FormControl();
  options: string[] = ['Shirt', 'Jeans', 'Jacket','Joggers','Sendals','Shoes'];
  filteredOptions: Observable<string[]> | undefined;
  date = new FormControl(new Date().toLocaleDateString());

  
  
  
  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    private service:ServiceService,
    private router:Router,
    // private adminDashboard:AdminDashboardComponent,

  ) { }
  model:Product={
    name:'',
    quantity:0,
    type:'',
    price:0,
    mfg:'',
    exp:'',
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
    this.service.addProduct(this.model).subscribe(
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