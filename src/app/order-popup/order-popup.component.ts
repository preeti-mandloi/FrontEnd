import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { Order } from '../models/product';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderPopupComponent>,
    private service:ServiceService,
    private router:Router,
  ) { }
  model:Order={
    name:'',
    quantity:0,
    price:0,
    totalPrice:0,
  }
  ngOnInit(): void {
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
