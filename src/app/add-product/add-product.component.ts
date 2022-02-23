import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ServiceService } from '../services/service.service';
import { NgForm } from '@angular/forms';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  private gridApi: any;

  addProduct!: FormGroup;

  date = new FormControl(new Date().toLocaleDateString());
  grid: any;

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    private service: ServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  model: Product = {
    status: '',
    name: '',
    quantity: 0,
    type: '',
    price: 0,
    mfg: '',
    exp: '',
  };

  initForm() {
    this.addProduct = new FormGroup({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      mfgDate: new FormControl('', [Validators.required]),
    });
  }
  onFormSubmit(addProductInTable: any) {
    if (this.addProduct.valid) {
      this.model.mfg = moment(this.model.mfg).format('YYYY-MM-DD');
      this.service.addProduct(this.model).subscribe((response: any) => {
        this.toastr.success('Product Added SuccessFully');
        addProductInTable.resetForm();
        this.dialogRef.close({ data: 'success' });
      });
    } else {
      this.toastr.error('Faild');
    }
  }
  onClose(): void {
    this.dialogRef.close(false);
  }
}
