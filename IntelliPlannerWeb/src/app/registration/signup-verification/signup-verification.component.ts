import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master.service';
import { MustMatch } from 'src/app/shared/custome-validators';
import { SharedService } from 'src/app/shared/shared.service';
import { RegistrationService } from '../registration.service';


@Component({
  selector: 'app-signup-verification',
  templateUrl: './signup-verification.component.html',
  styleUrls: ['./signup-verification.component.scss']
})
export class SignupVerificationComponent implements OnInit {
  captchaText: any;
  captchaText1: any;
  show: boolean;
  otpForm: FormGroup
  passwordForm: FormGroup
  showPasswordFields: boolean = false;
  isFornInvalid: boolean;
  isPasswordFormInvalid: boolean;
  username: any;
  existUserName: any;


  constructor(public fb: FormBuilder, public registrationService: RegistrationService, public router: Router, public sharedService: SharedService, public masterService: MasterService) {
    let passwordRegex: RegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,16}/;

    this.show = false;
    this.getCaptcha();
    this.otpForm = this.fb.group({
      // mobileOtp: ['', [Validators.required]],
      emailOtp: ['', [Validators.required]],
      captcha: ['', [Validators.required,this.checkCapcha.bind(this)]],
    });
    this.passwordForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
      captcha: ['', [Validators.required,this.checkCapcha.bind(this)]],
      confirmPassword: ['', [Validators.required,]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

  }

  ngOnInit() {
    this.sharedService.setLoginButton(true)
    if (!sessionStorage.getItem('signUpToken')) {
      this.router.navigate(['/signup'])
    }
    let self = this;
    window.onload = function (e) {
      sessionStorage.removeItem('signUpToken')
      self.router.navigate(['/signup'])
    }
  }

  getExistUsername(username) {
    if (username) {
      this.registrationService.getExistUser(username).subscribe(res => {
        this.existUserName = res;
      },
        err => {
        });
    }

  }
  checkCapcha(control: AbstractControl) {
    if (control.value && this.otpForm) {
      let val = control.value;
      if (val.toUpperCase() != this.captchaText) {
        return { captchaNotValidError: true }
      }
    }
  }
  getCaptcha() {
    let randomNumber: number = Math.floor(1000 + Math.random() * 9000);
    this.captchaText = randomNumber;
  }
  cancelSignUp() {
    this.router.navigate(['/login']);
  }

  checkCapchaForPassword(control: AbstractControl) {
    if (control.value && this.passwordForm) {
      let val = control.value;
      if (val.toUpperCase() != this.captchaText) {
        return { captchaNotValidError: true }
      }
    }
  }
  


  
  submitOtpData() {
    if (this.otpForm.invalid) {
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
      "e_Otp": this.otpForm.controls['emailOtp'].value,
      // "m_Otp": this.otpForm.controls['mobileOtp'].value
    }

    this.registrationService.otpVerification(reqdata).subscribe(res => {
      if (res.status == 200) {
        this.otpForm.reset();
        this.showPasswordFields = true;
        this.getCaptcha();
        this.sharedService.global_notification = [];
        this.sharedService.global_notification.push(
          { severity: 'success', detail: res.message }
        );
      }
    },
      error => {
        // if(error.status == 422){
        this.sharedService.global_notification = [];
        this.sharedService.global_notification.push(
          { severity: 'error', detail: error }
        );
        // }
      });
  }
  
  submitPasswordData() {
    if (this.existUserName == true) {
      this.sharedService.global_notification = [];
      this.sharedService.global_notification.push(
        { severity: 'error', detail: ' Username already exist.' }
      );
      return;
    }
    if (this.passwordForm.invalid) {
      this.sharedService.global_notification = [];
      this.sharedService.global_notification.push(
        { severity: 'error', detail: ' Please enter required field.' }
      );
      this.isPasswordFormInvalid = true
      return;
    }
    else {
      this.isPasswordFormInvalid = false
    }

    let reqdata = {
      'loginId': this.passwordForm.controls['userId'].value,
      'password': this.passwordForm.controls['password'].value
    }

    this.registrationService.saveLoginData(reqdata).subscribe((res: any) => {
      if (res.status == 200) {
        this.passwordForm.reset();
        this.router.navigate(['/login']);
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

  password() {
    this.show = !this.show;
  }

  restrictNumeric(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  validatetUser() {
    this.existUserName = false;
  }
}
