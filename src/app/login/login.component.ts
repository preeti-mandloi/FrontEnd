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

  
  constructor(
    private router:Router,
    private service:ServiceService,
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
   
    this.initForm();

  }
  initForm(){
    this.loginForm= new FormGroup(
      {
        username :new FormControl('',[Validators.required]),
        password :new FormControl('',[Validators.required])
      }
    );
    console.log(this.model);
  }

  //   submit()
  //   { 
  //      console.log(this.model);
  //     this.service.admin(this.model).subscribe((response:any) => {
  //       console.log(response);
  //       //  this.router.navigate(['/app-admin-dashboard']);
  //       },(error:any) =>{alert("invalid username/password")}
  //     );  
  //  }
  submit(){
    if(this.loginForm.valid){
      this.service.admin(this.loginForm.value).subscribe(result=>{
        if(result.success){
          console.log(result);
          this.router.navigate(['/app-admin-dashboard']);
          alert(result.message);
        }else{
          alert(result.message);
        }
      })
    }
  }
}

