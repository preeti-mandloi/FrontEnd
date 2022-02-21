import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/product';
import { AuthenticationService } from '../services/Auth/authentication.service';
import { ServiceService } from '../services/service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  constructor(
    private router:Router,
    private service:ServiceService,
    private auth: AuthenticationService
    ) {
      
     }
  loginForm!: FormGroup;
  hide: any;
  username:any
  model:Login ={
    username:'',
    password:''
  }

     
  ngOnInit(){
   
    if(localStorage.getItem("user-check")  ){
      this.router.navigate(['/app-order-summary']);
    }
    this.initForm();

  }
  initForm(){
    this.loginForm= new FormGroup(
      {
        username :new FormControl('',[Validators.required]),
        password :new FormControl('',[Validators.required])
      }
    );
  }

 
  submit(){
    if(this.loginForm.valid){
     const result = this.auth.setlogin(this.loginForm.value);
         if(result){
          console.log(result);
          this.router.navigate(['/app-order-summary']);
       
        }else{
          alert('login failed');
        }

     }
  }
}

