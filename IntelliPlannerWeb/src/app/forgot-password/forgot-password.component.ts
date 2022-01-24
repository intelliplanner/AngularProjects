import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { MustMatch } from '../shared/custome-validators';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  show:boolean;
  forgotForm:FormGroup;
  userList:any=[];
    isFormInvalid: boolean;
    constructor(public router:Router,public sharedService:SharedService,public fb:FormBuilder,public loginService:LoginService) {  let passwordRegex: RegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,16}/;
    this.forgotForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
      confirmPassword: ['', [Validators.required]],
      loginId: ['',[Validators.required]],
      otp: ['',[Validators.required]],
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
    
  }
  
    ngOnInit() {
    }
  
   
    password() {
      this.show = !this.show;
    }
  // method
    forgot(){
      let reqdata = {
        'otp': this.forgotForm.controls['otp'].value,
        'password': this.forgotForm.controls['password'].value,
        'confirmPassword':this.forgotForm.controls['confirmPassword'].value,
        'loginId':this.forgotForm.controls['loginId'].value
      }
      this.loginService.forgotPassword(reqdata).subscribe((res:any)=>{
        if(res.status == 200){
          this.sharedService.global_notification = [];
          this.sharedService.global_notification.push(
            { severity: 'success', detail: res.message }
          );
          this.forgotForm.reset();
          this.isFormInvalid=false;
          this.router.navigate(['/login'])
        }
      },
      err=>{
        this.sharedService.global_notification = [];
        this.sharedService.global_notification.push(
          { severity: 'error', detail: 'Request can not be processed at the moment. Please try again' }
        );
      })
    }
    cancel(){
      this.router.navigate(['/login'])
    }
    }
    
  
  