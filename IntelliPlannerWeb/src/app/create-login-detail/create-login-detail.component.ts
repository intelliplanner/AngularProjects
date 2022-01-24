import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { MasterService } from '../master.service';
import { SharedService } from '../shared/shared.service';
import { UtilityService } from '../utility/utility.service';

@Component({
  selector: 'app-create-login-detail',
  templateUrl: './create-login-detail.component.html',
  styleUrls: ['./create-login-detail.component.scss']
})
export class CreateLoginDetailComponent implements OnInit {
  TableFormData: FormGroup;
  submitted=false;
  flag=false;
  captchaText: any;
  totalRecordPenDetails: any;
  totalRequestReceived: any=0;
  changetext: any=true;
  
  constructor(private masterService: MasterService,
    private _fb:FormBuilder,private route:ActivatedRoute,private router: Router, public utilService: UtilityService, public sharedService: SharedService, private loginService:LoginService) { }

  ngOnInit() {
    this.TableFormData= this._fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      confirmPassword:['',Validators.required],
      //  captcha: ['', [Validators.required,this.checkCapcha.bind(this)]]
    },{
      validators:this.MustMatch('password','confirmPassword')
    })
    // this.getCaptcha();

    this.loginService.getTotalRecordCountPenDetails().subscribe((res)=>{
      //  console.log(res);
        this.totalRecordPenDetails=res.totalRecordPenDetails;
        this.totalRequestReceived=res.requestReceived;
      })
     
  }
  MustMatch(controlName:string,matchingControlName:string){
    return (formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors.MustMatch){
        return 
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({MustMatch:true})
      }else{
        matchingControl.setErrors(null);
      }
    }
  }
  checkCapcha(control: AbstractControl) {
    if (control.value && this.TableFormData) {
      let val = control.value;
      if (val != this.captchaText) {
        return { captchaNotValidError: true }
      }

    }
  }
  f(){return this.TableFormData.controls};

  onSubmit(){
   console.log(this.TableFormData)
   this.submitted=true;
   if(this.TableFormData.invalid){
     return;
   }else{

   }
   let payload={
    "email": localStorage.getItem('email'),
    // "email": 'upanshu.sharma@uneecops.com',
    "loginId": this.TableFormData.get('username').value,
    "mobile": localStorage.getItem('mb'),
    // "mobile": '9999189709',
    "name": this.TableFormData.get('username').value,
    "password":  this.utilService.getEncryptedValue(this.TableFormData.get('password').value),
   }
   console.log(payload);
   this.masterService.generateUsernamaPassword(payload).subscribe((res)=>{
     console.log(res);
     if(res.status=='200'){
      this.flag=true;
      this.sharedService.global_loader = false;
      this.sharedService.global_notification = [];
      this.sharedService.global_notification.push(
        { severity: 'success', detail: res.message }
      );
       localStorage.removeItem('mb');
       localStorage.removeItem('email');
       this.clearForm();
       this.submitted=false;
       this.router.navigate(['/login'])
     }
   },
   err => {
     console.log(err.error.message);
     this.sharedService.global_loader = false;
     this.sharedService.global_notification = [];
     this.sharedService.global_notification.push(
       { severity: 'error', detail: err.error.message }
     );
   })

  }
  clearForm(){
    this.TableFormData.reset();
  }

  // getCaptcha() {
  //   let randomNumber: number = Math.floor(1000 + Math.random() * 9000);
  //   this.captchaText = randomNumber;
  //   console.log(this.captchaText);
  // }

  callChangeFunc(){
    if(!this.changetext){
      document.getElementById("changebuttontext").innerHTML="View More...";
      this.changetext=true;
    }else{
      document.getElementById("changebuttontext").innerHTML="View Less...";
      this.changetext=false;
    }
    
  }

}
