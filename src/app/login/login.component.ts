import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  
    ) {
      
     }
  loginForm!: FormGroup;
  hide: any;
  username:any
  // login =new LoginModel();

     
  ngOnInit(){
    this.loginForm= new FormGroup(
      {
        username :new FormControl('',[Validators.required]),
        password :new FormControl('',[Validators.required,Validators.minLength(3)])
      }
    );
    // console.log(this.login);
    

  }

    submit()
    { 
      // console.log(this.login);
      
      // this.service.user(this.login).subscribe((response) => {console.log(response);
      //    this.router.navigate(['/product']);},(error) =>{alert("invalid username/password")}
      // );

   }
}
