import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master.service';
import { SharedService } from 'src/app/shared/shared.service';
import { RegistrationService } from '../registration.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  show: boolean;
  captchaText: any;
  signUpForm: FormGroup
  isFornInvalid: boolean;
  languageId:any;
 
  constructor(public registrationService:RegistrationService,public fb: FormBuilder, public router: Router, public sharedService: SharedService,public masterService:MasterService) {
    let regExEmail: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      nameHindi: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.pattern(regExEmail)]],
      mobileNo: ['', [Validators.required]],
      verificationCode: ['', [Validators.required,this.checkCapcha.bind(this)]],
    });
  
  }

  ngOnInit() {
  if (sessionStorage.getItem('signUpToken')) {
      sessionStorage.removeItem('signUpToken');
    }
    this.getCaptcha();
    this.sharedService.setLoginButton(true)
  }
  
 
  
  checkCapcha(control: AbstractControl) {
    if (control.value && this.signUpForm) {
      let val = control.value;
      if (val != this.captchaText) {
        return { captchaNotValidError: true }
      }

    }
  }
  getCaptcha() {
    let randomNumber: number = Math.floor(1000 + Math.random() * 9000);
    this.captchaText = randomNumber;
  }
  sendUserDetails() {
    // sessionStorage.setItem('signUpToken', 'signup');
    // this.router.navigate(['/signup_verification']);
         if (this.signUpForm.invalid) {
        this.sharedService.global_notification = [];
          this.sharedService.global_notification.push(
          { severity: 'error', detail: ' Please enter required field.' }
        );
        this.isFornInvalid = true
        return;
      }
      else {
        this.isFornInvalid = false
      }
  
    let reqdata = {
      'primaryEmailAddress': this.signUpForm.controls['emailId'].value,
      'primaryMobileNumber': this.signUpForm.controls['mobileNo'].value,
      'name': this.signUpForm.controls['name'].value,
      'vernacularName': {
        "language_id": 27,
        "native_name": this.signUpForm.controls['nameHindi'].value
      }
    }
    //const url = this.httpService.ServerUrlUser + 'user';
    
    this.registrationService.saveUser(reqdata).subscribe((res:any) => {
      if (res.status == 200) {
        let token = res.token;
        sessionStorage.setItem('signUpToken', token);
        this.router.navigate(['/signup/signup_verification'])
        this.signUpForm.reset();
      this.sharedService.global_notification = [];
        this.sharedService.global_notification.push(
          { severity: 'success', detail: res.message }
        );
      }
    },
      err => {
        
      this.sharedService.global_notification = [];
        this.sharedService.global_notification.push(
          { severity: 'error', detail: 'Request can not be processed at the moment. Please try again' }
        );
      });
  }

  resetUserDetails() {
    this.signUpForm.reset();
  }

  restrictNumeric(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  

}
