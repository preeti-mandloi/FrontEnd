import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { environment } from 'src/environments/environment.prod';
import { LogoutComponent } from '../logout/logout.component';
import { TotalProduct } from '../models/product';
import { ProfileComponent } from '../profile/profile.component';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  model:TotalProduct={
   totalProduct:0,
  }
  totalCount: any;
  constructor(
    private dialog:MatDialog,
    private service:ServiceService,
    private http: HttpClient,) { }

  ngOnInit(): void {
    this.http.get( environment.usersUrl+'/product/getCount')
    .subscribe(response => {
      this.totalCount=response;
      console.log("get count to product",response)
        // params.api.setRowData(response);
      });
    //   this.http.get( environment.usersUrl+'/order/getCount')
    // .subscribe(response => {
    //   this.totalCount=response;
    //   console.log("get count to order",response)
    //     // params.api.setRowData(response);
    //   });
  }
  profile()
  {
    const dailogconfig=new MatDialogConfig();
    dailogconfig.disableClose=false;
    dailogconfig.autoFocus=true;
    dailogconfig.width="30%";
    this.dialog.open(ProfileComponent,dailogconfig)

  }
  logout()
  {
    const dailogconfig=new MatDialogConfig();
  dailogconfig.disableClose=false;
  dailogconfig.autoFocus=true;
  dailogconfig.width="19%";
   this.dialog.open(LogoutComponent,dailogconfig)

  }
 
}
