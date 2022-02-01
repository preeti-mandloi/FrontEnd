import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/product';
import { ServiceService } from '../services/service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginDetails={
    username:"",
    password:""
  }
  
  constructor(
    private router:Router,
    private service:ServiceService,
    ) {
      
     }
  loginForm!: FormGroup;
  hide: any;
  username:any
  login =new Login();

     
  ngOnInit(){
    this.loginForm= new FormGroup(
      {
        username :new FormControl('',[Validators.required]),
        password :new FormControl('',[Validators.required])
      }
    );
    console.log(this.login);
    

  }

    submit()
    { 
       console.log(this.login);
      this.service.admin(this.login).subscribe((response:any) => {
        console.log(response);
        //  this.router.navigate(['/app-admin-dashboard']);
        },(error:any) =>{alert("invalid username/password")}
      );  
   }
}
