import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { RegistrationService } from '../registration/registration.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from './login.service';
import { DOCUMENT } from '@angular/common';
import { MasterService } from '../master.service';
import { GlobalService } from '../utility/global.serivce';
import { UtilityService } from '../utility/utility.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  sliderList = [{
    bannerDescription: 'assets/images/login-slider-bg.jpg'
  },
  ];

  captchaText: any;
  loginForm: FormGroup;
  isFormInvalid: boolean;
  show: boolean;
  collegeCount: Object;
  categoryList: any = []
  universityCount: Object;
  schoolCount: Object;
  standaloneCount: Object;
  polytechCount: Object;
  industrialCount: Object;
  searchText: any;
  lang: any;
  detail: any;
  emailForm: FormGroup;
  display: boolean;
  backdrop: boolean;
  bilingual: any;
  college: any;
  encodeCaptcha: any;
  university: any;
  standalone: any;
  school: any;
  iti: any;
  totalRecordPenDetails: any=0;
  totalRequestReceived: any=0;

  
  constructor(@Inject(DOCUMENT) private document: Document, public utilService: UtilityService, public loginService: LoginService,
    public sharedService: SharedService,
    public fb: FormBuilder, public router: Router,private sanitizer: DomSanitizer, public globalService: GlobalService, public masterService: MasterService) {
    let regExEmail: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
     captcha: ['', [Validators.required]],
      // captcha: ['', [Validators.required,this.checkCapcha.bind(this)]]
    });
    this.emailForm = this.fb.group({
      'email': ['', [Validators.required, Validators.pattern(regExEmail)]],
    })
    this.show = false;
    this.getCaptcha();
    // this.getCollegeCount();
    // this.getUniversityCount();
    // this.getSchoolCount();
    // this.getStandlonCount();
    // this.getIndustrialCount();

    this.detail = this.sharedService.getLangId.subscribe(res => {
      // console.log(res)
      if (res != 0) {
        this.lang = res.langId,
          this.bilingual = res.bilingual,
          this.getLabel()
      }
    })
  }

  ngOnInit() {
    this.loginService.getTotalRecordCountPenDetails().subscribe((res)=>{
    //  console.log(res);
      this.totalRecordPenDetails=res.totalRecordPenDetails;
      this.totalRequestReceived=res.requestReceived;
    })

    if (sessionStorage.getItem('signUpToken')) {
      sessionStorage.removeItem('signUpToken');
    }

    //clear localstorage
    localStorage.removeItem('mb');
    localStorage.removeItem('email');
  }


  password() {
    this.show = !this.show;
  }
  checkCapcha(control: AbstractControl) {
    if (control.value && this.loginForm) {
      let val = control.value;
      if (val != this.captchaText) {
        return { captchaNotValidError: true }
      }

    }
  }

  getCaptcha() {
   // debugger;
    this.loginService.getCaptchaText().subscribe((resp: any) => {
      this.captchaText = this.sanitizer.bypassSecurityTrustUrl(resp.capcha);
      this.encodeCaptcha = resp.data;
    });
  }
 
  // getCaptcha() {
  //   let randomNumber: number = Math.floor(1000 + Math.random() * 9000);
  //   this.captchaText = randomNumber;
  //   console.log(this.captchaText);
  // }

  
  login() {

    if (this.loginForm.invalid) {
      this.sharedService.global_notification = [];
      this.sharedService.global_notification.push(
        { severity: 'error', detail: ' Please enter required field.' }
      );
      this.isFormInvalid = true
      return;
    }
    else {
      this.isFormInvalid = false;

      let captchaText = this.loginForm.controls['captcha'].value
      console.log(captchaText);
     this.loginService.verifyGetCaptcha(captchaText,this.encodeCaptcha).subscribe((res)=>{
       console.log("response captcha",res);
       if (res.message=='Captcha Valid') {
        let reqdata = {
          // username: this.utilService.getEncryptedValue(this.loginForm.controls['username'].value),
          username: this.loginForm.controls['username'].value,
          password: this.utilService.getEncryptedValue(this.loginForm.controls['password'].value),
        }

        console.log(reqdata);
        this.sharedService.global_loader = true;
        localStorage.setItem('useridd',this.loginForm.get('username').value);
        this.loginService.login(reqdata).subscribe((res: any) => {
          let getToken = res.token
          let tokenarray = getToken.split('Bearer ');
          let token = tokenarray[tokenarray.length - 1];
          console.log(token);
          this.loginService.setToken(token);
          this.sharedService.setLoginButton(true);
          this.router.navigate(['/tpr/tprDashBoard'])
       // this.document.location.href = `http://10.246.76.137/cares/#/config/15/${token}`
       // this.document.location.href = `http://localhost:4200/#/config/15/${token}`
       // this.redirect(token)
          this.loginForm.reset();
          this.sharedService.global_loader = false;
          this.sharedService.global_notification = [];
          this.sharedService.global_notification.push(
            { severity: 'success', detail: 'Login Sucessfully' }
          );
        },
          err => {
            this.sharedService.global_loader = false;
            this.sharedService.global_notification = [];
            this.sharedService.global_notification.push(
              { severity: 'error', detail: 'Invalid User Id or Password......' }
            );
          }
        )
      }else{
      //  debugger;
        this.sharedService.global_loader = false;
          this.sharedService.global_notification = [];
          this.sharedService.global_notification.push(
            { severity: 'error', detail: 'Invalid Captcha' }
          );
      }
     },err=>{
      console.log("error in verificarion api",err);
      this.sharedService.global_loader = false;
      this.sharedService.global_notification = [];
      this.sharedService.global_notification.push(
        { severity: 'error', detail: 'Invalid Captcha' }
      );

     });



    }
  }
  
  redirect(token){
    this.loginService.redirectCares(token).subscribe(res=>{

    })
  }
 




  getLabel() {
    if (this.lang === '15' || this.lang === '27') {
      this.college = this.sharedService.bilingual_institute_courses_list[this.lang]['College']
      this.university = this.sharedService.bilingual_institute_courses_list[this.lang]['University']
      this.standalone = this.sharedService.bilingual_institute_courses_list[this.lang]['Standalone-Institution']
      this.school = this.sharedService.bilingual_institute_courses_list[this.lang]['School']
      this.iti = this.sharedService.bilingual_institute_courses_list[this.lang]['ITI']
    } else {
      this.college = this.sharedService.bilingual_institute_courses_list['15']['College']
      this.university = this.sharedService.bilingual_institute_courses_list['15']['University']
      this.standalone = this.sharedService.bilingual_institute_courses_list['15']['Standalone-Institution']
      this.school = this.sharedService.bilingual_institute_courses_list['15']['School']
      this.iti = this.sharedService.bilingual_institute_courses_list['15']['ITI']
    }

  }

  getCollegeCount() {
    this.loginService.getCollege().subscribe(res => {
      this.collegeCount = res;

    },
      err => {
      });
  }
  getUniversityCount() {
    this.loginService.getUniversity().subscribe(res => {
      this.universityCount = res;
    },
      err => {
      });
  }
  getSchoolCount() {
    this.loginService.getSchool().subscribe(res => {
      this.schoolCount = res;

    },
      err => {
      });
  }
  getStandlonCount() {
    this.loginService.getStandlonIns().subscribe(res => {
      this.standaloneCount = res;

    },
      err => {
      });
  }

  getIndustrialCount() {
    this.loginService.getIndustrialIns().subscribe(res => {
      this.industrialCount = res;
    },
      err => {
      });
  }

  clearData() {
    this.loginForm.reset();
  }

  openDialog() {
    this.display = true;
    this.backdrop = true;
  }
  hideDialog() {
    this.display = false;
    this.backdrop = false;
    this.emailForm.reset();
  }
  emailVerification() {
    console.log(this.emailForm.controls['email'].value);
    this.loginService.emailVerification(this.emailForm.controls['email'].value).subscribe((res: any) => {
      console.log(res);
      if (res.message == "success") {
        this.sharedService.global_notification = [];
        this.sharedService.global_notification.push(
          { severity: 'success', detail: res.message }
        );
        this.display = false;
        this.backdrop = false;
        this.emailForm.reset();
        this.router.navigate(['/teacher/reg/emailandmobileverification'])
      }else{
        console.log(res);
        this.sharedService.global_notification = [];
        this.sharedService.global_notification.push(
          { severity: 'success', detail: 'failed' }
        );
      }

    },
      err => {
        console.log(err);
        this.sharedService.global_notification = [];
        this.sharedService.global_notification.push(
          { severity: 'error', detail: err.error.message }
        );
      })
  }
  ngOnDestroy() {
    if (this.detail) {
      this.detail.unsubscribe();
    }
  }
}


