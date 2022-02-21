import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  // dialogRef: any;
  authService: any;


  constructor(private router:Router,
    private route:Router,
    private dialogRef: MatDialogRef<LogoutComponent>) { }

  ngOnInit(): void {
  }
  
  close() :void {
    this.dialogRef.close(false);
  }
  onLogout(){
    localStorage.removeItem("user-check");
    this.route.navigateByUrl('/');  
    this.dialogRef.close(false);
   
  }  
  
}
