import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { LogoutComponent } from '../logout/logout.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  constructor(private dialog:MatDialog,) { }

  ngOnInit(): void {
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
