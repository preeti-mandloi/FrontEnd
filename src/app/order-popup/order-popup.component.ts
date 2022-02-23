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

@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss'],
})
export class OrderPopupComponent implements OnInit {
  addProductInRow!: FormGroup;
  orderConfirm!: FormGroup;
  items: Array<any> = [];
  newItem: any = {};
  frameworkComponents: any;
  //ng-grid from here
  public gridApi: any;
  public gridColumnApi: any;
  public columnDefs: any;
  public sortingOrder: any;
  public defaultColDef: any;
  public agGrid: any;
  public obj: any = [];
  public i: any;
  public myControl = new FormControl();
  public options: any[] = [];
  public filteredOptions: Observable<string[]> | undefined;

  constructor(
    public dialogRef: MatDialogRef<OrderPopupComponent>,
    private service: ServiceService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.http
      .get(environment.usersUrl + '/product/getAllProducts')
      .subscribe((response: any) => {
        for (const property in response) {
          this.options.push(response[property]['name']);
        }
      });
  }

  addItems(addOrderForm: any) {
    if (this.addProductInRow.valid) {
      this.service.addOrder(this.newItem).subscribe((response) => {
        if (this.options.indexOf(this.newItem.name) !== -1) {
          this.items.push(response);
          console.log('data of order', this.items);
          this.newItem = {};
          addOrderForm.resetForm();
        }
      });
    }
  }

  removeItem(index: any) {
    this.items.splice(index, 1); // remove 1 item at ith place
  }

  ngOnInit(): void {
    this.initForm();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  initForm() {
    this.addProductInRow = new FormGroup({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
    });
    this.orderConfirm = new FormGroup({
      paymentMode: new FormControl('', [Validators.required]),
    });
  }

  private _filter(value: string): any[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.options.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
    }
    return [];
  }

  onFormSubmit(OrderformModel: any) {
    if (this.orderConfirm.valid) {
      this.items.forEach((element) => {
        element.paymentmode = OrderformModel.value.paymentMode;
      });
      this.obj = this.items;
      this.service.getAllOrder(this.obj).subscribe((response) => {
        console.log('get all order', response);
        this.toastr.success('Order Sold');
        this.dialogRef.close({ data: 'success' });
      });
      //reset form
      this.items = [];
      OrderformModel.resetForm();
    }
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
